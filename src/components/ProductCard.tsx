"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Sparkles } from "lucide-react";

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
  const formattedMaxPrice = isPriceRange
    ? formatPrice(maxPrice.amount, maxPrice.currencyCode)
    : null;
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
      className="group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Product Image Stage */}
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden block"
        style={{ backgroundColor: "var(--bg-secondary)" }}
        aria-label={`View ${product.title}`}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center p-3 sm:p-5 transition-transform duration-700 ease-out group-hover:scale-104"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-6 text-center">
            <div
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full mb-2"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 opacity-60" style={{ color: "var(--accent-gold)" }} />
            </div>
            <span
              className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Nakshatra Creation
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {!product.availableForSale ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-2xs"
              style={{
                backgroundColor: "var(--badge-soldout-bg)",
                color: "var(--badge-soldout-text)",
              }}
            >
              Sold Out
            </span>
          ) : hasComparePrice ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-2xs"
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

      {/* Liquid Glass Heart Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-20 flex h-9 w-9 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-90 transition-all cursor-pointer ${
          isWishlisted
            ? "text-rose-600 scale-105 opacity-100"
            : "text-neutral-600 opacity-90 sm:opacity-75 sm:group-hover:opacity-100 hover:text-rose-600"
        }`}
        aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      >
        <Heart
          className={`h-4 w-4 sm:h-4.5 sm:w-4.5 transition-colors ${
            isWishlisted ? "fill-rose-600 stroke-rose-600" : ""
          }`}
        />
      </button>

      {/* Details Container */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category Tag */}
        {product.productType && (
          <span
            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block"
            style={{ color: "var(--accent-gold)" }}
          >
            {product.productType}
          </span>
        )}

        <Link href={`/products/${product.handle}`} className="group/title">
          <h3
            className="font-serif-luxury text-sm sm:text-base font-normal tracking-wide transition-colors line-clamp-1 group-hover/title:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Pricing & Link */}
        <div className="mt-auto pt-3.5 flex items-baseline justify-between border-t border-black/5 gap-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className="text-sm sm:text-base font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {isPriceRange ? `From ${formattedPrice}` : formattedPrice}
            </span>
            {formattedComparePrice && (
              <span className="text-xs line-through opacity-60" style={{ color: "var(--text-muted)" }}>
                {formattedComparePrice}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase transition hover:underline shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            View &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
