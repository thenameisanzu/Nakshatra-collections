"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight, Flame } from "lucide-react";

interface FeaturedJewelleryProps {
  products: ShopifyProduct[];
}

const filterTabs = [
  { id: "all", label: "All Bestsellers" },
  { id: "necklaces", label: "Necklaces & Sets" },
  { id: "earrings", label: "Earrings & Studs" },
  { id: "rings", label: "Rings & Bangles" },
];

export default function FeaturedJewellery({ products }: FeaturedJewelleryProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    if (activeTab === "all") return products.slice(0, 8);

    if (activeTab === "necklaces") {
      const matched = products.filter(
        (p) =>
          p.productType?.toLowerCase().includes("necklace") ||
          p.title.toLowerCase().includes("necklace") ||
          p.title.toLowerCase().includes("choker") ||
          p.title.toLowerCase().includes("set")
      );
      return matched.length > 0 ? matched.slice(0, 8) : products.slice(0, 8);
    }

    if (activeTab === "earrings") {
      const matched = products.filter(
        (p) =>
          p.productType?.toLowerCase().includes("earring") ||
          p.title.toLowerCase().includes("earring") ||
          p.title.toLowerCase().includes("stud") ||
          p.title.toLowerCase().includes("jhumka")
      );
      return matched.length > 0 ? matched.slice(0, 8) : products.slice(0, 8);
    }

    if (activeTab === "rings") {
      const matched = products.filter(
        (p) =>
          p.productType?.toLowerCase().includes("ring") ||
          p.productType?.toLowerCase().includes("bangle") ||
          p.title.toLowerCase().includes("ring") ||
          p.title.toLowerCase().includes("bangle") ||
          p.title.toLowerCase().includes("cuff")
      );
      return matched.length > 0 ? matched.slice(0, 8) : products.slice(0, 8);
    }

    return products.slice(0, 8);
  }, [products, activeTab]);

  if (!products || products.length === 0) return null;

  return (
    <section
      id="featured-showcase"
      className="py-14 sm:py-20 md:py-24 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Customer Favorites"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] border shadow-2xs"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--accent-cta)",
                }}
              >
                <Flame className="h-3.5 w-3.5 text-rose-500" />
                Trending Bestsellers
              </span>
            </div>

            <h2
              className="font-serif mt-2.5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Customer Favorites
            </h2>

            <p
              className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Hand-picked 18K gold-plated designs celebrated for their authentic real gold lustre, anti-tarnish finish, and everyday grace.
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 self-start md:self-auto">
            {filterTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "shadow-sm scale-105"
                      : "border liquid-glass hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: isSelected ? "var(--accent-cta)" : "var(--bg-surface)",
                    color: isSelected ? "var(--accent-cta-text)" : "var(--text-secondary)",
                    borderColor: isSelected ? "transparent" : "var(--border-medium)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Balanced 4-Column E-Commerce Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-7">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>

        {/* Bottom CTA to explore all collections */}
        <div className="mt-10 sm:mt-14 flex items-center justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest border liquid-glass transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
              color: "var(--accent-cta)",
            }}
          >
            <span>Explore All 8 Collections</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
