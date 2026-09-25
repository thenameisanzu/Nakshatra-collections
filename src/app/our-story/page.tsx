import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Gem, Heart, Droplets, CheckCircle2, Award, Clock, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | Nakshatra Collections Artificial Jewellery",
  description:
    "Learn about Nakshatra Collections, Kerala's trusted artificial jewellery brand crafted for daily wear with 18K gold micro-plating and 100% anti-tarnish durability.",
};

const valuePillars = [
  {
    icon: Gem,
    title: "18K Real Gold Aesthetic",
    description: "Every piece features premium 18K micro-plating that delivers the unmistakable warmth and rich luster of real gold.",
  },
  {
    icon: Droplets,
    title: "Waterproof & Sweatproof",
    description: "Crafted on a surgical-grade stainless steel foundation, built to endure Kerala's tropical weather, daily showers, and workouts without tarnishing.",
  },
  {
    icon: Heart,
    title: "100% Hypoallergenic",
    description: "Nickel-free and lead-free alloy ensures zero irritation, redness, or green skin, even for the most sensitive skin types.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Color Durability",
    description: "Advanced PVD vacuum-plating technology locks color onto the metal so your jewellery never blackens or fades.",
  },
];

const careTips = [
  "Rinse with clean tap water after beach or heavy workouts and pat dry with a soft cloth.",
  "Avoid spraying harsh perfumes or chemical cleaners directly on the stones to maintain brilliance.",
  "Store pieces in the provided Nakshatra plush pouch when traveling to prevent scratches.",
  "Polish gently with a microfiber jewellery cloth to instantly restore the mirror shine.",
];

export default function OurStoryPage() {
  return (
    <main className="flex-1 transition-colors" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Editorial Hero Header */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Our Story &bull; Kerala Heritage
            </span>

            <h1
              className="font-serif-luxury mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.12]"
              style={{ color: "var(--text-primary)" }}
            >
              Jewellery Made For Everyday Life,{" "}
              <span className="italic font-normal" style={{ color: "var(--accent-gold)" }}>
                That Never Fades
              </span>
            </h1>

            <p
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              At Nakshatra Collections, we believe you shouldn&apos;t have to keep your favorite jewellery locked in a safe. We craft waterproof, 18K gold-plated artificial jewellery you can wear with joy every single day across Kerala and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Narrative */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div
                className="group relative aspect-[4/5] w-full rounded-3xl overflow-hidden border shadow-2xl"
                style={{ borderColor: "var(--border-medium)" }}
              >
                <Image
                  src="/images/hero/festive-necklace.jpg"
                  alt="Nakshatra Collections Craftsmanship"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl liquid-glass text-center shadow-lg">
                  <p className="font-serif-luxury text-sm italic text-white leading-relaxed">
                    &ldquo;Jewellery that looks like pure gold, without the fear of loss or damage.&rdquo;
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 mt-1 block">
                    Nakshatra Collections &bull; Kerala
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Copy */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                The Nakshatra Promise
              </span>
              <h2
                className="font-serif-luxury mt-2 text-3xl sm:text-4xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Why We Started Nakshatra Collections
              </h2>

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>
                  Growing up in Kerala, gold jewellery has always been deeply rooted in our traditions, weddings, and family festivities. However, with soaring gold prices and safety concerns, women found themselves leaving their fine gold jewellery in bank lockers, settling for cheap imitation pieces that turn black or irritate sensitive skin within weeks.
                </p>
                <p>
                  We created <strong>Nakshatra Collections</strong> to bridge this exact divide. By pairing state-of-the-art <strong>PVD 18K gold micro-plating</strong> with medical-grade stainless steel and hand-set American diamonds, we create timeless jewellery that looks identical to solid gold—at a fraction of the price.
                </p>
                <p>
                  Whether you are dressing up for a cousin&apos;s wedding in Kochi, heading to college, or wearing your favorite chain in the shower, Nakshatra jewellery is crafted to never fade, never irritate, and always shine.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-widest shadow-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/#products"
                  className="inline-flex items-center rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-widest border liquid-glass transition-all hover:scale-105 active:scale-95"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border-medium)",
                  }}
                >
                  <span>View All Jewellery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Grid */}
      <section
        className="py-16 sm:py-24 border-t border-b transition-colors"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
              Uncompromising Quality
            </span>
            <h2
              className="font-serif-luxury mt-2 text-3xl sm:text-4xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Built For Daily Wear in Kerala
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl p-6 sm:p-8 border liquid-glass flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-medium)",
                  }}
                >
                  <div>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                      style={{
                        backgroundColor: "var(--tag-bg)",
                        color: "var(--accent-gold)",
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3
                      className="font-serif-luxury text-lg font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jewellery Care Guide Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border p-8 sm:p-12 lg:p-16 shadow-xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                Maintenance &bull; Care Guide
              </span>
              <h2
                className="font-serif-luxury mt-2 text-3xl sm:text-4xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                How To Keep Your Jewellery Sparkling Forever
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Because our pieces are forged with anti-tarnish 18K micro-plating, they need very minimal upkeep compared to conventional artificial jewellery.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {careTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl border liquid-glass" style={{ borderColor: "var(--border-subtle)" }}>
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--accent-gold)" }} />
                    <span className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section
        className="py-16 text-center border-t transition-colors"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            className="font-serif-luxury text-3xl sm:text-4xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to find your signature piece?
          </h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Enjoy free express delivery across Kerala and India on all orders.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              <span>Shop All Collections</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
