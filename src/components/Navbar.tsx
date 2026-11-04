"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Heart,
  ArrowRight,
  Gem,
  Sparkles,
  Crown,
  Droplets,
  CircleDot,
  Flame,
  type LucideIcon,
} from "lucide-react";

interface CategoryNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const categories: CategoryNavItem[] = [
  { label: "Necklaces & Pendants", href: "/collections/necklaces", icon: Gem },
  { label: "Earrings & Drops", href: "/collections/earrings", icon: Sparkles },
  { label: "Bangles & Cuffs", href: "/collections/bangles", icon: Droplets },
  { label: "Solitaires & Rings", href: "/collections/rings", icon: CircleDot },
  { label: "Kerala Bridal Sets", href: "/collections/bridal-jewellery", icon: Crown },
  { label: "Necklace Sets", href: "/collections/necklace-sets", icon: Crown },
  { label: "Daily Payals", href: "/collections/anklets", icon: Sparkles },
  { label: "New Arrivals 2026", href: "/collections/new-arrivals", icon: Flame },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleSearch } = useSearch();
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Clean Pill Navbar (Desktop & Tablet only - Mobile uses native-like bottom pill nav) */}
      <header className="hidden md:block sticky top-2 sm:top-3 z-40 mx-auto w-[94%] max-w-6xl transition-all duration-200">
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]">
          {/* Mobile Left: Menu Drawer Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer text-gray-800"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Brand Logo (Center on Mobile, Left on Desktop) */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:opacity-90"
            aria-label="Nakshatra Collections"
          >
            <div className="relative h-6 w-6 sm:h-7 sm:w-7 shrink-0">
              <Image
                src="/nakshatra-logo.png"
                alt="NAKSHATRA"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm sm:text-base font-medium tracking-[0.16em] uppercase text-gray-900 leading-none">
              Nakshatra Collections
            </span>
          </Link>

          {/* Desktop Center: Minimal Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/collections"
              className="text-xs font-semibold tracking-wider uppercase text-gray-900 hover:text-amber-700 transition-colors"
            >
              All Jewellery
            </Link>
            <Link
              href="/collections/necklaces"
              className="text-xs font-semibold tracking-wider uppercase text-gray-600 hover:text-gray-900 transition-colors"
            >
              Necklaces
            </Link>
            <Link
              href="/collections/earrings"
              className="text-xs font-semibold tracking-wider uppercase text-gray-600 hover:text-gray-900 transition-colors"
            >
              Earrings
            </Link>
            <Link
              href="/collections/bangles"
              className="text-xs font-semibold tracking-wider uppercase text-gray-600 hover:text-gray-900 transition-colors"
            >
              Bangles
            </Link>
            <Link
              href="/collections/rings"
              className="text-xs font-semibold tracking-wider uppercase text-gray-600 hover:text-gray-900 transition-colors"
            >
              Rings
            </Link>
            <Link
              href="/collections/bridal-jewellery"
              className="text-xs font-semibold tracking-wider uppercase text-gray-600 hover:text-gray-900 transition-colors"
            >
              Bridal
            </Link>
            <Link
              href="/collections/rings"
              className="text-xs font-bold tracking-wider uppercase text-amber-700 hover:text-amber-800 transition-colors"
            >
              Under ₹299
            </Link>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Bag */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={toggleSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer text-gray-800"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Wishlist (Desktop) */}
            <Link
              href="/wishlist"
              className="hidden sm:flex relative h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors text-gray-800"
              aria-label={`Wishlist (${totalWishlistItems} items)`}
            >
              <Heart className="h-4.5 w-4.5" />
              {totalWishlistItems > 0 && (
                <span className="absolute 1 top-1 right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-600 px-1 text-[8.5px] font-bold text-white">
                  {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Bag Drawer Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer text-gray-800"
              aria-label={`Shopping bag (${totalQuantity} items)`}
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-gray-900 px-1 text-[8.5px] font-bold text-white shadow-xs">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Over Menu */}
        {isOpen && (
          <div className="fixed inset-0 top-[60px] z-50 lg:hidden flex flex-col justify-between p-6 bg-white border-t border-gray-100 shadow-2xl overflow-y-auto animate-in fade-in duration-150">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Nakshatra Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col divide-y divide-gray-100 text-sm font-medium text-gray-900">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="py-3 flex items-center justify-between"
                >
                  <span>Home</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>

                <Link
                  href="/collections"
                  onClick={() => setIsOpen(false)}
                  className="py-3 flex items-center justify-between font-semibold"
                >
                  <span>All Jewellery Catalogue</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>

                <div className="py-2 pl-2 flex flex-col gap-2.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="py-1 text-xs font-medium text-gray-600 hover:text-black flex items-center gap-2"
                    >
                      <cat.icon className="h-3.5 w-3.5 text-amber-700" />
                      <span>{cat.label}</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/collections/rings"
                  onClick={() => setIsOpen(false)}
                  className="py-3 flex items-center justify-between text-amber-700 font-semibold"
                >
                  <span>Shop Under ₹299 (Budget Store)</span>
                  <ArrowRight className="h-4 w-4 text-amber-700" />
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="py-3 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-rose-600" />
                    <span>Wishlist ({totalWishlistItems})</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>

                <Link
                  href="/our-story"
                  onClick={() => setIsOpen(false)}
                  className="py-3 flex items-center justify-between"
                >
                  <span>Our Story &amp; Quality Promise</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-gray-100 text-center">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                100% Anti-Tarnish &bull; Express Delivery Across India
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
