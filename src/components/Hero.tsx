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
        backgroundColor: "var(--bg-primary)",
      }}
      aria-label="Nakshatra Collections Featured Showcase"
    >
      {/* 1. Ambient Background Glow Effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(201, 164, 92, 0.25) 0%, rgba(120, 20, 30, 0.15) 50%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-6 sm:pb-8">
        {/* ================================================================= */}
        {/* 2. MAIN CLICKABLE HERO BANNER                                     */}
        {/* ================================================================= */}
        <Link
          href="/collections"
          className="group relative block w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,164,92,0.22)] border cursor-pointer active:scale-[0.99]"
          style={{
            borderColor: "var(--border-medium)",
            backgroundColor: "#2a080c",
          }}
          aria-label="Shop Nakshatra Collections - Your Everyday Sparkle"
        >
          {/* Banner Graphic Image */}
          <Image
            src="/images/hero-banner.jpg"
            alt="Nakshatra Collections - Your Everyday Sparkle Artificial Jewellery"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />

          {/* Interactive Hover Vignette / Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Floating Subtle Click Prompt Badge on Desktop */}
          <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-dark text-white text-xs font-semibold uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span>Explore All Categories</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* ================================================================= */}
        {/* 3. QUICK 1-TAP CATEGORIES STRIP                                   */}
        {/* ================================================================= */}
        <div className="mt-4 sm:mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
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
                  className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border card-lift active:scale-95 shadow-xs"
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

        {/* ================================================================= */}
        {/* 4. KEY BRAND VALUES & ASSURANCE TICKER                            */}
        {/* ================================================================= */}
        <div
          className="mt-6 p-3.5 sm:p-4 rounded-2xl border liquid-glass"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl shrink-0 border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--accent-gold)",
                }}
              >
                <Gem className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold font-serif leading-tight" style={{ color: "var(--text-primary)" }}>
                  Trendy Collections
                </span>
                <span className="text-[10px] font-light opacity-75" style={{ color: "var(--text-secondary)" }}>
                  Fresh 2026 Designs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl shrink-0 border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--accent-gold)",
                }}
              >
                <span className="text-xs font-bold">₹</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold font-serif leading-tight" style={{ color: "var(--text-primary)" }}>
                  Affordable Prices
                </span>
                <span className="text-[10px] font-light opacity-75" style={{ color: "var(--text-secondary)" }}>
                  18K Gold Finish Daily Wear
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl shrink-0 border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--accent-gold)",
                }}
              >
                <Truck className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold font-serif leading-tight" style={{ color: "var(--text-primary)" }}>
                  All India Shipping
                </span>
                <span className="text-[10px] font-light opacity-75" style={{ color: "var(--text-secondary)" }}>
                  Fast Kerala Delivery
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl shrink-0 border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--accent-gold)",
                }}
              >
                <Heart className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold font-serif leading-tight" style={{ color: "var(--text-primary)" }}>
                  Loved by Customers
                </span>
                <span className="text-[10px] font-light opacity-75" style={{ color: "var(--text-secondary)" }}>
                  4.9★ Kerala Brides &amp; Girls
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
