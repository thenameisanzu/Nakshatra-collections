"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Tag,
  CheckCircle2,
  Percent,
} from "lucide-react";

interface HeroSlide {
  id: string;
  tag: string;
  tagIcon: "sparkles" | "droplets" | "gem";
  offerBadge: string;
  headlinePart1: string;
  headlinePart2: string;
  subtext: string;
  promoCode?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgImage: string;
  imageAlt: string;
  badgePill: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "festive-royal",
    tag: "Royal Festive Edition • 22K Micro-Polish",
    tagIcon: "sparkles",
    offerBadge: "FLAT 20% OFF",
    headlinePart1: "Timeless Elegance,",
    headlinePart2: "Crafted For Eternity",
    subtext:
      "Handcrafted royal chokers, temple motifs & luminous emerald necklaces designed for grand celebrations and life's memorable milestones.",
    promoCode: "USE CODE: NAKSHATRA20",
    primaryCtaText: "Shop Festive Edit",
    primaryCtaLink: "/collections/necklaces",
    secondaryCtaText: "Explore New Arrivals",
    secondaryCtaLink: "/collections/new-arrivals",
    bgImage: "/images/hero/festive-necklace.jpg",
    imageAlt: "Nakshatra 22K Gold and Emerald Royal Choker Necklace",
    badgePill: "👑 Royal Heritage Collection • 22K Gold Finish",
  },
  {
    id: "everyday-lifestyle",
    tag: "18K Gold Plated • Waterproof Anti-Tarnish",
    tagIcon: "droplets",
    offerBadge: "BESTSELLER EDIT",
    headlinePart1: "Everyday Luxury,",
    headlinePart2: "Never Takes A Day Off",
    subtext:
      "Dainty layered chains, stackable anti-tarnish rings & timeless bracelets designed for showers, workouts & daily glam without fading.",
    promoCode: "USE CODE: DAILYGLAM",
    primaryCtaText: "Shop Everyday Gold",
    primaryCtaLink: "/collections/new-arrivals",
    secondaryCtaText: "View Bestsellers",
    secondaryCtaLink: "/#products",
    bgImage: "/images/hero/model-lifestyle.jpg",
    imageAlt: "Modern woman wearing layered 18K gold plated anti-tarnish jewellery",
    badgePill: "💧 Shower & Sweat Safe • 100% Skin Friendly",
  },
  {
    id: "waterproof-clover",
    tag: "316L Stainless Steel • Daily Wear Ready",
    tagIcon: "droplets",
    offerBadge: "WATERPROOF • ANTI-TARNISH",
    headlinePart1: "Wear It In The Shower,",
    headlinePart2: "Never Take It Off",
    subtext:
      "Modern anti-fade jewellery crafted from high-grade stainless steel and micro-coated 18K gold that resists perfume, moisture, and daily wear.",
    promoCode: "USE CODE: WATERPROOF",
    primaryCtaText: "Shop Waterproof Edit",
    primaryCtaLink: "/collections/bracelets",
    secondaryCtaText: "View Rings & Studs",
    secondaryCtaLink: "/collections/rings",
    bgImage: "/images/hero/anti-tarnish-waterproof.jpg",
    imageAlt: "Waterproof gold clover bracelets and rings on stone with water droplets",
    badgePill: "✨ 316L Stainless Steel • AAA+ Lab Zirconia",
  },
  {
    id: "solitaire-glamour",
    tag: "VVS Diamond Simulants • Everlasting Radiance",
    tagIcon: "sparkles",
    offerBadge: "COMPLIMENTARY PENDANT",
    headlinePart1: "Solitaire Brilliance,",
    headlinePart2: "Without The Diamond Price",
    subtext:
      "Ultra-brilliant cut American Diamond and cubic zirconia rings capturing pure optical fire and timeless luxury elegance at honest prices.",
    promoCode: "USE CODE: SOLITAIRE",
    primaryCtaText: "Shop Solitaires & Rings",
    primaryCtaLink: "/collections/rings",
    secondaryCtaText: "Explore Collections",
    secondaryCtaLink: "/#collections",
    bgImage: "/images/hero/solitaire-rings.jpg",
    imageAlt: "Solitaire Diamond Engagement and Wedding Rings on champagne silk",
    badgePill: "💎 VVS Precision Cut • Rhodium & Gold Band",
  },
];

