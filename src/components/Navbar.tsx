"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections/necklaces" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "About", href: "/#about-story" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="w-full py-2 px-3 sm:px-4 text-center text-[10px] sm:text-[11px] font-medium tracking-widest uppercase transition-colors overflow-hidden"
        style={{
          backgroundColor: "var(--accent-cta)",
          color: "var(--accent-cta-text)",
        }}
      >
        <span className="line-clamp-1">Complimentary Insured Worldwide Shipping On All Orders Over ₹2,000</span>
      </div>

      {/* Main Navbar */}
      <header
        className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-subtle)",
          opacity: 0.98,
        }}
      >
        <div className="mx-auto flex h-18 sm:h-22 md:h-24 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Mobile Hamburger Toggle & Search */}
          <div className="flex lg:hidden items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-xl transition-colors active:scale-95"
              style={{ color: "var(--text-primary)" }}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl transition-colors active:scale-95"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Official Brand Logo - Nakshatra */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3 transition-transform hover:scale-[1.01] py-1"
              aria-label="NAKSHATRA Home"
            >
              <div className="relative h-9 w-9 sm:h-12 sm:w-12 md:h-13 md:w-13 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA"
                  fill
                  sizes="(max-width: 640px) 36px, (max-width: 768px) 48px, 52px"
                  className="object-contain drop-shadow-xs"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span
                  className="font-serif-luxury text-lg sm:text-2xl md:text-[24px] font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  NAKSHATRA
                </span>
                <span
                  className="text-[7.5px] sm:text-[9px] font-medium tracking-[0.28em] uppercase leading-none mt-0.5 sm:mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Fine Jewellery
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium tracking-widest uppercase transition-colors hover:opacity-100"
                style={{
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cta)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Theme Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Button (Desktop) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden lg:flex items-center justify-center p-2 rounded-full transition-colors hover:opacity-80 active:scale-95"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search Collection"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Wishlist Header Button */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center p-2 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ color: "var(--text-primary)" }}
              aria-label={`View Wishlist (${totalWishlistItems} items)`}
            >
              <Heart className={`h-5 w-5 ${totalWishlistItems > 0 ? "text-rose-600 fill-rose-600" : ""}`} />
              {totalWishlistItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-xs animate-in zoom-in"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Visual Theme Switcher */}
            <div className="hidden xs:block">
              <ThemeSwitcher />
            </div>

            {/* Shopping Bag / Cart */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center justify-center p-2 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ color: "var(--text-primary)" }}
              aria-label={`Open shopping bag (${totalQuantity} items)`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-xs animate-in zoom-in"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Search Drawer Bar */}
        {isSearchOpen && (
          <div
            className="border-t py-3.5 px-4 sm:px-8 animate-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="mx-auto max-w-2xl flex items-center gap-3">
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--accent-gold)" }} />
              <input
                type="text"
                placeholder="Search necklaces, earrings, rings, bracelets..."
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-xs"
                style={{
                  color: "var(--text-primary)",
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-semibold px-2 py-1 rounded shrink-0 cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                ESC
              </button>
            </div>
          </div>
        )}

        {/* Mobile Dropdown Navigation */}
        {isOpen && (
          <div
            className="lg:hidden border-b px-5 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-medium)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase py-3 border-b transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <span>{item.label}</span>
                  {item.label === "Wishlist" && totalWishlistItems > 0 && (
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: "var(--accent-cta)" }}
                    >
                      {totalWishlistItems}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Visual Theme</span>
                <ThemeSwitcher />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
