"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

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
      className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center overflow-hidden transition-colors"
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

      {/* Ambient Radial Theme Glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, var(--hero-video-glow) 0%, transparent 65%)",
        }}
      />

      {/* High-Contrast Luxury Scrim Overlay (Editorial Vignette) */}
      <div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(14, 10, 8, 0.92) 0%, rgba(14, 10, 8, 0.65) 45%, rgba(14, 10, 8, 0.2) 80%, rgba(14, 10, 8, 0.05) 100%)",
        }}
      />

      {/* Mobile Bottom Fade Gradient */}
      <div
        className="absolute inset-0 z-15 pointer-events-none sm:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(14, 10, 8, 0.95) 0%, rgba(14, 10, 8, 0.5) 50%, rgba(14, 10, 8, 0.1) 100%)",
        }}
      />

      {/* Editorial Content (Left-Aligned, Spacious & Minimalist) */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 w-full text-white">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 border border-white/20 liquid-glass-dark mb-4 sm:mb-5">
            <Sparkles className="h-3 w-3" />
            <span>18K Micro-Gold &bull; Anti-Tarnish</span>
          </div>

          {/* Serif Headline */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
            Everyday Luxury, <br />
            <span className="italic font-normal text-amber-300">
              That Never Fades
            </span>
          </h1>

          {/* Crisp Single-Sentence Subtext */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-200 line-clamp-2 max-w-md font-light leading-relaxed opacity-90">
            Waterproof, hypoallergenic artificial jewellery crafted on surgical steel with authentic 18K gold lustre.
          </p>

          {/* Single Confident Luxury CTA */}
          <div className="mt-6 sm:mt-8">
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
          </div>
        </div>
      </div>
    </section>
  );
}
