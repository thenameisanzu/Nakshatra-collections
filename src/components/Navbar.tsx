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
  User,
  ArrowRight,
  Gem,
  Sparkles,
  Crown,
  Droplets,
  CircleDot,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons/SocialIcons";

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
      {/* Floating Clean Pill Navbar (Budget Blings Inspired - Desktop & Mobile) */}
      <header className="sticky top-2 sm:top-3 z-40 mx-auto w-[94%] max-w-6xl transition-all duration-200">
        <div 
          className="relative flex items-center justify-between px-4 sm:px-8 py-2.5 rounded-full backdrop-blur-md transition-all duration-200"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 8px 30px rgba(31, 26, 24, 0.06)",
          }}
        >
          {/* Left: 3 Clean Minimal Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className="text-xs sm:text-sm font-normal text-stone-600 hover:text-stone-950 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-normal text-stone-600 hover:text-stone-950 transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/contact"
              className="text-xs sm:text-sm font-normal text-stone-600 hover:text-stone-950 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Brand Logo & Title (Desktop: Centered, Mobile: Left) */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:opacity-90 md:absolute md:left-1/2 md:-translate-x-1/2"
            aria-label="Nakshatra Collections"
          >
            <div className="relative h-6 w-6 sm:h-7 sm:w-7 shrink-0">
              <Image
                src="/nakshatra-logo.png"
                alt="Nakshatra Collections"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span 
              className="text-xs sm:text-base font-medium tracking-[0.16em] uppercase leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              Nakshatra Collections
            </span>
          </Link>

          {/* Right Action Icons: Search, Wishlist, Bag, Account */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={toggleSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer text-gray-700"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors text-gray-700"
              aria-label={`Wishlist (${totalWishlistItems} items)`}
            >
              <Heart className="h-4.5 w-4.5" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-600 px-1 text-[8.5px] font-bold text-white">
                  {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100 active:scale-95 transition-colors cursor-pointer text-stone-700"
              aria-label={`Shopping bag (${totalQuantity} items)`}
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalQuantity > 0 && (
                <span 
                  className="absolute top-1 right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[8.5px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </button>

            {/* Account Profile */}
            <Link
              href="/account"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors text-gray-700"
              aria-label="Customer Account"
            >
              <User className="h-4.5 w-4.5" />
            </Link>
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

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href="https://wa.me/919447003584"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>+91 94470 03584</span>
                </a>
                <a
                  href="https://www.instagram.com/nakshatra.collections.kply/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold"
                >
                  <InstagramIcon className="h-3.5 w-3.5 text-[#E4405F]" />
                  <span>Instagram</span>
                </a>
              </div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 text-center">
                100% Anti-Tarnish &bull; Kanjirappally, Kerala
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
