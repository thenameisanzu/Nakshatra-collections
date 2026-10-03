"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";
import { Heart, Sparkles, Eye, Star, ShoppingBag, Check } from "lucide-react";

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
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

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

  const discountPercent =
    hasComparePrice && comparePrice
      ? Math.round(
          ((parseFloat(comparePrice.amount) - parseFloat(minPrice.amount)) /
            parseFloat(comparePrice.amount)) *
            100
        )
      : null;

  const formattedPrice = formatPrice(minPrice.amount, minPrice.currencyCode);
  const formattedComparePrice = hasComparePrice
    ? formatPrice(comparePrice.amount, comparePrice.currencyCode)
    : null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const firstVariant = product.variants?.edges?.[0]?.node;
    toggleWishlist({
      id: product.id,
      variantId: firstVariant?.id,
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.availableForSale || isAdding) return;

    setIsAdding(true);
    const firstVariant = product.variants?.edges?.[0]?.node;
    const variantId = firstVariant ? firstVariant.id : product.id;

    try {
      await addItem(variantId, 1);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        openCart();
      }, 600);
    } catch (err) {
      console.error("Failed to add to bag:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:shadow-lg card-lift"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-medium)",
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
              className="object-cover object-center p-2.5 sm:p-4 transition-transform duration-500 group-hover:scale-106"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full mb-2"
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

          {/* E-Commerce Badges: Discount % & Sold Out */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {!product.availableForSale ? (
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-xs"
                style={{
                  backgroundColor: "var(--badge-soldout-bg)",
                  color: "var(--badge-soldout-text)",
                }}
              >
                Sold Out
              </span>
            ) : discountPercent && discountPercent > 0 ? (
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs"
                style={{
                  backgroundColor: "var(--accent-cta)",
                }}
              >
                {discountPercent}% OFF
              </span>
            ) : (
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider liquid-glass border"
                style={{
                  color: "var(--accent-cta)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                18K Gold
              </span>
            )}
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
            className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-[11px] font-semibold uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer liquid-glass-dark text-white border border-white/20 hover:border-amber-300/60 hover:bg-black/90"
          >
            <Eye className="h-3.5 w-3.5 text-amber-300" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Floating Wishlist Heart Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className={`absolute top-2.5 right-2.5 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-75 transition-all duration-300 cursor-pointer ${
          isWishlisted
            ? "text-rose-600 scale-105 opacity-100 shadow-md"
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

      {/* Details Container (Myntra / Flipkart E-Commerce Layout) */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Rating Pill + Category */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <span
            className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] block line-clamp-1"
            style={{ color: "var(--accent-gold)" }}
          >
            {product.productType || "18K Gold Plated"}
          </span>

          {/* Verified Rating Pill */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span>4.8</span>
            <Star className="h-2.5 w-2.5 fill-emerald-700 text-emerald-700" />
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.handle}`} className="group/title">
          <h3
            className="font-serif text-sm sm:text-base font-medium tracking-normal transition-colors line-clamp-1 group-hover/title:opacity-75"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Pricing & Fast Add to Cart Action */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-black/5 gap-2">
          {/* Price Stack */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className="text-sm sm:text-base font-bold tracking-tight"
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

          {/* 1-Tap Fast Add to Bag Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.availableForSale || isAdding}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-90 cursor-pointer shrink-0 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "text-white shadow-xs hover:scale-105"
            }`}
            style={{
              backgroundColor: isAdded ? "#059669" : "var(--accent-cta)",
            }}
            aria-label={`Add ${product.title} to bag`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3 w-3" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
