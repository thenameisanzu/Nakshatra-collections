"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Heart,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const categories = [
  { label: "Necklaces & Pendants", href: "/collections/necklaces", icon: "📿", desc: "Chokers & Layered Gold Chains" },
  { label: "Earrings & Drops", href: "/collections/earrings", icon: "💎", desc: "Daily Studs, Jhumkas & Pearls" },
  { label: "Rings & Solitaires", href: "/collections/rings", icon: "💍", desc: "American Diamond & Adjustable Bands" },
  { label: "Bracelets & Bangles", href: "/collections/bracelets", icon: "🌟", desc: "Waterproof Cuffs & Clover Links" },
  { label: "Jewellery Sets", href: "/collections/jewellery-sets", icon: "👑", desc: "Kerala Bridal & Festive Sets" },
  { label: "New Arrivals", href: "/collections/new-arrivals", icon: "🔥", desc: "Fresh Designs & Latest Trends" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection for liquid glass transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Top Announcement Bar */}
      <div
        className="relative z-50 w-full py-1.5 px-4 text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
        style={{
          backgroundColor: "var(--accent-cta)",
          color: "var(--accent-cta-text)",
        }}
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3 animate-pulse text-amber-300" />
          <span>Free Express Delivery Across Kerala &amp; India &bull; 100% Anti-Tarnish Jewellery</span>
          <Sparkles className="h-3 w-3 animate-pulse text-amber-300" />
        </span>
      </div>

      {/* Main Liquid Glass Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "liquid-glass shadow-sm py-2.5 sm:py-3 border-b"
            : "bg-transparent py-3 sm:py-4 border-b border-transparent"
        }`}
        style={{
          borderColor: isScrolled ? "var(--glass-border)" : "transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Insignia */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-colors active:scale-90 cursor-pointer"
                style={{
                  color: "var(--text-primary)",
                  backgroundColor: isScrolled ? "transparent" : "var(--glass-bg)",
                }}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Logo Link */}
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-2.5 transition-transform hover:scale-[1.01]"
              aria-label="NAKSHATRA Collections - Artificial Jewellery Store"
            >
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA Collections"
                  fill
                  sizes="(max-width: 640px) 32px, 40px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col text-left">
                <span
                  className="font-serif-luxury text-base sm:text-xl lg:text-2xl font-normal tracking-[0.18em] sm:tracking-[0.2em] uppercase leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  NAKSHATRA
                </span>
                <span
                  className="text-[6.5px] sm:text-[8px] font-semibold tracking-[0.25em] uppercase leading-none mt-0.5 sm:mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  COLLECTIONS
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <Link
              href="/"
              className="group relative text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="transition-colors group-hover:text-[color:var(--accent-cta)]">
                Home
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            </Link>

            {/* Interactive Categories Dropdown */}
            <div
              className="relative"
              ref={categoryMenuRef}
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="group flex items-center gap-1 text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer"
                style={{ color: isCategoryOpen ? "var(--accent-cta)" : "var(--text-secondary)" }}
                aria-expanded={isCategoryOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: "var(--accent-gold)" }}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {isCategoryOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[420px] animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div
                    className="rounded-3xl p-4 shadow-2xl border liquid-glass"
                    style={{
                      backgroundColor: "var(--bg-surface-elevated)",
                      borderColor: "var(--border-medium)",
                    }}
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                        Shop By Category
                      </span>
                      <Link
                        href="/collections"
                        onClick={() => setIsCategoryOpen(false)}
                        className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition hover:underline"
                        style={{ color: "var(--accent-cta)" }}
                      >
                        <span>All Categories</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-start gap-2.5 p-2.5 rounded-2xl transition-all hover:bg-black/5 active:scale-95 group"
                        >
                          <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                              {cat.label}
                            </span>
                            <span className="text-[10px] line-clamp-1" style={{ color: "var(--text-muted)" }}>
                              {cat.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/collections/new-arrivals"
              className="group relative text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="transition-colors group-hover:text-[color:var(--accent-cta)]">
                New Arrivals
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            </Link>

            <Link
              href="/#editorial-story"
              className="group relative text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="transition-colors group-hover:text-[color:var(--accent-cta)]">
                Our Story
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            </Link>

            <Link
              href="/#contact"
              className="group relative text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="transition-colors group-hover:text-[color:var(--accent-cta)]">
                Contact
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
            </Link>
          </nav>

          {/* Right: Action Icons & Theme Switcher */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full transition-all liquid-glass liquid-glass-hover active:scale-95 cursor-pointer shrink-0"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search Catalogue"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full transition-all liquid-glass liquid-glass-hover active:scale-95 shrink-0"
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
                  className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full text-[8.5px] sm:text-[9px] font-bold text-white shadow-xs animate-in zoom-in"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full transition-all liquid-glass liquid-glass-hover active:scale-95 cursor-pointer shrink-0"
              style={{ color: "var(--text-primary)" }}
              aria-label={`Shopping bag with ${totalQuantity} items`}
            >
              <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {totalQuantity > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full text-[8.5px] sm:text-[9px] font-bold text-white shadow-xs animate-in zoom-in"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Visual 3-Theme Switcher (Desktop & Tablets) */}
            <div className="hidden sm:block pl-0.5">
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Liquid Glass Search Drawer */}
        {isSearchOpen && (
          <div
            className="border-t py-4 px-4 sm:px-8 animate-in slide-in-from-top-3 duration-200 liquid-glass"
            style={{
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="mx-auto max-w-2xl flex items-center gap-3">
              <Search className="h-4.5 w-4.5 shrink-0" style={{ color: "var(--accent-gold)" }} />
              <input
                type="text"
                placeholder="Search necklace, earrings, diamond ring, bracelet..."
                className="w-full bg-transparent text-sm font-sans focus:outline-none placeholder:text-xs"
                style={{
                  color: "var(--text-primary)",
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border liquid-glass"
                style={{ color: "var(--text-secondary)" }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[calc(var(--spacing)*12)] z-50 lg:hidden flex flex-col justify-between p-6 sm:p-8 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto"
            style={{
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                  Menu &amp; Categories
                </span>
                <ThemeSwitcher />
              </div>

              {/* Quick Categories Bar in Mobile Drawer */}
              <div className="py-2">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  Explore Categories:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-2xl border liquid-glass text-xs font-semibold"
                      style={{
                        color: "var(--text-primary)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <nav className="flex flex-col gap-1 mt-2 border-t pt-3" style={{ borderColor: "var(--border-subtle)" }}>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-serif-luxury"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span>Home</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>

                <Link
                  href="/collections"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-serif-luxury"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span>All Categories Hub</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-serif-luxury"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="h-4.5 w-4.5 text-rose-600" />
                    <span>Wishlist</span>
                  </span>
                  {totalWishlistItems > 0 && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: "var(--accent-cta)" }}
                    >
                      {totalWishlistItems}
                    </span>
                  )}
                </Link>

                <Link
                  href="/#editorial-story"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-serif-luxury"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span>Our Story</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>

                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-serif-luxury"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span>Contact &amp; Support</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </nav>
            </div>

            {/* Mobile Footer Inside Drawer */}
            <div className="pt-4 border-t mt-6 flex flex-col gap-2" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-center" style={{ color: "var(--accent-gold)" }}>
                NAKSHATRA COLLECTIONS &bull; KERALA
              </p>
              <p className="text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
                100% Anti-Tarnish Jewellery &bull; Express Tracked Courier
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
