"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { ShopifyProduct } from "@/types/shopify";

interface QuickViewContextType {
  product: ShopifyProduct | null;
  isOpen: boolean;
  openQuickView: (product: ShopifyProduct) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (prod: ShopifyProduct) => {
    setProduct(prod);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setTimeout(() => {
      setProduct(null);
    }, 200);
  };

  return (
    <QuickViewContext.Provider
      value={{
        product,
        isOpen,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error("useQuickView must be used within a QuickViewProvider");
  }
  return context;
}
