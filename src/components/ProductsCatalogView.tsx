"use client";

import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  ArrowUpDown,
  Check,
  RotateCcw,
} from "lucide-react";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";
import ProductCard from "./ProductCard";

interface ProductsCatalogViewProps {
  initialProducts: ShopifyProduct[];
  initialCollections: ShopifyCollection[];
  defaultCategory?: string;
  pageTitle?: string;
  pageSubtitle?: string;
}

type SortOption = "featured" | "price-low" | "price-high" | "title-asc";

export default function ProductsCatalogView({
  initialProducts,
  initialCollections,
  defaultCategory = "all",
  pageTitle = "Products",
  pageSubtitle = "Discover our curated collection of premium anti-tarnish jewellery",
}: ProductsCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
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
      { id: "mens-accessories", handle: "mens-accessories", title: "Men's Accessories", count: 10 },
    ],
    []
  );

  // Compute categories and dynamic counts accurately from Shopify backend
  const categoriesList = useMemo(() => {
    if (initialCollections && initialCollections.length > 0) {
      const seenNames = new Set<string>();

      return initialCollections
        .map((col) => {
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
          const cleanTitle = col.title.toLowerCase() === "ear rings" ? "Earrings" : col.title;

          return {
            id: col.id || col.handle,
            handle: col.handle,
            title: cleanTitle,
            count,
          };
        })
        .filter((cat) => {
          // Hide empty collections with 0 products
          if (cat.count === 0) return false;
          // Deduplicate collections with the same normalized name
          const norm = cat.title.toLowerCase().replace(/[\s-_]/g, "");
          if (seenNames.has(norm)) return false;
          seenNames.add(norm);
          return true;
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
        if (
          catHandle.includes("necklace") &&
          (title.includes("necklace") || title.includes("chain") || title.includes("choker") || title.includes("locket") || title.includes("pendant"))
        ) {
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
        if (
          (catHandle.includes("earring") || catHandle.includes("ear-ring")) &&
          (title.includes("earring") || title.includes("stud") || title.includes("jhumka") || title.includes("drop"))
        ) {
          return true;
        }
        if (catHandle.includes("anklet") && (title.includes("anklet") || title.includes("payal"))) {
          return true;
        }
        if (catHandle.includes("mens") && (title.includes("men") || title.includes("accessories"))) {
          return true;
        }
        if (
          catHandle.includes("bridal") &&
          (title.includes("bridal") || title.includes("traditional") || title.includes("kerala") || title.includes("set"))
        ) {
          return true;
        }

        if (!matchesType && !matchesTitle && !matchesTags) return false;
      }

      return true;
    });
  }, [initialProducts, searchQuery, selectedCategory, categoriesList]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      list.sort((a, b) => {
        const pA = parseFloat(a.priceRange?.minVariantPrice?.amount || "0");
        const pB = parseFloat(b.priceRange?.minVariantPrice?.amount || "0");
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      list.sort((a, b) => {
        const pA = parseFloat(a.priceRange?.minVariantPrice?.amount || "0");
        const pB = parseFloat(b.priceRange?.minVariantPrice?.amount || "0");
        return pB - pA;
      });
    } else if (sortBy === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const handleCategorySelect = (handle: string) => {
    startTransition(() => {
      setSelectedCategory(handle);
      setIsMobileFilterOpen(false);
    });
  };

  const activeCategoryTitle = useMemo(() => {
    if (selectedCategory === "all") return "All Jewellery";
    const found = categoriesList.find((c) => c.handle === selectedCategory);
    return found ? found.title : selectedCategory;
  }, [selectedCategory, categoriesList]);

  const activeFiltersCount = (selectedCategory !== "all" ? 1 : 0) + (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
  };

  return (
    <div
      className="min-h-screen py-6 sm:py-10 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* 1. COMPACT ELEGANT HEADER & BREADCRUMBS                            */}
        {/* ================================================================= */}
        <div className="mb-6 sm:mb-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-light">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">Collections</span>
            {selectedCategory !== "all" && (
              <>
                <span>/</span>
                <span className="text-[#C59B4E] font-medium">{activeCategoryTitle}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C59B4E] mb-1">
                <Sparkles className="h-3 w-3 text-[#C59B4E]" />
                18K GOLD PLATED ATELIER
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-stone-950">
                {selectedCategory === "all" ? pageTitle : activeCategoryTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 font-light max-w-md">
              {pageSubtitle}
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. SMART RESPONSIVE CATEGORY PILLS BAR (Mobile, iPad & Desktop)   */}
        {/* Horizontal scroll with touch support and smooth pills             */}
        {/* ================================================================= */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {/* All Products Pill */}
            <button
              type="button"
              onClick={() => handleCategorySelect("all")}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#241815] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-50 hover:border-stone-300"
              }`}
            >
              <span>All Products</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === "all" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                }`}
              >
                {initialProducts.length}
              </span>
            </button>

            {/* Individual Categories */}
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.handle;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.handle)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-[#241815] text-white shadow-xs"
                      : "bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-50 hover:border-stone-300"
                  }`}
                >
                  <span>{cat.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. TOOLBAR: SEARCH, SORT & FILTER DRAWER TRIGGER (Mobile & iPad) */}
        {/* ================================================================= */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          {/* Search Input Box */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery, rings, bangles..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200/70 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#C59B4E] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Dropdown */}
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-stone-50 border border-stone-200/70 rounded-xl pl-3 pr-8 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 cursor-pointer focus:outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-asc">Alphabetical (A - Z)</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-500 pointer-events-none" />
            </div>

            {/* Mobile / Tablet Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200/70 text-xs font-semibold text-stone-800 hover:bg-stone-100 active:scale-95 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#C59B4E]" />
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span className="h-4 w-4 rounded-full bg-[#241815] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filters Pill Bar (if any active) */}
        {(selectedCategory !== "all" || searchQuery.trim()) && (
          <div className="mb-6 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-stone-500 font-light">Active filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-800 font-medium">
                Category: {activeCategoryTitle}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="hover:text-rose-600 ml-0.5"
                  aria-label="Clear category"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-800 font-medium">
                Search: &ldquo;{searchQuery}&rdquo;
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:text-rose-600 ml-0.5"
                  aria-label="Clear search query"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-[#C59B4E] hover:underline text-xs font-semibold ml-1 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset all
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* 4. SPLIT LAYOUT: DESKTOP SIDEBAR + RESPONSIVE GRID                */}
        {/* Optimized for:                                                    */}
        {/*   • Mobile (< 640px): 2 Columns                                  */}
        {/*   • iPad / Tablet (640px - 1024px): 3 Columns                    */}
        {/*   • Desktop (1024px+): Left Sticky Sidebar + 3/4 Columns          */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* --------------------------------------------------------------- */}
          {/* LEFT SIDEBAR (Desktop only - 1024px+)                           */}
          {/* --------------------------------------------------------------- */}
          <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start space-y-6 bg-white p-5 rounded-2xl border border-stone-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B4E] block mb-3">
                CATEGORIES
              </span>

              <div className="space-y-1">
                {/* All Products */}
                <button
                  type="button"
                  onClick={() => handleCategorySelect("all")}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                    selectedCategory === "all"
                      ? "bg-[#241815] text-white shadow-2xs"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <span>All Products</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === "all" ? "bg-white/20 text-white" : "text-stone-400"
                    }`}
                  >
                    {initialProducts.length}
                  </span>
                </button>

                {/* Categories */}
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategory === cat.handle;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.handle)}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                        isSelected
                          ? "bg-[#241815] text-white shadow-2xs"
                          : "text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? "bg-white/20 text-white" : "text-stone-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Assurance Box */}
            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 space-y-2 font-light">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Anti-Tarnish Lifetime Polish</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>100% Waterproof &amp; Sweatproof</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Cash on Delivery Available</span>
              </div>
            </div>
          </aside>

          {/* --------------------------------------------------------------- */}
          {/* MAIN PRODUCT GRID (Mobile 2-col, iPad 3-col, Desktop 3/4-col)   */}
          {/* --------------------------------------------------------------- */}
          <main className="flex-1 min-w-0 w-full">
            {/* Results Count Header */}
            <div className="mb-4 flex items-center justify-between text-xs text-stone-500 font-light">
              <span>
                Showing <strong className="font-semibold text-stone-900">{sortedProducts.length}</strong> of{" "}
                <strong className="font-semibold text-stone-900">{initialProducts.length}</strong> items
              </span>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {sortedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={`reveal-on-scroll-scale stagger-${(idx % 12) + 1}`}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-16 sm:py-24 text-center flex flex-col items-center justify-center rounded-3xl bg-white border border-stone-200/80 p-8">
                <div className="h-12 w-12 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-[#C59B4E]" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-stone-900">
                  No matching jewellery found
                </h3>
                <p className="mt-1 text-xs text-stone-500 max-w-sm">
                  We couldn&apos;t find any items matching your filters. Try selecting &ldquo;All Products&rdquo; or clearing your search.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-5 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#241815] hover:bg-black transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  View All Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. MOBILE & IPAD FILTER DRAWER (SLIDE-OVER SHEET)                   */}
      {/* =================================================================== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm h-full bg-white p-6 shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B4E]">
                  FILTER &amp; SORT
                </span>
                <h3 className="text-base font-semibold text-stone-900">Catalogue Filters</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="py-5 space-y-6 flex-1">
              {/* Sort By Section */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                  Sort Order
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "featured", label: "Featured" },
                    { id: "price-low", label: "Price: Low to High" },
                    { id: "price-high", label: "Price: High to Low" },
                    { id: "title-asc", label: "Alphabetical (A-Z)" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSortBy(option.id as SortOption)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium text-left border transition-all ${
                        sortBy === option.id
                          ? "bg-[#241815] text-white border-[#241815]"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collections Section */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                  Categories
                </label>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect("all")}
                    className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === "all"
                        ? "bg-[#241815] text-white shadow-xs"
                        : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span>All Products</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        selectedCategory === "all" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {initialProducts.length}
                    </span>
                  </button>
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.handle;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategorySelect(cat.handle)}
                        className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#241815] text-white shadow-xs"
                            : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        <span className="truncate pr-2">{cat.title}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isSelected ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#241815] text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
