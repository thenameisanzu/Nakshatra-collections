"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Gem } from "lucide-react";

interface CollectionItem {
  handle: string;
  title: string;
  subtitle: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
}

const collectionsData: CollectionItem[] = [
  {
    handle: "necklaces",
    title: "Necklaces & Pendants",
    subtitle: "Chokers, layered chains & royal neckpieces",
    tag: "Signature",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    imageAlt: "Nakshatra Necklaces & Pendants Collection",
  },
  {
    handle: "earrings",
    title: "Earrings & Drops",
    subtitle: "Luminous pearls, daily studs & chandeliers",
    tag: "Bestseller",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    imageAlt: "Nakshatra Earrings Collection",
  },
  {
    handle: "rings",
    title: "Solitaires & Rings",
    subtitle: "American diamond solitaires & bands",
    tag: "Iconic",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    imageAlt: "Nakshatra Solitaires & Rings Collection",
  },
  {
    handle: "bracelets",
    title: "Bracelets & Bangles",
    subtitle: "Waterproof cuffs & dainty charm links",
    tag: "Daily Wear",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    imageAlt: "Nakshatra Bracelets Collection",
  },
  {
    handle: "jewellery-sets",
    title: "Jewellery Sets",
    subtitle: "Harmonious bridal & festive matching sets",
    tag: "Bridal",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    imageAlt: "Nakshatra Jewellery Sets Collection",
  },
  {
    handle: "new-arrivals",
    title: "Latest Arrivals",
    subtitle: "Fresh 2026 18K gold polished designs",
    tag: "New In",
    imageSrc: "/images/hero/model-lifestyle.jpg",
    imageAlt: "Nakshatra New Arrivals Collection",
  },
];

export default function CuratedCollections() {
  return (
    <section
      id="collections"
      className="py-10 sm:py-14 border-t transition-colors scroll-mt-24"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                <Sparkles className="h-2.5 w-2.5" style={{ color: "var(--accent-gold)" }} />
                Categories
              </span>
            </div>
            <h2
              className="font-serif-luxury mt-2 text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Shop By Category
            </h2>
            <p
              className="mt-1 text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Explore anti-tarnish daily wear and festive sets.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline transition-colors shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Compact, Balanced 6-Card Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {collectionsData.map((item) => (
            <Link
              key={item.handle}
              href={`/collections/${item.handle}`}
              className="group relative rounded-2xl overflow-hidden border p-4 sm:p-5 flex flex-col justify-between h-[180px] sm:h-[200px] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
              }}
            >
              {/* Product Background Image Thumbnail */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-95 transition-transform duration-500 ease-out group-hover:scale-105">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain object-right-bottom p-2"
                />
              </div>

              {/* Gradient Mask for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--bg-surface)] via-[color:var(--bg-surface)]/85 to-transparent pointer-events-none" />

              {/* Tag Pill */}
              <div className="relative z-10">
                <span
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider liquid-glass"
                  style={{ color: "var(--accent-gold)" }}
                >
                  <Gem className="h-2.5 w-2.5" />
                  {item.tag}
                </span>
              </div>

              {/* Title, Subtitle, and CTA */}
              <div className="relative z-10 max-w-[65%] mt-auto">
                <h3
                  className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight line-clamp-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-0.5 text-[11px] sm:text-xs line-clamp-1 opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.subtitle}
                </p>
                <div
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent-cta)" }}
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
