"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, ShieldCheck, Droplets } from "lucide-react";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  category: string;
  headline: string;
  accent: string;
  description: string;
  spotlight: {
    title: string;
    category: string;
    handle: string;
    badge: string;
    price: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    id: "model-lifestyle",
    src: "/images/hero/model-lifestyle.jpg",
    alt: "Modern 18K gold plated anti-tarnish daily wear jewellery",
    category: "Signature 2026 Collection",
    headline: "Daily Wear Jewellery,",
    accent: "That Never Fades",
    description:
      "Waterproof, sweatproof, and hypoallergenic 18K micro-gold plated artificial jewellery crafted for modern life and celebrations in Kerala.",
    spotlight: {
      title: "18K Gold Emerald Pendant",
      category: "Necklaces & Pendants",
      handle: "necklaces",
      badge: "100% Anti-Tarnish",
      price: "₹1,499",
    },
  },
  {
    id: "festive-necklace",
    src: "/images/hero/festive-necklace.jpg",
    alt: "Traditional gold and emerald choker necklace set",
    category: "Kerala Bridal & Festive",
    headline: "Opulent Bridal Sets,",
    accent: "Worthy of Royalty",
    description:
      "Traditional Kerala motifs and temple-inspired choker sets finished with authentic real gold lustre and gemstone sparkle.",
    spotlight: {
      title: "Royal Heritage Kundan Set",
      category: "Bridal Jewellery",
      handle: "bridal-jewellery",
      badge: "Bridal Pick",
      price: "₹3,899",
    },
  },
  {
    id: "anti-tarnish-waterproof",
    src: "/images/hero/anti-tarnish-waterproof.jpg",
    alt: "Waterproof anti-tarnish gold clover bracelets and rings",
    category: "Everyday Active Luxury",
    headline: "Shower & Sweat Safe,",
    accent: "Wear It Everywhere",
    description:
      "Engineered on medical-grade 316L stainless steel. Wear your favourite clovers and cuffs to gym, beach, and work without fear of tarnishing.",
    spotlight: {
      title: "Four-Leaf Clover Bracelet",
      category: "Bangles & Cuffs",
      handle: "bangles",
      badge: "Waterproof 316L",
      price: "₹1,299",
    },
  },
  {
    id: "solitaire-rings",
    src: "/images/hero/solitaire-rings.jpg",
    alt: "Sparkling American Diamond solitaire rings and studs",
    category: "Solitaires & Crystals",
    headline: "Diamond Brilliance,",
    accent: "Everyday Affordability",
    description:
      "Flawless AAA+ American Diamonds and Cubic Zirconia set in comfort-fit adjustable bands that sparkle with optical perfection.",
    spotlight: {
      title: "Solitaire Crown Ring",
      category: "Solitaires & Rings",
      handle: "rings",
      badge: "AAA+ Crystals",
      price: "₹999",
    },
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Automatic Background Image Change Every 6 Seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextImage();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) nextImage();
    else if (diff < -45) prevImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = heroSlides[currentImageIndex];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[calc(100dvh-4.5rem)] sm:min-h-[calc(100vh-5.5rem)] flex flex-col justify-between overflow-hidden transition-colors select-none"
      aria-label="Nakshatra Collections Artificial Jewellery Showcase"
    >
      {/* ---------------------------------------------------------------------- */}
      {/* 1. CINEMATIC BACKGROUND CAROUSEL WITH SUBTLE ZOOM & AMBIENT SCRIM      */}
      {/* ---------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isCurrent = index === currentImageIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                isCurrent
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-108 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-[center_top] sm:object-[right_center]"
              />
            </div>
          );
        })}

        {/* Ambient Gradient Scrims tailored to active theme variables */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 42%, rgba(255,255,255,0.85) 68%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none sm:hidden transition-colors duration-700"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 38%, rgba(255,255,255,0.88) 65%, rgba(255,255,255,0.2) 88%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-colors duration-500"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. FOREGROUND LUXURY EDITORIAL CONTENT                                 */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 w-full flex-1 flex flex-col justify-between">
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4 sm:py-6">
          {/* Left: Editorial Headline & Actions */}
          <div className="lg:col-span-8 max-w-2xl">
            {/* Top Luxury Pill: Category & Social Proof */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider shadow-xs liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center text-amber-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span style={{ color: "var(--text-primary)" }}>
                4.9/5 Rating &bull; <strong className="font-extrabold" style={{ color: "var(--accent-cta)" }}>100% Anti-Tarnish &bull; 18K Real Gold Plated</strong>
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif-luxury mt-3 sm:mt-5 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold sm:font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08]"
              style={{ color: "var(--text-primary)" }}
            >
              {currentSlide.headline} <br className="hidden sm:inline" />
              <span
                className="italic font-bold"
                style={{ color: "var(--accent-gold)" }}
              >
                {currentSlide.accent}
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-medium transition-all duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              {currentSlide.description}
            </p>

            {/* Value Proposition Micro-Pills */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
                <Droplets className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Waterproof &amp; Sweatproof</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
                <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Real Gold Micro-Plating</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Hypoallergenic Skin Safe</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 w-full xs:w-auto">
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                style={{
                  backgroundColor: "var(--accent-cta)",
                  color: "var(--accent-cta-text)",
                }}
              >
                <span>Shop All Jewellery</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/collections"
                className="inline-flex items-center justify-center rounded-full px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest border liquid-glass transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-medium)",
                }}
              >
                <span>Explore 8 Collections</span>
              </Link>
            </div>
          </div>

          {/* Right: Floating Luxury Spotlight Card (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end animate-float">
            <Link
              href={`/collections/${currentSlide.spotlight.handle}`}
              className="group/spotlight flex items-center gap-3.5 p-3.5 rounded-2xl border liquid-glass shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl card-lift"
              style={{
                backgroundColor: "var(--bg-surface-elevated)",
                borderColor: "var(--border-medium)",
              }}
            >
              <div
                className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 border"
                style={{
                  borderColor: "var(--accent-gold)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.spotlight.title}
                  fill
                  sizes="56px"
                  className="object-cover object-center group-hover/spotlight:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col pr-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Featured &bull; {currentSlide.spotlight.badge}
                </span>
                <span
                  className="text-xs font-bold font-serif-luxury line-clamp-1 mt-0.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentSlide.spotlight.title}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold" style={{ color: "var(--accent-cta)" }}>
                    {currentSlide.spotlight.price}
                  </span>
                  <span className="text-[10px] uppercase font-bold flex items-center gap-0.5 group-hover/spotlight:translate-x-0.5 transition-transform" style={{ color: "var(--text-muted)" }}>
                    View &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* 3. EDITORIAL SLIDE SCRUBBER TIMELINE (CAROUSEL TIMERS)               */}
        {/* -------------------------------------------------------------------- */}
        <div className="mt-4 pt-4 border-t transition-colors" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentImageIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className="group/btn flex flex-col items-start text-left p-2 rounded-xl transition-all cursor-pointer"
                  style={{
                    backgroundColor: isActive ? "var(--bg-surface)" : "transparent",
                  }}
                  aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                >
                  {/* Slim Progress Bar Line */}
                  <div
                    className="h-1 w-full rounded-full overflow-hidden mb-2 transition-all"
                    style={{
                      backgroundColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover/btn:w-1/3"
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? "var(--accent-cta)"
                          : "var(--accent-gold)",
                      }}
                    />
                  </div>

                  <span
                    className="text-[9.5px] font-mono uppercase font-bold tracking-wider"
                    style={{
                      color: isActive ? "var(--accent-gold)" : "var(--text-muted)",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className="text-[11px] sm:text-xs font-serif-luxury font-semibold line-clamp-1 transition-colors"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    }}
                  >
                    {slide.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
