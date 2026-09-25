"use client";

import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

interface NewArrivalsSectionProps {
  products: ShopifyProduct[];
}

export default function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      id="new-arrivals"
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              05 &bull; New Season 2026
            </span>
            <h2
              className="font-serif-luxury mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              New Arrivals
            </h2>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Fresh additions crafted with contemporary grace and timeless appeal.
            </p>
          </div>

          <Link
            href="/collections/new-arrivals"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline transition-colors shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 5-column responsive compact grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
