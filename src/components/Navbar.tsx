"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu, X, ShoppingBag, Search } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections/necklaces" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "About", href: "/#about-story" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalQuantity, openCart } = useCart();

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="w-full py-2 px-4 text-center text-[11px] font-medium tracking-widest uppercase transition-colors"
        style={{
          backgroundColor: "var(--accent-cta)",
          color: "var(--accent-cta-text)",
        }}
      >
        <span>Complimentary Insured Worldwide Shipping On All Orders Over ₹2,000</span>
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
        <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-xl transition-colors"
              style={{ color: "var(--text-primary)" }}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Official Brand Logo - Nakshatra */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-2.5 sm:gap-3.5 transition-transform hover:scale-[1.02] py-1"
              aria-label="NAKSHATRA Home"
            >
              <div className="relative h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA"
                  fill
                  sizes="(max-width: 640px) 44px, (max-width: 768px) 52px, 56px"
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span
                  className="font-serif-luxury text-xl sm:text-2xl md:text-[26px] font-bold tracking-[0.2em] uppercase leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  NAKSHATRA
                </span>
                <span
                  className="text-[8px] sm:text-[9px] font-medium tracking-[0.3em] uppercase leading-none mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Fine Jewellery
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Button (Desktop) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex items-center justify-center p-2 rounded-full transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Search Collection"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Visual Theme Switcher */}
            <ThemeSwitcher />

            {/* Shopping Bag / Cart */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center justify-center p-2 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ color: "var(--text-primary)" }}
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-xs animate-in zoom-in"
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
            className="border-t py-4 px-4 sm:px-8 animate-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="mx-auto max-w-2xl flex items-center gap-3">
              <Search className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
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
                className="text-xs font-semibold px-2 py-1 rounded"
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
            className="md:hidden border-b px-6 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-medium)",
            }}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase py-2 border-b"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-2 flex items-center justify-between">
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
