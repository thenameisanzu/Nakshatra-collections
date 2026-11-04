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
      className="py-10 sm:py-14 border-t border-gray-100 bg-white"
      aria-label="Bestselling Jewellery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Super clean & minimal) */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 mb-1">
            <Sparkles className="h-3 w-3 text-amber-600" />
            18K GOLD PLATED
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-gray-900">
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
            />
          ))}
        </div>

        {/* Minimal Bottom CTA Button */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white text-gray-900 border border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-2xs"
          >
            <span>View All ({products.length > 8 ? "30+" : products.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
