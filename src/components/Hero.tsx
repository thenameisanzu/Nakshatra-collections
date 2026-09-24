"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Droplets } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  icon: "sparkles" | "droplets";
  headlinePart1: string;
  headlinePart2: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  bgImage: string;
  imageAlt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "anti-tarnish-daily",
    badge: "Anti-Tarnish & Daily Wear",
    icon: "sparkles",
    headlinePart1: "Daily Wear Jewellery,",
    headlinePart2: "That Never Fades",
    subtext:
      "Premium 18K gold-plated artificial jewellery designed for everyday wear. Waterproof, sweatproof, and gentle on sensitive skin.",
    ctaText: "Shop All Jewellery",
    ctaLink: "/#products",
    secondaryText: "New Arrivals",
    secondaryLink: "/collections/new-arrivals",
    bgImage: "/images/hero/model-lifestyle.jpg",
    imageAlt: "Modern everyday gold plated artificial jewellery",
  },
  {
    id: "festive-traditional",
    badge: "Traditional & Festive Edit",
    icon: "sparkles",
    headlinePart1: "Traditional Designs,",
    headlinePart2: "For Special Celebrations",
    subtext:
      "Royal chokers, temple motifs, and bridal necklace sets crafted for weddings, temple visits, and family celebrations.",
    ctaText: "Explore Necklaces & Sets",
    ctaLink: "/collections/necklaces",
    secondaryText: "View Sets",
    secondaryLink: "/collections/jewellery-sets",
    bgImage: "/images/hero/festive-necklace.jpg",
    imageAlt: "Traditional gold and emerald choker set",
  },
  {
    id: "waterproof-clover",
    badge: "100% Waterproof & Sweatproof",
    icon: "droplets",
    headlinePart1: "Wear It In The Shower,",
    headlinePart2: "Never Take It Off",
    subtext:
      "Anti-fade stainless steel bracelets and rings that resist water, moisture, and daily wear without turning black.",
    ctaText: "Shop Waterproof Edit",
    ctaLink: "/collections/bracelets",
    secondaryText: "View Rings",
    secondaryLink: "/collections/rings",
    bgImage: "/images/hero/anti-tarnish-waterproof.jpg",
    imageAlt: "Waterproof gold plated bracelets and rings",
  },
  {
    id: "solitaire-sparkle",
    badge: "Sparkling American Diamond",
    icon: "sparkles",
    headlinePart1: "Real Diamond Sparkle,",
    headlinePart2: "At An Honest Price",
    subtext:
      "Brilliant American Diamond and cubic zirconia rings with pure sparkle that pairs effortlessly with sarees, churidars, and western wear.",
    ctaText: "Shop Solitaires & Rings",
    ctaLink: "/collections/rings",
    secondaryText: "View Earrings",
    secondaryLink: "/collections/earrings",
    bgImage: "/images/hero/solitaire-rings.jpg",
    imageAlt: "Sparkling solitaire rings and earrings",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const slide = heroSlides[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden transition-colors select-none"
      aria-roledescription="carousel"
      aria-label="Nakshatra Collections Artificial Jewellery Showcase"
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

        {/* Minimal Light Theme Gradient Scrims (Ensures ultra-clear text readability) */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 35%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.2) 85%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none sm:hidden transition-colors duration-500"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.45) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none transition-colors duration-500"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* MINIMAL & CLEAN FOREGROUND CONTENT                                     */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">
        <div className="max-w-2xl">
          {/* Minimal Feature Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-xs liquid-glass">
            {slide.icon === "droplets" ? (
              <Droplets className="h-3.5 w-3.5 text-sky-600" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
            )}
            <span style={{ color: "var(--accent-cta)" }}>{slide.badge}</span>
          </div>

          {/* Minimal & Elegant Headline */}
          <h1
            key={`headline-${slide.id}`}
            className="font-serif-luxury mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12] animate-in fade-in slide-in-from-bottom-3 duration-500"
            style={{ color: "var(--text-primary)" }}
          >
            {slide.headlinePart1} <br className="hidden sm:inline" />
            <span
              className="italic font-normal"
              style={{ color: "var(--accent-gold)" }}
            >
              {slide.headlinePart2}
            </span>
          </h1>

          {/* Simple English Subtext */}
          <p
            key={`subtext-${slide.id}`}
            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ color: "var(--text-secondary)" }}
          >
            {slide.subtext}
          </p>

          {/* Clean Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-8 py-3.5 text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {slide.secondaryText && slide.secondaryLink && (
              <Link
                href={slide.secondaryLink}
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-widest border liquid-glass transition-all hover:scale-105 active:scale-95"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-medium)",
                }}
              >
                <span>{slide.secondaryText}</span>
              </Link>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* MINIMAL CAROUSEL INDICATORS & CONTROLS                               */}
        {/* -------------------------------------------------------------------- */}
        <div className="mt-10 sm:mt-14 flex items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          {/* Trust Assurance Pill */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent-gold)" }} />
            <span>Fast Express Delivery All Over Kerala &bull; 100% Anti-Tarnish Guarantee</span>
          </div>

          {/* Minimal Dots & Controls */}
          <div className="flex items-center gap-3 ml-auto">
            <span
              className="text-xs font-mono font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              0{currentSlide + 1} / 0{heroSlides.length}
            </span>

            {/* Slide Dots */}
            <div className="flex items-center gap-1.5">
              {heroSlides.map((s, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? "w-6 sm:w-8" : "w-1.5 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? "var(--accent-cta)"
                        : "var(--border-medium)",
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass border transition hover:scale-105 active:scale-95 cursor-pointer"
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
                className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass border transition hover:scale-105 active:scale-95 cursor-pointer"
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
