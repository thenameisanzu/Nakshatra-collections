"use client";

import { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, SlidersHorizontal, Sparkles } from "lucide-react";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";
import ProductCard from "./ProductCard";

interface ProductsCatalogViewProps {
  initialProducts: ShopifyProduct[];
  initialCollections: ShopifyCollection[];
  defaultCategory?: string;
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function ProductsCatalogView({
  initialProducts,
  initialCollections,
  defaultCategory = "all",
  pageTitle = "Products",
  pageSubtitle = "Discover our curated collection of premium products",
}: ProductsCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Pre-calculated default categories if collections are empty or loading
  const fallbackCategories = useMemo(
    () => [
      { id: "necklaces", handle: "necklaces", title: "Necklace", count: 128 },
      { id: "bangles", handle: "bangles", title: "Bangles", count: 107 },
      { id: "rings", handle: "rings", title: "Rings", count: 99 },
      { id: "earrings", handle: "earrings", title: "Earrings", count: 44 },
      { id: "bracelets", handle: "bracelets", title: "Bracelets", count: 44 },
      { id: "anklets", handle: "anklets", title: "Anklets", count: 20 },
      { id: "bridal-jewellery", handle: "bridal-jewellery", title: "Traditional Jewellery", count: 64 },
      { id: "ear-cuff", handle: "ear-cuff", title: "Ear Cuff", count: 15 },
      { id: "mens-collections", handle: "mens-collections", title: "Men's Collections", count: 10 },
      { id: "mini-bag", handle: "mini-bag", title: "Mini Bag", count: 1 },
      { id: "jewelry-box", handle: "jewelry-box", title: "Jewelry Box", count: 1 },
    ],
    []
  );

  // Compute categories and dynamic counts accurately from Shopify backend
  const categoriesList = useMemo(() => {
    if (initialCollections && initialCollections.length > 0) {
      return initialCollections.map((col) => {
        const colProductsCount = col.products?.edges?.length || 0;
        const catName = col.title.toLowerCase();
        const catHandle = col.handle.toLowerCase();

        const matchingCount = initialProducts.filter((product) => {
          const type = (product.productType || "").toLowerCase();
          const title = product.title.toLowerCase();
          const tags = (product.tags || []).map((t) => t.toLowerCase());

          if (type.includes(catName) || type.includes(catHandle)) return true;
          if (title.includes(catName) || title.includes(catHandle)) return true;
          if (tags.some((t) => t.includes(catName) || t.includes(catHandle))) return true;

          if (catHandle.includes("bangle") && title.includes("bangle")) return true;
          if (catHandle.includes("ring") && title.includes("ring")) return true;
          if (catHandle.includes("necklace") && title.includes("necklace")) return true;
          if (catHandle.includes("bracelet") && title.includes("bracelet")) return true;
          if (catHandle.includes("anklet") && title.includes("anklet")) return true;
          if (catHandle.includes("ear") && title.includes("earring")) return true;

          return false;
        }).length;

        const count = colProductsCount > 0 ? colProductsCount : matchingCount;

        return {
          id: col.id || col.handle,
          handle: col.handle,
          title: col.title,
          count,
        };
      });
    }
    return fallbackCategories;
  }, [initialCollections, initialProducts, fallbackCategories]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = product.title.toLowerCase().includes(query);
        const typeMatch = (product.productType || "").toLowerCase().includes(query);
        const descMatch = (product.description || "").toLowerCase().includes(query);
        const tagMatch = (product.tags || []).some((tag) => tag.toLowerCase().includes(query));
        if (!titleMatch && !typeMatch && !descMatch && !tagMatch) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== "all") {
        const activeCat = categoriesList.find((c) => c.handle === selectedCategory);
        const catName = activeCat ? activeCat.title.toLowerCase() : selectedCategory.toLowerCase();
        const catHandle = selectedCategory.toLowerCase();

        const type = (product.productType || "").toLowerCase();
        const title = product.title.toLowerCase();
        const tags = (product.tags || []).map((t) => t.toLowerCase());

        const matchesType = type.includes(catName) || type.includes(catHandle);
        const matchesTitle = title.includes(catName) || title.includes(catHandle);
        const matchesTags = tags.some((t) => t.includes(catName) || t.includes(catHandle));

        // Keyword heuristics for artificial jewellery collections (handles both singular and plural)
        if (catHandle.includes("necklace") && (title.includes("necklace") || title.includes("chain") || title.includes("choker") || title.includes("locket") || title.includes("pendant"))) {
          return true;
        }
        if (catHandle.includes("ring") && (title.includes("ring") || title.includes("solitaire"))) {
          return true;
        }
        if (catHandle.includes("bangle") && (title.includes("bangle") || title.includes("kada"))) {
          return true;
        }
        if (catHandle.includes("bracelet") && title.includes("bracelet")) {
          return true;
        }
        if ((catHandle.includes("earring") || catHandle.includes("ear-ring")) && (title.includes("earring") || title.includes("stud") || title.includes("jhumka") || title.includes("drop"))) {
          return true;
        }
        if (catHandle.includes("anklet") && (title.includes("anklet") || title.includes("payal"))) {
          return true;
        }
        if (catHandle.includes("mens") && (title.includes("men") || title.includes("accessories"))) {
          return true;
        }
        if (catHandle.includes("bridal") && (title.includes("bridal") || title.includes("traditional") || title.includes("kerala") || title.includes("set"))) {
          return true;
        }

        if (!matchesType && !matchesTitle && !matchesTags) return false;
      }

      return true;
    });
  }, [initialProducts, searchQuery, selectedCategory, categoriesList]);

  const handleCategorySelect = (handle: string) => {
    startTransition(() => {
      setSelectedCategory(handle);
      setIsMobileFilterOpen(false);
    });
  };

  return (
    <div
      className="min-h-screen py-8 sm:py-12 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* 1. PAGE HEADER (Exact Budget Blings Typography)                   */}
        {/* ================================================================= */}
        <div
          className="mb-8 sm:mb-10 border-b pb-6 sm:pb-8"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight font-serif"
            style={{ color: "var(--text-primary)" }}
          >
            {pageTitle}
          </h1>
          <p
            className="mt-2 text-sm sm:text-base font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            {pageSubtitle}
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-xs placeholder:text-gray-400 focus:outline-none"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium active:scale-95 shrink-0"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Categories</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* 2. SPLIT LAYOUT: SIDEBAR + 4-COLUMN PRODUCT GRID                 */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* --------------------------------------------------------------- */}
          {/* LEFT SIDEBAR: Search + Categories with Item Counts (Sticky Fixed)*/}
          {/* --------------------------------------------------------------- */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pr-1 pb-8">
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-9 py-2.5 rounded-lg border text-sm placeholder:text-gray-400 focus:outline-none transition-colors"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Categories Navigation Header */}
            <div>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em] block mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                CATEGORIES
              </span>

              <div className="space-y-1">
                {/* All Products Pill */}
                <button
                  type="button"
                  onClick={() => handleCategorySelect("all")}
                  className={`w-full text-left py-2 px-4 rounded-full text-sm transition-all cursor-pointer ${
                    selectedCategory === "all"
                      ? "font-semibold shadow-2xs"
                      : "font-normal hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === "all" ? "var(--bg-surface)" : "transparent",
                    color: selectedCategory === "all" ? "var(--accent-cta)" : "var(--text-secondary)",
                    border: `1px solid ${selectedCategory === "all" ? "var(--accent-cta)" : "transparent"}`,
                  }}
                >
                  All Products
                </button>

                {/* Individual Categories with Counts */}
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategory === cat.handle;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.handle)}
                      className={`w-full flex items-center justify-between py-2 px-4 rounded-full text-sm transition-all cursor-pointer text-left ${
                        isSelected
                          ? "font-semibold shadow-2xs"
                          : "font-normal hover:opacity-80"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "var(--bg-surface)" : "transparent",
                        color: isSelected ? "var(--accent-cta)" : "var(--text-secondary)",
                        border: `1px solid ${isSelected ? "var(--accent-cta)" : "transparent"}`,
                      }}
                    >
                      <span className="truncate pr-2">{cat.title}</span>
                      <span
                        className="text-xs font-light shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT CONTENT: Showing Counter + Responsive 4-Column Grid       */}
          {/* --------------------------------------------------------------- */}
          <main className="flex-1 min-w-0 w-full">
            {/* Counter Bar */}
            <div
              className="mb-5 flex items-center justify-between text-xs sm:text-sm font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>
                Showing <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>{filteredProducts.length}</strong> of{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>{initialProducts.length}</strong> products
              </span>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs hover:underline font-medium cursor-pointer"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                className="py-20 text-center flex flex-col items-center justify-center rounded-2xl border"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <Sparkles className="h-8 w-8 mb-3 opacity-60" style={{ color: "var(--accent-gold)" }} />
                <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>No products found</h3>
                <p className="mt-1 text-xs max-w-sm" style={{ color: "var(--text-muted)" }}>
                  We couldn&apos;t find any items matching your search. Try adjusting your search query or selecting another category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  View All Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. MOBILE CATEGORY DRAWER                                           */}
      {/* =================================================================== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div
            className="relative ml-auto w-full max-w-xs h-full p-6 shadow-2xl flex flex-col z-10 overflow-y-auto"
            style={{ backgroundColor: "var(--bg-surface)" }}
          >
            <div
              className="flex items-center justify-between pb-4 border-b"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Filter by Category
              </span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-md text-gray-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-1 flex-1">
              <button
                type="button"
                onClick={() => handleCategorySelect("all")}
                className={`w-full text-left py-2.5 px-4 rounded-full text-sm transition-all ${
                  selectedCategory === "all"
                    ? "font-medium"
                    : ""
                }`}
                style={{
                  backgroundColor: selectedCategory === "all" ? "var(--bg-secondary)" : "transparent",
                  color: selectedCategory === "all" ? "var(--accent-cta)" : "var(--text-secondary)",
                  border: `1px solid ${selectedCategory === "all" ? "var(--accent-cta)" : "transparent"}`,
                }}
              >
                All Products
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.handle)}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-full text-sm transition-all text-left"
                  style={{
                    backgroundColor: selectedCategory === cat.handle ? "var(--bg-secondary)" : "transparent",
                    color: selectedCategory === cat.handle ? "var(--accent-cta)" : "var(--text-secondary)",
                    border: `1px solid ${selectedCategory === cat.handle ? "var(--accent-cta)" : "transparent"}`,
                  }}
                >
                  <span className="truncate pr-2">{cat.title}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

