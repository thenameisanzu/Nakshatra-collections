import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// Environment configurations
const rawDomain = process.env.SHOPIFY_STORE_DOMAIN || "nakshatra-collections-ttrghptp.myshopify.com";
const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
const shopId = process.env.SHOPIFY_SHOP_ID || "";
const clientId =
  process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID ||
  process.env.SHOPIFY_CLIENT_ID ||
  process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID ||
  "";
const clientSecret =
  process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET ||
  process.env.SHOPIFY_CLIENT_SECRET ||
  "";
const apiVersion =
  process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_VERSION ||
  process.env.SHOPIFY_API_VERSION ||
  "2025-01";

/**
 * GraphQL Query for Shopify Customer Account API
 * Retrieves full customer profile, default/saved addresses, and historical order details
 */
const CUSTOMER_PROFILE_AND_ORDERS_QUERY = `
  query GetCustomerProfileAndOrders {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress {
        emailAddress
        marketingState
      }
      phoneNumber {
        phoneNumber
        marketingState
      }
      defaultAddress {
        id
        formatted
        address1
        address2
        city
        province
        zip
        country
      }
      addresses(first: 10) {
        nodes {
          id
          formatted
          address1
          address2
          city
          province
          zip
          country
        }
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          number
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          lineItems(first: 50) {
            nodes {
              id
              title
              quantity
              price {
                amount
                currencyCode
              }
              totalPrice {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export interface ShopifyTokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  id_token?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

export interface CustomerData {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  emailAddress?: {
    emailAddress: string;
    marketingState?: string;
  };
  phoneNumber?: {
    phoneNumber: string;
    marketingState?: string;
  };
  defaultAddress?: {
    id: string;
    formatted?: string[];
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    zip?: string;
    country?: string;
  };
  addresses?: {
    nodes: Array<{
      id: string;
      formatted?: string[];
      address1?: string;
      address2?: string;
      city?: string;
      province?: string;
      zip?: string;
      country?: string;
    }>;
  };
  orders?: {
    nodes: Array<{
      id: string;
      name: string;
      number?: string | number;
      processedAt: string;
      financialStatus: string;
      fulfillmentStatus: string;
      totalPrice: {
        amount: string;
        currencyCode: string;
      };
      subtotalPrice?: {
        amount: string;
        currencyCode: string;
      };
      totalTax?: {
        amount: string;
        currencyCode: string;
      };
      totalShippingPrice?: {
        amount: string;
        currencyCode: string;
      };
      lineItems: {
        nodes: Array<{
          id: string;
          title: string;
          quantity: number;
          price?: {
            amount: string;
            currencyCode: string;
          };
          totalPrice?: {
            amount: string;
            currencyCode: string;
          };
          image?: {
            url: string;
            altText?: string;
          };
        }>;
      };
    }>;
  };
}

/**
 * Helper to determine token endpoint URL for Shopify Customer Account API
 */
function getTokenEndpoint(): string {
  if (process.env.SHOPIFY_CUSTOMER_ACCOUNT_TOKEN_URL) {
    return process.env.SHOPIFY_CUSTOMER_ACCOUNT_TOKEN_URL;
  }
  if (shopId) {
    return `https://shopify.com/authentication/${shopId}/oauth/token`;
  }
  return `https://${domain}/account/oauth/token`;
}

/**
 * Helper to determine GraphQL endpoint URL for Shopify Customer Account API
 */
function getCustomerApiEndpoint(): string {
  if (process.env.SHOPIFY_CUSTOMER_ACCOUNT_GRAPHQL_URL) {
    return process.env.SHOPIFY_CUSTOMER_ACCOUNT_GRAPHQL_URL;
  }
  if (shopId) {
    return `https://shopify.com/${shopId}/account/customer/api/${apiVersion}/graphql`;
  }
  return `https://${domain}/account/customer/api/${apiVersion}/graphql`;
}

/**
 * Exchanges authorization code for Shopify access tokens
 */
async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
  codeVerifier?: string
): Promise<ShopifyTokenResponse> {
  const tokenEndpoint = getTokenEndpoint();

  const bodyParams = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  if (clientId) {
    bodyParams.append("client_id", clientId);
  }

  if (codeVerifier) {
    bodyParams.append("code_verifier", codeVerifier);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };

  // If clientSecret is available, provide Basic Auth header or body parameter
  if (clientId && clientSecret) {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    headers["Authorization"] = `Basic ${credentials}`;
  }

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers,
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let parsedError;
    try {
      parsedError = JSON.parse(errorText);
    } catch {
      parsedError = { message: errorText };
    }
    throw new Error(
      `Shopify Token Exchange failed [HTTP ${response.status}]: ${
        parsedError.error_description || parsedError.message || errorText
      }`
    );
  }

  return response.json();
}

/**
 * Fetches the customer profile and order history using the Customer Account API GraphQL endpoint
 */
