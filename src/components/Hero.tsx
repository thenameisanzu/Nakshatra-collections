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
      <div className="absolute inset-0 z-0">
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
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Ambient Dark & Cinematic Vignette Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* FOREGROUND HERO CONTENT                                                */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full text-white">
        <div className="max-w-3xl">
          {/* Top Badges & Promo Code Button */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] shadow-lg liquid-glass-dark"
              style={{ color: "#F0D597" }}
            >
              {slide.tagIcon === "droplets" ? (
                <Droplets className="h-3.5 w-3.5 text-sky-400" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              )}
              <span>{slide.tag}</span>
            </span>

            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-md"
              style={{ backgroundColor: "var(--badge-sale-bg)" }}
            >
              <Percent className="h-3 w-3" />
              {slide.offerBadge}
            </span>

            {slide.promoCode && (
              <button
                type="button"
                onClick={() => handleCopyCode(slide.promoCode)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-amber-300/40 liquid-glass-dark text-amber-200 transition hover:bg-white/10 active:scale-95 cursor-pointer shadow-sm"
                title="Click to copy promo code"
              >
                <Tag className="h-3 w-3 text-amber-300" />
                <span>{copied ? "Code Copied!" : slide.promoCode}</span>
                {copied && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
              </button>
            )}
          </div>

          {/* Cinematic Headline with Animated Entrance */}
          <h1
            key={`headline-${slide.id}`}
            className="font-serif-luxury mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] text-white animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {slide.headlinePart1} <br className="hidden sm:inline" />
            <span className="italic font-normal text-amber-100">{slide.headlinePart2}</span>
          </h1>

          {/* Subtext Description */}
          <p
            key={`subtext-${slide.id}`}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed max-w-2xl font-light animate-in fade-in slide-in-from-bottom-3 duration-700"
          >
            {slide.subtext}
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <Link
              href={slide.primaryCtaLink}
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-gold)",
                color: "#1a1612",
              }}
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={slide.secondaryCtaLink}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white border border-white/30 liquid-glass-dark hover:bg-white/10 transition-all active:scale-95"
            >
              <span>{slide.secondaryCtaText}</span>
            </Link>
          </div>

          {/* Quick Category Chips */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-white/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5 text-amber-200/80">
              Quick Explore:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categoryChips.map((chip) => (
                <Link
                  key={chip.name}
                  href={chip.href}
                  className="rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-medium transition-all hover:scale-105 active:scale-95 border border-white/20 liquid-glass-dark text-white hover:bg-white/15"
                >
                  {chip.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* CAROUSEL CONTROLS & SLIDE INDICATORS (LIQUID GLASS)                  */}
        {/* -------------------------------------------------------------------- */}
        <div className="mt-8 sm:mt-12 flex items-center justify-between gap-4 pt-4 border-t border-white/15">
          {/* Slide Pill Tag */}
          <div className="hidden sm:inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-semibold text-neutral-300 tracking-wider">
              {slide.badgePill}
            </span>
          </div>

          {/* Switcher Dots & Slide Numbers */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-200">
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
                      isActive ? "w-8 sm:w-10 bg-amber-300 shadow-md" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
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
                className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass-dark border border-white/25 text-white transition hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass-dark border border-white/25 text-white transition hover:scale-110 active:scale-95 cursor-pointer"
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
