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
  Droplets,
  HeartHandshake,
  Truck,
  Layers,
} from "lucide-react";

interface OfferSlide {
  id: string;
  tag: string;
  tagIcon: "sparkles" | "gem" | "gift" | "droplet";
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
  floatingPill: string;
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
    id: "anti-tarnish-everyday",
    tag: "18K Micro-Plated • Waterproof Anti-Tarnish",
    tagIcon: "droplet",
    offerBadge: "FLAT 20% OFF • BESTSELLER",
    titlePart1: "Everyday Luxury,",
    titlePart2: "Never Takes A Day Off",
    description:
      "Dainty layered chains, stackable anti-tarnish rings & timeless bracelets designed for showers, workouts & daily glam without ever fading or losing their golden sheen.",
    primaryCtaText: "Shop Everyday Gold",
    primaryCtaLink: "/collections/new-arrivals",
    secondaryCtaText: "Explore Bestsellers",
    secondaryCtaLink: "/#products",
    promoCode: "USE CODE: NAKSHATRA20",
    imageSrc: "/images/hero/model-lifestyle.jpg",
    imageAlt: "Modern woman wearing layered 18k gold plated artificial jewellery",
    floatingPill: "💧 Shower & Sweat Safe • 18K Triple Gold Polish",
    cardEdition: "Everyday Minimalist Edit",
    cardTitle: "Layered Chains & Dainty Studs",
    cardSubtitle: "Anti-Tarnish 18K Gold Plated Brass & 316L Stainless Steel",
    cardHighlightText: "Anti-Fade Guarantee",
    cardHighlightSubtext: "Premium waterproof finish for 24/7 effortless wear",
    cardLink: "/collections/new-arrivals",
    stat1Value: "18K Gold",
    stat1Label: "Triple Micro-Plating",
    stat2Value: "Anti-Fade",
    stat2Label: "Shower & Sweat Safe",
    stat3Value: "100%",
    stat3Label: "Skin Safe & Nickel Free",
  },
  {
    id: "waterproof-daily",
    tag: "Waterproof Collection • Daily Wear Ready",
    tagIcon: "droplet",
    offerBadge: "WATERPROOF • ANTI-TARNISH",
    titlePart1: "Wear It In The Shower,",
    titlePart2: "Never Take It Off",
    description:
      "Modern anti-fade jewellery crafted from high-grade 316L stainless steel and micro-coated 18K gold that resists perfume, moisture, and daily wear.",
    primaryCtaText: "Shop Waterproof Edit",
    primaryCtaLink: "/collections/bracelets",
    secondaryCtaText: "View Rings & Studs",
    secondaryCtaLink: "/collections/rings",
    promoCode: "USE CODE: WATERPROOF",
    imageSrc: "/images/hero/anti-tarnish-waterproof.jpg",
    imageAlt: "Anti-tarnish waterproof gold bracelets and rings on travertine stone with water drops",
    floatingPill: "✨ 316L Stainless Steel • AAA+ Lab Zirconia",
    cardEdition: "Modern Waterproof Vault",
    cardTitle: "Clover Charms & Stacking Rings",
    cardSubtitle: "Resists perfume, sweat, lotions & daily showers",
    cardHighlightText: "Zero Tarnish Promise",
    cardHighlightSubtext: "Hypoallergenic skin-friendly coating",
    cardLink: "/collections/bracelets",
    stat1Value: "316L Steel",
    stat1Label: "Anti-Tarnish Base",
    stat2Value: "Zero-Fade",
    stat2Label: "Perfume & Lotion Proof",
    stat3Value: "7-Day",
    stat3Label: "Easy Replacements",
  },
  {
    id: "festive-privilege",
    tag: "High-Grade CZ & Kundan • Royal Festive Look",
    tagIcon: "sparkles",
    offerBadge: "FESTIVE ATELIER • 20% OFF",
    titlePart1: "Grand Royal Heirlooms,",
    titlePart2: "Light On Your Pocket",
    description:
      "Stunning 22K gold-polished chokers, temple motifs & bridal statement sets handcrafted for weddings, grand occasions and festive celebrations.",
    primaryCtaText: "Shop Festive Sets",
    primaryCtaLink: "/collections/necklaces",
    secondaryCtaText: "Explore Earrings",
    secondaryCtaLink: "/collections/earrings",
    promoCode: "USE CODE: NAKSHATRA20",
    imageSrc: "/images/hero/festive-necklace.jpg",
    imageAlt: "Nakshatra 22K Gold and Emerald Royal Choker Necklace on champagne velvet",
    floatingPill: "👑 Royal Heritage Finish • Artisan Kundan & CZ",
    cardEdition: "Royal Heritage Collection",
    cardTitle: "Royal Emerald & Gold Sets",
    cardSubtitle: "22K Gold Polish & Hand-Set Gemstone Motifs",
    cardHighlightText: "Complimentary Insured Delivery",
    cardHighlightSubtext: "Dispatched in signature velvet gift box",
    cardLink: "/collections/necklaces",
    stat1Value: "22K Finish",
    stat1Label: "Micro-Polished Gold",
    stat2Value: "Hand-Set",
    stat2Label: "Artisan CZ Stones",
    stat3Value: "Velvet Box",
    stat3Label: "Complimentary Storage",
  },
  {
    id: "solitaire-glamour",
    tag: "VVS Diamond Simulants • Everlasting Radiance",
    tagIcon: "gem",
    offerBadge: "FREE PENDANT WITH RINGS",
    titlePart1: "Solitaire Radiance,",
    titlePart2: "Without The Diamond Price",
    description:
      "Ultra-brilliant cut American Diamond and cubic zirconia rings that capture pure optical fire and timeless luxury elegance at honest prices.",
    primaryCtaText: "Shop Solitaires & Rings",
    primaryCtaLink: "/collections/rings",
    secondaryCtaText: "Discover Earrings",
    secondaryCtaLink: "/collections/earrings",
    promoCode: "USE CODE: SOLITAIRE",
    imageSrc: "/images/hero/solitaire-rings.jpg",
    imageAlt: "Nakshatra Solitaire Diamond Engagement and Wedding Rings on rippling champagne silk",
    floatingPill: "💎 VVS Precision Cut • Rhodium & Gold Band",
    cardEdition: "Signature Solitaire Edit",
    cardTitle: "Artisan Solitaire Rings",
    cardSubtitle: "Precision 4-Prong Settings with Luminous Sparkle",
    cardHighlightText: "Tarnish-Resistant Coating",
    cardHighlightSubtext: "Designed for daily glamour and special milestones",
    cardLink: "/collections/rings",
    stat1Value: "VVS Clarity",
    stat1Label: "Diamond Simulant",
    stat2Value: "Direct",
    stat2Label: "Atelier Pricing",
    stat3Value: "Free Gift",
    stat3Label: "Matching Pendant",
  },
];

