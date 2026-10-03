"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Droplets,
  ShieldCheck,
  Crown,
  Truck,
} from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handled silently for autoplay restrictions
      });
    }
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden transition-colors"
      style={{ backgroundColor: "#110D0A" }}
      aria-label="Nakshatra Collections Cinematic Showcase"
    >
      {/* ==================================================================== */}
      {/* 1. CINEMATIC PERMANENTLY MUTED JEWELLERY VIDEO BACKGROUND            */}
      {/* ==================================================================== */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[700px] flex items-center overflow-hidden">
        {/* Fallback Poster Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/model-lifestyle.jpg"
            alt="Nakshatra 18K Gold Plated Jewellery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] sm:object-center"
          />
        </div>

        {/* HTML5 Autoplaying Permanently Muted Looping Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/model-lifestyle.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center z-1 transition-opacity duration-1000 ${
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

        {/* ------------------------------------------------------------------ */}
        {/* 2. DYNAMIC THEME-TINTED TRANSPARENT OVERLAY LAYER                  */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-colors duration-700 mix-blend-multiply"
          style={{
            backgroundColor: "var(--hero-video-tint)",
          }}
        />

        {/* Ambient Theme Radial Glow */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-colors duration-700"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, var(--hero-video-glow) 0%, transparent 65%)",
          }}
        />

        {/* High-Contrast Luxury Scrim for 100% Crisp Typography Readability */}
        <div
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(14, 10, 8, 0.92) 0%, rgba(14, 10, 8, 0.68) 48%, rgba(14, 10, 8, 0.3) 78%, rgba(14, 10, 8, 0.15) 100%)",
          }}
        />

        <div
          className="absolute inset-0 z-15 pointer-events-none sm:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(14, 10, 8, 0.95) 0%, rgba(14, 10, 8, 0.65) 50%, rgba(14, 10, 8, 0.25) 100%)",
          }}
        />

        {/* Ambient Bottom Fade to Active Theme Background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-15 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />

        {/* ================================================================== */}
        {/* 3. FOREGROUND EDITORIAL CONTENT                                    */}
        {/* ================================================================== */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full text-white">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] liquid-glass-dark border border-white/20 text-amber-300 mb-4 sm:mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>18K Micro-Gold Plated &bull; 100% Anti-Tarnish</span>
            </div>

            {/* Serif Headline */}
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Everyday Luxury, <br />
              <span className="italic font-normal text-amber-300">
                That Never Fades
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-200 line-clamp-3 max-w-xl font-light leading-relaxed opacity-95">
              Waterproof, sweatproof and hypoallergenic artificial jewellery crafted on surgical 316L stainless steel with authentic 18K real gold lustre.
            </p>

            {/* Value Props Micro-Strip */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-dark border border-white/15">
                <Droplets className="h-3.5 w-3.5 text-amber-300" />
                <span>Waterproof 316L</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-dark border border-white/15">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
                <span>Zero Skin Allergy</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-dark border border-white/15">
                <Crown className="h-3.5 w-3.5 text-amber-300" />
                <span>Kerala Bridal Sets</span>
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3.5 sm:gap-4">
              <Link
                href="/collections/necklaces"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-black"
                style={{
                  backgroundColor: "var(--accent-gold)",
                }}
              >
                <span>Shop All Jewellery</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/collections/bridal-jewellery"
                className="inline-flex items-center justify-center rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-wider text-white border border-white/30 liquid-glass-dark hover:bg-white/15 transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              >
                <span>Explore Bridal Sets</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. STORE VALUE GUARANTEE STRIP                                       */}
      {/* ==================================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-6">
        <div
          className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border grid grid-cols-2 md:grid-cols-4 gap-3 text-center shadow-lg liquid-glass backdrop-blur-xl"
          style={{
            borderColor: "var(--border-medium)",
          }}
        >
          <div className="flex items-center justify-center gap-2 py-1">
            <Sparkles className="h-4 w-4 shrink-0" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
              18K Real Gold Lustre
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <Droplets className="h-4 w-4 shrink-0" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
              100% Anti-Tarnish 316L
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
              Hypoallergenic Skin Safe
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <Truck className="h-4 w-4 shrink-0" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
              Express Kerala Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
