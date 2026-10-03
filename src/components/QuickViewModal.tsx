"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ShopifyProductVariant, ShopifyImage } from "@/types/shopify";
import {
  X,
  ShoppingBag,
  Heart,
  Check,
  Loader2,
  Sparkles,
  ShieldCheck,
  Droplets,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

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

export default function QuickViewModal() {
  const { product, isOpen, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<ShopifyImage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const variants: ShopifyProductVariant[] =
    product?.variants?.edges?.map((e) => e.node) || [];

  const images: ShopifyImage[] =
    product?.images?.edges?.map((e) => e.node) ||
    (product?.featuredImage ? [product.featuredImage] : []);

  useEffect(() => {
    if (product) {
      const productVariants = product.variants?.edges?.map((e) => e.node) || [];
      const productImages = product.images?.edges?.map((e) => e.node) || (product.featuredImage ? [product.featuredImage] : []);
      const firstAvailable = productVariants.find((v) => v.availableForSale) || productVariants[0] || null;
      setSelectedVariant(firstAvailable);
      setSelectedImage(firstAvailable?.image || product.featuredImage || productImages[0] || null);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeQuickView]);

  if (!isOpen || !product) return null;

  const currentPrice = selectedVariant?.price || product.priceRange.minVariantPrice;
  const compareAtPrice = selectedVariant?.compareAtPrice || product.compareAtPriceRange?.minVariantPrice;
  const hasComparePrice =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(currentPrice.amount);

  const formattedPrice = formatPrice(currentPrice.amount, currentPrice.currencyCode);
  const formattedComparePrice = hasComparePrice
    ? formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)
    : null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    const variantId = selectedVariant?.id || variants[0]?.id;
    if (!variantId) return;

    try {
      setIsAdding(true);
      await addItem(variantId, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    } catch (error) {
      console.error("Failed to add to cart from quick view:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlistClick = () => {
    toggleWishlist({
      id: product.id,
      handle: product.handle,
      title: product.title,
      price: {
        amount: currentPrice.amount,
        currencyCode: currentPrice.currencyCode,
      },
      compareAtPrice: compareAtPrice
        ? {
            amount: compareAtPrice.amount,
            currencyCode: compareAtPrice.currencyCode,
          }
        : null,
      imageUrl: product.featuredImage?.url || null,
      imageAlt: product.featuredImage?.altText || product.title,
      productType: product.productType,
      availableForSale: product.availableForSale,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border shadow-2xl transition-all duration-300 animate-in zoom-in-95 max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-medium)",
          color: "var(--text-primary)",
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full liquid-glass transition hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          style={{ color: "var(--text-primary)" }}
          aria-label="Close modal"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Product Image Gallery */}
          <div
            className="relative p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl">
              {selectedImage?.url ? (
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center p-2 transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Sparkles className="h-10 w-10 opacity-40" style={{ color: "var(--accent-gold)" }} />
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="mt-4 flex items-center gap-2 overflow-x-auto max-w-full pb-1">
                {images.map((img, idx) => {
                  const isSelected = selectedImage?.url === img.url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-12 w-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        isSelected ? "scale-105 shadow-sm" : "opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        borderColor: isSelected ? "var(--accent-gold)" : "var(--border-subtle)",
                        backgroundColor: "var(--bg-surface)",
                      }}
                    >
                      <Image
                        src={img.url}
                        alt={img.altText || `View ${idx + 1}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              {/* Product Type & Rating */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
                  style={{ color: "var(--accent-gold)" }}
                >
                  {product.productType || "Nakshatra Atelier"}
                </span>

                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--tag-text)",
                  }}
                >
                  18K Gold Plated
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {product.title}
              </h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-2.5 pt-1">
                <span
                  className="text-xl sm:text-2xl font-extrabold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {formattedPrice}
                </span>

                {formattedComparePrice && (
                  <span className="text-sm line-through opacity-60" style={{ color: "var(--text-muted)" }}>
                    {formattedComparePrice}
                  </span>
                )}
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-2 py-3 border-y my-1" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  <Droplets className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                  <span>Anti-Tarnish / Waterproof</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                  <span>Hypoallergenic Safe</span>
                </div>
              </div>

              {/* Variants Selector */}
              {variants.length > 1 && (
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Select Option:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => {
                            setSelectedVariant(v);
                            if (v.image) setSelectedImage(v.image);
                          }}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "border shadow-xs scale-105"
                              : "border opacity-75 hover:opacity-100"
                          }`}
                          style={{
                            backgroundColor: isSelected ? "var(--accent-cta)" : "var(--bg-primary)",
                            color: isSelected ? "var(--accent-cta-text)" : "var(--text-primary)",
                            borderColor: isSelected ? "transparent" : "var(--border-medium)",
                          }}
                        >
                          {v.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t flex flex-col gap-3" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2.5">
                {/* Quantity */}
                <div
                  className="flex items-center rounded-2xl border h-11 px-2 shrink-0"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-medium)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isAdding}
                    className="p-1 transition hover:opacity-70 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-extrabold select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={isAdding}
                    className="p-1 transition hover:opacity-70 disabled:opacity-30 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl h-11 px-4 text-xs font-extrabold uppercase tracking-widest shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  style={{
                    backgroundColor: isAdded ? "#2D6A4F" : "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={handleWishlistClick}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition hover:scale-105 active:scale-90 cursor-pointer ${
                    isWishlisted ? "text-rose-600 border-rose-300" : "hover:text-rose-600"
                  }`}
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-medium)",
                  }}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-600 stroke-rose-600" : ""}`} />
                </button>
              </div>

              {/* View Full Product Link */}
              <Link
                href={`/products/${product.handle}`}
                onClick={closeQuickView}
                className="flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider py-1 hover:underline transition"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>View Full Product Details &amp; Specifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
