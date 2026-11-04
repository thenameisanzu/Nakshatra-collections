"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, Filter, Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import { shopifyFetch, GET_COLLECTION_WITH_PRODUCTS_QUERY } from "@/lib/shopify";

interface ClientCollectionViewProps {
  handle: string;
  initialTitle?: string;
  initialDescription?: string;
  initialProducts?: ShopifyProduct[];
}

export default function ClientCollectionView({
  handle,
  initialTitle,
  initialDescription,
  initialProducts = [],
}: ClientCollectionViewProps) {
  const [collectionTitle, setCollectionTitle] = useState(initialTitle || "");
  const [collectionDescription, setCollectionDescription] = useState(initialDescription || "");
  const [products, setProducts] = useState<ShopifyProduct[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Client-Side Live Fetch directly from Shopify Storefront API (Zero Build Minutes Waste)
  useEffect(() => {
    let isMounted = true;

    async function fetchLiveCollection() {
      try {
        const data = await shopifyFetch<{
          collection: {
            id: string;
            title: string;
            description: string;
            products: {
              edges: Array<{
                node: ShopifyProduct;
              }>;
            };
          } | null;
        }>({
          query: GET_COLLECTION_WITH_PRODUCTS_QUERY,
          variables: { handle },
        });

        if (!isMounted) return;

        if (data.collection) {
          setCollectionTitle(data.collection.title);
          setCollectionDescription(data.collection.description);
          const liveProducts = data.collection.products?.edges?.map((e) => e.node) || [];
          if (liveProducts.length > 0) {
            setProducts(liveProducts);
          }
        }
      } catch (err) {
        console.warn("Client live fetch fallback to initial data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchLiveCollection();

    return () => {
      isMounted = false;
    };
  }, [handle]);

  // Extract unique sub-category tags from products (filtering out collection name & common tags)
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    const lowerHandle = handle.toLowerCase();
    const lowerTitle = (collectionTitle || "").toLowerCase();

    products.forEach((product) => {
      (product.tags || []).forEach((rawTag) => {
        const tag = rawTag.trim();
        const lower = tag.toLowerCase();
        if (
          lower &&
          lower !== "all" &&
          lower !== "nakshatra" &&
          lower !== lowerHandle &&
          lower !== lowerTitle
        ) {
          tagsSet.add(tag);
        }
      });
    });

    return Array.from(tagsSet);
  }, [products, handle, collectionTitle]);

  // Instant client-side tag filtering without additional API calls or page reloads
  const filteredProducts = useMemo(() => {
    if (selectedTag === "All") return products;

    const lowerSelected = selectedTag.toLowerCase();
    return products.filter((product) => {
      const tags = (product.tags || []).map((t) => t.toLowerCase());
      const title = product.title.toLowerCase();
      return tags.includes(lowerSelected) || title.includes(lowerSelected);
    });
  }, [products, selectedTag]);

  return (
    <div
      className="min-h-screen py-8 sm:py-12 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:underline">Collections</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold" style={{ color: "var(--accent-cta)" }}>
            {collectionTitle || handle}
          </span>
        </nav>

        {/* Collection Header */}
        <div
          className="mb-8 sm:mb-10 border-b pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-[#C59B4E]">
              <Sparkles className="h-3 w-3" />
              <span>Shopify Verified Collection</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight font-serif"
              style={{ color: "var(--text-primary)" }}
            >
              {collectionTitle || handle}
            </h1>
            <p
              className="mt-2 text-xs sm:text-sm font-light max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {collectionDescription ||
                "Anti-tarnish, 18K real gold plated jewellery crafted for everyday elegance."}
            </p>
          </div>

          <div
            className="text-xs font-mono font-medium tracking-wide uppercase px-3 py-1.5 rounded-full border self-start md:self-auto"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            {filteredProducts.length} Products
          </div>
        </div>

        {/* Sub-Category Pills (Instant Tag Filtering - Horizontally Scrollable) */}
        {availableTags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-3.5 w-3.5 text-[#C59B4E]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                Filter by Style:
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedTag("All")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                  selectedTag === "All"
                    ? "bg-[#241815] text-white shadow-xs"
                    : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200"
                }`}
              >
                All
              </button>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide capitalize transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                    selectedTag === tag
                      ? "bg-[#241815] text-white shadow-xs"
                      : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-stone-500 gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#C59B4E]" />
            <span className="text-xs uppercase tracking-widest font-medium">
              Loading live products from Shopify...
            </span>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id || idx}
                product={product}
                priority={idx < 4}
                className={`reveal-on-scroll-scale stagger-${(idx % 12) + 1}`}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div
            className="rounded-3xl border py-16 px-6 text-center max-w-md mx-auto"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <p className="text-sm font-medium text-stone-800">
              No products found under &ldquo;{selectedTag}&rdquo;
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Try selecting &ldquo;All&rdquo; or explore other collections.
            </p>
            <button
              type="button"
              onClick={() => setSelectedTag("All")}
              className="mt-4 px-5 py-2 rounded-full bg-[#241815] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

