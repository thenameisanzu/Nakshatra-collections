"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Droplets,
  ShieldCheck,
  Crown,
  Gem,
  CircleDot,
  Heart,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  spotlight: {
    title: string;
    category: string;
    price: string;
    link: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    id: "signature-daily",
    src: "/images/hero/model-lifestyle.jpg",
    alt: "Modern 18K gold plated anti-tarnish daily wear jewellery",
    eyebrow: "Signature 2026 Collection",
    headline: "Everyday Jewellery,",
    accent: "That Never Fades",
    description:
      "Waterproof, sweatproof & hypoallergenic 18K micro-gold plated artificial jewellery crafted for daily elegance and celebrations in Kerala.",
    primaryCtaText: "Shop Daily Wear",
    primaryCtaLink: "/collections/necklaces",
    spotlight: {
      title: "18K Gold Emerald Pendant",
      category: "Necklaces & Pendants",
      price: "₹1,499",
      link: "/collections/necklaces",
    },
  },
  {
    id: "bridal-heritage",
    src: "/images/hero/festive-necklace.jpg",
    alt: "Traditional gold and emerald choker bridal set",
    eyebrow: "Kerala Bridal & Festive",
    headline: "Opulent Bridal Sets,",
    accent: "Worthy of Royalty",
    description:
      "Temple-inspired choker sets and heritage neckpieces finished with authentic real gold lustre and gemstone sparkle.",
    primaryCtaText: "Explore Bridal Sets",
    primaryCtaLink: "/collections/bridal-jewellery",
    spotlight: {
      title: "Royal Heritage Kundan Set",
      category: "Bridal Jewellery",
      price: "₹3,899",
      link: "/collections/bridal-jewellery",
    },
  },
  {
    id: "anti-tarnish-clovers",
    src: "/images/hero/anti-tarnish-waterproof.jpg",
    alt: "Waterproof anti-tarnish gold clover bracelets and cuffs",
    eyebrow: "Everyday Active Luxury",
    headline: "Shower & Sweat Safe,",
    accent: "Wear Everywhere",
    description:
      "Engineered on medical-grade 316L stainless steel. Wear your favourite clovers and bangles to work, gym, and beach without tarnishing.",
    primaryCtaText: "Shop Anti-Tarnish",
    primaryCtaLink: "/collections/bangles",
    spotlight: {
      title: "Four-Leaf Clover Bracelet",
      category: "Bangles & Cuffs",
      price: "₹1,299",
      link: "/collections/bangles",
    },
  },
  {
    id: "solitaires-crystals",
    src: "/images/hero/solitaire-rings.jpg",
    alt: "Sparkling American Diamond Solitaire Rings",
    eyebrow: "American Diamonds",
    headline: "Diamond Brilliance,",
    accent: "Pure Fire",
    description:
      "Flawless AAA+ American Diamonds and Cubic Zirconia set in comfort-fit adjustable bands that sparkle with optical perfection.",
    primaryCtaText: "Discover Rings",
    primaryCtaLink: "/collections/rings",
    spotlight: {
      title: "Solitaire Crown Ring",
      category: "Solitaires & Rings",
      price: "₹999",
      link: "/collections/rings",
    },
  },
];

interface QuickCategory {
  label: string;
  href: string;
  icon: LucideIcon;
}

const quickCategories: QuickCategory[] = [
  { label: "All Jewellery", href: "/#products", icon: Sparkles },
  { label: "Bridal Sets", href: "/collections/bridal-jewellery", icon: Crown },
  { label: "Necklaces", href: "/collections/necklaces", icon: Gem },
  { label: "Earrings", href: "/collections/earrings", icon: Heart },
  { label: "Anti-Tarnish", href: "/collections/bangles", icon: Droplets },
  { label: "Rings", href: "/collections/rings", icon: CircleDot },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto advance every 6s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlide = heroSlides[current];

  return (
    <section
      className="relative w-full overflow-hidden transition-colors pt-4 sm:pt-8 pb-6 sm:pb-10"
      style={{ backgroundColor: "var(--bg-primary)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Nakshatra Collections Featured Showcase"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================== */}
        {/* 1. ASYMMETRICAL EDITORIAL SPLIT HERO (Mejuri / Vogue Inspired)      */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Editorial Typography & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] border shadow-xs"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
                color: "var(--accent-cta)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              <span>{activeSlide.eyebrow}</span>
            </div>

            {/* Serif Headline */}
            <h1
              className="font-serif mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12]"
              style={{ color: "var(--text-primary)" }}
            >
              {activeSlide.headline} <br />
              <span className="italic font-normal" style={{ color: "var(--accent-gold)" }}>
                {activeSlide.accent}
              </span>
            </h1>

            {/* Description Subtext */}
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              {activeSlide.description}
            </p>

            {/* Value Pillars Strip (Pure SVG Icons, Zero Emojis) */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <Droplets className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Waterproof &amp; Anti-Tarnish</span>
              </span>

              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>18K Real Gold Plating</span>
              </span>

              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Hypoallergenic Safe</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href={activeSlide.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                style={{
                  backgroundColor: "var(--accent-cta)",
                  color: "var(--accent-cta-text)",
                }}
              >
                <span>{activeSlide.primaryCtaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/collections"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-wider border transition-all duration-300 hover:bg-black/5 active:scale-95 text-center"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-medium)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <span>Explore All Categories</span>
              </Link>
            </div>

            {/* Slide Indicators & Controls (Desktop & Mobile) */}
            <div className="mt-8 pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === current;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrent(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "w-8 shadow-xs"
                          : "w-2.5 opacity-40 hover:opacity-75"
                      }`}
                      style={{
                        backgroundColor: isActive ? "var(--accent-cta)" : "var(--text-muted)",
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-medium)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-medium)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Unobstructed High-Resolution Editorial Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div
              className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden border shadow-xl group"
              style={{
                borderColor: "var(--border-medium)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              {/* Carousel Images */}
              {heroSlides.map((slide, index) => {
                const isActive = index === current;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-6000 ease-out ${
                        isActive ? "scale-105" : "scale-100"
                      } object-center`}
                    />
                  </div>
                );
              })}

              {/* Floating Product Spotlight Card */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <Link
                  href={activeSlide.spotlight.link}
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl liquid-glass border shadow-xl transition-all duration-300 hover:scale-102 card-lift group/spotlight"
                  style={{
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div className="flex flex-col">
                    <span
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: "var(--accent-gold)" }}
                    >
                      Featured &bull; {activeSlide.spotlight.category}
                    </span>
                    <span
                      className="font-serif text-sm sm:text-base font-medium mt-0.5 line-clamp-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {activeSlide.spotlight.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pl-3 shrink-0">
                    <span
                      className="text-xs sm:text-sm font-semibold tracking-tight"
                      style={{ color: "var(--accent-cta)" }}
                    >
                      {activeSlide.spotlight.price}
                    </span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform group-hover/spotlight:translate-x-1"
                      style={{ backgroundColor: "var(--accent-cta)" }}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. APP-STYLE QUICK CATEGORY CHIPS (Pure SVG Icons, Zero Emojis)    */}
        {/* ================================================================== */}
        <div className="mt-8 pt-6 border-t overflow-x-auto no-scrollbar" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {quickCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border transition-all duration-200 hover:border-[color:var(--accent-gold)] active:scale-95 shadow-xs group"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                }}
              >
                <cat.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" style={{ color: "var(--accent-gold)" }} />
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
