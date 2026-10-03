"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Crown,
  Droplets,
  Gem,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";

interface MainBannerSlide {
  id: string;
  image: string;
  alt: string;
  tag: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const mainSlides: MainBannerSlide[] = [
  {
    id: "daily-anti-tarnish",
    image: "/images/hero/model-lifestyle.jpg",
    alt: "18K Gold Plated Anti-Tarnish Daily Wear Jewellery",
    tag: "Signature 2026 Collection",
    title: "18K Gold Plated Jewellery,",
    highlight: "That Never Fades",
    subtitle: "Waterproof, sweatproof & hypoallergenic daily essentials crafted for modern life in Kerala.",
    ctaText: "Shop Daily Wear",
    ctaLink: "/collections/necklaces",
  },
  {
    id: "kerala-bridal",
    image: "/images/hero/festive-necklace.jpg",
    alt: "Kerala Bridal Choker Necklace Sets",
    tag: "The Bridal Heritage",
    title: "Opulent Bridal Chokers,",
    highlight: "Royal Gold Lustre",
    subtitle: "Traditional Kerala temple motifs and Kundan sets finished with authentic real gold shine.",
    ctaText: "Explore Bridal Sets",
    ctaLink: "/collections/bridal-jewellery",
  },
  {
    id: "waterproof-clovers",
    image: "/images/hero/anti-tarnish-waterproof.jpg",
    alt: "Waterproof 316L Stainless Steel Clovers and Bangles",
    tag: "100% Anti-Tarnish 316L",
    title: "Shower & Sweat Safe,",
    highlight: "Wear It Everywhere",
    subtitle: "Medical-grade stainless steel clovers and daily cuffs that never blacken or discolor.",
    ctaText: "Shop Anti-Tarnish",
    ctaLink: "/collections/bangles",
  },
];

const sideGridBanners = [
  {
    id: "bridal-spotlight",
    title: "Kerala Bridal Sets",
    subtitle: "Heritage Kundan & Temple Sets",
    priceLabel: "From ₹2,499",
    tag: "Royal Bridal",
    image: "/images/hero/festive-necklace.jpg",
    href: "/collections/bridal-jewellery",
    icon: Crown,
    isHot: true,
  },
  {
    id: "waterproof-cuffs",
    title: "Anti-Tarnish Cuffs",
    subtitle: "Waterproof 316L Gold Clovers",
    priceLabel: "From ₹999",
    tag: "Shower Safe",
    image: "/images/hero/anti-tarnish-waterproof.jpg",
    href: "/collections/bangles",
    icon: Droplets,
    isHot: false,
  },
  {
    id: "solitaire-rings",
    title: "Solitaires & Bands",
    subtitle: "AAA+ American Diamonds",
    priceLabel: "From ₹899",
    tag: "Bestseller",
    image: "/images/hero/solitaire-rings.jpg",
    href: "/collections/rings",
    icon: Gem,
    isHot: false,
  },
];

const trustFeatures = [
  { icon: Sparkles, text: "18K Real Gold Lustre" },
  { icon: Droplets, text: "100% Waterproof 316L" },
  { icon: ShieldCheck, text: "Hypoallergenic & Skin Safe" },
  { icon: Truck, text: "Express Kerala Delivery" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % mainSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + mainSlides.length) % mainSlides.length);
  }, []);

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

  const activeSlide = mainSlides[current];

  return (
    <section
      className="relative w-full overflow-hidden transition-colors pt-3 sm:pt-6 pb-4 sm:pb-8"
      style={{ backgroundColor: "var(--bg-primary)" }}
      aria-label="Nakshatra Collections E-Commerce Showcase"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* ================================================================== */}
        {/* 1. STORE-FEEL HERO GRID LAYOUT (Bento E-Commerce Grid)             */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5">
          {/* ---------------------------------------------------------------- */}
          {/* A. MAIN PROMO CAROUSEL (7 Columns on Desktop)                    */}
          {/* ---------------------------------------------------------------- */}
          <div
            className="lg:col-span-7 xl:col-span-8 relative aspect-[4/5] xs:aspect-[1/1] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[460px] xl:min-h-[500px] rounded-3xl overflow-hidden border shadow-md group"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "#16120E",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Images */}
            {mainSlides.map((slide, index) => {
              const isActive = index === current;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className={`object-cover object-[center_30%] sm:object-center transition-transform duration-7000 ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>
              );
            })}

            {/* Deep High-Contrast Gradient Scrim for 100% Readability */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(16, 12, 10, 0.94) 0%, rgba(16, 12, 10, 0.6) 42%, rgba(16, 12, 10, 0.2) 75%, transparent 100%)",
              }}
            />

            {/* Desktop Left/Right Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              className="hidden sm:flex absolute left-3.5 top-1/2 -translate-y-1/2 z-30 h-9 w-9 items-center justify-center rounded-full liquid-glass-dark text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/15"
              aria-label="Previous banner"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="hidden sm:flex absolute right-3.5 top-1/2 -translate-y-1/2 z-30 h-9 w-9 items-center justify-center rounded-full liquid-glass-dark text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/15"
              aria-label="Next banner"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Foreground Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 lg:p-10 text-white">
              <div className="max-w-xl">
                {/* Eyebrow Pill */}
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] liquid-glass-dark border border-white/20 text-amber-300 mb-2.5 sm:mb-3">
                  <Sparkles className="h-3 w-3" />
                  <span>{activeSlide.tag}</span>
                </span>

                {/* Headline */}
                <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.12]">
                  {activeSlide.title} <br />
                  <span className="italic font-normal text-amber-300">
                    {activeSlide.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-2 text-xs sm:text-sm text-neutral-200 line-clamp-2 font-light leading-relaxed max-w-md opacity-90">
                  {activeSlide.subtitle}
                </p>

                {/* Primary CTA Button */}
                <div className="mt-4 sm:mt-5 flex items-center gap-3">
                  <Link
                    href={activeSlide.ctaLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-black"
                    style={{
                      backgroundColor: "var(--accent-gold)",
                    }}
                  >
                    <span>{activeSlide.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href="/collections"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/90 border border-white/25 liquid-glass-dark hover:bg-white/10 transition-all active:scale-95"
                  >
                    <span>All (8)</span>
                  </Link>
                </div>
              </div>

              {/* Slide Dots Progress */}
              <div className="mt-4 sm:mt-6 flex items-center justify-between border-t border-white/15 pt-2.5">
                <div className="flex items-center gap-1.5">
                  {mainSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrent(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === current
                          ? "w-7 bg-amber-400"
                          : "w-2 bg-white/40 hover:bg-white/75"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-sans font-medium tracking-widest text-neutral-300 uppercase">
                  0{current + 1} / 0{mainSlides.length}
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* B. RIGHT STORE SPOTLIGHT TILES (5 Columns on Desktop)            */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3.5 sm:gap-4">
            {sideGridBanners.slice(0, 2).map((banner) => {
              const IconComp = banner.icon;
              return (
                <Link
                  key={banner.id}
                  href={banner.href}
                  className="group relative rounded-3xl overflow-hidden border p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[220px] lg:min-h-[235px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-lift"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-medium)",
                  }}
                >
                  {/* Background Image with Scrim */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 35vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-90"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(16, 12, 10, 0.92) 0%, rgba(16, 12, 10, 0.5) 50%, rgba(16, 12, 10, 0.2) 80%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider liquid-glass-dark border border-white/20 text-white">
                      <IconComp className="h-3 w-3 text-amber-300" />
                      <span>{banner.tag}</span>
                    </span>

                    {banner.isHot && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                        <Flame className="h-2.5 w-2.5" />
                        <span>Hot</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Text & Price */}
                  <div className="relative z-10 text-white mt-auto">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 block">
                      {banner.priceLabel}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-medium tracking-tight mt-0.5">
                      {banner.title}
                    </h3>
                    <p className="text-[11px] text-neutral-200 line-clamp-1 font-light opacity-80">
                      {banner.subtitle}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 group-hover:translate-x-1 transition-transform">
                      <span>Shop Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. E-COMMERCE TRUST BAR (Subtle 4-Column Feature Strip)             */}
        {/* ================================================================== */}
        <div
          className="mt-3.5 sm:mt-5 p-3.5 sm:p-4 rounded-2xl border grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center shadow-2xs"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {trustFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.text} className="flex items-center justify-center gap-2 py-1">
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-gold)" }} />
                <span className="text-[11px] sm:text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                  {feat.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
