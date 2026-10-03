"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Gem } from "lucide-react";

import type { ShopifyCollection } from "@/types/shopify";

interface CollectionItem {
  handle: string;
  title: string;
  subtitle: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
}

const fallbackThumbnails: Record<string, { subtitle: string; tag: string; image: string }> = {
  necklaces: {
    subtitle: "Chokers, layered chains & royal neckpieces",
    tag: "Signature",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
  },
  earrings: {
    subtitle: "Luminous pearls, daily studs & chandeliers",
    tag: "Bestseller",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
  },
  rings: {
    subtitle: "American diamond solitaires & bands",
    tag: "Iconic",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
  },
  bracelets: {
    subtitle: "Waterproof cuffs & dainty charm links",
    tag: "Daily Wear",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  },
  bangles: {
    subtitle: "Waterproof cuffs & traditional bangles",
    tag: "Trending",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  },
  "jewellery-sets": {
    subtitle: "Harmonious bridal & festive matching sets",
    tag: "Bridal",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
  },
  "necklace-sets": {
    subtitle: "Harmonious bridal & festive matching sets",
    tag: "Festive",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
  },
  "bridal-jewellery": {
    subtitle: "Traditional Kerala bridal heritage designs",
    tag: "Bridal",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
  },
  anklets: {
    subtitle: "Dainty anti-tarnish daily wear payals",
    tag: "Daily Wear",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  },
  "new-arrivals": {
    subtitle: "Fresh 2026 18K gold polished designs",
    tag: "New In",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
  },
};

const defaultCollectionsData: CollectionItem[] = [
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
    handle: "necklace-sets",
    title: "Necklace Sets",
    subtitle: "Harmonious bridal & festive matching sets",
    tag: "Festive",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    imageAlt: "Nakshatra Necklace Sets Collection",
  },
  {
    handle: "bridal-jewellery",
    title: "Bridal Jewellery",
    subtitle: "Kerala traditional heritage wedding sets",
    tag: "Bridal",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    imageAlt: "Nakshatra Bridal Jewellery Collection",
  },
  {
    handle: "bangles",
    title: "Bangles & Kadas",
    subtitle: "Waterproof daily cuffs & classic bangles",
    tag: "Daily Wear",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    imageAlt: "Nakshatra Bangles Collection",
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
    handle: "anklets",
    title: "Anklets & Payals",
    subtitle: "Anti-tarnish waterproof daily payals",
    tag: "Trending",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    imageAlt: "Nakshatra Anklets Collection",
  },
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh 2026 18K gold polished designs",
    tag: "New In",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    imageAlt: "Nakshatra New Arrivals Collection",
  },
];

interface CuratedCollectionsProps {
  collections?: ShopifyCollection[];
}

export default function CuratedCollections({ collections }: CuratedCollectionsProps) {
  const displayItems: CollectionItem[] =
    collections && collections.length > 0
      ? collections.map((col) => {
          const fallback = fallbackThumbnails[col.handle] || {
            subtitle: col.description || "Curated jewellery collection",
            tag: "Curated",
            image: fallbackThumbnails.necklaces.image,
          };
          return {
            handle: col.handle,
            title: col.title,
            subtitle: col.description || fallback.subtitle,
            tag: fallback.tag,
            imageSrc: col.image?.url || fallback.image,
            imageAlt: col.image?.altText || col.title,
          };
        })
      : defaultCollectionsData;

  return (
    <section
      id="collections"
      className="py-14 sm:py-20 border-t transition-colors scroll-mt-24"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] liquid-glass border"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
                The Nakshatra Atelier
              </span>
            </div>
            <h2
              className="font-serif-luxury mt-2.5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Curated Collections Mosaic
            </h2>
            <p
              className="mt-2 text-sm sm:text-base font-medium max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Explore 8 dedicated artificial jewellery categories crafted with 18K micro-gold plating and 100% anti-tarnish guarantee.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest hover:underline transition-all shrink-0 py-1"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>View All 8 Categories</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Asymmetrical Luxury Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayItems.map((item, index) => {
            // Asymmetrical layout configuration for luxury magazine feel
            const isFeaturedWide = index === 0 || index === 3;
            const isFullWidthBanner = index === 7;

            return (
              <Link
                key={item.handle}
                href={`/collections/${item.handle}`}
                className={`group relative rounded-3xl overflow-hidden border p-5 sm:p-7 flex flex-col justify-between card-lift ${
                  isFullWidthBanner
                    ? "sm:col-span-2 lg:col-span-3 min-h-[220px] sm:min-h-[250px]"
                    : isFeaturedWide
                    ? "sm:col-span-2 min-h-[220px] sm:min-h-[270px]"
                    : "min-h-[210px] sm:min-h-[250px]"
                }`}
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {/* Visual Imagery Background with Soft Zoom */}
                <div
                  className={`absolute right-0 bottom-0 top-0 transition-transform duration-700 ease-out group-hover:scale-108 ${
                    isFullWidthBanner
                      ? "w-1/2 sm:w-2/5"
                      : isFeaturedWide
                      ? "w-3/5 sm:w-1/2"
                      : "w-1/2"
                  }`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-right-bottom p-3 sm:p-4 opacity-95"
                  />
                </div>

                {/* Scrim Gradient overlay ensuring crisp contrast */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(to right, var(--bg-surface) 0%, var(--bg-surface) 48%, transparent 100%)",
                  }}
                />

                {/* Top: Luxury Tag & Counter Pill */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider liquid-glass border"
                    style={{
                      color: "var(--accent-cta)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <Gem className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                    {item.tag}
                  </span>

                  <span
                    className="text-[11px] font-sans font-semibold tracking-widest opacity-60"
                    style={{ color: "var(--text-muted)" }}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom: Typography, Subtitle & Reveal CTA */}
                <div className={`relative z-10 mt-auto ${isFeaturedWide ? "max-w-[65%] sm:max-w-[55%]" : "max-w-[70%]"}`}>
                  <h3
                    className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight line-clamp-1 group-hover:opacity-85 transition-opacity"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 text-xs sm:text-sm line-clamp-2 leading-relaxed font-medium opacity-90"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.subtitle}
                  </p>

                  <div
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300"
                    style={{ color: "var(--accent-cta)" }}
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="h-4 w-4" />
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
