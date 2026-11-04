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

  // Autoplay timer (5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <section
      className="relative w-full -mt-14 sm:-mt-16 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Nakshatra Collections Cinematic Hero Banner"
    >
      {/* =================================================================== */}
      {/* 1. FULL-WIDTH IMAGE CAROUSEL SLIDES                                */}
      {/* =================================================================== */}
      <div className="absolute inset-0 z-0">
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
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-center md:object-[center_28%] transition-transform duration-[8000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* 2. LUXURY MULTI-STOP GRADIENT SCRIM (Ensures Perfect Text Contrast) */}
      {/* =================================================================== */}
      {/* Left-to-right dark vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/55 md:via-black/45 to-black/30 md:to-transparent z-10 pointer-events-none" />

      {/* Top soft shadow to let floating pill navbar pop */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Bottom soft gradient for controls and section transition */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10 pointer-events-none" />

      {/* =================================================================== */}
      {/* 3. CINEMATIC TEXT CONTENT (Left-Aligned Luxury Presentation)       */}
      {/* =================================================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 md:pt-40 pb-24 sm:pb-28 md:pb-32 flex flex-col justify-center min-h-[78vh] sm:min-h-[82vh] md:min-h-[88vh]">
        <div className="max-w-2xl flex flex-col items-start text-left space-y-4 sm:space-y-5">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FAF7F2] text-[10.5px] sm:text-xs font-medium tracking-[0.22em] uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#E8C27A]" />
            <span>18K Real Gold Plated &bull; Anti-Tarnish</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.14] drop-shadow-md">
            Everyday Luxury,{" "}
            <span className="font-serif italic font-normal text-[#E8C27A] block sm:inline">
              Crafted to Never Fade.
            </span>
          </h1>

          {/* Subtitle Story */}
          <p className="text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-xl drop-shadow-sm">
            100% waterproof, sweatproof, and hypoallergenic jewellery designed for daily elegance and Kerala&apos;s grandest celebrations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#1F1A18] hover:bg-[#E8C27A] hover:text-[#1F1A18] text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 group"
            >
              <span>Explore Collections</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/collections/rings"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border border-white/30 hover:border-white/50 text-xs sm:text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-95"
            >
              <LayoutGrid className="h-4 w-4 text-[#E8C27A]" />
              <span>Under ₹299 Store</span>
            </Link>
          </div>

          {/* Minimal Icon Trust Badges */}
          <div className="pt-3 sm:pt-5 flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 text-xs sm:text-sm font-light">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8C27A]/25 text-[#E8C27A] text-xs font-bold">💧</span>
              <span>100% Waterproof</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8C27A]/25 text-[#E8C27A] text-xs font-bold">✨</span>
              <span>Anti-Tarnish Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8C27A]/25 text-[#E8C27A] text-xs font-bold">🚚</span>
              <span>₹60 Express Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 4. BOTTOM-RIGHT CAROUSEL CONTROLLER DOCK (Non-intrusive to model)   */}
      {/* =================================================================== */}
      <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-30 flex items-center gap-3">
        {/* Active Slide Info Pill (Hidden on mobile, visible on sm+) */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-lg pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">
            {heroSlides[currentSlide].tag}
          </span>
          <span className="text-white/40">&bull;</span>
          <span className="text-xs font-normal text-white/90">
            {heroSlides[currentSlide].title}
          </span>
        </div>

        {/* Controller Capsule: Prev, Slide Dots & Counter, Next */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/25 shadow-xl text-white">
          {/* Prev Button */}
          <button
            type="button"
            onClick={goToPrev}
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white/90 hover:text-white cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </button>

          {/* Slide Indicator Dots & Counter */}
          <div className="flex items-center gap-1.5 px-2">
            <span className="text-[11px] font-mono font-medium tracking-wider text-white/80 mr-1">
              0{currentSlide + 1}
            </span>
            <div className="flex items-center gap-1">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentSlide ? "w-5 sm:w-6 bg-[#E8C27A]" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-white/50 ml-1">
              / 0{heroSlides.length}
            </span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={goToNext}
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white/90 hover:text-white cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
