"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  Loader2,
  Crown,
  Heart,
  ShoppingBag,
} from "lucide-react";
import type { ShopifyProduct } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";

interface InstantSearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const POPULAR_SEARCHES = [
  "Bridal Choker",
  "18K Gold Plated",
  "Anti-Tarnish Payal",
  "Kerala Temple Jewellery",
  "AD Solitaire Ring",
  "Jhumkas & Drops",
  "Under 999",
];

const CATEGORY_FILTERS = [
  { id: "all", label: "All Items" },
  { id: "under-999", label: "Under ₹999" },
  { id: "necklaces", label: "Necklaces" },
  { id: "bridal-jewellery", label: "Bridal Sets" },
  { id: "earrings", label: "Earrings" },
  { id: "bangles", label: "Bangles & Cuffs" },
  { id: "rings", label: "Rings" },
];

export default function InstantSearchModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
}: InstantSearchModalProps = {}) {
  const searchCtx = useSearch();
  const isOpen = propIsOpen !== undefined ? propIsOpen : searchCtx.isOpen;
  const onClose = propOnClose || searchCtx.closeSearch;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addingHandle, setAddingHandle] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();


  // Focus input automatically when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Search API fetcher with debounce
  const performSearch = useCallback(async (query: string, category: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append("q", query.trim());

      if (category === "under-999") {
        params.append("maxPrice", "999");
      } else if (category !== "all") {
        params.append("category", category);
      }

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.products)) {
        setResults(data.products);
        setTotalCount(data.totalCount || data.products.length);
      } else {
        setResults([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Instant search failed:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        performSearch(searchQuery, activeCategory);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, isOpen, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleQuickAdd = async (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
    if (!variantId) return;

    setAddingHandle(product.handle);
    try {
      await addItem(variantId, 1);
      openCart();
    } catch (err) {
      console.error("Quick add failed:", err);
    } finally {
      setAddingHandle(null);
    }
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 md:p-6 backdrop-blur-md transition-all animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: "var(--bg-surface-elevated)",
          borderColor: "var(--border-medium)",
        }}
      >
        {/* Search Header Bar */}
        <div
          className="p-4 sm:p-5 border-b flex items-center gap-3 relative"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl shrink-0 border"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
              color: "var(--accent-gold)",
            }}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 18K jewellery, bridal sets, chokers, payals, bangles..."
              className="w-full bg-transparent text-sm sm:text-base font-medium outline-hidden placeholder:text-[var(--text-muted)]"
              style={{ color: "var(--text-primary)" }}
            />
          </form>

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1.5 rounded-full hover:bg-black/5 opacity-60 hover:opacity-100 transition"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center h-8 px-3 rounded-full text-xs font-semibold uppercase tracking-wider transition hover:bg-black/5"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            Esc
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div
          className="px-4 py-2.5 border-b flex items-center gap-2 overflow-x-auto no-scrollbar"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 opacity-70" style={{ color: "var(--accent-gold)" }}>
            <Tag className="h-3 w-3" />
            Filter:
          </span>
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveCategory(filter.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "shadow-xs font-bold"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--accent-cta)" : "var(--bg-secondary)",
                  color: isActive ? "var(--accent-cta-text)" : "var(--text-primary)",
                  border: `1px solid ${isActive ? "var(--accent-cta)" : "var(--border-subtle)"}`,
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {/* Popular Search Suggestions (when input is empty) */}
          {!searchQuery.trim() && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Popular Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium transition hover:scale-105 active:scale-95 border cursor-pointer"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-1.5"
                style={{ color: "var(--accent-gold)" }}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {searchQuery.trim()
                  ? `Search Results (${totalCount})`
                  : `Curated Highlights`}
              </span>

              {results.length > 0 && searchQuery.trim() && (
                <Link
                  href={`/collections?q=${encodeURIComponent(searchQuery.trim())}`}
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                  style={{ color: "var(--accent-cta)" }}
                >
                  <span>View Full Catalogue</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>

            {results.length === 0 && !isLoading ? (
              <div
                className="rounded-2xl border border-dashed p-8 text-center"
                style={{ borderColor: "var(--border-medium)" }}
              >
                <Crown className="h-8 w-8 mx-auto mb-2 opacity-40" style={{ color: "var(--accent-gold)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  No jewellery found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs mt-1 opacity-70" style={{ color: "var(--text-secondary)" }}>
                  Try searching for necklaces, bridal chokers, jhumkas, payals or rings.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: "var(--accent-cta)",
                      color: "var(--accent-cta-text)",
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {results.map((product) => {
                  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
                  const comparePrice = product.compareAtPriceRange?.minVariantPrice?.amount
                    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
                    : null;
                  const hasDiscount = comparePrice && comparePrice > minPrice;
                  const discountPercent = hasDiscount
                    ? Math.round(((comparePrice - minPrice) / comparePrice) * 100)
                    : null;
                  const isSaved = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 hover:shadow-md card-lift"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/products/${product.handle}`}
                        onClick={onClose}
                        className="relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 rounded-xl overflow-hidden border bg-neutral-100"
                        style={{ borderColor: "var(--border-subtle)" }}
                      >
                        {product.featuredImage?.url ? (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-108 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs opacity-40">
                            Nakshatra
                          </div>
                        )}
                        {discountPercent && (
                          <span
                            className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold leading-none text-white shadow-xs"
                            style={{ backgroundColor: "var(--accent-cta)" }}
                          >
                            -{discountPercent}%
                          </span>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 pr-1">
                        <span
                          className="block text-[9.5px] font-bold uppercase tracking-wider line-clamp-1 opacity-70"
                          style={{ color: "var(--accent-gold)" }}
                        >
                          {product.productType || "18K Gold Plated"}
                        </span>
                        <Link
                          href={`/products/${product.handle}`}
                          onClick={onClose}
                          className="block text-xs sm:text-sm font-medium leading-tight line-clamp-1 hover:underline"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {product.title}
                        </Link>

                        {/* Price */}
                        <div className="mt-1 flex items-baseline gap-2">
                          <span
                            className="text-xs sm:text-sm font-bold"
                            style={{ color: "var(--accent-cta)" }}
                          >
                            {formatPrice(minPrice)}
                          </span>
                          {comparePrice && hasDiscount && (
                            <span
                              className="text-[11px] line-through opacity-50"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {formatPrice(comparePrice)}
                            </span>
                          )}
                        </div>

                        {/* Quick action badges */}
                        <div className="mt-2 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(e, product)}
                            disabled={addingHandle === product.handle}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition active:scale-95 text-white"
                            style={{ backgroundColor: "var(--accent-cta)" }}
                          >
                            {addingHandle === product.handle ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <ShoppingBag className="h-3 w-3" />
                            )}
                            <span>+ Bag</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist({
                                id: product.id,
                                handle: product.handle,
                                title: product.title,
                                price: {
                                  amount: String(minPrice),
                                  currencyCode: product.priceRange.minVariantPrice.currencyCode || "INR",
                                },
                                compareAtPrice: comparePrice
                                  ? {
                                      amount: String(comparePrice),
                                      currencyCode: product.priceRange.minVariantPrice.currencyCode || "INR",
                                    }
                                  : null,
                                imageUrl: product.featuredImage?.url || null,
                                productType: product.productType || undefined,
                              });
                            }}
                            className="p-1 rounded-lg border hover:bg-black/5 transition active:scale-90"
                            style={{ borderColor: "var(--border-subtle)" }}
                            aria-label="Toggle Wishlist"
                          >

                            <Heart
                              className={`h-3.5 w-3.5 ${
                                isSaved ? "fill-rose-600 text-rose-600" : "text-neutral-400"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Search Modal Footer */}
        <div
          className="p-3 sm:p-4 border-t flex items-center justify-between text-xs"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <span className="text-[11px] opacity-70" style={{ color: "var(--text-secondary)" }}>
            ⚡ 100% Anti-Tarnish &bull; Kerala Express Dispatch
          </span>
          {results.length > 0 && (
            <Link
              href={
                searchQuery.trim()
                  ? `/collections?q=${encodeURIComponent(searchQuery.trim())}`
                  : `/collections`
              }
              onClick={onClose}
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
              style={{ color: "var(--accent-cta)" }}
            >
              <span>View All Results</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
