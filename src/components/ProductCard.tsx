"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickView } from "@/context/QuickViewContext";
import { Heart, Sparkles, Eye } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
  priority?: boolean;
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

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const isWishlisted = isInWishlist(product.id);

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
  const formattedComparePrice = hasComparePrice
    ? formatPrice(comparePrice.amount, comparePrice.currencyCode)
    : null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      handle: product.handle,
      title: product.title,
      price: {
        amount: minPrice.amount,
        currencyCode: minPrice.currencyCode,
      },
      compareAtPrice: comparePrice
        ? {
            amount: comparePrice.amount,
            currencyCode: comparePrice.currencyCode,
          }
        : null,
      imageUrl: product.featuredImage?.url || null,
      imageAlt: product.featuredImage?.altText || product.title,
      productType: product.productType,
      availableForSale: product.availableForSale,
    });
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border card-lift"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-medium)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden block" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Link
          href={`/products/${product.handle}`}
          className="relative h-full w-full block"
          aria-label={`View ${product.title}`}
        >
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center p-3 sm:p-4 img-zoom"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full mb-2 animate-float"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <Sparkles className="h-4 w-4 opacity-70" style={{ color: "var(--accent-gold)" }} />
              </div>
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Nakshatra
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {!product.availableForSale ? (
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider shadow-xs"
                style={{
                  backgroundColor: "var(--badge-soldout-bg)",
                  color: "var(--badge-soldout-text)",
                }}
              >
                Sold Out
              </span>
            ) : hasComparePrice ? (
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider shadow-xs animate-pulse"
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

        {/* Quick View Button (Reveals with smooth slide-up animation) */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out hidden sm:block">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-[11px] font-extrabold uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer liquid-glass-dark text-white border border-white/20 hover:border-amber-300/60 hover:bg-black/90"
          >
            <Eye className="h-3.5 w-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Liquid Glass Heart Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className={`absolute top-2.5 right-2.5 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-75 transition-all duration-300 cursor-pointer ${
          isWishlisted
            ? "text-rose-600 scale-105 opacity-100 shadow-md animate-heart-beat"
            : "text-neutral-600 opacity-90 sm:opacity-80 sm:group-hover:opacity-100 hover:text-rose-600"
        }`}
        aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      >
        <Heart
          className={`h-4 w-4 transition-transform duration-300 ${
            isWishlisted ? "fill-rose-600 stroke-rose-600 scale-110" : "group-hover:scale-110"
          }`}
        />
      </button>

      {/* Details Container */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Category Tag */}
        {product.productType && (
          <span
            className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] mb-1 block line-clamp-1"
            style={{ color: "var(--accent-gold)" }}
          >
            {product.productType}
          </span>
        )}

        <Link href={`/products/${product.handle}`} className="group/title">
          <h3
            className="font-serif text-sm sm:text-base font-medium tracking-normal transition-colors line-clamp-1 group-hover/title:opacity-75"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Pricing & Link */}
        <div className="mt-auto pt-2.5 flex items-baseline justify-between border-t border-black/5 gap-1.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className="text-sm sm:text-base font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {isPriceRange ? `From ${formattedPrice}` : formattedPrice}
            </span>
            {formattedComparePrice && (
              <span className="text-xs line-through font-normal opacity-50" style={{ color: "var(--text-muted)" }}>
                {formattedComparePrice}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="text-[11px] font-medium tracking-widest uppercase transition-opacity hover:opacity-70 shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            View &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
