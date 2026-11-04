"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ShopifyCart } from "@/types/shopify";
import { shopifyFetch, createCheckoutSession } from "@/lib/shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => Promise<void>;
  totalQuantity: number;
}

const CART_STORAGE_KEY = "shopify_storefront_cart_id";
const CART_DATA_CACHE_KEY = "shopify_storefront_cart_data";

const CART_FRAGMENT = `
  fragment CartDetails on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 50) {
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
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
`;

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartDetails
    }
  }
  ${CART_FRAGMENT}
`;

const CART_CREATE_MUTATION = `
  mutation createCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_ADD_MUTATION = `
  mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveCartLocally = useCallback((cartData: ShopifyCart | null) => {
    setCart(cartData);
    if (typeof window !== "undefined") {
      if (cartData?.id) {
        localStorage.setItem(CART_STORAGE_KEY, cartData.id);
        try {
          localStorage.setItem(CART_DATA_CACHE_KEY, JSON.stringify(cartData));
        } catch {}
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(CART_DATA_CACHE_KEY);
      }
    }
  }, []);

  // Initialize cart from localStorage on mount (Client-Side, zero serverless invocations)
  useEffect(() => {
    async function loadCart() {
      try {
        if (typeof window === "undefined") return;

        // Instant local cache restore
        const cachedCart = localStorage.getItem(CART_DATA_CACHE_KEY);
        if (cachedCart) {
          try {
            setCart(JSON.parse(cachedCart));
          } catch {}
        }

        const storedCartId = localStorage.getItem(CART_STORAGE_KEY);
        if (!storedCartId) {
          setIsLoading(false);
          return;
        }

        // Validate & fetch fresh state directly from Shopify Storefront API
        const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
          query: GET_CART_QUERY,
          variables: { cartId: storedCartId },
        });

        if (data.cart) {
          saveCartLocally(data.cart);
        } else {
          saveCartLocally(null);
        }
      } catch (err) {
        console.warn("Could not verify cart with Shopify, using local cache:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, [saveCartLocally]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsUpdating(true);
      setError(null);
      try {
        const storedCartId = cart?.id || (typeof window !== "undefined" ? localStorage.getItem(CART_STORAGE_KEY) : null);

        if (storedCartId) {
          const data = await shopifyFetch<{
            cartLinesAdd: {
              cart: ShopifyCart | null;
              userErrors: Array<{ field: string[]; message: string }>;
            };
          }>({
            query: CART_LINES_ADD_MUTATION,
            variables: {
              cartId: storedCartId,
              lines: [{ merchandiseId: variantId, quantity }],
            },
          });

          if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
            throw new Error(data.cartLinesAdd.userErrors[0].message);
          }

          if (data.cartLinesAdd.cart) {
            saveCartLocally(data.cartLinesAdd.cart);
          }
        } else {
          // Create new cart directly in Shopify Storefront API
          const data = await shopifyFetch<{
            cartCreate: {
              cart: ShopifyCart | null;
              userErrors: Array<{ field: string[]; message: string }>;
            };
          }>({
            query: CART_CREATE_MUTATION,
            variables: {
              lines: [{ merchandiseId: variantId, quantity }],
            },
          });

          if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
            throw new Error(data.cartCreate.userErrors[0].message);
          }

          if (data.cartCreate.cart) {
            saveCartLocally(data.cartCreate.cart);
          }
        }

        setIsOpen(true);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error adding item to cart";
        setError(message);
        console.error(err);
      } finally {
        setIsUpdating(false);
      }
    },
    [cart, saveCartLocally]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      const currentCartId = cart?.id || (typeof window !== "undefined" ? localStorage.getItem(CART_STORAGE_KEY) : null);
      if (!currentCartId) return;

      setIsUpdating(true);
      setError(null);

      try {
        if (quantity <= 0) {
          const data = await shopifyFetch<{
            cartLinesRemove: {
              cart: ShopifyCart | null;
              userErrors: Array<{ field: string[]; message: string }>;
            };
          }>({
            query: CART_LINES_REMOVE_MUTATION,
            variables: { cartId: currentCartId, lineIds: [lineId] },
          });
          if (data.cartLinesRemove.cart) saveCartLocally(data.cartLinesRemove.cart);
          return;
        }

        const data = await shopifyFetch<{
          cartLinesUpdate: {
            cart: ShopifyCart | null;
            userErrors: Array<{ field: string[]; message: string }>;
          };
        }>({
          query: CART_LINES_UPDATE_MUTATION,
          variables: {
            cartId: currentCartId,
            lines: [{ id: lineId, quantity }],
          },
        });

        if (data.cartLinesUpdate.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
          throw new Error(data.cartLinesUpdate.userErrors[0].message);
        }

        if (data.cartLinesUpdate.cart) {
          saveCartLocally(data.cartLinesUpdate.cart);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error updating item quantity";
        setError(message);
        console.error(err);
      } finally {
        setIsUpdating(false);
      }
    },
    [cart, saveCartLocally]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      await updateItem(lineId, 0);
    },
    [updateItem]
  );

  const checkout = useCallback(async () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
      return;
    }

    const lines =
      cart?.lines.edges.map((e) => ({
        merchandiseId: e.node.merchandise.id,
        quantity: e.node.quantity,
      })) || [];

    if (lines.length === 0) return;

    const session = await createCheckoutSession(lines);
    if (session?.checkoutUrl) {
      window.location.href = session.checkoutUrl;
    }
  }, [cart]);

  const totalQuantity = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        isUpdating,
        error,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateItem,
        removeItem,
        checkout,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
