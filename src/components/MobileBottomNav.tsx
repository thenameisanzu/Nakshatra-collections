"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Home,
  LayoutGrid,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  const isHome = pathname === "/";
  const isCollections = pathname?.startsWith("/collections");
  const isWishlist = pathname === "/wishlist";
  const isCart = pathname === "/cart";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-3 pb-3 pointer-events-none">
      <nav
        className="pointer-events-auto mx-auto max-w-md rounded-2xl border liquid-glass shadow-2xl backdrop-blur-xl px-2 py-2 flex items-center justify-around transition-colors"
        style={{
          borderColor: "var(--border-medium)",
          backgroundColor: "var(--glass-bg)",
        }}
        aria-label="Mobile Bottom Navigation"
      >
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            isHome ? "scale-105" : "opacity-75 hover:opacity-100"
          }`}
          style={{
            color: isHome ? "var(--accent-cta)" : "var(--text-primary)",
          }}
        >
          <Home className="h-4.5 w-4.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Home</span>
        </Link>

        {/* 2. Collections */}
        <Link
          href="/collections"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            isCollections ? "scale-105" : "opacity-75 hover:opacity-100"
          }`}
          style={{
            color: isCollections ? "var(--accent-cta)" : "var(--text-primary)",
          }}
        >
          <LayoutGrid className="h-4.5 w-4.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Explore</span>
        </Link>

        {/* 3. New Arrivals Center Accent */}
        <Link
          href="/collections/new-arrivals"
          className="flex flex-col items-center gap-0.5 -mt-4 px-2"
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg border transition-transform active:scale-95"
            style={{
              backgroundColor: "var(--accent-cta)",
              color: "var(--accent-cta-text)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <span
            className="text-[9px] font-extrabold uppercase tracking-wider"
            style={{ color: "var(--accent-gold)" }}
          >
            New In
          </span>
        </Link>

        {/* 4. Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            isWishlist ? "scale-105" : "opacity-75 hover:opacity-100"
          }`}
          style={{
            color: isWishlist ? "var(--accent-cta)" : "var(--text-primary)",
          }}
        >
          <div className="relative">
            <Heart className="h-4.5 w-4.5" />
            {wishlistItems.length > 0 && (
              <span
                className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-extrabold text-white"
                style={{ backgroundColor: "var(--accent-cta)" }}
              >
                {wishlistItems.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Saved</span>
        </Link>

        {/* 5. Cart Drawer Trigger */}
        <button
          type="button"
          onClick={openCart}
          className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            isCart ? "scale-105" : "opacity-75 hover:opacity-100"
          }`}
          style={{
            color: isCart ? "var(--accent-cta)" : "var(--text-primary)",
          }}
          aria-label="Open Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="h-4.5 w-4.5" />
            {totalQuantity > 0 && (
              <span
                className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-extrabold text-white animate-pulse"
                style={{ backgroundColor: "var(--accent-gold)" }}
              >
                {totalQuantity}
              </span>
            )}
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Bag</span>
        </button>
      </nav>
    </div>
  );
}