const categoryChips = [
  { name: "✨ All Pieces", href: "/#products" },
  { name: "📿 Layered Necklaces", href: "/collections/necklaces" },
  { name: "💎 Studs & Earrings", href: "/collections/earrings" },
  { name: "💍 Anti-Tarnish Rings", href: "/collections/rings" },
  { name: "🌟 Charm Bracelets", href: "/collections/bracelets" },
  { name: "👑 Festive Sets", href: "/collections/jewellery-sets" },
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
      className="relative overflow-hidden py-4 sm:py-8 md:py-12 transition-colors select-none"
      aria-roledescription="carousel"
      aria-label="Modern Fashion Jewellery Carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights Ribbon (Modern D2C Badge Strip) */}
        <div
          className="mb-4 sm:mb-6 rounded-2xl border px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none shadow-2xs"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-semibold uppercase tracking-wider shrink-0" style={{ color: "var(--text-secondary)" }}>
            <span className="inline-flex items-center gap-1.5" style={{ color: "var(--accent-gold)" }}>
              <Droplets className="h-3.5 w-3.5" />
              <span>Anti-Tarnish &amp; Waterproof</span>
            </span>
            <span className="hidden xs:inline-flex items-center gap-1.5">
              <HeartHandshake className="h-3.5 w-3.5 text-rose-500" />
              <span>100% Skin Safe &amp; Hypoallergenic</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              <span>18K Real Gold Micro-Plating</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Fast All-India Shipping</span>
            </span>
          </div>

          {/* Slide Switcher Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1">
              {offerSlides.map((s, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? "w-6 sm:w-8" : "w-2 opacity-40 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: isActive ? "var(--accent-cta)" : "var(--border-medium)",
                    }}
                    aria-label={`Slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-7 w-7 items-center justify-center rounded-full border transition hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-7 w-7 items-center justify-center rounded-full border transition hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
                aria-label="Next Slide"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 lg:items-center">
          {/* Left Column: Modern Copywriting & Promo Offers */}
          <div className="flex flex-col items-start lg:col-span-6 animate-in fade-in-50 duration-500">
            {/* Tag Badges & Promo Code Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-2xs"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                {slide.tagIcon === "droplet" && <Droplets className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-sky-600" />}
                {slide.tagIcon === "sparkles" && <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
                {slide.tagIcon === "gem" && <Gem className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
                {slide.tagIcon === "gift" && <Gift className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
                <span>{slide.tag}</span>
              </div>

              {slide.promoCode && (
                <button
                  type="button"
                  onClick={() => handleCopyCode(slide.promoCode)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition hover:opacity-85 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--accent-gold)",
                    color: "var(--text-primary)",
                  }}
                  title="Click to copy promo code"
                >
                  <Tag className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                  <span>{copied ? "Code Copied!" : slide.promoCode}</span>
                  {copied && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                </button>
              )}
            </div>

            {/* Modern Main Headline */}
            <h1
              className="font-serif-luxury mt-3 sm:mt-5 text-3xl xs:text-4xl sm:text-5xl md:text-5.5xl font-normal tracking-tight leading-[1.12]"
              style={{ color: "var(--text-primary)" }}
            >
              {slide.titlePart1} <br className="hidden sm:inline" />
              <span className="italic font-normal">{slide.titlePart2}</span>
            </h1>

            {/* Clean Modern Description */}
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 hover:bg-black/5 active:scale-[0.98]"
                style={{
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <span>{slide.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Quick Category Chips (Modern D2C 1-Tap Access) */}
            <div className="mt-5 sm:mt-6 w-full">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                Popular Categories:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categoryChips.map((chip) => (
                  <Link
                    key={chip.name}
                    href={chip.href}
                    className="rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium transition-all hover:scale-105 active:scale-95 border"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {chip.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Modern USP Micro-Specs */}
            <div
              className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 border-t w-full"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div>
                <p className="font-serif-luxury text-base sm:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat1Value}
                </p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat1Label}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat2Value}
                </p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat2Label}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {slide.stat3Value}
                </p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {slide.stat3Label}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fashion Modern Editorial Image Card */}
          <div className="lg:col-span-6 animate-in fade-in-50 zoom-in-95 duration-500">
            <div
              className="group relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] w-full rounded-3xl overflow-hidden shadow-xl border transition-all duration-500 hover:shadow-2xl"
              style={{
                borderColor: "var(--border-medium)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              {/* Product Campaign Image */}
              <Image
                key={slide.id}
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gentle Vignette Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

              {/* Floating Top Offer Ribbon */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md"
                  style={{
                    backgroundColor: "var(--badge-sale-bg)",
                    color: "var(--badge-sale-text)",
                  }}
                >
                  <Percent className="h-3 w-3" />
                  {slide.offerBadge}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-white bg-black/40 backdrop-blur-md border border-white/20">
                  <Layers className="h-3 w-3 text-amber-300" />
                  {slide.cardEdition}
                </span>
              </div>

              {/* Floating Middle USP Tag (e.g., Shower & Sweat Safe) */}
              <div className="absolute top-14 left-3.5 sm:top-14 sm:left-4 z-10 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide text-white bg-black/50 backdrop-blur-md border border-white/15 shadow-sm">
                  {slide.floatingPill}
                </span>
              </div>

              {/* Bottom Interactive Glassmorphic Information Card */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 z-10">
                <div className="rounded-2xl p-3 sm:p-4 bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-between gap-3 shadow-xl transition-colors hover:bg-black/75">
                  <div className="min-w-0">
                    <h3 className="font-serif-luxury text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                      {slide.cardTitle}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/85 truncate mt-0.5">
                      {slide.cardSubtitle}
                    </p>
                  </div>

                  <Link
                    href={slide.cardLink}
                    className="inline-flex items-center justify-center gap-1 rounded-full px-3.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                    style={{
                      backgroundColor: "var(--accent-gold)",
                      color: "#1a1612",
                    }}
                  >
                    <span>Shop Look</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe & Switcher Controls */}
        <div
          className="mt-3 flex sm:hidden items-center justify-between text-[11px] border-t pt-2.5"
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
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            {currentSlide + 1} of {offerSlides.length} Edits
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
