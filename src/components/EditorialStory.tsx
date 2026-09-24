"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Gem, Award } from "lucide-react";

export default function EditorialStory() {
  return (
    <section
      id="editorial-story"
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl border p-6 sm:p-10 md:p-14 lg:p-16 relative overflow-hidden shadow-xl"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Magazine Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                04 &bull; Editorial Story
              </span>

              <h2
                className="font-serif-luxury mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15]"
                style={{ color: "var(--text-primary)" }}
              >
                Jewellery With A Story
              </h2>

              <p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                At Nakshatra, jewellery is an intimate extension of identity—an exquisite heirloom of personal expression. Every curve, stone prong, and polished facet is curated with an uncompromising devotion to royal heritage motifs and contemporary silhouettes.
              </p>

              {/* Atelier Pillars */}
              <div
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t w-full"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5" style={{ color: "var(--accent-gold)" }}>
                    <Gem className="h-4 w-4" />
                    <span className="font-serif-luxury text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      Artisan Craft
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Precision-set gemstones and hand-finished precious metalwork.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5" style={{ color: "var(--accent-gold)" }}>
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-serif-luxury text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      Certified Trust
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    100% genuine quality assurance and insured transit.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5" style={{ color: "var(--accent-gold)" }}>
                    <Award className="h-4 w-4" />
                    <span className="font-serif-luxury text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      Modern Luxury
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Wearable elegance crafted for life’s most cherished occasions.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/collections/necklaces"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase shadow-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  <span>Discover The Atelier</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Editorial Visual Portrait */}
            <div className="lg:col-span-5">
              <div
                className="group relative aspect-[4/5] w-full rounded-3xl overflow-hidden border shadow-lg"
                style={{ borderColor: "var(--border-medium)" }}
              >
                <Image
                  src="/images/hero/festive-necklace.jpg"
                  alt="Nakshatra Editorial Jewellery Craftsmanship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Ambient Frosted Vignette Quote Box */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl liquid-glass text-center shadow-lg">
                  <p
                    className="font-serif-luxury text-xs sm:text-sm italic leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    &ldquo;True elegance is when the jewellery feels like a natural part of who you are.&rdquo;
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] mt-1.5" style={{ color: "var(--accent-gold)" }}>
                    Nakshatra &bull; Atelier Philosophy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
