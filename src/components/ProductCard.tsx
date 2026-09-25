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
      className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover object-center p-2.5 sm:p-3.5 transition-transform duration-500 ease-out group-hover:scale-104"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-3 sm:p-4 text-center">
            <div
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full mb-1.5"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-60" style={{ color: "var(--accent-gold)" }} />
            </div>
            <span
              className="text-[9px] sm:text-[10px] font-medium tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Nakshatra
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {!product.availableForSale ? (
            <span
              className="rounded-full px-2 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider shadow-2xs"
              style={{
                backgroundColor: "var(--badge-soldout-bg)",
                color: "var(--badge-soldout-text)",
              }}
            >
              Sold Out
            </span>
          ) : hasComparePrice ? (
            <span
              className="rounded-full px-2 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider shadow-2xs"
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
        className={`absolute top-2 right-2 z-20 flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-90 transition-all cursor-pointer ${
          isWishlisted
            ? "text-rose-600 scale-105 opacity-100"
            : "text-neutral-600 opacity-90 sm:opacity-75 sm:group-hover:opacity-100 hover:text-rose-600"
        }`}
        aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      >
        <Heart
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
            isWishlisted ? "fill-rose-600 stroke-rose-600" : ""
          }`}
        />
      </button>

      {/* Details Container */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        {/* Category Tag */}
        {product.productType && (
          <span
            className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5 block line-clamp-1"
            style={{ color: "var(--accent-gold)" }}
          >
            {product.productType}
          </span>
        )}

        <Link href={`/products/${product.handle}`} className="group/title">
          <h3
            className="font-serif-luxury text-xs sm:text-sm font-normal tracking-wide transition-colors line-clamp-1 group-hover/title:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Pricing & Link */}
        <div className="mt-auto pt-2.5 flex items-baseline justify-between border-t border-black/5 gap-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className="text-xs sm:text-sm font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {isPriceRange ? `From ${formattedPrice}` : formattedPrice}
            </span>
            {formattedComparePrice && (
              <span className="text-[10px] sm:text-xs line-through opacity-60" style={{ color: "var(--text-muted)" }}>
                {formattedComparePrice}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition hover:underline shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            View &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
