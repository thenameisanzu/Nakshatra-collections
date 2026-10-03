"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Heart, Crown, Gem, Droplets, type LucideIcon } from "lucide-react";

interface OccasionCard {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  href: string;
  icon: LucideIcon;
}

const occasions: OccasionCard[] = [
  {
    title: "Daily Office & College",
    subtitle: "Dainty anti-tarnish chains, studs & subtle clovers",
    tag: "Everyday Wear",
    image: "/images/hero/model-lifestyle.jpg",
    href: "/collections/necklaces",
    icon: Droplets,
  },
  {
    title: "Kerala Wedding & Bridal",
    subtitle: "Heritage Kundan chokers, temple sets & royal jhumkas",
    tag: "Festive & Bridal",
    image: "/images/hero/festive-necklace.jpg",
    href: "/collections/bridal-jewellery",
    icon: Crown,
  },
  {
    title: "Cocktails & Evening Glam",
    subtitle: "American diamond solitaires & sparkling drop earrings",
    tag: "Evening Party",
    image: "/images/hero/solitaire-rings.jpg",
    href: "/collections/earrings",
    icon: Gem,
  },
  {
    title: "Gifts & Anniversary",
    subtitle: "Pre-boxed 18K micro-gold plated signature sets",
    tag: "Gifting Essentials",
    image: "/images/hero/pearl-heirlooms.jpg",
    href: "/collections/necklace-sets",
    icon: Heart,
  },
];

export default function ShopByOccasion() {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Shop By Occasion"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] border shadow-xs"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
                color: "var(--accent-cta)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              Curated Occasions
            </span>
            <h2
              className="font-serif mt-3 text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Shop By Occasion
            </h2>
            <p
              className="mt-1.5 text-xs sm:text-sm leading-relaxed font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              Find matching 18K gold plated jewellery styled for every event across Kerala.
            </p>
          </div>

          <Link
            href="/collections"
            className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:underline shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>Explore All 8 Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {occasions.map((occ) => {
            const IconComponent = occ.icon;
            return (
              <Link
                key={occ.title}
                href={occ.href}
                className="group relative rounded-3xl overflow-hidden border p-5 sm:p-6 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl card-lift"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                }}
              >
                {/* Visual Image Background with Soft Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={occ.image}
                    alt={occ.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-90"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(14, 10, 8, 0.92) 0%, rgba(14, 10, 8, 0.5) 45%, rgba(14, 10, 8, 0.2) 80%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Top: Pill Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider liquid-glass-dark border border-white/20 text-white">
                    <IconComponent className="h-3 w-3 text-amber-300" />
                    <span>{occ.tag}</span>
                  </span>
                </div>

                {/* Bottom: Title & CTA */}
                <div className="relative z-10 text-white mt-auto">
                  <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                    {occ.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-200 line-clamp-2 font-light leading-relaxed opacity-90">
                    {occ.subtitle}
                  </p>

                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>Shop Look</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
