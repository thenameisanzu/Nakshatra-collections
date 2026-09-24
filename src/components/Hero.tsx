"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Gem,
} from "lucide-react";

interface HeroSlide {
  id: string;
  headline: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  productName: string;
  categoryTag: string;
  imageSrc: string;
  imageAlt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "aurelia-necklace",
    headline: "Timeless Elegance",
    text: "Jewellery designed to become part of your story.",
    ctaText: "Explore Collection",
    ctaLink: "/collections/necklaces",
    secondaryCtaText: "Discover New Arrivals",
    secondaryCtaLink: "/collections/new-arrivals",
    productName: "Aurelia Gold Plated Necklace",
    categoryTag: "Atelier Necklaces",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    imageAlt: "Aurelia Gold Plated Necklace handcrafted by Nakshatra",
  },
  {
    id: "celeste-earrings",
    headline: "Elegance In Every Detail",
    text: "Discover pieces created for unforgettable moments.",
    ctaText: "Shop Earrings",
    ctaLink: "/collections/earrings",
    secondaryCtaText: "View Full Catalogue",
    secondaryCtaLink: "/#products",
    productName: "Celeste Pearl Drop Earrings",
    categoryTag: "Haute Joaillerie",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    imageAlt: "Celeste Pearl Drop Earrings with luminous finish",
  },
  {
    id: "elara-ring",
    headline: "Make Your Moment Shine",
    text: "Statement jewellery for moments worth remembering.",
    ctaText: "Shop Rings",
    ctaLink: "/collections/rings",
    secondaryCtaText: "Explore Collections",
    secondaryCtaLink: "/#collections",
    productName: "Elara American Diamond Ring",
    categoryTag: "Solitaire Edit",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    imageAlt: "Elara American Diamond Ring with brilliant clarity",
  },
  {
    id: "amara-choker",
    headline: "Designed To Dazzle",
    text: "Celebrate every occasion with Nakshatra.",
    ctaText: "Explore Jewellery",
    ctaLink: "/#products",
    secondaryCtaText: "Curated Sets",
    secondaryCtaLink: "/collections/jewellery-sets",
    productName: "Amara Gold Plated Choker Set",
    categoryTag: "Signature Sets",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    imageAlt: "Amara Gold Plated Choker Set festive collection",
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

  // Autoplay functionality: 5.5 seconds per slide (paused on hover/touch)
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
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
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
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
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
      className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden transition-colors select-none py-6 sm:py-10 md:py-14"
      style={{
        background: "var(--hero-gradient)",
      }}
      aria-roledescription="carousel"
      aria-label="Cinematic Jewellery Showcase"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="flex flex-col items-start lg:col-span-6 z-10">
            {/* Tag Badge */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] shadow-2xs"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                <span>{slide.categoryTag}</span>
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1
              key={`headline-${slide.id}`}
              className="font-serif-luxury mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-normal tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-700"
              style={{ color: "var(--text-primary)" }}
            >
              {slide.headline}
            </h1>

            {/* Editorial Subtext */}
            <p
              key={`text-${slide.id}`}
              className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg font-light animate-in fade-in slide-in-from-bottom-2 duration-700"
              style={{ color: "var(--text-secondary)" }}
            >
              {slide.text}
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--accent-cta)",
                  color: "var(--accent-cta-text)",
                }}
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={slide.secondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 liquid-glass liquid-glass-hover active:scale-[0.98]"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                <span>{slide.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Carousel Interactive Controls (Liquid Glass) */}
            <div className="mt-8 sm:mt-12 flex items-center gap-4">
              {/* Slide Counter */}
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold" style={{ color: "var(--text-muted)" }}>
                0{currentSlide + 1} / 0{heroSlides.length}
              </span>

              {/* Progress Bar / Dots */}
              <div className="flex items-center gap-1.5">
                {heroSlides.map((s, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        isActive ? "w-8 sm:w-10 shadow-xs" : "w-2 opacity-40 hover:opacity-80"
                      }`}
                      style={{
                        backgroundColor: isActive ? "var(--accent-cta)" : "var(--border-medium)",
                      }}
                      aria-label={`Go to slide ${idx + 1}: ${s.headline}`}
                    />
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-95 cursor-pointer"
                  style={{ color: "var(--text-primary)" }}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="flex h-8 w-8 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-95 cursor-pointer"
                  style={{ color: "var(--text-primary)" }}
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Product Photography Card */}
          <div className="lg:col-span-6 z-10">
            <div
              className="relative aspect-square sm:aspect-[4/3.5] lg:aspect-[4/3.8] w-full rounded-3xl overflow-hidden border shadow-xl transition-all duration-700"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Product Visual */}
              <div className="relative h-full w-full">
                {heroSlides.map((s, index) => {
                  const isCurrent = index === currentSlide;
                  return (
                    <div
                      key={s.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                      }`}
                      style={{
                        transitionProperty: "opacity, transform",
                      }}
                    >
                      <Image
                        src={s.imageSrc}
                        alt={s.imageAlt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 580px"
                        className="object-cover object-center p-4 sm:p-8"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Floating Glassmorphic Product Title Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
                <div className="liquid-glass rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-lg">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: "var(--accent-gold)" }}>
                      Featured Creation
                    </span>
                    <h3 className="font-serif-luxury text-sm sm:text-base font-semibold tracking-wide truncate" style={{ color: "var(--text-primary)" }}>
                      {slide.productName}
                    </h3>
                  </div>

                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all hover:scale-105 active:scale-95 shadow-xs"
                    style={{
                      backgroundColor: "var(--accent-cta)",
                      color: "var(--accent-cta-text)",
                    }}
                  >
                    <span>View</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Floating Atelier Seal */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider liquid-glass shadow-xs">
                  <Gem className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                  <span>Nakshatra Atelier</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
