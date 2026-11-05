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
  const isCategoriesActive = pathname.startsWith("/collections");
  const isWishlistActive = pathname === "/wishlist";
  const isCartActive = pathname === "/cart";

  return (
    <nav
      className="fixed bottom-3.5 left-1/2 -translate-x-1/2 z-50 md:hidden w-[92%] max-w-[380px] pointer-events-none transition-all duration-300"
      aria-label="Mobile Bottom Navigation"
    >
      {/* Floating Liquid Glass Pill Dock */}
      <div
        className="pointer-events-auto relative w-full rounded-full liquid-glass-pill px-2.5 py-1.5 flex items-center justify-between"
      >
        {/* Specular Liquid Glass Top Sheen */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90 rounded-full" />

        {/* 1. Home Tab */}
        <Link
          href="/"
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 ${
            isHomeActive
              ? "text-gray-950"
              : "text-gray-500 hover:text-gray-900"
          }`}
          aria-label="Home"
        >
          <div className="relative flex items-center justify-center h-6 w-6">
            <Home
              className={`h-5 w-5 transition-transform duration-200 ${
                isHomeActive ? "scale-110" : ""
              }`}
              style={{
                strokeWidth: isHomeActive ? 2.4 : 1.9,
              }}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 ${
              isHomeActive ? "font-bold text-gray-950" : "font-medium text-gray-500"
            }`}
          >
            Home
          </span>
          {isHomeActive && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
          )}
        </Link>

        {/* 2. Collections Tab */}
        <Link
          href="/collections"
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 ${
            isCategoriesActive
              ? "text-gray-950"
              : "text-gray-500 hover:text-gray-900"
          }`}
          aria-label="Collections"
        >
          <div className="relative flex items-center justify-center h-6 w-6">
            <LayoutGrid
              className={`h-5 w-5 transition-transform duration-200 ${
                isCategoriesActive ? "scale-110" : ""
              }`}
              style={{
                strokeWidth: isCategoriesActive ? 2.4 : 1.9,
              }}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 ${
              isCategoriesActive ? "font-bold text-gray-950" : "font-medium text-gray-500"
            }`}
          >
            Collections
          </span>
          {isCategoriesActive && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
          )}
        </Link>

        {/* 3. Search Tab */}
        <button
          type="button"
          onClick={openSearch}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
            isSearchOpen
              ? "text-gray-950"
              : "text-gray-500 hover:text-gray-900"
          }`}
          aria-label="Search Jewellery"
        >
          <div className="relative flex items-center justify-center h-6 w-6">
            <Search
              className={`h-5 w-5 transition-transform duration-200 ${
                isSearchOpen ? "scale-110" : ""
              }`}
              style={{
                strokeWidth: isSearchOpen ? 2.4 : 1.9,
              }}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 ${
              isSearchOpen ? "font-bold text-gray-950" : "font-medium text-gray-500"
            }`}
          >
            Search
          </span>
          {isSearchOpen && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
          )}
        </button>

        {/* 4. Wishlist Tab with Badge */}
        <Link
          href="/wishlist"
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 ${
            isWishlistActive
              ? "text-rose-600"
              : "text-gray-500 hover:text-gray-900"
          }`}
          aria-label={`Wishlist (${totalWishlistItems} items)`}
        >
          <div className="relative flex items-center justify-center h-6 w-6">
            <Heart
              className={`h-5 w-5 transition-transform duration-200 ${
                isWishlistActive ? "scale-110 fill-rose-600 stroke-rose-600" : ""
              }`}
              style={{
                strokeWidth: isWishlistActive ? 2.4 : 1.9,
              }}
            />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[8.5px] font-extrabold leading-none bg-rose-600 text-white shadow-xs">
                {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
              </span>
            )}
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 ${
              isWishlistActive ? "font-bold text-rose-600" : "font-medium text-gray-500"
            }`}
          >
            Wishlist
          </span>
          {isWishlistActive && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-rose-600 shadow-[0_0_6px_rgba(225,29,72,0.8)]" />
          )}
        </Link>

        {/* 5. Bag / Cart Tab with Badge */}
        <button
          type="button"
          onClick={openCart}
          className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
            isCartActive || totalQuantity > 0
              ? "text-gray-950"
              : "text-gray-500 hover:text-gray-900"
          }`}
          aria-label={`Shopping Bag (${totalQuantity} items)`}
        >
          <div className="relative flex items-center justify-center h-6 w-6">
            <ShoppingBag
              className={`h-5 w-5 transition-transform duration-200 ${
                totalQuantity > 0 ? "scale-110" : ""
              }`}
              style={{
                strokeWidth: totalQuantity > 0 ? 2.3 : 1.9,
              }}
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[8.5px] font-extrabold leading-none bg-gray-950 text-white shadow-xs">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </div>
          <span
            className={`text-[9.5px] tracking-tight uppercase leading-none mt-1 ${
              totalQuantity > 0 ? "font-bold text-gray-950" : "font-medium text-gray-500"
            }`}
          >
            Bag
          </span>
          {totalQuantity > 0 && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
          )}
        </button>
      </div>
    </nav>
  );
}
