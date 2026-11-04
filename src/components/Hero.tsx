"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  tag: string;
  title: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero/hero-desktop.webp",
    alt: "Nakshatra 18K Gold Plated Layered Necklaces on Model",
    tag: "SIGNATURE 18K GOLD",
    title: "Anti-Tarnish Layered Chains",
  },
  {
    id: 2,
    image: "/images/hero/anti-tarnish-waterproof.jpg",
    alt: "100% Waterproof Daily Wear Jewellery & Bangles",
    tag: "SHOWER & SWEATPROOF",
    title: "Waterproof Everyday Cuffs & Bangles",
  },
  {
    id: 3,
    image: "/images/hero/solitaire-rings.jpg",
    alt: "American Diamond Solitaire Rings & Cocktail Bands",
    tag: "AMERICAN DIAMOND",
    title: "Solitaire Rings & Eternity Bands",
  },
  {
    id: 4,
    image: "/images/hero/festive-necklace.jpg",
    alt: "Festive Kerala Traditional Necklaces and Chokers",
    tag: "KERALA HERITAGE",
    title: "Kerala Bridal & Festive Chokers",
  },
  {
    id: 5,
    image: "/images/hero/pearl-heirlooms.jpg",
    alt: "Atelier Freshwater Pearls & Daily Wear Drops",
    tag: "ATELIER PEARLS",
    title: "Freshwater Pearls & Drop Earrings",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Autoplay timer (4.5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <section
      className="min-h-[60vh] md:min-h-[72vh] flex flex-col md:flex-row w-full overflow-hidden relative border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Nakshatra Collections Anti-Tarnish Jewellery"
    >
      {/* =================================================================== */}
      {/* 1. TEXT COLUMN (Top on Mobile, Left on Desktop)                     */}
      {/* =================================================================== */}
      <div
        className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-10 px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 min-h-[35vh] md:min-h-[72vh] space-y-4"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 mb-1">
            <Image
              src="/nakshatra-logo.png"
              alt="Nakshatra Collections"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span
            className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.16em] uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Nakshatra Collections
          </span>
          <span
            className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase font-semibold mt-0.5"
            style={{ color: "var(--accent-gold)" }}
          >
            ANTI-TARNISH JEWELLERY
          </span>
        </div>

        {/* Headline Stack (Exact Budget Blings typography with warm bespoke palette) */}
        <div className="space-y-1">
          <p
            className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            WHOLESALE &amp; RETAIL
          </p>
          <h1
            className="font-sans text-sm sm:text-base md:text-lg font-bold tracking-[0.16em] uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            ANTI-TARNISH JEWELLERY
          </h1>
          <p
            className="font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            FOR EVERYDAY LUXURY
          </p>
        </div>

        {/* Action Buttons: Solid Deep Bronze Pill [ ⊞ COLLECTIONS ] + Outline Pill [ SHOP ALL → ] */}
        <div className="flex items-center gap-3 pt-1">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-xs hover:opacity-90"
            style={{
              backgroundColor: "var(--accent-cta)",
            }}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>COLLECTIONS</span>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 border hover:opacity-80"
            style={{
              borderColor: "var(--accent-cta)",
              color: "var(--accent-cta)",
              backgroundColor: "transparent",
            }}
          >
            <span>SHOP ALL &rarr;</span>
          </Link>
        </div>

        {/* Micro-Trust Information */}
        <div
          className="pt-2 text-[11px] sm:text-xs space-y-1 font-light"
          style={{ color: "var(--text-secondary)" }}
        >
          <p className="flex items-center justify-center gap-2">
            <span>₹500 min order</span>
            <span className="opacity-40">&bull;</span>
            <span>₹60 domestic express shipping</span>
          </p>
          <p className="text-[10.5px] sm:text-[11px] opacity-80" style={{ color: "var(--text-muted)" }}>
            100% waterproof &amp; anti-tarnish stainless steel
          </p>
          <p className="text-[10px] opacity-75" style={{ color: "var(--text-muted)" }}>
            worldwide express delivery
          </p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. IMAGE CAROUSEL COLUMN (Bottom on Mobile, Right on Desktop)       */}
      {/* =================================================================== */}
      <div
        className="w-full md:w-1/2 min-h-[42vh] sm:min-h-[48vh] md:min-h-[72vh] relative overflow-hidden group select-none"
        style={{ backgroundColor: "var(--bg-secondary)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Container */}
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0 || index === 1}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
              />

              {/* Bottom Subtle Gradient Scrim for Text Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

              {/* Slide Title & Tag Pill */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col items-start text-white pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md text-[#241815] shadow-xs mb-1.5">
                  <Sparkles className="h-2.5 w-2.5 text-[#C59B4E]" />
                  {slide.tag}
                </span>
                <p className="text-sm sm:text-base font-medium tracking-tight text-white drop-shadow-sm line-clamp-1">
                  {slide.title}
                </p>
              </div>
            </div>
          );
        })}

        {/* Desktop Prev / Next Navigation Arrows (Reveals on Hover) */}
        <div className="hidden md:flex absolute inset-y-0 inset-x-3 items-center justify-between z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={goToPrev}
            className="pointer-events-auto h-9 w-9 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-center text-gray-800 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="pointer-events-auto h-9 w-9 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-center text-gray-800 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel Progress Indicators (Bottom Right) */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <span className="text-[10px] font-semibold text-white/90 tracking-widest mr-1">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide ? "w-6 bg-[#C59B4E]" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
