import { Sparkles, Gem, ShoppingBag, ShieldCheck } from "lucide-react";

const perks = [
  {
    icon: Sparkles,
    title: "Thoughtfully Curated",
    description: "Hand-selected collections tailored to suit every individual style and occasion.",
  },
  {
    icon: Gem,
    title: "Elegant Designs",
    description: "Graceful silhouettes and timeless aesthetics that stand out with quiet confidence.",
  },
  {
    icon: ShoppingBag,
    title: "Easy Shopping",
    description: "Seamless navigation, detailed product views, and quick checkout at your fingertips.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Safe, encrypted order processing powered by trusted Shopify payment infrastructure.",
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
            The Experience
          </span>
          <h2
            className="font-serif-luxury mt-3 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Why Nakshatra
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Our commitment to refined design, effortless discovery, and a dependable shopping experience.
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
