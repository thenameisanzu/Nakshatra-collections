"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Tag, ShieldCheck } from "lucide-react";

interface BudgetTier {
  title: string;
  priceLabel: string;
  subtext: string;
  badge: string;
  href: string;
}

const budgetTiers: BudgetTier[] = [
  {
    title: "Daily Rings & Studs",
    priceLabel: "Under ₹299",
    subtext: "Minimalist waterproof rings, solitaires & ear cuffs",
    badge: "Budget Pick",
    href: "/collections/rings",
  },
  {
    title: "Waterproof Chains & Cuffs",
    priceLabel: "Under ₹499",
    subtext: "100% Anti-tarnish 18K gold clover necklaces & bangles",
    badge: "Bestseller",
    href: "/collections/bangles",
  },
  {
    title: "Statement Sets & Kadas",
    priceLabel: "Under ₹999",
    subtext: "Layered luxury chains, tennis bracelets & pendants",
    badge: "Trending",
    href: "/collections/necklaces",
  },
  {
    title: "Bridal & Heritage Jewellery",
    priceLabel: "Under ₹2,499",
    subtext: "Kerala wedding choker sets, payals & antique temple sets",
    badge: "Grand Festive",
    href: "/collections/bridal-jewellery",
  },
];

export default function ShopByBudget() {
  return (
    <section
      className="py-10 sm:py-14 border-b border-gray-100 bg-white"
      aria-label="Shop By Budget"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] bg-gray-50 border border-gray-200 text-gray-900 shadow-2xs">
              <Tag className="h-3 w-3 text-amber-600" />
              <span>Budget Store &bull; Wholesale Friendly</span>
            </div>
            <h2 className="font-serif mt-2.5 text-2xl sm:text-3xl font-normal tracking-tight text-gray-900">
              Shop By Budget
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Anti-tarnish 18K gold luxury starting from ₹199. Daily wear jewellery curated for every budget.
            </p>
          </div>

          <Link
            href="/collections"
            className="text-xs font-semibold text-gray-700 hover:text-black uppercase tracking-wider flex items-center gap-1 hover:underline self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Budget Cards Grid - Clean & Minimal (Budget Blings Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {budgetTiers.map((tier) => (
            <Link
              key={tier.title}
              href={tier.href}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-gray-900 hover:shadow-sm overflow-hidden"
            >
              {/* Top: Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-gray-50 border border-gray-200 text-gray-800">
                  <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                  {tier.badge}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>

              {/* Center Price Hero */}
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight block text-gray-900">
                  {tier.priceLabel}
                </span>
                <h3 className="font-sans text-xs sm:text-sm font-semibold mt-1 text-gray-800 line-clamp-1">
                  {tier.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {tier.subtext}
                </p>
              </div>

              {/* Bottom CTA Indicator */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-600 group-hover:text-black">
                <span>Shop Category</span>
                <span className="font-bold">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
