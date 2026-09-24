"use client";

import { useState, useEffect } from "react";
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
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/#collections" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "About", href: "/#editorial-story" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();

  // Scroll detection for liquid glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      {/* Top Privilege Announcement Bar */}
      <div
        className="relative z-50 w-full py-1.5 px-4 text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
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
            ? "liquid-glass shadow-sm py-2 sm:py-3 border-b"
            : "bg-transparent py-3 sm:py-4 border-b border-transparent"
        }`}
        style={{
          borderColor: isScrolled ? "var(--glass-border)" : "transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Official Brand Logo & Name */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:scale-90 cursor-pointer"
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

            {/* Logo Mark */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.01]"
              aria-label="NAKSHATRA Collections - Artificial Jewellery Store"
            >
              <div className="relative h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA Collections"
                  fill
                  sizes="(max-width: 640px) 36px, 48px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col text-left">
                <span
                  className="font-serif-luxury text-lg sm:text-2xl md:text-[22px] font-normal tracking-[0.2em] uppercase leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  NAKSHATRA
                </span>
                <span
                  className="text-[7.5px] sm:text-[8.5px] font-semibold tracking-[0.28em] uppercase leading-none mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  COLLECTIONS
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="transition-colors group-hover:text-[color:var(--accent-cta)]">
                  {item.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                />
              </Link>
            ))}
          </nav>

          {/* Right: Action Icons & Theme Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search (Desktop & Mobile) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all liquid-glass liquid-glass-hover active:scale-95 cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search Catalogue"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all liquid-glass liquid-glass-hover active:scale-95"
              style={{ color: "var(--text-primary)" }}
              aria-label={`Wishlist with ${totalWishlistItems} saved items`}
            >
              <Heart
                className={`h-4.5 w-4.5 transition-colors ${
                  totalWishlistItems > 0 ? "fill-rose-600 text-rose-600" : ""
                }`}
              />
              {totalWishlistItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-xs animate-in zoom-in"
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
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all liquid-glass liquid-glass-hover active:scale-95 cursor-pointer"
              style={{ color: "var(--text-primary)" }}
              aria-label={`Shopping bag with ${totalQuantity} items`}
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalQuantity > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-xs animate-in zoom-in"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Visual 3-Theme Switcher */}
            <div className="block pl-0.5 sm:pl-1">
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
                placeholder="Search by necklace, earrings, diamond solitaire, bracelet..."
                className="w-full bg-transparent text-sm font-serif-luxury focus:outline-none placeholder:text-xs placeholder:font-sans"
                style={{
                  color: "var(--text-primary)",
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer hover:opacity-80"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Mobile Full-Screen Liquid Glass Navigation Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[calc(var(--spacing)*12)] z-50 lg:hidden flex flex-col justify-between p-6 sm:p-8 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto"
            style={{
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--accent-gold)" }}>
                  Nakshatra Directory
                </span>
                <ThemeSwitcher />
              </div>

              <nav className="flex flex-col gap-2 mt-4">
                {navLinks.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3.5 px-3 rounded-2xl text-base font-serif-luxury transition-all duration-200 active:scale-98"
                    style={{
                      color: "var(--text-primary)",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <span className="tracking-wide text-lg">{item.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-50" style={{ color: "var(--accent-gold)" }} />
                  </Link>
                ))}

                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-2xl text-base font-serif-luxury transition-all duration-200 active:scale-98"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="tracking-wide text-lg flex items-center gap-2">
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
              </nav>
            </div>

            {/* Mobile Footer Inside Drawer */}
            <div className="pt-6 border-t mt-8 flex flex-col gap-3" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-center" style={{ color: "var(--accent-gold)" }}>
                NAKSHATRA COLLECTIONS &bull; ARTIFICIAL JEWELLERY STORE
              </p>
              <p className="text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
                Premium Anti-Tarnish Jewellery &bull; Insured All-India Express Transit
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
