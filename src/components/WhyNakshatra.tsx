"use client";

import { Sparkles, Droplets, ShieldCheck, Gem, Heart, LockKeyhole, RefreshCw, Truck } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    number: "01",
    title: "18K Real Gold Lustre",
    description: "Multi-layer micro-gold plating crafted to replicate the authentic warm radiance of 22K and 18K fine gold jewellery.",
  },
  {
    icon: Droplets,
    number: "02",
    title: "100% Anti-Tarnish & Waterproof",
    description: "Engineered on surgical 316L stainless steel that will not fade, discolor, or blacken in shower, sweat, or Kerala humidity.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Hypoallergenic & Skin Safe",
    description: "100% nickel-free and lead-free composition tested for sensitive skin. Safe for daily continuous wear without rashes or irritation.",
  },
  {
    icon: LockKeyhole,
    number: "04",
    title: "Luxury Without Locker Fear",
    description: "Enjoy grand bridal chokers, solitaires, and daily chains with complete peace of mind — no expensive bank lockers or theft worries.",
  },
];

export default function WhyNakshatra() {
  return (
    <section
      className="py-14 sm:py-20 md:py-24 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Why Premium Artificial Jewellery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] border shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--accent-cta)",
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
            The Anti-Tarnish Advantage
          </span>

          <h2
            className="font-serif mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Why Choose Nakshatra Jewellery
          </h2>

          <p
            className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Crafted for modern women across Kerala who love the real gold look, daily waterproof durability, and honest pricing.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-lift"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors group-hover:border-[color:var(--accent-gold)]"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--accent-gold)",
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-sans tracking-widest font-semibold opacity-60" style={{ color: "var(--text-muted)" }}>
                      {item.number}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-lg sm:text-xl font-medium tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-2.5 text-xs sm:text-sm leading-relaxed font-light"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Micro-Strip (Kerala Courier, Exchange, Cash on Delivery) */}
        <div
          className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-3xl border grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-center gap-2.5">
            <Truck className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
              Express Delivery Across All Kerala Districts
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 border-t sm:border-t-0 sm:border-l sm:border-r pt-3 sm:pt-0" style={{ borderColor: "var(--border-subtle)" }}>
            <RefreshCw className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
              Hassle-Free 7-Day Exchange Window
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 border-t sm:border-t-0 pt-3 sm:pt-0" style={{ borderColor: "var(--border-subtle)" }}>
            <Gem className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
              Signature Velvet Luxury Storage Box Included
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
