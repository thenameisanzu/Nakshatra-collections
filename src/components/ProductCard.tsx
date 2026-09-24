"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import { Heart, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
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

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const isPriceRange =
    minPrice.amount !== maxPrice.amount &&
    parseFloat(maxPrice.amount) > parseFloat(minPrice.amount);

  const comparePrice = product.compareAtPriceRange?.minVariantPrice;
  const hasComparePrice =
    comparePrice &&
    parseFloat(comparePrice.amount) > parseFloat(minPrice.amount);

  const formattedPrice = formatPrice(minPrice.amount, minPrice.currencyCode);
  const formattedMaxPrice = isPriceRange
    ? formatPrice(maxPrice.amount, maxPrice.currencyCode)
    : null;
  const formattedComparePrice = hasComparePrice
    ? formatPrice(comparePrice.amount, comparePrice.currencyCode)
    : null;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Product Image Showcase */}
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden block"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full mb-2"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <Sparkles className="h-5 w-5 opacity-60" style={{ color: "var(--accent-gold)" }} />
            </div>
            <span
              className="text-[11px] font-medium tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Nakshatra Jewel
            </span>
          </div>
        )}

        {/* Status / Sale Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!product.availableForSale ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-xs"
              style={{
                backgroundColor: "var(--badge-soldout-bg)",
                color: "var(--badge-soldout-text)",
              }}
            >
              Sold Out
            </span>
          ) : hasComparePrice ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-xs"
              style={{
                backgroundColor: "var(--badge-sale-bg)",
                color: "var(--badge-sale-text)",
              }}
            >
              Sale
            </span>
          ) : null}
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs shadow-xs transition hover:scale-110 active:scale-95"
        style={{ color: isWishlisted ? "#C43D5B" : "#8C7C6F" }}
        aria-label="Save to Wishlist"
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      {/* Details Container */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.handle}`} className="group/title">
          <h3
            className="font-serif-luxury text-base font-semibold transition-colors line-clamp-1 group-hover/title:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {product.description && (
          <p
            className="mt-1 line-clamp-2 text-xs leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {product.description}
          </p>
        )}

        {/* Pricing */}
        <div className="mt-auto pt-4 flex items-baseline justify-between border-t border-black/5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="text-base font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {formattedPrice}
            </span>
            {isPriceRange && formattedMaxPrice && (
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                - {formattedMaxPrice}
              </span>
            )}
            {formattedComparePrice && (
              <span className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                {formattedComparePrice}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="text-[11px] font-semibold tracking-wider uppercase transition hover:underline"
            style={{ color: "var(--accent-cta)" }}
          >
            View &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
