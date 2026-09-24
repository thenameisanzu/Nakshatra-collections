"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, ShieldCheck, Droplets } from "lucide-react";

interface HeroImage {
  id: string;
  src: string;
  alt: string;
}

const heroImages: HeroImage[] = [
  {
    id: "model-lifestyle",
    src: "/images/hero/model-lifestyle.jpg",
    alt: "Modern 18K gold plated anti-tarnish daily wear jewellery",
  },
  {
    id: "festive-necklace",
    src: "/images/hero/festive-necklace.jpg",
    alt: "Traditional gold and emerald choker necklace set",
  },
  {
    id: "anti-tarnish-waterproof",
    src: "/images/hero/anti-tarnish-waterproof.jpg",
    alt: "Waterproof anti-tarnish gold clover bracelets and rings",
  },
  {
    id: "solitaire-rings",
    src: "/images/hero/solitaire-rings.jpg",
    alt: "Sparkling American Diamond solitaire rings and studs",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  // Automatic Background Image Change Every 5.5 Seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextImage();
    }, 5500);
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

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100vh-5.5rem)] flex flex-col justify-between overflow-hidden transition-colors select-none"
      aria-label="Nakshatra Collections Artificial Jewellery Showcase"
    >
      {/* ---------------------------------------------------------------------- */}
      {/* AUTOMATICALLY CHANGING FULL-BLEED BACKGROUND IMAGES WITH CROSSFADE      */}
      {/* ---------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroImages.map((img, index) => {
          const isCurrent = index === currentImageIndex;
          return (
            <div
              key={img.id}
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
                src={img.src}
                alt={img.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-[center_top] sm:object-[right_center]"
              />
            </div>
          );
        })}

        {/* Minimal Gradient Scrims (Preserves image beauty while making text 100% crisp) */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 40%, rgba(255,255,255,0.85) 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none sm:hidden transition-colors duration-500"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 30%, rgba(255,255,255,0.88) 60%, rgba(255,255,255,0.25) 85%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none transition-colors duration-500"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* STATIC MINIMAL FOREGROUND CONTENT (ONE CONSTANT TAGLINE)               */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 w-full flex-1 flex flex-col justify-between">
        <div className="my-auto max-w-2xl py-4 sm:py-6">
          {/* Top Pill: Rating & Guarantee */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] sm:text-xs font-semibold tracking-wider shadow-xs liquid-glass">
            <div className="flex items-center text-amber-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            </div>
            <span style={{ color: "var(--text-primary)" }}>
              4.9/5 Rating &bull; <strong style={{ color: "var(--accent-cta)" }}>100% Anti-Tarnish &bull; 18K Gold Plated</strong>
            </span>
          </div>

          {/* Headline & Tagline */}
          <h1
            className="font-serif-luxury mt-3 sm:mt-5 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.15] sm:leading-[1.12]"
            style={{ color: "var(--text-primary)" }}
          >
            Daily Wear Jewellery, <br className="hidden sm:inline" />
            <span
              className="italic font-normal"
              style={{ color: "var(--accent-gold)" }}
            >
              That Never Fades
            </span>
          </h1>

          {/* Simple English Description */}
          <p
            className="mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal"
            style={{ color: "var(--text-secondary)" }}
          >
            Waterproof, sweatproof, and skin-friendly artificial jewellery crafted for daily wear, college, office, and family celebrations in Kerala.
          </p>

          {/* Value Proposition Micro-Pills */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs" style={{ color: "var(--text-secondary)" }}>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
              <Droplets className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              <span>Waterproof &amp; Sweatproof</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              <span>Real Gold Shine</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg liquid-glass border" style={{ borderColor: "var(--border-subtle)" }}>
              <ShieldCheck className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              <span>Skin-Safe &bull; No Rust</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 w-full xs:w-auto">
            <Link
              href="/#products"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-200 hover:scale-105 active:scale-95 text-center"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              <span>Shop All Jewellery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#collections"
              className="inline-flex items-center justify-center rounded-full px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-widest border liquid-glass transition-all hover:scale-105 active:scale-95 text-center"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border-medium)",
              }}
            >
              <span>View Collections</span>
            </Link>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* BACKGROUND IMAGE CAROUSEL INDICATORS (NO ARROWS)                     */}
        {/* -------------------------------------------------------------------- */}
        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          {/* Guarantee Tag */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent-gold)" }} />
            <span>Fast Express Delivery All Over Kerala &bull; 100% Skin Safe Guarantee</span>
          </div>

          {/* Clean Slide Indicators (Dots + Counter, No Arrows) */}
          <div className="flex items-center gap-3 ml-auto">
            <span
              className="text-xs font-mono font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              0{currentImageIndex + 1} / 0{heroImages.length}
            </span>

            {/* Slide Dots */}
            <div className="flex items-center gap-1.5">
              {heroImages.map((img, idx) => {
                const isActive = idx === currentImageIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? "w-6 sm:w-8" : "w-1.5 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? "var(--accent-cta)"
                        : "var(--border-medium)",
                    }}
                    aria-label={`Show image ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
