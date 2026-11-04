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

  // Compute categories and dynamic counts
  const categoriesList = useMemo(() => {
    if (initialCollections && initialCollections.length > 0) {
      return initialCollections.map((col) => {
        const productCount =
          col.products?.edges?.length ||
          initialProducts.filter((p) => {
            const type = (p.productType || "").toLowerCase();
            const colTitle = col.title.toLowerCase();
            const colHandle = col.handle.toLowerCase();
            return type.includes(colTitle) || type.includes(colHandle);
          }).length ||
          24;

        return {
          id: col.id || col.handle,
          handle: col.handle,
          title: col.title,
          count: productCount,
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

        // Keyword heuristics for artificial jewellery collections
        if (catHandle === "necklaces" && (title.includes("necklace") || title.includes("chain") || title.includes("choker") || title.includes("locket") || title.includes("pendant"))) {
          return true;
        }
        if (catHandle === "rings" && (title.includes("ring") || title.includes("solitaire"))) {
          return true;
        }
        if (catHandle === "bangles" && (title.includes("bangle") || title.includes("kada"))) {
          return true;
        }
        if (catHandle === "earrings" && (title.includes("earring") || title.includes("stud") || title.includes("jhumka") || title.includes("drop"))) {
          return true;
        }
        if (catHandle === "anklets" && (title.includes("anklet") || title.includes("payal"))) {
          return true;
        }
        if (catHandle === "bridal-jewellery" && (title.includes("bridal") || title.includes("traditional") || title.includes("kerala") || title.includes("set"))) {
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
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* 1. PAGE HEADER (Exact Budget Blings Typography)                   */}
        {/* ================================================================= */}
        <div className="mb-8 sm:mb-10 border-b border-gray-100 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-gray-900 font-serif">
            {pageTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 font-light">
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
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 bg-white"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 bg-white active:scale-95 shrink-0"
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
                className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 bg-white transition-colors"
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
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">
                CATEGORIES
              </span>

              <div className="space-y-1">
                {/* All Products Pill */}
                <button
                  type="button"
                  onClick={() => handleCategorySelect("all")}
                  className={`w-full text-left py-2 px-4 rounded-full text-sm transition-all cursor-pointer ${
                    selectedCategory === "all"
                      ? "border border-[#2B0E14] text-[#2B0E14] font-medium bg-white"
                      : "text-gray-600 hover:text-black font-normal"
                  }`}
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
                          ? "border border-[#2B0E14] text-[#2B0E14] font-medium bg-white"
                          : "text-gray-600 hover:text-black font-normal"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.title}</span>
                      <span className="text-xs text-gray-400 font-light shrink-0">
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
            <div className="mb-5 flex items-center justify-between text-xs sm:text-sm text-gray-500 font-light">
              <span>
                Showing <strong className="font-semibold text-gray-900">{filteredProducts.length}</strong> of{" "}
                <strong className="font-semibold text-gray-900">{initialProducts.length}</strong> products
              </span>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs text-amber-800 hover:underline font-medium cursor-pointer"
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
              <div className="py-20 text-center flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-[#FAFAFA]">
                <Sparkles className="h-8 w-8 text-amber-600 mb-3 opacity-60" />
                <h3 className="text-base font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-xs text-gray-500 max-w-sm">
                  We couldn&apos;t find any items matching your search. Try adjusting your search query or selecting another category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-colors"
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
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
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
                    ? "border border-[#2B0E14] text-[#2B0E14] font-medium"
                    : "text-gray-600"
                }`}
              >
                All Products
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.handle)}
                  className={`w-full flex items-center justify-between py-2.5 px-4 rounded-full text-sm transition-all text-left ${
                    selectedCategory === cat.handle
                      ? "border border-[#2B0E14] text-[#2B0E14] font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <span className="truncate pr-2">{cat.title}</span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

