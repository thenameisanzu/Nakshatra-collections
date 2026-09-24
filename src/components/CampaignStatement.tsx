"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CampaignStatement() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32 md:py-40 transition-colors border-t border-b"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "#17120F",
      }}
      aria-label="Campaign Statement"
    >
      {/* Cinematic Background Jewellery Image with Rich Ambient Gradient */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/hero/pearl-heirlooms.jpg"
          alt="Nakshatra Haute Joaillerie Campaign"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Deep Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80 pointer-events-none" />

      {/* Centered Campaign Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] liquid-glass-dark mb-6"
          style={{ color: "#E0BE75" }}
        >
          <Sparkles className="h-3 w-3" />
          06 &bull; Campaign Statement
        </span>

        <h2 className="font-serif-luxury text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] text-white">
          Made To Be Remembered
        </h2>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
          Pieces created for the moments you&apos;ll never forget. Handcrafted with reverence for heritage and designed for eternal brilliance.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections/necklaces"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              backgroundColor: "var(--accent-gold)",
              color: "#1a1612",
            }}
          >
            <span>Discover Nakshatra</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/#collections"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white border border-white/25 liquid-glass-dark hover:bg-white/10 transition-all active:scale-95"
          >
            <span>Explore All Collections</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
