"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ShopifyCart } from "@/types/shopify";

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
  totalQuantity: number;
}

const CART_STORAGE_KEY = "shopify_storefront_cart_id";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    async function loadCart() {
      try {
        const storedCartId = typeof window !== "undefined" ? localStorage.getItem(CART_STORAGE_KEY) : null;
        if (!storedCartId) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`/api/cart?cartId=${encodeURIComponent(storedCartId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.cart) {
            setCart(data.cart);
          } else {
            // Expired or invalid cart in Shopify
            localStorage.removeItem(CART_STORAGE_KEY);
          }
        }
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsUpdating(true);
      setError(null);
      try {
        const storedCartId = cart?.id || (typeof window !== "undefined" ? localStorage.getItem(CART_STORAGE_KEY) : null);

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: storedCartId ? "add" : "create",
            cartId: storedCartId,
            lines: [{ merchandiseId: variantId, quantity }],
          }),
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to add item to cart");
        }

        setCart(data.cart);
        if (data.cart?.id) {
          localStorage.setItem(CART_STORAGE_KEY, data.cart.id);
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
    [cart?.id]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsUpdating(true);
      setError(null);

      try {
        if (quantity <= 0) {
          return await removeItem(lineId);
        }

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            cartId: cart.id,
            lines: [{ id: lineId, quantity }],
          }),
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to update item quantity");
        }

        setCart(data.cart);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error updating item quantity";
        setError(message);
        console.error(err);
      } finally {
        setIsUpdating(false);
      }
    },
    [cart?.id]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsUpdating(true);
      setError(null);

      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            cartId: cart.id,
            lineIds: [lineId],
          }),
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to remove item from cart");
        }

        setCart(data.cart);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error removing item from cart";
        setError(message);
        console.error(err);
      } finally {
        setIsUpdating(false);
      }
    },
    [cart?.id]
  );

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
