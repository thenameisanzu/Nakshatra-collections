"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Heart,
  User,
  Sparkles,
  ArrowRight,
  Crown,
  Gem,
  Droplets,
  CircleDot,
  Flame,
  Tag,
  type LucideIcon,
} from "lucide-react";

interface CategoryNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  isHot?: boolean;
}

const navCategories: CategoryNavItem[] = [
  { label: "All Jewellery", href: "/#products", icon: Sparkles },
  { label: "Necklaces & Pendants", href: "/collections/necklaces", icon: Gem },
  { label: "Earrings & Drops", href: "/collections/earrings", icon: Heart },
  { label: "Kerala Bridal Sets", href: "/collections/bridal-jewellery", icon: Crown, isHot: true },
  { label: "Bangles & Cuffs", href: "/collections/bangles", icon: Droplets },
  { label: "Solitaire Rings", href: "/collections/rings", icon: CircleDot },
  { label: "New In 2026", href: "/collections/new-arrivals", icon: Flame, isHot: true },
  { label: "Deals Under ₹999", href: "/collections/rings", icon: Tag },
];

const searchPlaceholders = [
  "Search '18K Gold Necklace'...",
  "Search 'Kerala Bridal Choker'...",
  "Search 'Anti-Tarnish Clover Bracelet'...",
  "Search 'American Diamond Rings'...",
  "Search 'Waterproof Payals'...",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const router = useRouter();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Placeholder animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

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
      {/* 1. Top Announcement Marquee */}
      <div
        className="relative z-50 w-full py-1.5 px-4 text-center text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors"
        style={{
          backgroundColor: "var(--accent-cta)",
          color: "var(--accent-cta-text)",
        }}
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-amber-300 opacity-90" />
          <span>100% Anti-Tarnish 18K Gold Plated Jewellery &bull; Express Tracked Courier in Kerala</span>
          <Sparkles className="h-3 w-3 text-amber-300 opacity-90" />
        </span>
      </div>

      {/* 2. Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "liquid-glass shadow-sm py-2.5 sm:py-3"
            : "bg-[var(--bg-primary)] py-3 sm:py-3.5"
        }`}
        style={{
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          {/* Mobile: Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors active:scale-90 cursor-pointer"
              style={{ color: "var(--text-primary)" }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Left / Center: Brand Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start sm:items-center text-left sm:text-center transition-transform hover:scale-[1.01]"
            aria-label="NAKSHATRA Collections"
          >
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className="font-serif text-lg sm:text-2xl font-normal tracking-[0.2em] uppercase leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                NAKSHATRA
              </span>
            </div>
            <span
              className="text-[7.5px] sm:text-[8px] font-semibold tracking-[0.3em] uppercase leading-none mt-1 opacity-80"
              style={{ color: "var(--accent-gold)" }}
            >
              COLLECTIONS
            </span>
          </Link>

          {/* Center (Desktop): App Search Bar with Live Placeholder */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholders[placeholderIndex]}
                className="w-full pl-10 pr-4 py-2 rounded-full border text-xs outline-hidden transition-all duration-300 focus:border-[var(--accent-gold)] shadow-xs"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                }}
              />
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none opacity-60"
                style={{ color: "var(--text-muted)" }}
              />
            </form>
          </div>

          {/* Right: Actions, Theme Switcher, Account, Wishlist, Bag */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-black/5 active:scale-95 cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* 3-Theme Switcher */}
            <div className="pl-0.5">
              <ThemeSwitcher />
            </div>

            {/* Customer Account */}
            <Link
              href="/account"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-black/5 active:scale-95 cursor-pointer"
              style={{ color: "var(--text-primary)" }}
              aria-label="Customer Account & Order Tracking"
            >
              <User className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </Link>

            {/* Desktop Only: Wishlist (On mobile, lives in bottom navigation) */}
            <Link
              href="/wishlist"
              className="relative hidden md:flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-black/5 active:scale-95 shrink-0"
              style={{ color: "var(--text-primary)" }}
              aria-label={`Wishlist with ${totalWishlistItems} saved items`}
            >
              <Heart
                className={`h-4 w-4 sm:h-4.5 sm:w-4.5 transition-colors ${
                  totalWishlistItems > 0 ? "fill-rose-600 text-rose-600" : ""
                }`}
              />
              {totalWishlistItems > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[8.5px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Desktop Only: Shopping Bag (On mobile, lives in bottom navigation) */}
            <button
              type="button"
              onClick={openCart}
              className="relative hidden md:flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-black/5 active:scale-95 cursor-pointer shrink-0"
              style={{ color: "var(--text-primary)" }}
              aria-label={`Shopping bag with ${totalQuantity} items`}
            >
              <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {totalQuantity > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[8.5px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay Bar */}
        {isSearchOpen && (
          <div
            className="lg:hidden border-t py-3 px-4 animate-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search necklaces, earrings, bridal sets..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-full border text-xs outline-hidden focus:border-[var(--accent-gold)]"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                }}
              />
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
                style={{ color: "var(--text-muted)" }}
              />
            </form>
          </div>
        )}

        {/* 3. Secondary Desktop Navigation Menu Bar */}
        <nav
          className="hidden lg:flex items-center justify-center gap-7 pt-2.5 mt-2 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {navCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors hover:opacity-75 flex items-center gap-1.5 py-0.5 group"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{cat.label}</span>
              {cat.isHot && (
                <span
                  className="px-1.5 py-0.2 rounded-md text-[8px] font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  Hot
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* 4. Mobile Navigation Drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[calc(var(--spacing)*12)] z-50 lg:hidden flex flex-col justify-between p-6 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
            style={{
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                  Menu
                </span>
                <ThemeSwitcher />
              </div>

              {/* Main Category Links */}
              <nav className="flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-lg font-serif font-normal border-b"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
                >
                  Home
                </Link>

                <Link
                  href="/collections"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-lg font-serif font-normal border-b flex items-center justify-between"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
                >
                  <span>All Categories (8)</span>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Link>

                <div className="py-2 pl-3 flex flex-col gap-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                  {navCategories.slice(1).map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="py-1.5 text-xs font-semibold tracking-wider uppercase flex items-center justify-between"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className="flex items-center gap-2">
                        <cat.icon className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                        <span>{cat.label}</span>
                      </span>
                      {cat.isHot && (
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white bg-rose-600">
                          HOT
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/our-story"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-lg font-serif font-normal border-b"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
                >
                  Our Story &amp; Craftsmanship
                </Link>

                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-lg font-serif font-normal border-b flex items-center justify-between"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
                >
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
                    <span>My Account &amp; Track Orders</span>
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Link>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t mt-6 text-center" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--accent-gold)" }}>
                NAKSHATRA COLLECTIONS &bull; KERALA
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
