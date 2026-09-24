export interface ShopifyImage {
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  image?: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  productType?: string;
  vendor?: string;
  tags?: string[];
  collections?: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange?: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  } | null;
  featuredImage?: ShopifyImage | null;
  images?: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  options?: ShopifyProductOption[];
  variants?: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  image?: ShopifyImage | null;
  products?: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo?: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: MoneyV2;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    product: {
      id: string;
      handle: string;
      title: string;
    };
    price: MoneyV2;
    image?: ShopifyImage | null;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
    totalTaxAmount?: MoneyV2 | null;
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
}

export interface ShopifyUserError {
  field?: string[] | null;
  message: string;
}

export interface ShopifyProductsOperation {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
      pageInfo?: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
    };
  };
}

export interface ShopifySingleProductOperation {
  data: {
    product: ShopifyProduct | null;
  };
}

export interface ShopifyCollectionsOperation {
  data: {
    collections: {
      edges: Array<{
        node: ShopifyCollection;
      }>;
    };
  };
}

export interface ShopifySingleCollectionOperation {
  data: {
    collection: ShopifyCollection | null;
  };
}

export interface ShopifyCartOperation {
  data: {
    cart: ShopifyCart | null;
  };
}

export interface ShopifyCartCreateOperation {
  data: {
    cartCreate: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  };
}

export interface ShopifyCartLinesAddOperation {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  };
}

export interface ShopifyCartLinesUpdateOperation {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  };
}

export interface ShopifyCartLinesRemoveOperation {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  };
}

export interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
}