const categoryChips = [
  { name: "✨ All Pieces", href: "/#products" },
  { name: "📿 Layered Necklaces", href: "/collections/necklaces" },
  { name: "💎 Studs & Earrings", href: "/collections/earrings" },
  { name: "💍 Anti-Tarnish Rings", href: "/collections/rings" },
  { name: "🌟 Charm Bracelets", href: "/collections/bracelets" },
  { name: "👑 Festive Sets", href: "/collections/jewellery-sets" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Automatic Background Change Every 5.5 Seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) nextSlide();
    else if (diff < -45) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    const actualCode = code.replace(/USE CODE:\s*/i, "").trim();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(actualCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden transition-colors select-none"
      aria-roledescription="carousel"
      aria-label="Nakshatra Haute Joaillerie Hero Showcase"
    >
      {/* ---------------------------------------------------------------------- */}
      {/* AUTOMATICALLY CHANGING FULL-BLEED BACKGROUND IMAGES WITH CROSSFADE      */}
      {/* ---------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((s, index) => {
          const isCurrent = index === currentSlide;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isCurrent
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{
                transitionProperty: "opacity, transform",
              }}
            >
              <Image
                src={s.bgImage}
                alt={s.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center sm:object-[right_center]"
              />
            </div>
          );
        })}

        {/* Luminous Light Theme & Ambient Gradient Overlays for High Legibility */}
        {/* Desktop: Gentle radial & linear scrim matching theme background */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 32%, rgba(255,255,255,0.78) 58%, rgba(255,255,255,0.25) 85%, transparent 100%)",
          }}
        />
        {/* Mobile / Vertical blend: Ensures maximum text clarity on smaller screens */}
        <div
          className="absolute inset-0 pointer-events-none sm:hidden transition-colors duration-500"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.4) 100%)",
          }}
        />
        {/* Soft bottom edge blend to seamlessly transition into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-colors duration-500"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* FOREGROUND HERO CONTENT (LIGHT & THEME MATCHED)                        */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 w-full">
        <div className="max-w-3xl">
          {/* Top Badges & Promo Code Button */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] shadow-xs liquid-glass"
              style={{
                color: "var(--accent-cta)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {slide.tagIcon === "droplets" ? (
                <Droplets className="h-3.5 w-3.5 text-sky-600" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              )}
              <span>{slide.tag}</span>
            </span>

            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: "var(--badge-sale-bg)" }}
            >
              <Percent className="h-3 w-3" />
              {slide.offerBadge}
            </span>

            {slide.promoCode && (
              <button
                type="button"
                onClick={() => handleCopyCode(slide.promoCode)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider border liquid-glass transition hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--accent-gold)",
                }}
                title="Click to copy promo code"
              >
                <Tag className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                <span>{copied ? "Code Copied!" : slide.promoCode}</span>
                {copied && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
              </button>
            )}
          </div>

          {/* Cinematic Headline with Theme Color */}
          <h1
            key={`headline-${slide.id}`}
            className="font-serif-luxury mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ color: "var(--text-primary)" }}
          >
            {slide.headlinePart1} <br className="hidden sm:inline" />
            <span
              className="italic font-normal transition-colors duration-300"
              style={{ color: "var(--accent-gold)" }}
            >
              {slide.headlinePart2}
            </span>
          </h1>

          {/* Subtext Description */}
          <p
            key={`subtext-${slide.id}`}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light animate-in fade-in slide-in-from-bottom-3 duration-700"
            style={{ color: "var(--text-secondary)" }}
          >
            {slide.subtext}
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <Link
              href={slide.primaryCtaLink}
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={slide.secondaryCtaLink}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase border liquid-glass transition-all hover:scale-105 active:scale-95"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border-medium)",
              }}
            >
              <span>{slide.secondaryCtaText}</span>
            </Link>
          </div>

          {/* Quick Category Chips */}
          <div
            className="mt-6 sm:mt-8 pt-6 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5"
              style={{ color: "var(--text-muted)" }}
            >
              Quick Explore:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categoryChips.map((chip) => (
                <Link
                  key={chip.name}
                  href={chip.href}
                  className="rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-medium transition-all hover:scale-105 active:scale-95 border liquid-glass"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  {chip.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* CAROUSEL CONTROLS & SLIDE INDICATORS (LIGHT THEME MATCHED)           */}
        {/* -------------------------------------------------------------------- */}
        <div
          className="mt-8 sm:mt-12 flex items-center justify-between gap-4 pt-4 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {/* Slide Pill Tag */}
          <div className="hidden sm:inline-flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-ping"
              style={{ backgroundColor: "var(--accent-gold)" }}
            />
            <span
              className="text-[11px] font-semibold tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {slide.badgePill}
            </span>
          </div>

          {/* Switcher Dots & Slide Numbers */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <span
              className="text-[11px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              0{currentSlide + 1} / 0{heroSlides.length}
            </span>

            <div className="flex items-center gap-1.5">
              {heroSlides.map((s, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      isActive ? "w-8 sm:w-10 shadow-xs" : "w-2 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? "var(--accent-cta)"
                        : "var(--border-medium)",
                    }}
                    aria-label={`Go to slide ${idx + 1}: ${s.headlinePart1}`}
                  />
                );
              })}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass border transition hover:scale-110 active:scale-95 cursor-pointer shadow-xs"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-subtle)",
                }}
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass border transition hover:scale-110 active:scale-95 cursor-pointer shadow-xs"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-subtle)",
                }}
                aria-label="Next Slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
