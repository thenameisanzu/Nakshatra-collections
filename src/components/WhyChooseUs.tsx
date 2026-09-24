import { Sparkles, Gem, Droplets, ShieldCheck, Truck } from "lucide-react";

const perks = [
  {
    icon: Sparkles,
    title: "18K Real Gold Look",
    description: "Premium gold micro-polish that matches the exact shine and warm color of real gold.",
  },
  {
    icon: Droplets,
    title: "Waterproof & Anti-Tarnish",
    description: "High-grade 316L stainless steel base. Wear it daily in the shower, gym, and rain without fading.",
  },
  {
    icon: ShieldCheck,
    title: "Gentle On Skin",
    description: "100% nickel-free and hypoallergenic. Safe for sensitive skin with zero itching or turning green.",
  },
  {
    icon: Truck,
    title: "Fast Delivery Across Kerala",
    description: "Carefully packed in our signature gift box with fast, tracked delivery across Kerala and India.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 border-t transition-colors" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--tag-bg)",
              color: "var(--tag-text)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            The Nakshatra Promise
          </span>
          <h2
            className="font-serif-luxury mt-3 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Why You’ll Love Nakshatra
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            High quality artificial jewellery designed for everyday wear, college, office, and family weddings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
                  style={{
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--accent-cta)",
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className="font-serif-luxury text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {perk.title}
                </h3>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
