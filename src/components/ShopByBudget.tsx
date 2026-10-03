"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Tag, ShieldCheck } from "lucide-react";

interface BudgetTier {
  title: string;
  priceLabel: string;
  subtext: string;
  badge: string;
  href: string;
  bgGradient: string;
}

const budgetTiers: BudgetTier[] = [
  {
    title: "Daily Solitaires & Rings",
    priceLabel: "Under ₹999",
    subtext: "AAA+ American diamond rings & studs",
    badge: "Budget Pick",
    href: "/collections/rings",
    bgGradient: "from-amber-100/50 to-amber-50/20",
  },
  {
    title: "Waterproof Cuffs & Chains",
    priceLabel: "Under ₹1,499",
    subtext: "100% Anti-tarnish 18K gold clovers",
    badge: "Bestseller",
    href: "/collections/bangles",
    bgGradient: "from-rose-100/50 to-rose-50/20",
  },
  {
    title: "Layered Necklaces & Sets",
    priceLabel: "₹1,499 - ₹2,999",
    subtext: "Chokers, pendant sets & daily payals",
    badge: "Trending",
    href: "/collections/necklaces",
    bgGradient: "from-amber-100/60 to-yellow-50/30",
  },
  {
    title: "Kerala Bridal Heritage",
    priceLabel: "₹2,999 - ₹4,999",
    subtext: "Grand wedding necklace sets & jhumkas",
    badge: "Royal Bridal",
    href: "/collections/bridal-jewellery",
    bgGradient: "from-red-100/40 to-amber-50/30",
  },
];

export default function ShopByBudget() {
  return (
    <section
      className="py-10 sm:py-14 border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Shop By Budget"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] border"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
                color: "var(--accent-cta)",
              }}
            >
              <Tag className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              <span>Budget Store</span>
            </div>
            <h2
              className="font-serif mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Shop By Budget
            </h2>
            <p
              className="mt-1 text-xs sm:text-sm font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover 18K gold-plated jewellery suited for every pocket and occasion.
            </p>
          </div>

          <Link
            href="/collections"
            className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:underline self-start sm:self-auto"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>View All Collections</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Budget Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {budgetTiers.map((tier) => (
            <Link
              key={tier.title}
              href={tier.href}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg card-lift overflow-hidden"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
              }}
            >
              {/* Top: Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider liquid-glass border"
                  style={{
                    color: "var(--accent-cta)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                  {tier.badge}
                </span>
                <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: "var(--accent-cta)" }} />
              </div>

              {/* Center Price Hero */}
              <div>
                <span
                  className="font-serif text-2xl sm:text-3xl font-medium tracking-tight block"
                  style={{ color: "var(--accent-cta)" }}
                >
                  {tier.priceLabel}
                </span>
                <h3
                  className="font-serif text-sm sm:text-base font-medium mt-1 line-clamp-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {tier.title}
                </h3>
                <p
                  className="text-xs font-light mt-1 line-clamp-2 leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {tier.subtext}
                </p>
              </div>

              {/* Bottom CTA Indicator */}
              <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider" style={{ borderColor: "var(--border-subtle)", color: "var(--accent-gold)" }}>
                <span>Browse Store</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
