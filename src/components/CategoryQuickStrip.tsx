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
  const displayItems: QuickCategoryItem[] =
    collections && collections.length > 0
      ? collections.slice(0, 8).map((col) => {
          const fallback = fallbackImages[col.handle] || {
            image: fallbackImages.necklaces.image,
            label: "Collection",
            itemCount: `${col.products?.edges?.length || 24} items`,
          };
          return {
            name: col.title,
            href: `/collections/${col.handle}`,
            image: col.image?.url || fallback.image,
            label: fallback.label,
            itemCount: fallback.itemCount,
          };
        })
      : defaultQuickCategories;

  return (
    <section
      className="py-10 sm:py-14 border-b border-gray-100 bg-white"
      aria-label="Curated Collections"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Category Header (Exact Budget Blings style from reference) */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-amber-700 mb-2">
            <Sparkles className="h-3 w-3 text-amber-600" />
            ANTI-TARNISH COLLECTIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-gray-900">
            Curated Collections
          </h2>
        </div>

        {/* Responsive Collection Cards Grid (Budget Blings Category Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {displayItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex flex-col rounded-2xl border border-gray-200/90 bg-white overflow-hidden transition-all duration-300 hover:border-gray-900 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              {/* Product Showcase Image Stage */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#F9FAFB]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-108"
                />
              </div>

              {/* Category Details at Bottom of Card */}
              <div className="p-3 sm:p-4 text-center flex flex-col items-center bg-white border-t border-gray-100">
                <h3 className="font-serif text-xs sm:text-sm font-medium text-gray-900 group-hover:text-black line-clamp-1 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-light mt-0.5">
                  {item.itemCount}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Minimal Bottom CTA Button */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white text-gray-900 border border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-2xs"
          >
            <span>Explore All 8 Collections</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
