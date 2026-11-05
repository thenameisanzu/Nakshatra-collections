"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import type { ShopifyCollection } from "@/types/shopify";

interface QuickCategoryItem {
  name: string;
  href: string;
  image: string;
  label: string;
  itemCount: string;
  isHot?: boolean;
}

const fallbackImages: Record<string, { image: string; label: string; itemCount: string }> = {
  necklaces: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Chokers & Chains",
    itemCount: "128 items",
  },
  earrings: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    label: "Studs & Drops",
    itemCount: "44 items",
  },
  rings: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    label: "Solitaires & Bands",
    itemCount: "99 items",
  },
  bracelets: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Waterproof Cuffs",
    itemCount: "44 items",
  },
  bangles: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Bangles & Kadas",
    itemCount: "107 items",
  },
  "jewellery-sets": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Bridal Sets",
    itemCount: "64 items",
  },
  "necklace-sets": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Matching Sets",
    itemCount: "48 items",
  },
  "bridal-jewellery": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Kerala Bridal",
    itemCount: "64 items",
  },
  anklets: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Daily Payals",
    itemCount: "20 items",
  },
  "new-arrivals": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Fresh 2026",
    itemCount: "Fresh Drops",
  },
};

const defaultQuickCategories: QuickCategoryItem[] = [
  {
    name: "Necklace",
    href: "/collections/necklaces",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Chokers & Chains",
    itemCount: "128 items",
    isHot: true,
  },
  {
    name: "Bangles",
    href: "/collections/bangles",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Anti-Tarnish",
    itemCount: "107 items",
    isHot: true,
  },
  {
    name: "Rings",
    href: "/collections/rings",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    label: "American Diamond",
    itemCount: "99 items",
  },
  {
    name: "Earrings",
    href: "/collections/earrings",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    label: "Studs & Drops",
    itemCount: "44 items",
  },
  {
    name: "Traditional Jewellery",
    href: "/collections/bridal-jewellery",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Kerala Bridal",
    itemCount: "64 items",
    isHot: true,
  },
  {
    name: "Bracelets & Cuffs",
    href: "/collections/bangles",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Waterproof Cuffs",
    itemCount: "44 items",
  },
  {
    name: "Anklets",
    href: "/collections/anklets",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Daily Payals",
    itemCount: "20 items",
  },
  {
    name: "Necklace Sets",
    href: "/collections/necklace-sets",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Matching Sets",
    itemCount: "48 items",
  },
];

interface CategoryQuickStripProps {
  collections?: ShopifyCollection[];
}

export default function CategoryQuickStrip({ collections }: CategoryQuickStripProps) {
  // Filter out empty collections (0 products in Shopify) and deduplicate any duplicate names (e.g. Earrings vs Ear Rings)
  const validCollections = (collections || []).filter((col) => {
    const realCount = col.products?.edges?.length || 0;
    return realCount > 0;
  });

  const seenNormalizedNames = new Set<string>();
  const uniqueCollections = validCollections.filter((col) => {
    const normalized = col.title.toLowerCase().replace(/[\s-_]/g, "");
    if (seenNormalizedNames.has(normalized)) return false;
    seenNormalizedNames.add(normalized);
    return true;
  });

  const displayItems: QuickCategoryItem[] =
    uniqueCollections.length > 0
      ? uniqueCollections.slice(0, 8).map((col) => {
          // Priority 1: Shopify Collection Cover Image
          // Priority 2: First Product Image from this Collection in Shopify
          // Priority 3: Fallback image if collection is empty
          const backendProductImage = col.products?.edges?.[0]?.node?.featuredImage?.url;
          const fallback = fallbackImages[col.handle] || {
            image: fallbackImages.necklaces.image,
            label: col.title,
            itemCount: "Explore",
          };

          const realCount = col.products?.edges?.length || 0;
          const countText = `${realCount} ${realCount === 1 ? "item" : "items"}`;

          // Format clean title (e.g., if title is "Ear Rings", display as "Earrings")
          const cleanTitle = col.title.toLowerCase() === "ear rings" ? "Earrings" : col.title;

          return {
            name: cleanTitle,
            href: `/collections/${col.handle}`,
            image: col.image?.url || backendProductImage || fallback.image,
            label: cleanTitle,
            itemCount: countText,
          };
        })
      : defaultQuickCategories;

  return (
    <section
      className="py-10 sm:py-14 border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Curated Collections"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Category Header (Exact Budget Blings style from reference) */}
        <div className="text-center mb-8 sm:mb-10 reveal-on-scroll">
          <span
            className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.22em] mb-2"
            style={{ color: "var(--accent-gold)" }}
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
            ANTI-TARNISH COLLECTIONS
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Curated Collections
          </h2>
        </div>

        {/* Responsive Collection Cards Grid with Seamless Full-Fit Images */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex flex-col p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white border border-stone-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(36,24,21,0.08)] hover:border-[#C59B4E]/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer reveal-on-scroll-scale stagger-${(idx % 12) + 1}`}
            >
              {/* Product Showcase Image Container: Full Fit without inner boxes or padding */}
              <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF8F5]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Category Details at Bottom of Card */}
              <div className="pt-2.5 pb-1 sm:pt-3 text-center flex flex-col items-center">
                <h3
                  className="text-xs sm:text-sm font-medium line-clamp-1 transition-colors group-hover:text-[#C59B4E]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.name}
                </h3>
                <span
                  className="text-[10px] sm:text-[11px] font-light mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.itemCount}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Minimal Bottom CTA Button */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center reveal-on-scroll">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all duration-200 active:scale-95 shadow-2xs hover:opacity-90"
            style={{
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              borderColor: "var(--border-medium)",
            }}
          >
            <span>Explore All {displayItems.length} Collections</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
