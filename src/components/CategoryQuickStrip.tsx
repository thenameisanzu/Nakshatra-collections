"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import type { ShopifyCollection } from "@/types/shopify";

interface QuickCategoryItem {
  name: string;
  href: string;
  image: string;
  label: string;
  isHot?: boolean;
}

const fallbackImages: Record<string, { image: string; label: string }> = {
  necklaces: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Chokers & Chains",
  },
  earrings: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    label: "Studs & Drops",
  },
  rings: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    label: "Solitaires & Bands",
  },
  bracelets: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Waterproof Cuffs",
  },
  bangles: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Bangles & Kadas",
  },
  "jewellery-sets": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Bridal Sets",
  },
  "necklace-sets": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Matching Sets",
  },
  "bridal-jewellery": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Kerala Bridal",
  },
  anklets: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Daily Payals",
  },
  "new-arrivals": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Fresh 2026",
  },
};

const defaultQuickCategories: QuickCategoryItem[] = [
  {
    name: "Bridal Sets",
    href: "/collections/bridal-jewellery",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Kerala Bridal",
    isHot: true,
  },
  {
    name: "Necklaces",
    href: "/collections/necklaces",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Chokers & Chains",
  },
  {
    name: "Earrings",
    href: "/collections/earrings",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
    label: "Studs & Drops",
  },
  {
    name: "Bangles & Cuffs",
    href: "/collections/bangles",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Anti-Tarnish",
    isHot: true,
  },
  {
    name: "Rings & Solitaires",
    href: "/collections/rings",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    label: "American Diamond",
  },
  {
    name: "Necklace Sets",
    href: "/collections/necklace-sets",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Matching Sets",
  },
  {
    name: "Daily Payals",
    href: "/collections/anklets",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Waterproof",
  },
  {
    name: "New Arrivals",
    href: "/collections/new-arrivals",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "2026 Additions",
  },
];

interface CategoryQuickStripProps {
  collections?: ShopifyCollection[];
}

export default function CategoryQuickStrip({ collections }: CategoryQuickStripProps) {
  const displayItems: QuickCategoryItem[] =
    collections && collections.length > 0
      ? collections.slice(0, 8).map((col) => {
          const fallback = fallbackImages[col.handle] || {
            image: fallbackImages.necklaces.image,
            label: "Collection",
          };
          return {
            name: col.title,
            href: `/collections/${col.handle}`,
            image: col.image?.url || fallback.image,
            label: fallback.label,
          };
        })
      : defaultQuickCategories;

  return (
    <section
      className="py-5 sm:py-7 border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Category Stories Strip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Category Header */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
              Shop By Category
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:underline"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>View All (8)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Center-Aligned Horizontal Story Circles */}
        <div className="flex items-start justify-start md:justify-center gap-3.5 sm:gap-6 md:gap-7 overflow-x-auto no-scrollbar py-1">
          {displayItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col items-center shrink-0 text-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer w-[70px] sm:w-[84px] md:w-[92px]"
            >
              {/* Circular Thumbnail with Gold Gradient Ring */}
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-2xs mb-2">
                <div
                  className="relative h-14 w-14 sm:h-17 sm:w-17 md:h-18 md:w-18 rounded-full overflow-hidden p-1"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 56px, (max-width: 768px) 68px, 72px"
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {item.isHot && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-white shadow-xs">
                    <Flame className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>

              {/* Clean Geometric Sans Category Name (No Serif) */}
              <span
                className="font-sans text-[11px] sm:text-xs font-medium tracking-tight line-clamp-1 group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {item.name}
              </span>
              <span
                className="font-sans text-[9px] font-normal opacity-65 hidden sm:block truncate max-w-full"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
