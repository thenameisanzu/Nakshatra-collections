"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  Droplets,
  Truck,
  Gem,
  Tag,
} from "lucide-react";

const quickCategoryPills = [
  { label: "Chokers", href: "/collections/necklaces" },
  { label: "Earrings", href: "/collections/earrings" },
  { label: "Bridal Sets", href: "/collections/bridal-jewellery" },
  { label: "Bangles & Cuffs", href: "/collections/bangles" },
  { label: "Solitaires", href: "/collections/rings" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handled silently for autoplay policies
      });
    }
  }, []);

  return (
    <section
      className="relative w-full min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden transition-colors"
      style={{ backgroundColor: "#110D0A" }}
      aria-label="Nakshatra Collections Cinematic Showcase"
    >
      {/* 1. Fallback Poster Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/model-lifestyle.jpg"
          alt="Nakshatra 18K Gold Plated Jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] sm:object-center"
        />
      </div>

      {/* 2. HTML5 Autoplaying Permanently Muted Looping Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero/model-lifestyle.jpg"
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover object-[center_25%] sm:object-center z-1 transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-90"
        }`}
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-gold-necklace-and-earrings-41617-large.mp4"
          type="video/mp4"
        />
        <source
          src="/videos/hero-jewellery.mp4"
          type="video/mp4"
        />
      </video>

      {/* 3. Dynamic Theme Transparent Tint Layer */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-colors duration-700 mix-blend-multiply"
        style={{
          backgroundColor: "var(--hero-video-tint)",
        }}
      />

      {/* 4. Ambient Radial Glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle at 30% 45%, var(--hero-video-glow) 0%, transparent 65%)",
        }}
      />

      {/* 5. Desktop Vignette (Dark on left, clear on right for model/jewellery) */}
      <div
        className="absolute inset-0 z-15 pointer-events-none hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(14, 10, 8, 0.94) 0%, rgba(14, 10, 8, 0.7) 48%, rgba(14, 10, 8, 0.25) 80%, rgba(14, 10, 8, 0.1) 100%)",
        }}
      />

      {/* 6. Mobile Scrim (Clear top for model face & necklace, soft dark bottom for text) */}
      <div
        className="absolute inset-0 z-15 pointer-events-none sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14, 10, 8, 0.2) 0%, rgba(14, 10, 8, 0.4) 40%, rgba(14, 10, 8, 0.92) 75%, rgba(14, 10, 8, 0.98) 100%)",
        }}
      />

      {/* ==================================================================== */}
      {/* 7. MAIN EDITORIAL CONTENT                                             */}
      {/* ==================================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28 pb-6 sm:pb-12 w-full text-white flex-1 flex flex-col justify-end sm:justify-center">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Left Column: Heading, Subtext, CTA & Category Pills */}
          <div className="max-w-xl">
            {/* Social Proof & Trust Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] liquid-glass-dark border border-white/20 mb-3 sm:mb-4">
              <div className="flex items-center text-amber-300">
                <Star className="h-3 w-3 fill-amber-300" />
              </div>
              <span className="text-neutral-100">4.9/5 Rating &bull; 1,200+ Kerala Brides</span>
            </div>

            {/* Serif Luxury Headline */}
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Everyday Luxury, <br />
              <span className="italic font-normal text-amber-300">
                That Never Fades
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-200 line-clamp-2 max-w-md font-light leading-relaxed opacity-90">
              Waterproof, sweatproof &amp; hypoallergenic artificial jewellery crafted on surgical steel with 18K real gold lustre.
            </p>

            {/* Primary Action Button */}
            <div className="mt-5 sm:mt-7 flex items-center gap-3">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-black shrink-0"
                style={{
                  backgroundColor: "var(--accent-gold)",
                }}
              >
                <span>Discover Collections</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Category 1-Tap Shortcut Pills */}
            <div className="mt-4 sm:mt-5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300/80 mr-0.5 shrink-0 hidden sm:inline">
                Shop:
              </span>
              {quickCategoryPills.map((pill) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className="rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-medium tracking-wide whitespace-nowrap liquid-glass-dark border border-white/20 text-neutral-200 hover:text-white hover:border-amber-300/60 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Floating "Shop The Look" Card */}
          <div className="self-start lg:self-end">
            <Link
              href="/products/royal-kundan-choker-set"
              className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl liquid-glass-dark border border-white/20 transition-all duration-300 hover:scale-105 hover:border-amber-300/60 shadow-2xl"
              aria-label="Shop featured piece worn by model"
            >
              {/* Product Thumbnail */}
              <div className="relative h-11 w-11 sm:h-13 sm:w-13 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242"
                  alt="Royal Kundan Choker"
                  fill
                  sizes="52px"
                  className="object-cover p-1 group-hover:scale-110 transition-transform"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col pr-1">
                <div className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-amber-300">
                  <Tag className="h-2.5 w-2.5" />
                  <span>Featured On Model</span>
                </div>
                <span className="text-xs sm:text-sm font-serif font-medium text-white line-clamp-1">
                  Royal Heritage Choker
                </span>
                <span className="text-[11px] font-semibold text-neutral-300">
                  ₹2,499 &bull; <span className="text-amber-300 text-[10px] uppercase font-bold tracking-wider group-hover:underline">View Piece &rarr;</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 8. INTEGRATED STORE TRUST & GUARANTEE STRIP (Sleek Bottom Ticker)     */}
      {/* ==================================================================== */}
      <div
        className="relative z-20 w-full border-t border-white/10 liquid-glass-dark py-2.5 sm:py-3 transition-colors"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-neutral-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                18K Real Gold Lustre
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-neutral-200">
              <Droplets className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                100% Anti-Tarnish 316L
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-neutral-200">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                Hypoallergenic Skin Safe
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-neutral-200">
              <Truck className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                Express Kerala Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
