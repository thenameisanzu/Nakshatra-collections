"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Trash2, ArrowLeft, Sparkles, Check, Loader2 } from "lucide-react";

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

export default function WishlistPage() {
  const { items, isLoaded, removeFromWishlist, clearWishlist, totalWishlistItems } = useWishlist();
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = async (item: typeof items[0]) => {
    try {
      setAddingId(item.id);
      await addItem(item.id, 1);
      setAddedId(item.id);
      setTimeout(() => {
        setAddedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to add wishlist item to cart:", err);
    } finally {
      setAddingId(null);
    }
  };

  if (!isLoaded) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center transition-colors"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--accent-cta)" }} />
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            Loading your wishlist...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 sm:py-12 md:py-16 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation & Title */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 pb-6 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <div className="mb-2">
              <Link
                href="/#products"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:underline"
                style={{ color: "var(--accent-cta)" }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            <h1
              className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              My Wishlist
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-light" style={{ color: "var(--text-muted)" }}>
              {totalWishlistItems === 0
                ? "Your curated collection of beloved jewellery"
                : `${totalWishlistItems} ${totalWishlistItems === 1 ? "creation" : "creations"} curated in your personal vault`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-semibold uppercase tracking-wider text-rose-700 hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        {items.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 sm:py-24 text-center px-4 shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div
              className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full mb-4 shadow-inner liquid-glass"
            >
              <Heart className="h-8 w-8 sm:h-9 sm:w-9 text-rose-600" />
            </div>

            <h2
              className="font-serif-luxury text-2xl sm:text-3xl font-normal"
              style={{ color: "var(--text-primary)" }}
            >
              Your wishlist is waiting for something beautiful.
            </h2>

            <p
              className="mt-2 text-xs sm:text-sm max-w-md leading-relaxed font-light"
              style={{ color: "var(--text-muted)" }}
            >
              Explore our handcrafted necklaces, earrings, and rings to begin curating your bespoke fine jewellery collection.
            </p>

            <Link
              href="/#products"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-widest shadow-md transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Explore Jewellery</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => {
              const formattedPrice = formatPrice(item.price.amount, item.price.currencyCode);
              const formattedCompare = item.compareAtPrice
                ? formatPrice(item.compareAtPrice.amount, item.compareAtPrice.currencyCode)
                : null;
              const isAdding = addingId === item.id;
              const isAdded = addedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-subtle)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  {/* Image Container */}
                  <Link
                    href={`/products/${item.handle}`}
                    className="relative aspect-square w-full overflow-hidden block"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center p-3 sm:p-5 transition-transform duration-500 group-hover:scale-104"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
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
                          Nakshatra Jewel
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Remove from Wishlist Button (Liquid Glass) */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full liquid-glass liquid-glass-hover text-rose-600 shadow-xs active:scale-90 cursor-pointer"
                    aria-label={`Remove ${item.title} from wishlist`}
                    title="Remove from Wishlist"
                  >
                    <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current stroke-rose-600" />
                  </button>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {item.productType && (
                      <span
                        className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] mb-1 block"
                        style={{ color: "var(--accent-gold)" }}
                      >
                        {item.productType}
                      </span>
                    )}

                    <Link href={`/products/${item.handle}`} className="group/title">
                      <h3
                        className="font-serif-luxury text-sm sm:text-base font-normal line-clamp-1 group-hover/title:opacity-80 transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                      <span
                        className="text-sm sm:text-base font-bold tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formattedPrice}
                      </span>
                      {formattedCompare && (
                        <span className="text-[10px] sm:text-xs line-through opacity-60" style={{ color: "var(--text-muted)" }}>
                          {formattedCompare}
                        </span>
                      )}
                    </div>

                    {/* Add to Bag Action */}
                    <div className="mt-4 pt-3 border-t border-black/5">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdding}
                        className="w-full flex items-center justify-center gap-1.5 rounded-2xl py-2.5 sm:py-3 px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                        style={{
                          backgroundColor: isAdded ? "#2D6A4F" : "var(--accent-cta)",
                          color: "var(--accent-cta-text)",
                        }}
                      >
                        {isAdding ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Adding...</span>
                          </>
                        ) : isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
