"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Gem,
  Truck,
  Heart,
  ShieldCheck,
  Crown,
  Flame,
} from "lucide-react";

const quickCategoryPills = [
  { label: "All Collections", href: "/collections", icon: Sparkles },
  { label: "Kerala Bridal Sets", href: "/collections/bridal-jewellery", icon: Crown },
  { label: "Necklaces & Chokers", href: "/collections/necklaces", icon: Gem },
  { label: "Earrings & Jhumkas", href: "/collections/earrings", icon: Flame },
  { label: "Bangles & Kadas", href: "/collections/bangles", icon: ShieldCheck },
  { label: "Solitaires & Rings", href: "/collections/rings", icon: Gem },
  { label: "Daily Payals", href: "/collections/anklets", icon: Sparkles },
];

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden transition-colors"
      style={{
        backgroundColor: "#16070a",
      }}
      aria-label="Nakshatra Collections - Your Everyday Sparkle"
    >
      {/* ================================================================= */}
      {/* 1. HERO BANNER - FULL VIEWPORT HEIGHT ON MOBILE & DESKTOP         */}
      {/* ================================================================= */}
      <div className="relative w-full min-h-[calc(100svh-4rem)] sm:min-h-[620px] lg:min-h-[680px] xl:min-h-[720px] flex flex-col justify-end sm:justify-center">
        {/* Background Image: Desktop Landscape (16:9) */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <Image
            src="/images/hero/hero-desktop.webp"
            alt="Nakshatra Collections Artificial Jewellery Model"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Background Image: Mobile Portrait (9:16 Full Viewport Height) */}
        <div className="absolute inset-0 z-0 sm:hidden">
          <Image
            src="/images/hero/hero-mobile.webp"
            alt="Nakshatra Collections Artificial Jewellery Model"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Desktop Gradient Scrim (Right side shadow for text) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(22, 7, 10, 0.1) 0%, rgba(22, 7, 10, 0.4) 45%, rgba(22, 7, 10, 0.88) 70%, rgba(22, 7, 10, 0.96) 100%)",
          }}
        />

        {/* Tablet Gradient Scrim */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden sm:block lg:hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(22, 7, 10, 0.25) 0%, rgba(22, 7, 10, 0.7) 50%, rgba(22, 7, 10, 0.94) 100%)",
          }}
        />

        {/* Mobile Scrim: Soft shadow at top & rich velvet gradient at the bottom */}
        <div
          className="absolute inset-0 z-10 pointer-events-none sm:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(22, 7, 10, 0.96) 0%, rgba(22, 7, 10, 0.8) 32%, rgba(22, 7, 10, 0.1) 58%, transparent 75%)",
          }}
        />

        {/* =============================================================== */}
        {/* 2. OVERLAY CONTENT (DESKTOP & MOBILE TAILORED)                  */}
        {/* =============================================================== */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-16 w-full text-white">
          {/* DESKTOP & TABLET CONTENT */}
          <div className="hidden sm:flex flex-col lg:flex-row lg:items-center lg:justify-end">
            <div className="w-full lg:max-w-xl xl:max-w-2xl flex flex-col items-start text-left">
              {/* Brand Logo & Circular Emblem */}
              <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full liquid-glass-dark border border-amber-400/30 mb-4 sm:mb-6 shadow-xl backdrop-blur-md">
                <div className="relative h-9 w-9 sm:h-11 sm:w-11 shrink-0 rounded-full overflow-hidden border border-amber-400/40 bg-black/40 p-1">
                  <Image
                    src="/nakshatra-logo.png"
                    alt="Nakshatra Collections Logo"
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif tracking-[0.22em] text-xs sm:text-sm font-semibold uppercase text-amber-200 leading-none">
                    NAKSHATRA
                  </span>
                  <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.16em] uppercase text-neutral-300 font-medium leading-none mt-1">
                    FANCY JEWELLERY &bull; COSMETICS &bull; GIFTS
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] tracking-tight">
                Your Everyday{" "}
                <span className="relative inline-block text-amber-200 italic font-serif">
                  Sparkle
                  <span className="inline-block ml-1.5 not-italic text-amber-300 animate-pulse text-2xl sm:text-4xl align-top">
                    ✦
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-200/90 font-light max-w-lg leading-relaxed">
                A beautiful collection of anti-tarnish artificial jewellery, 18K gold plated essentials &amp; bridal masterpieces for every moment.
              </p>

              {/* 4 Brand Benefits Grid */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-lg">
                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/10 text-amber-300 shadow-inner">
                    <Gem className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-neutral-200 leading-snug">
                    Trendy Collections
                  </span>
                </div>

                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/10 text-amber-300 shadow-inner font-bold text-sm">
                    ₹
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-neutral-200 leading-snug">
                    Affordable Prices
                  </span>
                </div>

                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/10 text-amber-300 shadow-inner">
                    <Truck className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-neutral-200 leading-snug">
                    All India Shipping
                  </span>
                </div>

                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/10 text-amber-300 shadow-inner">
                    <Heart className="h-4 w-4 fill-amber-300/30" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-neutral-200 leading-snug">
                    Loved by Customers
                  </span>
                </div>
              </div>

              {/* Primary "Shop Now" Action Button */}
              <div className="mt-8 sm:mt-10 flex items-center gap-4">
                <Link
                  href="/collections"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                  style={{
                    backgroundColor: "#F3DEC0",
                    color: "#281206",
                  }}
                  aria-label="Shop Now - View All Jewellery Collections"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/collections/bridal-jewellery"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-200/90 hover:text-white transition hover:underline"
                >
                  <span>Bridal Sets</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* MOBILE STREAMLINED LUXURY LAYOUT (Full Viewport Height)         */}
          {/* =============================================================== */}
          <div className="flex sm:hidden flex-col items-center text-center pb-2">
            {/* Minimalist Brand Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-dark border border-amber-400/30 mb-2 shadow-md">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-200">
                Nakshatra Collections
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl xs:text-3xl font-normal text-white leading-tight">
              Your Everyday{" "}
              <span className="text-amber-200 italic font-serif">
                Sparkle ✦
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-1 text-[11px] text-neutral-200/90 font-light max-w-xs leading-relaxed">
              18K Gold Plated &bull; Anti-Tarnish &bull; Kerala Bridal Jewellery
            </p>

            {/* Shop Now Button */}
            <div className="mt-3.5">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-2xl cursor-pointer"
                style={{
                  backgroundColor: "#F3DEC0",
                  color: "#281206",
                }}
                aria-label="Shop Now"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. MOBILE BENEFIT BAR + CATEGORY QUICK STRIP                       */}
      {/* ================================================================= */}
      <div
        className="w-full border-t border-white/10 py-3 sm:py-4"
        style={{
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile Only: 4 Horizontal Quick Trust Badges */}
          <div className="grid grid-cols-4 gap-2 sm:hidden pb-3 mb-2 border-b border-white/10 text-center">
            <div className="flex flex-col items-center">
              <Gem className="h-3.5 w-3.5 text-amber-400 mb-0.5" />
              <span className="text-[9px] font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                Trendy
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-amber-400 leading-none mb-0.5">₹</span>
              <span className="text-[9px] font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                Affordable
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-3.5 w-3.5 text-amber-400 mb-0.5" />
              <span className="text-[9px] font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                All India
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-3.5 w-3.5 text-amber-400 mb-0.5" />
              <span className="text-[9px] font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                4.9★ Loved
              </span>
            </div>
          </div>

          {/* Quick Category Pills Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-widest shrink-0 flex items-center gap-1.5 pl-1"
              style={{ color: "var(--accent-gold)" }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Explore:</span>
            </span>

            <div className="flex items-center gap-2 min-w-max">
              {quickCategoryPills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <Link
                    key={pill.label}
                    href={pill.href}
                    className="group flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border card-lift active:scale-95 shadow-xs"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Icon
                      className="h-3.5 w-3.5 transition-transform group-hover:scale-110"
                      style={{ color: "var(--accent-gold)" }}
                    />
                    <span>{pill.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
