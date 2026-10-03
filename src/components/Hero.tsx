"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  tag: string;
  headline: string;
  accent: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "bridal-heritage",
    src: "/images/hero/festive-necklace.jpg",
    alt: "Traditional Kerala bridal 18K gold plated choker necklace",
    tag: "The Bridal Heritage",
    headline: "Opulent Bridal Sets,",
    accent: "Crafted for Royalty",
    subtitle: "Temple-inspired choker sets finished with authentic real gold lustre.",
    ctaText: "Explore Bridal Sets",
    ctaLink: "/collections/bridal-jewellery",
  },
  {
    id: "daily-anti-tarnish",
    src: "/images/hero/anti-tarnish-waterproof.jpg",
    alt: "Anti-tarnish waterproof gold clovers and bracelets",
    tag: "100% Anti-Tarnish • Waterproof",
    headline: "Daily Wear Luxury,",
    accent: "That Never Fades",
    subtitle: "Shower, sweat, and swim safe 18K gold plated jewellery.",
    ctaText: "Shop Daily Wear",
    ctaLink: "/collections/bangles",
  },
  {
    id: "lifestyle-elegance",
    src: "/images/hero/model-lifestyle.jpg",
    alt: "18K Gold Emerald Pendant and layered chains",
    tag: "Signature 2026 Collection",
    headline: "Graceful Everyday,",
    accent: "Golden Elegance",
    subtitle: "Dainty layered chains and pendants designed for modern wear.",
    ctaText: "View Necklaces",
    ctaLink: "/collections/necklaces",
  },
  {
    id: "solitaire-brilliance",
    src: "/images/hero/solitaire-rings.jpg",
    alt: "Sparkling American Diamond Solitaire Rings",
    tag: "AAA+ American Diamonds",
    headline: "Diamond Brilliance,",
    accent: "Pure Sparkle",
    subtitle: "Precision-cut solitaire rings and studs with real diamond fire.",
    ctaText: "Discover Rings",
    ctaLink: "/collections/rings",
  },
];

const quickCategories = [
  { label: "All Jewellery", href: "/#products", icon: "✨" },
  { label: "Bridal Sets", href: "/collections/bridal-jewellery", icon: "👑" },
  { label: "Necklaces", href: "/collections/necklaces", icon: "📿" },
  { label: "Earrings", href: "/collections/earrings", icon: "💎" },
  { label: "Anti-Tarnish", href: "/collections/bangles", icon: "💧" },
  { label: "Rings", href: "/collections/rings", icon: "💍" },
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

  // Auto-advance every 5.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5500);
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
      className="relative w-full overflow-hidden transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Nakshatra Collections Featured Carousel"
    >
      {/* ==================================================================== */}
      {/* 1. CINEMATIC HERO BANNER CONTAINER (Full Width, Magazine Aspect)       */}
      {/* ==================================================================== */}
      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div
          className="relative w-full aspect-[4/5] xs:aspect-[1/1] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] rounded-3xl sm:rounded-3xl overflow-hidden shadow-xl border"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "#16120E",
          }}
        >
          {/* Background Images */}
          {heroSlides.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className={`object-cover transition-transform duration-7000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  } object-[center_35%] sm:object-[center_center]`}
                />
              </div>
            );
          })}

          {/* Deep Luxury Scrim Gradient Overlay for Crisp Text Readability */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(14, 10, 8, 0.92) 0%, rgba(14, 10, 8, 0.6) 42%, rgba(14, 10, 8, 0.15) 75%, transparent 100%)",
            }}
          />

          {/* Left/Right Desktop Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full liquid-glass-dark text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full liquid-glass-dark text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Foreground Editorial Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-10 lg:p-14 text-white">
            <div className="max-w-2xl">
              {/* Luxury Eyebrow Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] liquid-glass-dark border border-white/20 mb-3 sm:mb-4">
                <Sparkles className="h-3 w-3 text-amber-300" />
                <span className="text-amber-200">{activeSlide.tag}</span>
              </div>

              {/* Serif Headline */}
              <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                {activeSlide.headline}{" "}
                <span className="italic font-normal text-amber-300">
                  {activeSlide.accent}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-neutral-200 line-clamp-2 max-w-lg font-light leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* CTA Action & Slide Indicators */}
              <div className="mt-4 sm:mt-6 flex items-center gap-4 flex-wrap">
                <Link
                  href={activeSlide.ctaLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-black"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                  }}
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/collections"
                  className="hidden xs:inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/90 border border-white/25 liquid-glass-dark hover:bg-white/10 transition-all active:scale-95"
                >
                  <span>View All (8)</span>
                </Link>
              </div>
            </div>

            {/* Bottom Slide Progress Indicators */}
            <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-white/15 pt-3">
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === current;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrent(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "w-8 bg-amber-400"
                          : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
                0{current + 1} / 0{heroSlides.length}
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. APP-STYLE QUICK CATEGORY CHIPS (Horizontal Scrollable Strip)      */}
        {/* ==================================================================== */}
        <div className="py-4 sm:py-5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {quickCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 shadow-xs"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                }}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