async function fetchCustomerProfileAndOrders(
  accessToken: string
): Promise<CustomerData> {
  const customerApiEndpoint = getCustomerApiEndpoint();

  const response = await fetch(customerApiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: CUSTOMER_PROFILE_AND_ORDERS_QUERY,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Shopify Customer Account API request failed [HTTP ${response.status}]: ${errorText}`
    );
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    const errorMessages = result.errors.map((e: { message: string }) => e.message).join(", ");
    throw new Error(`Shopify Customer GraphQL Error: ${errorMessages}`);
  }

  if (!result.data || !result.data.customer) {
    throw new Error("No customer data returned from Shopify Customer Account API");
  }

  return result.data.customer;
}

/**
 * GET Handler - Processes the redirect callback from Shopify OAuth 2.0 flow
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const wantsJson =
    searchParams.get("format") === "json" ||
    request.headers.get("accept")?.includes("application/json");

  // Determine redirect URL or base URL for OAuth redirect_uri
  const origin = request.nextUrl.origin;
  const redirectUri =
    process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI || `${origin}/api/auth/callback`;

  // 1. Handle OAuth Errors returned directly by Shopify in query string
  if (error) {
    const errorMessage = errorDescription || error;
    if (wantsJson) {
      return NextResponse.json(
        {
          success: false,
          error,
          error_description: errorMessage,
        },
        { status: 400 }
      );
    }
    return NextResponse.redirect(
      new URL(`/account?error=${encodeURIComponent(errorMessage)}`, origin)
    );
  }

  // 2. Validate authorization code presence
  if (!code) {
    if (wantsJson) {
      return NextResponse.json(
        {
          success: false,
          error: "missing_code",
          error_description: "Missing required 'code' query parameter in OAuth callback.",
        },
        { status: 400 }
      );
    }
    return NextResponse.redirect(
      new URL(
        `/account?error=${encodeURIComponent("Authorization code was not provided.")}`,
        origin
      )
    );
  }

  try {
    // Retrieve PKCE code_verifier from cookies if set previously during authorization initiation
    const cookieStore = await cookies();
    const codeVerifier = cookieStore.get("shopify_oauth_code_verifier")?.value;

    // 3. Exchange authorization code for access tokens
    const tokens = await exchangeCodeForTokens(code, redirectUri, codeVerifier);

    if (!tokens.access_token) {
      throw new Error("Access token missing in Shopify token response.");
    }

    // 4. Fetch customer profile and order history using Customer Account API
    const customer = await fetchCustomerProfileAndOrders(tokens.access_token);

    // 5. Prepare response (either JSON API response or redirect to customer account dashboard)
    let response: NextResponse;

    if (wantsJson) {
      response = NextResponse.json({
        success: true,
        customer,
        orders: customer.orders?.nodes || [],
        tokens: {
          token_type: tokens.token_type || "Bearer",
          expires_in: tokens.expires_in,
          scope: tokens.scope,
          has_refresh_token: Boolean(tokens.refresh_token),
        },
      });
    } else {
      // Decode return destination from state param if available, or default to /account
      let targetPath = "/account";
      if (state) {
        try {
          const decodedState = decodeURIComponent(state);
          if (decodedState.startsWith("/") && !decodedState.startsWith("//")) {
            targetPath = decodedState;
          }
        } catch {
          targetPath = "/account";
        }
      }
      response = NextResponse.redirect(
        new URL(`${targetPath}?login=success`, origin)
      );
    }

    // 6. Securely set authentication cookies
    const cookieMaxAge = tokens.expires_in || 60 * 60 * 24 * 30; // 30 days default or token expiry

    response.cookies.set("shopify_customer_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: cookieMaxAge,
    });

    if (tokens.id_token) {
      response.cookies.set("shopify_id_token", tokens.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: cookieMaxAge,
      });
    }

    if (tokens.refresh_token) {
      response.cookies.set("shopify_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 90, // 90 days for refresh token
      });
    }

    // Clean up temporary PKCE verifier cookie if used
    if (codeVerifier) {
      response.cookies.delete("shopify_oauth_code_verifier");
    }

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to complete authentication";
    console.error("[Shopify OAuth Callback Error]:", message);

    if (wantsJson) {
      return NextResponse.json(
        {
          success: false,
          error: "auth_callback_failed",
          details: message,
        },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL(`/account?error=${encodeURIComponent(message)}`, origin)
    );
  }
}

/**
 * POST Handler - Allows programmatic token exchange and customer profile retrieval
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = body.code;
    const redirectUri =
      body.redirectUri ||
      process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI ||
      `${request.nextUrl.origin}/api/auth/callback`;
    const codeVerifier = body.codeVerifier;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "missing_code",
          details: "Body parameter 'code' is required.",
        },
        { status: 400 }
      );
    }

    const tokens = await exchangeCodeForTokens(code, redirectUri, codeVerifier);
    const customer = await fetchCustomerProfileAndOrders(tokens.access_token);

    const response = NextResponse.json({
      success: true,
      customer,
      orders: customer.orders?.nodes || [],
      tokens: {
        token_type: tokens.token_type || "Bearer",
        expires_in: tokens.expires_in,
        scope: tokens.scope,
        has_refresh_token: Boolean(tokens.refresh_token),
      },
    });

    const cookieMaxAge = tokens.expires_in || 60 * 60 * 24 * 30;
    response.cookies.set("shopify_customer_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: cookieMaxAge,
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process POST token exchange";
    return NextResponse.json(
      {
        success: false,
        error: "token_exchange_failed",
        details: message,
      },
      { status: 500 }
    );
  }
}
