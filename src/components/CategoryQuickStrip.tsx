import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

import type { ShopifyCollection } from "@/types/shopify";

interface QuickCategoryItem {
  name: string;
  href: string;
  image: string;
  label: string;
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
    label: "Bridal & Festive",
  },
  "necklace-sets": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Bridal & Festive",
  },
  "bridal-jewellery": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Kerala Heritage",
  },
  anklets: {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Daily Payals",
  },
  "new-arrivals": {
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Latest 2026",
  },
};

const defaultQuickCategories: QuickCategoryItem[] = [
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
    name: "Necklace Sets",
    href: "/collections/necklace-sets",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Festive Sets",
  },
  {
    name: "Bridal Jewellery",
    href: "/collections/bridal-jewellery",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/80adacfa6be919de9607a60cea76b15a3f411a4f7d85fca420cc75df8c4e0577.png?v=1790239866",
    label: "Kerala Bridal",
  },
  {
    name: "Bangles",
    href: "/collections/bangles",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Waterproof Cuffs",
  },
  {
    name: "Rings",
    href: "/collections/rings",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
    label: "Solitaires & Bands",
  },
  {
    name: "Anklets",
    href: "/collections/anklets",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
    label: "Daily Payals",
  },
  {
    name: "New Arrivals",
    href: "/collections/new-arrivals",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
    label: "Latest 2026",
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
      className="py-5 sm:py-6 border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Category Quick Links"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
              Shop By Category
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>All Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Horizontal Category Strip with Real Product Visuals */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3.5">
          {displayItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border liquid-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 text-center"
              style={{
                borderColor: "var(--border-subtle)",
              }}
            >
              <div
                className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden mb-2 border-2 transition-transform duration-300 group-hover:scale-105 shadow-xs"
                style={{
                  borderColor: "var(--accent-gold)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover object-center p-1"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold font-serif-luxury line-clamp-1 group-hover:underline" style={{ color: "var(--text-primary)" }}>
                {item.name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold hidden sm:block mt-0.5 opacity-80" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
