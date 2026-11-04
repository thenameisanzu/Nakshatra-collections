"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";
import { Heart, Sparkles, Eye, ShoppingBag, Check } from "lucide-react";

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
      className="group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Product Image Stage */}
      <div
        className="relative aspect-square w-full overflow-hidden block"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
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
              className="object-contain object-center p-3 sm:p-5 transition-transform duration-500 group-hover:scale-108"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full mb-2"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <Sparkles className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
              </div>
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Nakshatra Collections
              </span>
            </div>
          )}

          {/* E-Commerce Badge: Sold Out only */}
          {!product.availableForSale && (
            <div className="absolute top-2 left-2 z-10 pointer-events-none">
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs"
                style={{
                  backgroundColor: "var(--badge-soldout-bg)",
                  color: "var(--badge-soldout-text)",
                }}
              >
                Sold Out
              </span>
            </div>
          )}
        </Link>

        {/* Quick View Button (Reveals on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out hidden sm:block">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-[11px] font-semibold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer border"
            style={{
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Floating Wishlist Heart Button (Minimal & Borderless) */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className={`absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-xs hover:bg-white active:scale-75 transition-all duration-200 cursor-pointer ${
          isWishlisted
            ? "text-rose-600 scale-105"
            : "text-gray-400 hover:text-rose-600"
        }`}
        aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      >
        <Heart
          className={`h-4 w-4 transition-transform duration-200 ${
            isWishlisted ? "fill-rose-600 stroke-rose-600" : ""
          }`}
        />
      </button>

      {/* Details Container (Minimal & Clean - Budget Blings Style) */}
      <div
        className="flex flex-1 flex-col p-3 sm:p-3.5"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        {/* Category Label */}
        <span
          className="text-[9.5px] font-bold uppercase tracking-[0.14em] block line-clamp-1 mb-1"
          style={{ color: "var(--accent-gold)" }}
        >
          {product.productType || "18K Gold Plated"}
        </span>

        {/* Title */}
        <Link href={`/products/${product.handle}`} className="group/title">
          <h3
            className="text-xs sm:text-sm font-medium transition-colors line-clamp-1 hover:opacity-85"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Pricing Stack */}
        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span
            className="text-sm sm:text-base font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {isPriceRange ? `From ${formattedPrice}` : formattedPrice}
          </span>
          {formattedComparePrice && (
            <span
              className="text-xs line-through font-normal"
              style={{ color: "var(--text-muted)" }}
            >
              {formattedComparePrice}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span
              className="text-[10px] font-semibold px-1 py-0.2 rounded"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--badge-sale-bg)",
              }}
            >
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* Full-Width Solid ADD TO CART Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.availableForSale || isAdding}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer hover:opacity-90 shadow-xs"
          style={{
            backgroundColor: isAdded ? "#2D6A4F" : "var(--accent-cta)",
            color: "var(--accent-cta-text)",
          }}
          aria-label={`Add ${product.title} to bag`}
        >
          {isAdded ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
