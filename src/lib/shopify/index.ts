import type {
  ShopifyCart,
  ShopifyCartCreateOperation,
  ShopifyCartLinesAddOperation,
  ShopifyCartLinesRemoveOperation,
  ShopifyCartLinesUpdateOperation,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionsOperation,
  ShopifyGraphQLResponse,
  ShopifyProduct,
  ShopifyProductsOperation,
  ShopifySingleCollectionOperation,
  ShopifySingleProductOperation,
} from "@/types/shopify";

const rawDomain = process.env.SHOPIFY_STORE_DOMAIN;
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-01";

// Normalize domain by stripping protocol and trailing slashes
const domain = rawDomain
  ? rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "")
  : "";

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : "";

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number;
}

/**
 * Server-only GraphQL fetcher for the Shopify Storefront API.
 * Keeps API tokens secure and never exposes them to the client bundle.
 */
export async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
  tags,
  revalidate,
}: ShopifyFetchOptions): Promise<T> {
  if (!domain || !privateToken) {
    throw new Error(
      "Shopify configuration missing. Ensure SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_PRIVATE_TOKEN are set in .env.local."
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Shopify-Storefront-Private-Token": privateToken,
  };

  const nextOptions: { tags?: string[]; revalidate?: number } = {};
  if (tags) nextOptions.tags = tags;
  if (typeof revalidate === "number") nextOptions.revalidate = revalidate;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        ...(variables && { variables }),
      }),
      cache: revalidate !== undefined ? undefined : cache,
      ...(Object.keys(nextOptions).length > 0 && { next: nextOptions }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Shopify Storefront API HTTP error ${response.status} (${response.statusText}): ${errorBody}`
      );
    }

    const json: ShopifyGraphQLResponse<T> = await response.json();

    if (json.errors && json.errors.length > 0) {
      const errorMessages = json.errors.map((err) => err.message).join("; ");
      throw new Error(`Shopify GraphQL error: ${errorMessages}`);
    }

    if (!json.data) {
      throw new Error("Shopify Storefront API returned no data.");
    }

    return json.data;
  } catch (error) {
    console.error("Shopify Storefront API fetch error:", error);
    throw error;
  }
}

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                id
                handle
                title
              }
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Creates a new Shopify cart.
 */
export async function createCart(
  lines?: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  const query = `
    mutation createCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<ShopifyCartCreateOperation["data"]>({
    query,
    variables: { lines: lines || [] },
    cache: "no-store",
  });

  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }

  if (!data.cartCreate.cart) {
    throw new Error("Failed to create Shopify cart.");
  }

  return data.cartCreate.cart;
}

/**
 * Retrieves an existing Shopify cart by ID.
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<ShopifyCartOperation["data"]>({
    query,
    variables: { cartId },
    cache: "no-store",
  });

  return data.cart;
}

/**
 * Adds line items / variants to an existing Shopify cart.
 */
export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  const query = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<ShopifyCartLinesAddOperation["data"]>({
    query,
    variables: { cartId, lines },
    cache: "no-store",
  });

  if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join("; "));
  }

  if (!data.cartLinesAdd.cart) {
    throw new Error("Failed to add items to Shopify cart.");
  }

  return data.cartLinesAdd.cart;
}

/**
 * Updates quantity of items in an existing Shopify cart.
 */
export async function updateCartLine(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  const query = `
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<ShopifyCartLinesUpdateOperation["data"]>({
    query,
    variables: { cartId, lines },
    cache: "no-store",
  });

  if (data.cartLinesUpdate.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join("; "));
  }

  if (!data.cartLinesUpdate.cart) {
    throw new Error("Failed to update Shopify cart lines.");
  }

  return data.cartLinesUpdate.cart;
}

/**
 * Removes items from an existing Shopify cart.
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = `
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<ShopifyCartLinesRemoveOperation["data"]>({
    query,
    variables: { cartId, lineIds },
    cache: "no-store",
  });

  if (data.cartLinesRemove.userErrors && data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join("; "));
  }

  if (!data.cartLinesRemove.cart) {
    throw new Error("Failed to remove items from Shopify cart.");
  }

  return data.cartLinesRemove.cart;
}

/**
 * Fetches the first N products from the Shopify Storefront API.
 */
export async function getProducts(first: number = 8): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            productType
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ShopifyProductsOperation["data"]>({
    query,
    variables: { first },
    revalidate: 3600,
  });

  return data.products.edges.map((edge) => edge.node);
}

/**
 * Fetches a single product by handle with complete variants, options, and image gallery.
 */
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        productType
        availableForSale
        collections(first: 5) {
          edges {
            node {
              id
              handle
              title
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        options {
          id
          name
          values
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ShopifySingleProductOperation["data"]>({
    query,
    variables: { handle },
    revalidate: 3600,
  });

  return data.product;
}

/**
 * Fetches related products for a given product (by collection or store catalogue).
 */
export async function getRelatedProducts(
  productHandle: string,
  collectionHandle?: string | null,
  limit: number = 4
): Promise<ShopifyProduct[]> {
  try {
    if (collectionHandle) {
      const collection = await getCollectionByHandle(collectionHandle, 10);
      if (collection?.products?.edges && collection.products.edges.length > 0) {
        const items = collection.products.edges
          .map((e) => e.node)
          .filter((p) => p.handle !== productHandle);
        if (items.length > 0) {
          return items.slice(0, limit);
        }
      }
    }

    const allProducts = await getProducts(12);
    return allProducts.filter((p) => p.handle !== productHandle).slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

/**
 * Server-side test function to verify Storefront API connectivity.
 * Fetches the first N products with basic metadata.
 */
export async function testShopifyConnection(first: number = 5): Promise<{
  success: boolean;
  storeDomain: string;
  count: number;
  products: ShopifyProduct[];
}> {
  const query = `
    query testShopifyProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ShopifyProductsOperation["data"]>({
    query,
    variables: { first },
    cache: "no-store",
  });

  const products = data.products.edges.map((edge) => edge.node);

  return {
    success: true,
    storeDomain: domain,
    count: products.length,
    products,
  };
}

/**
 * Fetches all collections from the Shopify Storefront API.
 */
export async function getCollections(first: number = 20): Promise<ShopifyCollection[]> {
  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ShopifyCollectionsOperation["data"]>({
    query,
    variables: { first },
    revalidate: 3600,
  });

  return data.collections.edges.map((edge) => edge.node);
}

/**
 * Fetches a single collection by handle including its products.
 */
export async function getCollectionByHandle(
  handle: string,
  firstProducts: number = 50
): Promise<ShopifyCollection | null> {
  const query = `
    query getCollectionByHandle($handle: String!, $firstProducts: Int!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        image {
          url
          altText
          width
          height
        }
        products(first: $firstProducts) {
          edges {
            node {
              id
              handle
              title
              description
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ShopifySingleCollectionOperation["data"]>({
    query,
    variables: { handle, firstProducts },
    revalidate: 3600,
  });

  return data.collection;
}

