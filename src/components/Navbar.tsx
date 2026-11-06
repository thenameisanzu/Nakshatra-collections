"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  { label: "Necklace", href: "/collections/necklace", icon: Gem },
  { label: "Earrings", href: "/collections/ear-rings", icon: Sparkles },
  { label: "Bangles", href: "/collections/bangles", icon: Droplets },
  { label: "Bracelets", href: "/collections/bracelets", icon: Droplets },
  { label: "Rings", href: "/collections/rings", icon: CircleDot },
  { label: "Men's Accessories", href: "/collections/mens-accessories", icon: Crown },
  { label: "Anklets", href: "/collections/anklets", icon: Sparkles },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "";
  const { toggleSearch } = useSearch();
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();

  // Active state calculations for top navigation
  const isHomeActive = pathname === "/";
  const isCollectionsActive =
    pathname === "/products" ||
    pathname === "/collections" ||
    pathname.startsWith("/collections/") ||
    pathname.startsWith("/products/");
  const isContactActive = pathname === "/contact";

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
          className="relative flex items-center justify-between px-3.5 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded-full backdrop-blur-md transition-all duration-200"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 8px 30px rgba(31, 26, 24, 0.06)",
          }}
        >
          {/* Left: 3 Clean Minimal Navigation Links (Tablet & Desktop) with Active Selection Highlight */}
          <nav className="hidden md:flex md:flex-1 items-center justify-start gap-1 sm:gap-1.5 lg:gap-2">
            <Link
              href="/"
              className={`relative text-xs lg:text-[13px] tracking-wide transition-all duration-200 shrink-0 px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                isHomeActive
                  ? "text-[#6C080C] font-semibold bg-[#FAF2F2] border border-[#E8D2D4]/80 shadow-2xs"
                  : "text-stone-600 hover:text-stone-950 font-normal hover:bg-stone-100/70"
              }`}
            >
              {isHomeActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#6C080C] shadow-[0_0_6px_rgba(108,8,12,0.6)]" />
              )}
              <span>Home</span>
            </Link>
            <Link
              href="/products"
              className={`relative text-xs lg:text-[13px] tracking-wide transition-all duration-200 shrink-0 px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                isCollectionsActive
                  ? "text-[#6C080C] font-semibold bg-[#FAF2F2] border border-[#E8D2D4]/80 shadow-2xs"
                  : "text-stone-600 hover:text-stone-950 font-normal hover:bg-stone-100/70"
              }`}
            >
              {isCollectionsActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#6C080C] shadow-[0_0_6px_rgba(108,8,12,0.6)]" />
              )}
              <span>Collections</span>
            </Link>
            <Link
              href="/contact"
              className={`relative text-xs lg:text-[13px] tracking-wide transition-all duration-200 shrink-0 px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                isContactActive
                  ? "text-[#6C080C] font-semibold bg-[#FAF2F2] border border-[#E8D2D4]/80 shadow-2xs"
                  : "text-stone-600 hover:text-stone-950 font-normal hover:bg-stone-100/70"
              }`}
            >
              {isContactActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#6C080C] shadow-[0_0_6px_rgba(108,8,12,0.6)]" />
              )}
              <span>Contact</span>
            </Link>
          </nav>

          {/* Brand Logo & Title (Desktop & iPad: Centered, Mobile: Left) */}
          <div className="flex md:shrink-0 items-center justify-start md:justify-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 group transition-transform hover:opacity-90 shrink-0"
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
                className="text-xs sm:text-sm lg:text-base font-medium tracking-[0.14em] sm:tracking-[0.16em] uppercase leading-none whitespace-nowrap"
                style={{ color: "var(--text-primary)" }}
              >
                Nakshatra Collections
              </span>
            </Link>
          </div>

          {/* Right Action Icons: Search, Wishlist, Bag, Account */}
          <div className="flex md:flex-1 items-center justify-end gap-1 sm:gap-1.5 lg:gap-2">
            {/* Search Trigger (Desktop & Tablet only - Mobile has it in bottom nav) */}
            <button
              type="button"
              onClick={toggleSearch}
              className="hidden md:flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer text-gray-700"
              aria-label="Search"
            >
              <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>

            {/* Wishlist (Desktop & Tablet only - Mobile has it in bottom nav) */}
            <Link
              href="/wishlist"
              className={`hidden md:flex relative h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full active:scale-95 transition-all ${
                pathname === "/wishlist"
                  ? "text-[#6C080C] bg-[#FAF2F2] border border-[#E8D2D4]/70"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              aria-label={`Wishlist (${totalWishlistItems} items)`}
            >
              <Heart className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${pathname === "/wishlist" ? "fill-[#6C080C] stroke-[#6C080C]" : ""}`} />
              {totalWishlistItems > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#6C080C] px-1 text-[8.5px] font-bold text-white shadow-xs">
                  {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Shopping Bag (Desktop & Tablet only - Mobile has it in bottom nav) */}
            <button
              type="button"
              onClick={openCart}
              className="hidden md:flex relative h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full hover:bg-stone-100 active:scale-95 transition-colors cursor-pointer text-stone-700"
              aria-label={`Shopping bag (${totalQuantity} items)`}
            >
              <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {totalQuantity > 0 && (
                <span 
                  className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[8.5px] font-bold text-white shadow-xs bg-[#6C080C]"
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </button>

            {/* Account Profile (Always visible on Mobile, Tablet & Desktop) */}
            <Link
              href="/account"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-colors text-gray-700"
              aria-label="Customer Account"
            >
              <User className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
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
