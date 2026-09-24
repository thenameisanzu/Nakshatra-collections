"use client";

import Link from "next/link";
import Image from "next/image";
import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight, Gem } from "lucide-react";

interface FeaturedJewelleryProps {
  products: ShopifyProduct[];
}

function formatPrice(amount: string, currencyCode: string): string {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) return `${currencyCode} ${amount}`;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(parsed);
  } catch {
    return `${currencyCode} ${parsed.toFixed(0)}`;
  }
}

export default function FeaturedJewellery({ products }: FeaturedJewelleryProps) {
  if (!products || products.length === 0) return null;

  const heroFeatured = products[0];
  const supportingProducts = products.slice(1, 4);

  const heroPrice = formatPrice(
    heroFeatured.priceRange.minVariantPrice.amount,
    heroFeatured.priceRange.minVariantPrice.currencyCode
  );

  return (
    <section
      id="featured-showcase"
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              03 &bull; Featured Creations
            </span>
            <h2
              className="font-serif-luxury mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Atelier Masterpieces
            </h2>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Exemplary craftsmanship, rare aesthetics, and luminous stones curated for discerning connoisseurs.
            </p>
          </div>

          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline transition-colors shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>Explore All Creations</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Editorial Layout: Large Spotlight + Supporting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Spotlight Masterpiece Card (Span 6) */}
          <div
            className="group relative lg:col-span-6 rounded-3xl overflow-hidden border p-6 sm:p-10 flex flex-col justify-between shadow-xl transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            {/* Top Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                style={{ color: "var(--accent-gold)" }}
              >
                <Gem className="h-3.5 w-3.5" />
                Spotlight Creation
              </span>
              <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--text-muted)" }}>
                {heroFeatured.productType || "Bespoke Atelier"}
              </span>
            </div>

            {/* Product Centerpiece Visual */}
            <Link
              href={`/products/${heroFeatured.handle}`}
              className="relative my-6 aspect-square w-full max-w-md mx-auto block overflow-hidden"
            >
              {heroFeatured.featuredImage ? (
                <Image
                  src={heroFeatured.featuredImage.url}
                  alt={heroFeatured.featuredImage.altText || heroFeatured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : null}
            </Link>

            {/* Bottom Card Summary */}
            <div className="relative z-10 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Link href={`/products/${heroFeatured.handle}`}>
                    <h3
                      className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-wide hover:underline"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {heroFeatured.title}
                    </h3>
                  </Link>
                  <p className="text-base font-bold mt-1" style={{ color: "var(--accent-cta)" }}>
                    {heroPrice}
                  </p>
                </div>

                <Link
                  href={`/products/${heroFeatured.handle}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
                  style={{
                    backgroundColor: "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  <span>Acquire Piece</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Supporting Products Grid (Span 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
            {supportingProducts.map((p, idx) => (
              <div key={p.id} className={idx === 2 ? "sm:col-span-2 lg:col-span-2" : ""}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
