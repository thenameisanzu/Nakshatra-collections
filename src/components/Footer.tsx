"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Gem, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Top Value Strip */}
      <div
        className="border-b py-8"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Sparkles className="h-5 w-5 mb-2" style={{ color: "var(--accent-gold)" }} />
              <h4 className="text-xs font-bold uppercase tracking-wider font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                18K Gold Polish
              </h4>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                Real Gold Radiance
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-5 w-5 mb-2" style={{ color: "var(--accent-gold)" }} />
              <h4 className="text-xs font-bold uppercase tracking-wider font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                Waterproof &amp; Anti-Fade
              </h4>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                Shower &amp; Sweat Safe
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Gem className="h-5 w-5 mb-2" style={{ color: "var(--accent-gold)" }} />
              <h4 className="text-xs font-bold uppercase tracking-wider font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                Skin Friendly
              </h4>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                Zero Skin Irritation
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeartHandshake className="h-5 w-5 mb-2" style={{ color: "var(--accent-gold)" }} />
              <h4 className="text-xs font-bold uppercase tracking-wider font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                Fast Kerala Delivery
              </h4>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                Tracked Express Shipping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Col (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA Collections"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-[0.2em] uppercase leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  NAKSHATRA
                </span>
                <span
                  className="text-[8px] sm:text-[9px] font-semibold tracking-[0.28em] uppercase leading-none mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  COLLECTIONS
                </span>
              </div>
            </Link>

            <p
              className="mt-4 text-xs sm:text-sm leading-relaxed max-w-sm font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              Curating premium anti-tarnish artificial jewellery, 18K gold-plated daily essentials, bridal sets, and luminous solitaires designed for everyday wear.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                Follow
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 rounded-full border liquid-glass transition-transform hover:scale-110 active:scale-95"
                  style={{ color: "var(--text-primary)" }}
                >
                  <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2 rounded-full border liquid-glass transition-transform hover:scale-110 active:scale-95"
                  style={{ color: "var(--text-primary)" }}
                >
                  <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 font-serif-luxury"
              style={{ color: "var(--text-primary)" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:underline">Collections</Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:underline font-semibold" style={{ color: "var(--accent-cta)" }}>New Arrivals</Link>
              </li>
              <li>
                <Link href="/#editorial-story" className="hover:underline">About Story</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Collections (Span 3) */}
          <div className="lg:col-span-3">
            <h4
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 font-serif-luxury"
              style={{ color: "var(--text-primary)" }}
            >
              Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/collections/necklaces" className="hover:underline">Necklaces &amp; Chokers</Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:underline">Earrings &amp; Studs</Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:underline">Solitaires &amp; Rings</Link>
              </li>
              <li>
                <Link href="/collections/bracelets" className="hover:underline">Bracelets &amp; Bangles</Link>
              </li>
              <li>
                <Link href="/collections/jewellery-sets" className="hover:underline">Jewellery Sets</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care (Span 2) */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 font-serif-luxury"
              style={{ color: "var(--text-primary)" }}
            >
              Client Care
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/wishlist" className="hover:underline">Saved Wishlist</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">Shopping Bag</Link>
              </li>
              <li>
                <Link href="/#editorial-story" className="hover:underline">Authenticity Guarantee</Link>
              </li>
              <li>
                <Link href="/#editorial-story" className="hover:underline">Care Guide</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} NAKSHATRA COLLECTIONS &bull; Artificial Jewellery Store. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Shipping &amp; Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
