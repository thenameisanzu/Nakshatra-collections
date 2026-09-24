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
  isLarge?: boolean;
}

const collectionsData: CollectionItem[] = [
  {
    handle: "necklaces",
    title: "Necklaces & Pendants",
    subtitle: "Chokers, layered chains & royal statement neckpieces",
    tag: "Atelier Signature",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    imageAlt: "Nakshatra Necklaces & Pendants Collection",
    isLarge: true,
  },
  {
    handle: "earrings",
    title: "Earrings & Drops",
    subtitle: "Luminous pearls, studs & chandelier drops",
    tag: "Essential Grace",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    imageAlt: "Nakshatra Earrings Collection",
  },
  {
    handle: "rings",
    title: "Solitaires & Rings",
    subtitle: "American diamond solitaires & stackable bands",
    tag: "Iconic Fire",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    imageAlt: "Nakshatra Solitaires & Rings Collection",
  },
  {
    handle: "bracelets",
    title: "Bracelets & Bangles",
    subtitle: "Dainty charm links & 18K micro-plated cuffs",
    tag: "Everyday Lustre",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    imageAlt: "Nakshatra Bracelets Collection",
  },
  {
    handle: "jewellery-sets",
    title: "Jewellery Sets",
    subtitle: "Harmonious bridal & festive chokers with matching earrings",
    tag: "Grand Celebrations",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    imageAlt: "Nakshatra Jewellery Sets Collection",
    isLarge: true,
  },
];

export default function CuratedCollections() {
  return (
    <section
      id="collections"
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              02 &bull; Curated Collections
            </span>
            <h2
              className="font-serif-luxury mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Curated Masterpieces
            </h2>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover pieces created for unforgettable moments, each handcrafted to reflect timeless Indian artistry and contemporary finesse.
            </p>
          </div>

          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline transition-colors shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>View Full Directory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
          {/* Card 1: Large Featured Necklaces (Span 7) */}
          <Link
            href={`/collections/${collectionsData[0].handle}`}
            className="group relative lg:col-span-7 rounded-3xl overflow-hidden border p-6 sm:p-10 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            {/* Background Image Showcase */}
            <div className="absolute right-0 bottom-0 top-0 w-full sm:w-2/3 opacity-90 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={collectionsData[0].imageSrc}
                alt={collectionsData[0].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain object-right-bottom p-4"
              />
            </div>

            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--bg-surface)] via-[color:var(--bg-surface)]/80 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                style={{ color: "var(--accent-gold)" }}
              >
                <Gem className="h-3 w-3" />
                {collectionsData[0].tag}
              </span>
            </div>

            <div className="relative z-10 max-w-sm mt-auto pt-16">
              <h3
                className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {collectionsData[0].title}
              </h3>
              <p
                className="mt-2 text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {collectionsData[0].subtitle}
              </p>
              <div
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>Explore Pieces</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 2: Earrings (Span 5) */}
          <Link
            href={`/collections/${collectionsData[1].handle}`}
            className="group relative lg:col-span-5 rounded-3xl overflow-hidden border p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="absolute inset-0 opacity-85 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={collectionsData[1].imageSrc}
                alt={collectionsData[1].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom p-6"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-surface)] via-[color:var(--bg-surface)]/40 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                style={{ color: "var(--accent-gold)" }}
              >
                {collectionsData[1].tag}
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-16">
              <h3
                className="font-serif-luxury text-2xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {collectionsData[1].title}
              </h3>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {collectionsData[1].subtitle}
              </p>
              <div
                className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>View Earrings</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 3: Rings (Span 4) */}
          <Link
            href={`/collections/${collectionsData[2].handle}`}
            className="group relative lg:col-span-4 rounded-3xl overflow-hidden border p-6 sm:p-8 flex flex-col justify-between min-h-[340px] transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="absolute inset-0 opacity-85 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={collectionsData[2].imageSrc}
                alt={collectionsData[2].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-bottom p-6"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-surface)] via-[color:var(--bg-surface)]/30 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                style={{ color: "var(--accent-gold)" }}
              >
                {collectionsData[2].tag}
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-16">
              <h3
                className="font-serif-luxury text-xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {collectionsData[2].title}
              </h3>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {collectionsData[2].subtitle}
              </p>
              <div
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>Shop Rings</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          {/* Card 4: Bracelets (Span 4) */}
          <Link
            href={`/collections/${collectionsData[3].handle}`}
            className="group relative lg:col-span-4 rounded-3xl overflow-hidden border p-6 sm:p-8 flex flex-col justify-between min-h-[340px] transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="absolute inset-0 opacity-85 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={collectionsData[3].imageSrc}
                alt={collectionsData[3].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-bottom p-6"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-surface)] via-[color:var(--bg-surface)]/30 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                style={{ color: "var(--accent-gold)" }}
              >
                {collectionsData[3].tag}
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-16">
              <h3
                className="font-serif-luxury text-xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {collectionsData[3].title}
              </h3>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {collectionsData[3].subtitle}
              </p>
              <div
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>Shop Bracelets</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          {/* Card 5: Grand Jewellery Sets (Span 4) */}
          <Link
            href={`/collections/${collectionsData[4].handle}`}
            className="group relative sm:col-span-2 lg:col-span-4 rounded-3xl overflow-hidden border p-6 sm:p-8 flex flex-col justify-between min-h-[340px] transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="absolute inset-0 opacity-85 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={collectionsData[4].imageSrc}
                alt={collectionsData[4].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-bottom p-6"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-surface)] via-[color:var(--bg-surface)]/30 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                style={{ color: "var(--accent-gold)" }}
              >
                {collectionsData[4].tag}
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-16">
              <h3
                className="font-serif-luxury text-xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {collectionsData[4].title}
              </h3>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {collectionsData[4].subtitle}
              </p>
              <div
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>View Sets</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
