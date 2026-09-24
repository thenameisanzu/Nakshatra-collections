"use client";

import { Sparkles, Gem, ShieldCheck, Heart } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    number: "01",
    title: "Thoughtfully Curated",
    description: "Every jewel is meticulously selected for distinct character, balanced proportions, and uncompromising finishing.",
  },
  {
    icon: Gem,
    number: "02",
    title: "Elegant Designs",
    description: "Graceful silhouettes and subtle grandeur that stand out with quiet confidence and enduring charm.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Made For Every Occasion",
    description: "Versatile creations seamlessly transitioning from daytime sophistication to festive splendour.",
  },
  {
    icon: Heart,
    number: "04",
    title: "A Touch Of Timeless Beauty",
    description: "Artisanal craftsmanship rooted in Indian heritage, designed to become cherished modern heirlooms.",
  },
];

export default function WhyNakshatra() {
  return (
    <section
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{
              backgroundColor: "var(--tag-bg)",
              color: "var(--tag-text)",
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
            07 &bull; The Atelier Standard
          </span>

          <h2
            className="font-serif-luxury mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Why Nakshatra
          </h2>

          <p
            className="mt-2 text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Our pledge to refined aesthetics, authentic metalcraft, and an elevated jewellery acquisition experience.
          </p>
        </div>

        {/* Minimal Editorial Grid with Subtle Borders and Refined Line Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors group-hover:border-[color:var(--accent-gold)]"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--accent-gold)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
                      {item.number}
                    </span>
                  </div>

                  <h3
                    className="font-serif-luxury text-lg font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-2.5 text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
