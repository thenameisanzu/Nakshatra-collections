"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { isOpen: isSearchOpen, openSearch } = useSearch();

  const isHomeActive = pathname === "/";
  const isCollectionsActive = pathname.startsWith("/collections") || pathname.startsWith("/products");
  const isWishlistActive = pathname === "/wishlist";
  const isCartActive = pathname === "/cart";

  // Smooth scroll-to-top when tapping an already active tab
  const handleHomeClick = (e: React.MouseEvent) => {
    if (isHomeActive) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCollectionsClick = (e: React.MouseEvent) => {
    if (isCollectionsActive && (pathname === "/products" || pathname === "/collections")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] mx-auto z-50 md:hidden w-[92%] max-w-[380px] pointer-events-none select-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label="Mobile Bottom Navigation"
    >
      {/* Floating Liquid Glass Pill Dock */}
      <div
        className="pointer-events-auto relative w-full rounded-full liquid-glass-pill px-2 py-1.5 flex items-center justify-between shadow-[0_12px_32px_rgba(36,24,21,0.12)] border border-stone-200/80 backdrop-blur-xl bg-white/95"
      >
        {/* Specular Liquid Glass Top Sheen */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90 rounded-full" />

        {/* 1. Home Tab */}
        <Link
          href="/"
          onClick={handleHomeClick}
          prefetch={true}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-95 cursor-pointer touch-manipulation ${
            isHomeActive
              ? "text-stone-950"
              : "text-stone-500 hover:text-stone-900"
          }`}
          aria-label="Home"
        >
          <div
            className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
              isHomeActive ? "scale-105" : ""
            }`}
          >
            <Home
              className={`h-[18px] w-[18px] transition-all duration-200 ${
                isHomeActive ? "stroke-amber-600 stroke-[2.3]" : "stroke-stone-500 stroke-[1.8]"
              }`}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 transition-all duration-200 ${
              isHomeActive ? "font-bold text-amber-700" : "font-medium text-stone-500"
            }`}
          >
            Home
          </span>
          {isHomeActive && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)] animate-in fade-in duration-200" />
          )}
        </Link>

        {/* 2. Collections Tab */}
        <Link
          href="/products"
          onClick={handleCollectionsClick}
          prefetch={true}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-95 cursor-pointer touch-manipulation ${
            isCollectionsActive
              ? "text-stone-950"
              : "text-stone-500 hover:text-stone-900"
          }`}
          aria-label="Collections"
        >
          <div
            className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
              isCollectionsActive ? "scale-105" : ""
            }`}
          >
            <LayoutGrid
              className={`h-[18px] w-[18px] transition-all duration-200 ${
                isCollectionsActive ? "stroke-amber-600 stroke-[2.3]" : "stroke-stone-500 stroke-[1.8]"
              }`}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 transition-all duration-200 ${
              isCollectionsActive ? "font-bold text-amber-700" : "font-medium text-stone-500"
            }`}
          >
            Collections
          </span>
          {isCollectionsActive && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)] animate-in fade-in duration-200" />
          )}
        </Link>

        {/* 3. Search Tab */}
        <button
          type="button"
          onClick={openSearch}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-95 cursor-pointer touch-manipulation ${
            isSearchOpen
              ? "text-stone-950"
              : "text-stone-500 hover:text-stone-900"
          }`}
          aria-label="Search Jewellery"
        >
          <div
            className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
              isSearchOpen ? "scale-105" : ""
            }`}
          >
            <Search
              className={`h-[18px] w-[18px] transition-all duration-200 ${
                isSearchOpen ? "stroke-amber-600 stroke-[2.3]" : "stroke-stone-500 stroke-[1.8]"
              }`}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 transition-all duration-200 ${
              isSearchOpen ? "font-bold text-amber-700" : "font-medium text-stone-500"
            }`}
          >
            Search
          </span>
          {isSearchOpen && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)] animate-in fade-in duration-200" />
          )}
        </button>

        {/* 4. Wishlist Tab with Badge */}
        <Link
          href="/wishlist"
          prefetch={true}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-95 cursor-pointer touch-manipulation ${
            isWishlistActive
              ? "text-rose-600"
              : "text-stone-500 hover:text-stone-900"
          }`}
          aria-label={`Wishlist (${totalWishlistItems} items)`}
        >
          <div
            className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
              isWishlistActive ? "scale-105" : ""
            }`}
          >
            <Heart
              className={`h-[18px] w-[18px] transition-all duration-200 ${
                isWishlistActive
                  ? "fill-rose-600 stroke-rose-600 stroke-[2.2]"
                  : "stroke-stone-500 stroke-[1.8]"
              }`}
            />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[8.5px] font-extrabold leading-none bg-rose-600 text-white shadow-xs">
                {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
              </span>
            )}
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 transition-all duration-200 ${
              isWishlistActive ? "font-bold text-rose-600" : "font-medium text-stone-500"
            }`}
          >
            Wishlist
          </span>
          {isWishlistActive && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-rose-600 shadow-[0_0_6px_rgba(225,29,72,0.9)] animate-in fade-in duration-200" />
          )}
        </Link>

        {/* 5. Bag / Cart Tab with Badge */}
        <button
          type="button"
          onClick={openCart}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-95 cursor-pointer touch-manipulation ${
            isCartActive || totalQuantity > 0
              ? "text-stone-950"
              : "text-stone-500 hover:text-stone-900"
          }`}
          aria-label={`Shopping Bag (${totalQuantity} items)`}
        >
          <div
            className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
              totalQuantity > 0 ? "scale-105" : ""
            }`}
          >
            <ShoppingBag
              className={`h-[18px] w-[18px] transition-all duration-200 ${
                totalQuantity > 0 ? "stroke-amber-600 stroke-[2.3]" : "stroke-stone-500 stroke-[1.8]"
              }`}
            />
            {totalQuantity > 0 && (
              <span 
                className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[8.5px] font-extrabold leading-none text-white shadow-xs"
                style={{ backgroundColor: "var(--accent-cta)" }}
              >
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 transition-all duration-200 ${
              totalQuantity > 0 ? "font-bold text-amber-700" : "font-medium text-stone-500"
            }`}
          >
            Bag
          </span>
          {(isCartActive || totalQuantity > 0) && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)] animate-in fade-in duration-200" />
          )}
        </button>
      </div>
    </nav>
  );
}
