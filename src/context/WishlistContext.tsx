"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

export interface WishlistItem {
  id: string;
  handle: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  productType?: string;
  availableForSale?: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  isLoaded: boolean;
  totalWishlistItems: number;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WISHLIST_STORAGE_KEY = "nakshatra_wishlist_items";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on client mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            // Filter out any corrupted or malformed entries
            const validItems = parsed.filter(
              (item): item is WishlistItem =>
                item &&
                typeof item === "object" &&
                typeof item.id === "string" &&
                typeof item.handle === "string" &&
                typeof item.title === "string"
            );
            setItems(validItems);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load wishlist from localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage whenever items change after initial load
  const saveToStorage = useCallback((updatedItems: WishlistItem[]) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedItems));
      }
    } catch (err) {
      console.error("Failed to save wishlist to localStorage:", err);
    }
  }, []);

  const isInWishlist = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id);
    },
    [items]
  );

  const addToWishlist = useCallback(
    (item: WishlistItem) => {
      setItems((prev) => {
        if (prev.some((existing) => existing.id === item.id)) {
          return prev;
        }
        const updated = [item, ...prev];
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const removeFromWishlist = useCallback(
    (id: string) => {
      setItems((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      setItems((prev) => {
        const exists = prev.some((existing) => existing.id === item.id);
        const updated = exists
          ? prev.filter((existing) => existing.id !== item.id)
          : [item, ...prev];
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, [saveToStorage]);

  const totalWishlistItems = useMemo(() => items.length, [items.length]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isLoaded,
        totalWishlistItems,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
