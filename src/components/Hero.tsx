"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Droplets,
  ShieldCheck,
  Truck,
} from "lucide-react";

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
    <>
      {/* ==================================================================== */}
      {/* 1. CINEMATIC FULL-BLEED VIDEO HERO (Quiet Luxury Editorial)           */}
      {/* ==================================================================== */}
      <section
        className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] xl:min-h-[680px] flex items-center overflow-hidden transition-colors"
        style={{ backgroundColor: "#110D0A" }}
        aria-label="Nakshatra Collections Cinematic Showcase"
      >
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

        {/* Dynamic Theme Transparent Tint Layer */}
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
              "radial-gradient(circle at 35% 50%, var(--hero-video-glow) 0%, transparent 65%)",
          }}
        />

        {/* High-Contrast Luxury Scrim Overlay */}
        <div
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(14, 10, 8, 0.94) 0%, rgba(14, 10, 8, 0.72) 48%, rgba(14, 10, 8, 0.3) 78%, rgba(14, 10, 8, 0.1) 100%)",
          }}
        />

        <div
          className="absolute inset-0 z-15 pointer-events-none sm:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(14, 10, 8, 0.96) 0%, rgba(14, 10, 8, 0.65) 52%, rgba(14, 10, 8, 0.2) 100%)",
          }}
        />

        {/* Ambient Bottom Fade to Active Theme Background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-15 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />

        {/* Editorial Content (Center/Left Aligned, Clean & Spacious) */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full text-white">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] liquid-glass-dark border border-white/20 text-amber-300 mb-4 sm:mb-5">
              <Sparkles className="h-3 w-3" />
              <span>18K Micro-Gold Plated &bull; 100% Anti-Tarnish</span>
            </div>

            {/* Serif Headline */}
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Everyday Luxury, <br />
              <span className="italic font-normal text-amber-300">
                That Never Fades
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-200 line-clamp-2 max-w-lg font-light leading-relaxed opacity-95">
              Waterproof, sweatproof and hypoallergenic artificial jewellery crafted on surgical 316L stainless steel with authentic 18K real gold lustre.
            </p>

            {/* Single Prominent Luxury CTA */}
            <div className="mt-7 sm:mt-9 flex items-center gap-4 flex-wrap">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-black"
                style={{
                  backgroundColor: "var(--accent-gold)",
                }}
              >
                <span>Discover Collections</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/collections/bridal-jewellery"
                className="inline-flex items-center justify-center rounded-full px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-wider text-white border border-white/30 liquid-glass-dark hover:bg-white/15 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Bridal Sets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. DEDICATED STORE TRUST RIBBON (Positioned Cleanly Below Hero)      */}
      {/* ==================================================================== */}
      <div
        className="w-full border-b transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
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
      </div>
    </>
  );
}
