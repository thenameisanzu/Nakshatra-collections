import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Gem } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Text Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            <div
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              <span>Haute Joaillerie &bull; Festive 2026</span>
            </div>

            <h1
              className="font-serif-luxury mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.15]"
              style={{ color: "var(--text-primary)" }}
            >
              Timeless Elegance, <br className="hidden sm:inline" />
              <span className="italic font-normal">Crafted for Eternity</span>
            </h1>

            <p
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover bespoke necklaces, luminous earrings, and solitaire statement rings curated for everyday grace and celebratory milestones.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/collections/necklaces"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--accent-cta)",
                  color: "var(--accent-cta-text)",
                }}
              >
                <span>Shop Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/collections/new-arrivals"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 hover:bg-black/5 active:scale-[0.98]"
                style={{
                  borderColor: "var(--border-medium)",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <span>Explore New Arrivals</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t w-full"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div>
                <p className="font-serif-luxury text-lg sm:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Bespoke
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Artisan Finished
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-lg sm:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Curated
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Fine Jewellery
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-lg sm:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Insured
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Velvet Box Transit
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-square sm:aspect-[4/5] w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl border"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
              }}
            >
              {/* Decorative Background Pattern */}
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
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase"
                  style={{
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--tag-text)",
                  }}
                >
                  <Gem className="h-3.5 w-3.5" />
                  Nakshatra Atelier
                </span>
                <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                  Haute Edition
                </span>
              </div>

              {/* Center Motif */}
              <div className="relative z-10 my-auto text-center py-6 sm:py-10">
                <div
                  className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full mb-4 sm:mb-6 border shadow-inner"
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
                  The Celestial Edition
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Curated Fine Necklaces & Jewels
                </p>
              </div>

              {/* Bottom Card Summary */}
              <div
                className="relative z-10 rounded-2xl p-3 sm:p-4 flex items-center justify-between border gap-2"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--tag-bg)" }}
                  >
                    <ShieldCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: "var(--accent-cta)" }} />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      Signature Collection
                    </p>
                    <p className="text-[9px] sm:text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Insured luxury transit
                    </p>
                  </div>
                </div>

                <Link
                  href="/collections/necklaces"
                  className="text-[10px] sm:text-xs font-bold tracking-wider uppercase hover:underline shrink-0"
                  style={{ color: "var(--accent-cta)" }}
                >
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
