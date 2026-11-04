"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, MessageCircle } from "lucide-react";

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  tag: string;
  title: string;
  categoryLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero/slide-gold-necklaces.jpg",
    alt: "18K Gold Plated Layered Necklaces on Model",
    tag: "SIGNATURE 18K GOLD",
    title: "Anti-Tarnish Layered Chains",
    categoryLink: "/collections/necklace",
  },
  {
    id: 2,
    image: "/images/hero/slide-bangles-bracelets.jpg",
    alt: "Waterproof Everyday Cuffs and Bangles",
    tag: "WATERPROOF ATELIER",
    title: "Handcrafted Cuffs & Bangles",
    categoryLink: "/collections/bangles",
  },
  {
    id: 3,
    image: "/images/hero/slide-earrings-luxury.jpg",
    alt: "Luxury Drop Earrings and Studs",
    tag: "STATEMENT PIECES",
    title: "Drop Earrings & Studs",
    categoryLink: "/collections/ear-rings",
  },
  {
    id: 4,
    image: "/images/hero/slide-solitaire-rings.jpg",
    alt: "Solitaire Rings & Eternity Bands on Silk",
    tag: "SOLITAIRE & BANDS",
    title: "Solitaire Rings & Eternity Bands",
    categoryLink: "/collections/rings",
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
      className="w-full px-3 sm:px-6 lg:px-8 pt-3 pb-8 sm:pb-12"
      aria-label="Nakshatra Collections Hero Showcase"
    >
      {/* Framed Luxury Editorial Viewport */}
      <div
        className="relative w-full max-w-7xl mx-auto min-h-[72vh] sm:min-h-[78vh] md:min-h-[84vh] rounded-3xl sm:rounded-[2.25rem] overflow-hidden border shadow-[0_20px_50px_rgba(31,26,24,0.12)] select-none group"
        style={{
          borderColor: "var(--border-medium)",
          backgroundColor: "var(--bg-secondary)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ================================================================= */}
        {/* 1. SLIDES IMAGES CONTAINER                                        */}
        {/* ================================================================= */}
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
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className={`object-cover object-center md:object-[center_32%] transition-transform duration-[8000ms] ease-out ${
                    isActive ? "scale-100" : "scale-105"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 2. LUXURY MULTI-STOP GRADIENT SCRIMS                              */}
        {/* ================================================================= */}
        {/* Left vignette for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/55 md:via-black/40 to-black/30 md:to-transparent z-10 pointer-events-none" />

        {/* Top soft vignette */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />

        {/* Bottom soft vignette */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 via-black/30 to-transparent z-10 pointer-events-none" />

        {/* ================================================================= */}
        {/* 3. HERO CONTENT & TYPOGRAPHY                                      */}
        {/* ================================================================= */}
        <div className="relative z-20 w-full h-full min-h-[72vh] sm:min-h-[78vh] md:min-h-[84vh] px-6 sm:px-10 md:px-14 py-16 sm:py-20 md:py-24 flex flex-col justify-center">
          <div className="max-w-2xl flex flex-col items-start text-left space-y-4 sm:space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FAF7F2] text-[10.5px] sm:text-xs font-medium tracking-[0.22em] uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#E8C27A]" />
              <span>18K Real Gold Plated &bull; Anti-Tarnish</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.14] drop-shadow-md font-serif">
              Everyday Luxury,{" "}
              <span className="italic font-normal text-[#E8C27A] block sm:inline">
                Crafted to Never Fade.
              </span>
            </h1>

            {/* Subtitle Story */}
            <p className="text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-xl drop-shadow-sm">
              100% waterproof, sweatproof, and hypoallergenic jewellery designed for effortless everyday wear and grand celebrations.
            </p>

            {/* Clean Action Buttons (Only real backend destinations) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#1F1A18] hover:bg-[#E8C27A] hover:text-[#1F1A18] text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border border-white/30 hover:border-white/50 text-xs sm:text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-[#E8C27A]" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Minimal Icon Trust Badges */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 text-xs sm:text-sm font-light">
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
                <span>Express Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. CAROUSEL CONTROLLER DOCK (Bottom-Right)                        */}
        {/* ================================================================= */}
        <div className="absolute bottom-6 right-5 sm:bottom-8 sm:right-8 z-30 flex items-center gap-3">
          {/* Active Slide Info Pill */}
          <Link
            href={heroSlides[currentSlide].categoryLink}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all group/pill"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">
              {heroSlides[currentSlide].tag}
            </span>
            <span className="text-white/40">&bull;</span>
            <span className="text-xs font-normal text-white/90 group-hover/pill:underline">
              {heroSlides[currentSlide].title}
            </span>
            <ArrowRight className="h-3 w-3 text-[#E8C27A] transition-transform group-hover/pill:translate-x-0.5" />
          </Link>

          {/* Controller Capsule: Prev, Dots, Next */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/25 shadow-xl text-white">
            <button
              type="button"
              onClick={goToPrev}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white/90 hover:text-white cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>

            {/* Slide Dots & Counter */}
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
      </div>
    </section>
  );
}
