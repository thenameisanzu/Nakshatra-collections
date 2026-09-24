"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Gem,
  ChevronLeft,
  ChevronRight,
  Gift,
  Tag,
  CheckCircle2,
} from "lucide-react";

interface OfferSlide {
  id: string;
  tag: string;
  tagIcon: "sparkles" | "gem" | "gift";
  titlePart1: string;
  titlePart2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  promoCode?: string;
  cardEdition: string;
  cardTitle: string;
  cardSubtitle: string;
  cardHighlightText: string;
  cardHighlightSubtext: string;
  cardLink: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

const offerSlides: OfferSlide[] = [
  {
    id: "festive-privilege",
    tag: "Festive Privilege • Exclusive 20% Privilege Offer",
    tagIcon: "sparkles",
    titlePart1: "Timeless Elegance,",
    titlePart2: "Crafted for Eternity",
    description:
      "Celebrate life's grandest milestones with bespoke necklaces, luminous earrings, and solitaire rings handcrafted with uncompromising devotion to detail.",
    primaryCtaText: "Explore Festive Edit",
    primaryCtaLink: "/collections/necklaces",
    secondaryCtaText: "View New Arrivals",
    secondaryCtaLink: "/collections/new-arrivals",
    promoCode: "USE CODE: NAKSHATRA20",
    cardEdition: "Celestial Atelier Edition",
    cardTitle: "Curated Necklaces & Sets",
    cardSubtitle: "100% Certified Jewels & Fine Metalcraft",
    cardHighlightText: "Complimentary Insured Courier",
    cardHighlightSubtext: "Dispatched in signature velvet box",
    cardLink: "/collections/necklaces",
    stat1Value: "18K & 22K",
    stat1Label: "Hallmarked Gold",
    stat2Value: "100%",
    stat2Label: "Certified Quality",
    stat3Value: "Bespoke",
    stat3Label: "Artisan Finished",
  },
  {
    id: "solitaire-glamour",
    tag: "Haute Joaillerie • Complimentary Diamond Pendant",
    tagIcon: "gem",
    titlePart1: "Brilliance Reimagined,",
    titlePart2: "Worn with Quiet Grace",
    description:
      "Elevate every occasion with our precision-cut solitaires and artisanal rings, capturing radiant light and enduring sophistication at every angle.",
    primaryCtaText: "Shop Solitaires & Rings",
    primaryCtaLink: "/collections/rings",
    secondaryCtaText: "Discover Earrings",
    secondaryCtaLink: "/collections/earrings",
    promoCode: "USE CODE: SOLITAIRE",
    cardEdition: "Signature Solitaire Vault",
    cardTitle: "Artisan Statement Rings",
    cardSubtitle: "Hand-set stones with luminous fire",
    cardHighlightText: "Secure 256-Bit Checkout",
    cardHighlightSubtext: "Certified authenticity guarantee",
    cardLink: "/collections/rings",
    stat1Value: "VVS/VS",
    stat1Label: "Clarity Selection",
    stat2Value: "Direct",
    stat2Label: "Atelier Pricing",
    stat3Value: "30-Day",
    stat3Label: "Hassle-Free Returns",
  },
  {
    id: "new-heirlooms",
    tag: "New Season 2026 • Complimentary Velvet Box",
    tagIcon: "gift",
    titlePart1: "Modern Heirlooms,",
    titlePart2: "Designed to Be Cherished",
    description:
      "Fresh additions to our signature collections, seamlessly fusing royal heritage motifs with contemporary minimalist silhouettes.",
    primaryCtaText: "Shop New Season",
    primaryCtaLink: "/collections/new-arrivals",
    secondaryCtaText: "Explore Full Catalogue",
    secondaryCtaLink: "/#products",
    promoCode: "USE CODE: HEIRLOOM",
    cardEdition: "Atelier 2026 Release",
    cardTitle: "Luminous Pearls & Charms",
    cardSubtitle: "Refined accessories for everyday grace",
    cardHighlightText: "Insured Worldwide Transit",
    cardHighlightSubtext: "Tamper-evident luxury packaging",
    cardLink: "/collections/new-arrivals",
    stat1Value: "Limited",
    stat1Label: "Atelier Run",
    stat2Value: "Zero",
    stat2Label: "Shipping Fee Over ₹2000",
    stat3Value: "24/7",
    stat3Label: "Concierge Support",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % offerSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + offerSlides.length) % offerSlides.length);
  }, []);

  // Autoplay functionality (every 6 seconds unless hovered or touching)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
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
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = offerSlides[currentSlide];

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    const actualCode = code.replace(/USE CODE:\s*/i, "").trim();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(actualCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden py-8 sm:py-14 md:py-18 lg:py-24 transition-colors select-none"
      aria-roledescription="carousel"
      aria-label="Exclusive Offers and Collections Carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Carousel Navigation Bar & Slide Switcher Tabs */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-gold)" }}
            >
              Exclusive Offers &bull; {currentSlide + 1} / {offerSlides.length}
            </span>
          </div>

          {/* Quick Slide Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {offerSlides.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "w-8 sm:w-10 shadow-xs" : "w-2 sm:w-2.5 opacity-40 hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--accent-cta)" : "var(--border-medium)",
                  }}
                  aria-label={`Go to slide ${idx + 1}: ${s.titlePart1} ${s.titlePart2}`}
                />
              );
            })}
          </div>

          {/* Left/Right Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                color: "var(--text-primary)",
              }}
              aria-label="Previous Offer Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                color: "var(--text-primary)",
              }}
              aria-label="Next Offer Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel Content Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Hero Text & Offer Details */}
          <div className="flex flex-col items-start lg:col-span-7 animate-in fade-in-50 duration-500">
            {/* Tag Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest shadow-xs"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                {slide.tagIcon === "sparkles" && <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
                {slide.tagIcon === "gem" && <Gem className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
                {slide.tagIcon === "gift" && <Gift className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
                <span>{slide.tag}</span>
              </div>

              {slide.promoCode && (
                <button
                  type="button"
                  onClick={() => handleCopyCode(slide.promoCode)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition hover:opacity-80 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--accent-gold)",
                    color: "var(--text-primary)",
                  }}
                  title="Click to copy promo code"
                >
                  <Tag className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                  <span>{copied ? "Copied!" : slide.promoCode}</span>
                  {copied ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  ) : null}
                </button>
              )}
            </div>

            {/* Headline */}
            <h1
              className="font-serif-luxury mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.15]"
              style={{ color: "var(--text-primary)" }}
            >
              {slide.titlePart1} <br className="hidden sm:inline" />
              <span className="italic font-normal">{slide.titlePart2}</span>
            </h1>

            {/* Subtext Description */}
            <p
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 hover:bg-black/5 active:scale-[0.98]"
                style={{
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <span>{slide.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t w-full"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div>
                <p className="font-serif-luxury text-base sm:text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat1Value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat1Label}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat2Value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat2Label}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat3Value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat3Label}
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Card */}
          <div className="lg:col-span-5 animate-in fade-in-50 zoom-in-95 duration-500">
            <div
              className="relative aspect-square sm:aspect-[4/5] w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl border transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Decorative Subtle Geometry */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, var(--accent-gold) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Top Card Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-xs"
                  style={{
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--tag-text)",
                  }}
                >
                  <Gem className="h-3.5 w-3.5" />
                  Nakshatra Atelier
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                  {slide.cardEdition}
                </span>
              </div>

              {/* Center Emblem Motif */}
              <div className="relative z-10 my-auto text-center py-4 sm:py-8">
                <div
                  className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full mb-4 sm:mb-6 border shadow-inner transition-transform duration-500 hover:scale-105"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--accent-gold)",
                  }}
                >
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse" style={{ color: "var(--accent-gold)" }} />
                </div>
                <h3
                  className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-normal tracking-wide"
                  style={{ color: "var(--text-primary)" }}
                >
                  {slide.cardTitle}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs uppercase tracking-widest max-w-xs mx-auto" style={{ color: "var(--text-muted)" }}>
                  {slide.cardSubtitle}
                </p>

                {slide.promoCode && (
                  <div className="mt-3 inline-block">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xs"
                      style={{
                        backgroundColor: "var(--badge-sale-bg)",
                        color: "var(--badge-sale-text)",
                      }}
                    >
                      {slide.promoCode}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Card Summary */}
              <div
                className="relative z-10 rounded-2xl p-3 sm:p-4 flex items-center justify-between border gap-2 transition-colors"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: "var(--tag-bg)" }}
                  >
                    <ShieldCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: "var(--accent-cta)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                      {slide.cardHighlightText}
                    </p>
                    <p className="text-[9px] sm:text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                      {slide.cardHighlightSubtext}
                    </p>
                  </div>
                </div>

                <Link
                  href={slide.cardLink}
                  className="text-[10px] sm:text-xs font-bold tracking-wider uppercase hover:underline shrink-0"
                  style={{ color: "var(--accent-cta)" }}
                >
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe / Arrow Hint */}
        <div className="mt-4 flex sm:hidden items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
          <button
            type="button"
            onClick={prevSlide}
            className="flex items-center gap-1 font-semibold uppercase tracking-wider py-1 px-2"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <span>Swipe or tap dots to explore offers</span>
          <button
            type="button"
            onClick={nextSlide}
            className="flex items-center gap-1 font-semibold uppercase tracking-wider py-1 px-2"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
