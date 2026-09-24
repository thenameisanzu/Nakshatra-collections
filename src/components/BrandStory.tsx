import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BrandStory() {
  return (
    <section
      id="about-story"
      className="py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border p-8 sm:p-12 md:p-16" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)" }}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Editorial Narrative */}
            <div className="lg:col-span-7">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Our Story
              </span>

              <h2
                className="font-serif-luxury mt-5 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Jewellery That Tells Your Story
              </h2>

              <p
                className="mt-6 text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                At Nakshatra, we believe jewellery is more than an accessory—it is an intimate reflection of your individuality. Every piece in our collection is curated with an eye for refined elegance and effortless grace, designed to celebrate both the quiet beauty of everyday moments and life&apos;s grandest milestones.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold" style={{ color: "var(--text-primary)" }}>Everyday Elegance</h4>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Lightweight, versatile designs made to elevate your daily style with subtle charm.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold" style={{ color: "var(--text-primary)" }}>Cherished Moments</h4>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Distinctive creations crafted to accompany you through unforgettable celebrations.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/collections/necklaces"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline"
                  style={{ color: "var(--accent-cta)" }}
                >
                  <span>Explore The Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Quote / Showcase */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-8 text-center border relative overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <span
                  className="font-serif-luxury text-6xl leading-none opacity-20 block"
                  style={{ color: "var(--accent-gold)" }}
                >
                  &ldquo;
                </span>
                <p
                  className="font-serif-luxury text-lg sm:text-xl italic leading-relaxed -mt-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  True elegance is when the jewellery feels like a natural part of who you are.
                </p>
                <div className="mt-6 pt-4 border-t w-24 mx-auto" style={{ borderColor: "var(--border-medium)" }} />
                <p className="text-xs font-semibold uppercase tracking-widest mt-2" style={{ color: "var(--accent-gold)" }}>
                  Nakshatra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
