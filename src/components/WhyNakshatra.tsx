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
      className="py-12 sm:py-16 md:py-20 border-t border-gray-100 bg-white"
      aria-label="Why Premium Artificial Jewellery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] bg-gray-50 border border-gray-200 text-gray-900 shadow-2xs">
            <Sparkles className="h-3 w-3 text-amber-600" />
            The Anti-Tarnish Advantage
          </span>

          <h2 className="font-serif mt-3 text-3xl sm:text-4xl font-normal tracking-tight text-gray-900">
            Why Choose Nakshatra Jewellery
          </h2>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-500">
            Crafted for modern women across Kerala who love the real gold look, daily waterproof durability, and honest prices.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-gray-100 bg-[#FAFAFA] transition-all duration-200 hover:border-gray-300 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-200 text-amber-700 shadow-2xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-sans tracking-widest font-semibold text-gray-400">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium tracking-tight text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Micro-Strip (Kerala Courier, Exchange, Cash on Delivery) */}
        <div className="mt-8 sm:mt-10 p-5 rounded-2xl border border-gray-100 bg-[#FBFBFC] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <Truck className="h-4 w-4 text-amber-700" />
            <span className="text-xs font-medium text-gray-800">
              Express Delivery Across All Kerala Districts
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200 pt-3 sm:pt-0">
            <RefreshCw className="h-4 w-4 text-amber-700" />
            <span className="text-xs font-medium text-gray-800">
              Hassle-Free 7-Day Exchange Window
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 border-t sm:border-t-0 border-gray-200 pt-3 sm:pt-0">
            <Gem className="h-4 w-4 text-amber-700" />
            <span className="text-xs font-medium text-gray-800">
              Signature Velvet Luxury Storage Box Included
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
