"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();

  // Hide mobile nav on product detail pages so sticky Add to Bag takes priority
  const isProductDetailPage = pathname.startsWith("/products/");
  if (isProductDetailPage) return null;

  const isHomeActive = pathname === "/";
  const isCategoriesActive = pathname.startsWith("/collections");
  const isWishlistActive = pathname === "/wishlist";
  const isCartActive = pathname === "/cart";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300"
      aria-label="Mobile Navigation Bar"
    >
      {/* Liquid Glass Background Dock with Safe Area Support */}
      <div
        className="mx-auto w-full border-t liquid-glass backdrop-blur-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--card-bg)",
        }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]">
          {/* 1. Home Tab */}
          <Link
            href="/"
            className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-90 ${
              isHomeActive ? "opacity-100" : "opacity-60 hover:opacity-90"
            }`}
            aria-label="Home"
          >
            <div className="relative flex items-center justify-center h-6 w-6">
              <Home
                className={`h-5 w-5 transition-transform duration-200 ${
                  isHomeActive ? "scale-110" : ""
                }`}
                style={{
                  color: isHomeActive ? "var(--accent-cta)" : "var(--text-primary)",
                  strokeWidth: isHomeActive ? 2.3 : 1.8,
                }}
              />
            </div>
            <span
              className={`mt-1 text-[10px] tracking-wider uppercase ${
                isHomeActive ? "font-bold" : "font-medium"
              }`}
              style={{
                color: isHomeActive ? "var(--accent-cta)" : "var(--text-secondary)",
              }}
            >
              Home
            </span>
            {isHomeActive && (
              <span
                className="absolute -bottom-0.5 h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            )}
          </Link>

          {/* 2. Categories Tab */}
          <Link
            href="/collections"
            className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-90 ${
              isCategoriesActive ? "opacity-100" : "opacity-60 hover:opacity-90"
            }`}
            aria-label="Categories"
          >
            <div className="relative flex items-center justify-center h-6 w-6">
              <LayoutGrid
                className={`h-5 w-5 transition-transform duration-200 ${
                  isCategoriesActive ? "scale-110" : ""
                }`}
                style={{
                  color: isCategoriesActive ? "var(--accent-cta)" : "var(--text-primary)",
                  strokeWidth: isCategoriesActive ? 2.3 : 1.8,
                }}
              />
            </div>
            <span
              className={`mt-1 text-[10px] tracking-wider uppercase ${
                isCategoriesActive ? "font-bold" : "font-medium"
              }`}
              style={{
                color: isCategoriesActive ? "var(--accent-cta)" : "var(--text-secondary)",
              }}
            >
              Categories
            </span>
            {isCategoriesActive && (
              <span
                className="absolute -bottom-0.5 h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            )}
          </Link>

          {/* 3. Search Tab */}
          <Link
            href="/collections"
            className="relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-90 opacity-60 hover:opacity-90"
            aria-label="Search Jewellery"
          >
            <div className="relative flex items-center justify-center h-6 w-6">
              <Search
                className="h-5 w-5"
                style={{
                  color: "var(--text-primary)",
                  strokeWidth: 1.8,
                }}
              />
            </div>
            <span
              className="mt-1 text-[10px] font-medium tracking-wider uppercase"
              style={{ color: "var(--text-secondary)" }}
            >
              Search
            </span>
          </Link>

          {/* 4. Wishlist Tab with Badge */}
          <Link
            href="/wishlist"
            className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-90 ${
              isWishlistActive ? "opacity-100" : "opacity-60 hover:opacity-90"
            }`}
            aria-label={`Wishlist (${totalWishlistItems} items)`}
          >
            <div className="relative flex items-center justify-center h-6 w-6">
              <Heart
                className={`h-5 w-5 transition-transform duration-200 ${
                  isWishlistActive ? "scale-110 fill-current" : ""
                }`}
                style={{
                  color: isWishlistActive ? "#dc2626" : "var(--text-primary)",
                  strokeWidth: isWishlistActive ? 2.3 : 1.8,
                }}
              />
              {totalWishlistItems > 0 && (
                <span
                  className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold leading-none text-white shadow-sm"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
                </span>
              )}
            </div>
            <span
              className={`mt-1 text-[10px] tracking-wider uppercase ${
                isWishlistActive ? "font-bold" : "font-medium"
              }`}
              style={{
                color: isWishlistActive ? "#dc2626" : "var(--text-secondary)",
              }}
            >
              Wishlist
            </span>
            {isWishlistActive && (
              <span
                className="absolute -bottom-0.5 h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "#dc2626" }}
              />
            )}
          </Link>

          {/* 5. Bag / Cart Tab with Badge */}
          <button
            type="button"
            onClick={openCart}
            className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-90 cursor-pointer ${
              isCartActive ? "opacity-100" : "opacity-60 hover:opacity-90"
            }`}
            aria-label={`Shopping Bag (${totalQuantity} items)`}
          >
            <div className="relative flex items-center justify-center h-6 w-6">
              <ShoppingBag
                className={`h-5 w-5 transition-transform duration-200 ${
                  isCartActive ? "scale-110" : ""
                }`}
                style={{
                  color: totalQuantity > 0 ? "var(--accent-cta)" : "var(--text-primary)",
                  strokeWidth: totalQuantity > 0 ? 2.2 : 1.8,
                }}
              />
              {totalQuantity > 0 && (
                <span
                  className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-extrabold leading-none shadow-sm animate-scale-in"
                  style={{
                    backgroundColor: "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </div>
            <span
              className={`mt-1 text-[10px] tracking-wider uppercase ${
                totalQuantity > 0 ? "font-bold" : "font-medium"
              }`}
              style={{
                color: totalQuantity > 0 ? "var(--accent-cta)" : "var(--text-secondary)",
              }}
            >
              Bag
            </span>
            {totalQuantity > 0 && (
              <span
                className="absolute -bottom-0.5 h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
