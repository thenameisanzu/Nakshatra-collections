"use client";

import { useState, useMemo } from "react";
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
  className?: string;
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

export default function ProductCard({
  product,
  priority = false,
  className = "",
}: ProductCardProps) {
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

  // Extract primary sub-category tag (e.g. Kundan, Antique, Bridal, AD Stones)
  const styleTag = useMemo(() => {
    const ignored = new Set([
      "necklace",
      "necklaces",
      "ring",
      "rings",
      "bangle",
      "bangles",
      "bracelet",
      "bracelets",
      "earring",
      "earrings",
      "ear rings",
      "anklet",
      "anklets",
      "general",
      "all",
      "nakshatra",
      "men's accessories",
    ]);
    const found = (product.tags || []).find(
      (t) => !ignored.has(t.trim().toLowerCase())
    );
    if (!found) return null;
    return found
      .trim()
      .split(" ")
      .map((w) => (w.toLowerCase() === "ad" ? "AD" : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
      .join(" ");
  }, [product.tags]);

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

  const primaryImage = product.featuredImage || product.images?.edges?.[0]?.node;
  const secondaryImage = product.images?.edges?.[1]?.node;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(36,24,21,0.08)] hover:border-[#C59B4E]/40 transition-all duration-300 ${className}`}
    >
      {/* Product Image Stage: Full edge-to-edge fit without awkward letterboxing or inner borders */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5] block">
        <Link
          href={`/products/${product.handle}`}
          className="relative h-full w-full block"
          aria-label={`View ${product.title}`}
        >
          {primaryImage ? (
            <>
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText || product.title}
                fill
                priority={priority}
                loading={priority ? undefined : "lazy"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover object-center transition-transform duration-700 ease-out ${
                  secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                }`}
              />
              {secondaryImage && (
                <Image
                  src={secondaryImage.url}
                  alt={secondaryImage.altText || product.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                />
              )}
            </>
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

          {/* Badges: Discount or Sold Out */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
            {!product.availableForSale && (
              <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-xs shadow-xs">
                Sold Out
              </span>
            )}
            {product.availableForSale && discountPercent && discountPercent > 0 && (
              <span className="rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider bg-[#80222F] text-white shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>
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
            className="w-full flex items-center justify-center gap-1.5 rounded-full py-2 px-3 text-[11px] font-semibold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer bg-white/95 backdrop-blur-xs text-[#241815] hover:bg-white hover:text-black border border-stone-200"
          >
            <Eye className="h-3.5 w-3.5 text-[#C59B4E]" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Floating Wishlist Heart Button (Minimal & Borderless) */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className={`absolute top-2.5 right-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-xs hover:bg-white hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer ${
          isWishlisted
            ? "text-rose-600 scale-105"
            : "text-stone-400 hover:text-rose-600"
        }`}
        aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      >
        <Heart
          className={`h-4 w-4 transition-transform duration-200 ${
            isWishlisted ? "fill-rose-600 stroke-rose-600" : ""
          }`}
        />
      </button>

      {/* Details Container (Minimal & Clean) */}
      <div className="flex flex-1 flex-col p-3 sm:p-3.5 bg-white">
        {/* Style Tag & Category Label */}
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          {styleTag && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#936A22] bg-[#FAF2E2] px-2 py-0.5 rounded-full border border-[#E9D6AF]">
              {styleTag}
            </span>
          )}
          <span
            className="text-[9.5px] font-bold uppercase tracking-[0.14em] line-clamp-1"
            style={{ color: "var(--accent-gold)" }}
          >
            {product.productType || "18K Gold Plated"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.handle}`} className="group/title block">
          <h3
            className="text-xs sm:text-[13.5px] font-medium transition-colors line-clamp-1 group-hover/title:text-[#C59B4E]"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Pricing Stack */}
        <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
          <span
            className="text-sm sm:text-base font-bold tracking-tight text-stone-950"
          >
            {isPriceRange ? `From ${formattedPrice}` : formattedPrice}
          </span>
          {formattedComparePrice && (
            <span
              className="text-xs line-through font-normal text-stone-400"
            >
              {formattedComparePrice}
            </span>
          )}
        </div>

        {/* Full-Width Solid ADD TO CART Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.availableForSale || isAdding}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-xs ${
            isAdded
              ? "bg-emerald-700 text-white"
              : "bg-[#241815] text-white hover:bg-black"
          }`}
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
