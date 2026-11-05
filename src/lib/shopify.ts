/**
 * Client-Side Shopify Storefront API Fetcher & Queries
 * Strictly optimized for Netlify Free Tier Static Export & Client-Side Fetching
 */

const domain =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
  process.env.SHOPIFY_STORE_DOMAIN ||
  "ymrvy4-70.myshopify.com";

const token =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PRIVATE_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN ||
  "fa90ced10dd41f7d8fafc9993dcf25e3";

const apiVersion =
  process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ||
  process.env.SHOPIFY_API_VERSION ||
  "2024-01";

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const endpoint = `https://${cleanDomain}/api/${apiVersion}/graphql.json`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // If private token starting with shpat_, send Shopify-Storefront-Private-Token header;
  // otherwise send standard X-Shopify-Storefront-Access-Token header.
  if (token && token.startsWith("shpat_")) {
    headers["Shopify-Storefront-Private-Token"] = token;
  } else if (token) {
    headers["X-Shopify-Storefront-Access-Token"] = token;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error("Shopify API Error:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL Query Failed");
  }
  return json.data;
}

export const GET_COLLECTION_WITH_PRODUCTS_QUERY = `
  query getCollectionWithProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
        altText
      }
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            tags
            availableForSale
            productType
            description
            featuredImage {
              url
              altText
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
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CHECKOUT_MUTATION = `
  mutation createCheckout($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        message
        field
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = `
  query getAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          tags
          availableForSale
          productType
          description
          featuredImage {
            url
            altText
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
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      tags
      availableForSale
      productType
      description
      descriptionHtml
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
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
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_QUERY = `
  query getAllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 50) {
            edges {
              node {
                id
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch a collection with its products directly from the Storefront API
 */
export async function getCollectionWithProducts(handle: string) {
  const data = await shopifyFetch<{
    collection: any;
  }>({
    query: GET_COLLECTION_WITH_PRODUCTS_QUERY,
    variables: { handle },
  });
  return data.collection;
}

/**
 * Create a native Shopify Storefront checkout session and get checkoutUrl
 */
export async function createCheckoutSession(
  lines: Array<{ merchandiseId: string; quantity: number }>
) {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
      } | null;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>({
    query: CREATE_CHECKOUT_MUTATION,
    variables: { lines },
  });

  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }

  if (!data.cartCreate.cart?.checkoutUrl) {
    throw new Error("Checkout URL was not returned by Shopify.");
  }

  return data.cartCreate.cart;
}

// Re-export existing utilities for backwards compatibility
export * from "./shopify/index";

