"use client";

import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedJewelleryProps {
  products: ShopifyProduct[];
}

export default function FeaturedJewellery({ products }: FeaturedJewelleryProps) {
  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, 8);

  return (
    <section
      id="featured-showcase"
      className="py-10 sm:py-14 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Bestselling Jewellery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Super clean & minimal) */}
        <div className="text-center mb-6 sm:mb-8 reveal-on-scroll">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] mb-1"
            style={{ color: "var(--accent-gold)" }}
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
            18K GOLD PLATED
          </span>
          <h2
            className="text-2xl sm:text-3xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Bestsellers
          </h2>
        </div>

        {/* Clean 2-Column Mobile / 4-Column Desktop Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {displayProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
              className={`reveal-on-scroll-scale stagger-${(idx % 12) + 1}`}
            />
          ))}
        </div>

        {/* Minimal Bottom CTA Button */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center reveal-on-scroll">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all duration-200 active:scale-95 shadow-2xs hover:opacity-90"
            style={{
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              borderColor: "var(--border-medium)",
            }}
          >
            <span>View All Products ({products.length > 8 ? "30+" : products.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
