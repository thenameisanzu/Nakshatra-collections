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
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white transition-all duration-200 hover:shadow-md hover:border-gray-300">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden block bg-[#F9FAFB]">
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
              className="object-contain object-center p-3 sm:p-5 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full mb-2 bg-gray-100">
                <Sparkles className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                Nakshatra Collections
              </span>
            </div>
          )}

          {/* E-Commerce Badge: Sold Out only (Discounts are elegantly shown near price) */}
          {!product.availableForSale && (
            <div className="absolute top-2 left-2 z-10 pointer-events-none">
              <span className="rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-gray-900/90 backdrop-blur-xs text-white shadow-xs">
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
            className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-[11px] font-semibold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer bg-white/95 text-gray-900 border border-gray-200 hover:bg-black hover:text-white hover:border-black"
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
      <div className="flex flex-1 flex-col p-3 sm:p-3.5 bg-white">
        {/* Category Label */}
        <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#80222F] block line-clamp-1 mb-1">
          {product.productType || "18K Gold Plated"}
        </span>

        {/* Title */}
        <Link href={`/products/${product.handle}`} className="group/title">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 transition-colors line-clamp-1 group-hover/title:text-black">
            {product.title}
          </h3>
        </Link>

        {/* Pricing Stack */}
        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm sm:text-base font-bold tracking-tight text-gray-950">
            {isPriceRange ? `From ${formattedPrice}` : formattedPrice}
          </span>
          {formattedComparePrice && (
            <span className="text-xs line-through font-normal text-gray-400">
              {formattedComparePrice}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* Full-Width Solid ADD TO CART Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.availableForSale || isAdding}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer ${
            !product.availableForSale
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isAdded
              ? "bg-emerald-700 text-white"
              : "bg-[#2B0E14] hover:bg-black text-white shadow-xs"
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
