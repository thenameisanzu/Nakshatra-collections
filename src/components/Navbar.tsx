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
  ChevronDown,
  Crown,
  Gem,
  Droplets,
  CircleDot,
  Flame,
  type LucideIcon,
} from "lucide-react";

interface CategoryNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  desc: string;
}

const categories: CategoryNavItem[] = [
  { label: "Necklaces & Pendants", href: "/collections/necklaces", icon: Gem, desc: "Chokers & Layered Chains" },
  { label: "Earrings & Drops", href: "/collections/earrings", icon: Sparkles, desc: "Daily Studs & Jhumkas" },
  { label: "Kerala Bridal Sets", href: "/collections/bridal-jewellery", icon: Crown, desc: "Heritage Temple Jewellery" },
  { label: "Bangles & Cuffs", href: "/collections/bangles", icon: Droplets, desc: "Waterproof 316L Cuffs" },
  { label: "Solitaires & Rings", href: "/collections/rings", icon: CircleDot, desc: "American Diamond Solitaires" },
  { label: "Necklace Sets", href: "/collections/necklace-sets", icon: Crown, desc: "Matching Bridal Sets" },
  { label: "Daily Payals", href: "/collections/anklets", icon: Sparkles, desc: "Anti-Tarnish Payals" },
  { label: "New Arrivals 2026", href: "/collections/new-arrivals", icon: Flame, desc: "Fresh 18K Additions" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      {/* 1. Top Announcement Strip */}
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

      {/* 2. Unified Single Luxury Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "liquid-glass shadow-sm py-3"
            : "bg-[var(--bg-primary)] py-3.5 sm:py-4"
        }`}
        style={{
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Trigger */}
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

          {/* Left: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div
              className="relative"
              ref={categoryMenuRef}
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="group flex items-center gap-1 text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer"
                style={{ color: isCategoryOpen ? "var(--accent-cta)" : "var(--text-secondary)" }}
                aria-expanded={isCategoryOpen}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: "var(--accent-gold)" }}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 pt-2 z-50 w-[380px] animate-in fade-in slide-in-from-top-2 duration-200">
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
                        <span>All (8)</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-start gap-2.5 p-2 rounded-2xl transition-all hover:bg-black/5 group"
                        >
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-xl shrink-0 border"
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              borderColor: "var(--border-subtle)",
                            }}
                          >
                            <cat.icon
                              className="h-3.5 w-3.5 group-hover:scale-110 transition-transform"
                              style={{ color: "var(--accent-gold)" }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-serif font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                              {cat.label}
                            </span>
                            <span className="text-[9.5px] line-clamp-1 opacity-70 font-light" style={{ color: "var(--text-muted)" }}>
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
              href="/collections/necklaces"
              className="text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:opacity-75"
              style={{ color: "var(--text-secondary)" }}
            >
              Necklaces
            </Link>

            <Link
              href="/collections/earrings"
              className="text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:opacity-75"
              style={{ color: "var(--text-secondary)" }}
            >
              Earrings
            </Link>

            <Link
              href="/collections/bridal-jewellery"
              className="text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:opacity-75"
              style={{ color: "var(--text-secondary)" }}
            >
              Bridal
            </Link>

            <Link
              href="/collections/new-arrivals"
              className="text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:opacity-75"
              style={{ color: "var(--accent-cta)" }}
            >
              New In
            </Link>
          </nav>

          {/* Center: Brand Logo */}
          <Link
            href="/"
            className="group flex flex-col items-center text-center transition-transform hover:scale-[1.01]"
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
                className="font-serif text-lg sm:text-2xl font-normal tracking-[0.22em] uppercase leading-none"
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

          {/* Right: Search, Theme Switcher, Account, Wishlist, Bag */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-black/5 active:scale-95 cursor-pointer shrink-0"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search catalogue"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* 6-Theme Switcher */}
            <div className="pl-0.5">
              <ThemeSwitcher />
            </div>

            {/* Customer Account */}
            <Link
              href="/account"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-black/5 active:scale-95 shrink-0"
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

        {/* Search Overlay Bar */}
        {isSearchOpen && (
          <div
            className="border-t py-3 px-4 sm:px-8 animate-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="mx-auto max-w-xl flex items-center gap-3">
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--accent-gold)" }} />
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  type="text"
                  placeholder="Search 18K necklaces, bridal chokers, bangles, rings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-xs sm:text-sm font-medium outline-hidden placeholder:text-[var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                />
              </form>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs uppercase tracking-wider font-semibold opacity-60 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
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

              {/* Main Links */}
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
                  <span>All Collections (8)</span>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Link>

                <div className="py-2 pl-3 flex flex-col gap-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="py-1 text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <cat.icon className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                      <span>{cat.label}</span>
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
