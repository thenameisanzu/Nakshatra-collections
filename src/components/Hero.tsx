"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Percent,
} from "lucide-react";

interface OfferSlide {
  id: string;
  tag: string;
  tagIcon: "sparkles" | "gem" | "gift";
  offerBadge: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  promoCode?: string;
  imageSrc: string;
  imageAlt: string;
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
    tag: "Festive Privilege • Limited Time Offer",
    tagIcon: "sparkles",
    offerBadge: "FLAT 20% OFF",
    titlePart1: "Timeless Elegance,",
    titlePart2: "Crafted for Eternity",
    description:
      "Celebrate life's grandest milestones with bespoke necklaces, luminous emerald earrings, and gold choker sets handcrafted with uncompromising devotion to detail.",
    primaryCtaText: "Shop Festive Edit",
    primaryCtaLink: "/collections/necklaces",
    secondaryCtaText: "View New Arrivals",
    secondaryCtaLink: "/collections/new-arrivals",
    promoCode: "USE CODE: NAKSHATRA20",
    imageSrc: "/images/hero/festive-necklace.jpg",
    imageAlt: "Nakshatra 22K Gold and Emerald Royal Choker Necklace on champagne velvet",
    cardEdition: "Celestial Atelier 2026",
    cardTitle: "Royal Emerald & Gold Sets",
    cardSubtitle: "100% BIS Hallmarked 22K Gold & Natural Gemstones",
    cardHighlightText: "Complimentary Insured Courier",
    cardHighlightSubtext: "Dispatched in bespoke signature velvet box",
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
    tag: "Haute Joaillerie • Bridal & Engagement Special",
    tagIcon: "gem",
    offerBadge: "COMPLIMENTARY PENDANT",
    titlePart1: "Brilliance Reimagined,",
    titlePart2: "Worn with Quiet Grace",
    description:
      "Elevate every milestone with our precision-cut solitaires and artisanal diamond bands, capturing radiant fire and enduring sophistication at every angle.",
    primaryCtaText: "Shop Solitaires & Rings",
    primaryCtaLink: "/collections/rings",
    secondaryCtaText: "Discover Earrings",
    secondaryCtaLink: "/collections/earrings",
    promoCode: "USE CODE: SOLITAIRE",
    imageSrc: "/images/hero/solitaire-rings.jpg",
    imageAlt: "Nakshatra Solitaire Diamond Engagement and Wedding Rings on rippling champagne silk",
    cardEdition: "Signature Solitaire Vault",
    cardTitle: "Artisan Solitaire Rings",
    cardSubtitle: "VVS/VS Clarity Diamonds & Platinum/Gold Bands",
    cardHighlightText: "Lifetime Authenticity Guarantee",
    cardHighlightSubtext: "IGI & GIA Certified with 256-bit safe checkout",
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
    tag: "New Season 2026 • Heirloom Collection",
    tagIcon: "gift",
    offerBadge: "FREE VELVET CHEST & GIFT",
    titlePart1: "Modern Heirlooms,",
    titlePart2: "Designed to Be Cherished",
    description:
      "Fresh additions to our signature collections, seamlessly fusing royal South Indian heritage motifs with contemporary minimalist silhouettes and lustrous pearls.",
    primaryCtaText: "Shop New Season",
    primaryCtaLink: "/collections/new-arrivals",
    secondaryCtaText: "Explore Full Catalogue",
    secondaryCtaLink: "/#products",
    promoCode: "USE CODE: HEIRLOOM",
    imageSrc: "/images/hero/pearl-heirlooms.jpg",
    imageAlt: "Nakshatra Handcrafted Gold Bangles and Luminous Pearl Drop Earrings on textured marble",
    cardEdition: "Heritage Atelier Release",
    cardTitle: "Luminous Pearls & Bangles",
    cardSubtitle: "Handcrafted textured gold & fine baroque pearls",
    cardHighlightText: "Insured Express Transit",
    cardHighlightSubtext: "Tamper-evident luxury gift packaging",
    cardLink: "/collections/new-arrivals",
    stat1Value: "Limited",
    stat1Label: "Atelier Run",
    stat2Value: "Free",
    stat2Label: "Insured Shipping",
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
      className="relative overflow-hidden py-6 sm:py-10 md:py-14 lg:py-18 transition-colors select-none"
      aria-roledescription="carousel"
      aria-label="Exclusive Offers and Collections Carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Carousel Navigation Bar & Slide Switcher Tabs */}
        <div
          className="mb-5 sm:mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
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
          <div className="flex flex-col items-start lg:col-span-6 animate-in fade-in-50 duration-500">
            {/* Tag Badges */}
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
              className="font-serif-luxury mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-5.5xl font-normal tracking-tight leading-[1.15]"
              style={{ color: "var(--text-primary)" }}
            >
              {slide.titlePart1} <br className="hidden sm:inline" />
              <span className="italic font-normal">{slide.titlePart2}</span>
            </h1>

            {/* Subtext Description */}
            <p
              className="mt-3.5 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
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
              className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t w-full"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div>
                <p className="font-serif-luxury text-base sm:text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat1Value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat1Label}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat2Value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat2Label}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat3Value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat3Label}
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Carousel Image Showcase with Offer Ribbon */}
          <div className="lg:col-span-6 animate-in fade-in-50 zoom-in-95 duration-500">
            <div
              className="group relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 hover:shadow-3xl"
              style={{
                borderColor: "var(--border-medium)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              {/* Product Offer Image */}
              <Image
                key={slide.id}
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Sophisticated Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

              {/* Floating Top Offer Badge */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md"
                  style={{
                    backgroundColor: "var(--badge-sale-bg)",
                    color: "var(--badge-sale-text)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Percent className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                  {slide.offerBadge}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-white/90 bg-black/40 backdrop-blur-md border border-white/10">
                  <Gem className="h-3 w-3 text-amber-300" />
                  {slide.cardEdition}
                </span>
              </div>

              {/* Bottom Frosted Information Bar & Direct Link */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10">
                <div className="rounded-2xl p-3.5 sm:p-4.5 bg-black/60 backdrop-blur-md border border-white/15 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl transition-colors hover:bg-black/70">
                  <div className="min-w-0">
                    <h3 className="font-serif-luxury text-base sm:text-lg font-medium text-white tracking-wide truncate">
                      {slide.cardTitle}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
                      {slide.cardSubtitle}
                    </p>
                  </div>

                  <Link
                    href={slide.cardLink}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: "var(--accent-gold)",
                      color: "#1a1612",
                    }}
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe / Arrow Navigation Bar */}
        <div
          className="mt-4 flex sm:hidden items-center justify-between text-[11px] border-t pt-3"
          style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <button
            type="button"
            onClick={prevSlide}
            className="flex items-center gap-1 font-semibold uppercase tracking-wider py-1 px-2.5 rounded-lg border cursor-pointer"
            style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <span className="text-[10px] uppercase tracking-wider">
            {currentSlide + 1} of {offerSlides.length} Offers
          </span>
          <button
            type="button"
            onClick={nextSlide}
            className="flex items-center gap-1 font-semibold uppercase tracking-wider py-1 px-2.5 rounded-lg border cursor-pointer"
            style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
