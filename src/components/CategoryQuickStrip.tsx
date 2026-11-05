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

// Curated high-resolution imagery for each category when Shopify collection has no custom poster image uploaded
function getCategoryCuratedImage(handle: string, title: string): string {
  const combined = `${handle.toLowerCase()} ${title.toLowerCase()}`;
  if (combined.includes("neck") || combined.includes("chain") || combined.includes("choker")) {
    return "/images/hero/slide-gold-necklaces.jpg";
  }
  if (combined.includes("ear") || combined.includes("jhumka") || combined.includes("stud")) {
    return "/images/hero/slide-earrings-luxury.jpg";
  }
  if (combined.includes("ring") || combined.includes("solitaire")) {
    return "/images/hero/slide-solitaire-rings.jpg";
  }
  if (combined.includes("bangle") || combined.includes("kada")) {
    return "/images/hero/slide-bangles-bracelets.jpg";
  }
  if (combined.includes("bracelet") || combined.includes("cuff")) {
    return "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=900&auto=format&fit=crop";
  }
  if (combined.includes("anklet") || combined.includes("payal")) {
    return "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop";
  }
  if (combined.includes("men")) {
    return "https://cdn.shopify.com/s/files/1/1044/1939/3858/files/photo-1611652022419-a9419f74343d.jpg?v=1793808270";
  }
  if (
    combined.includes("bridal") ||
    combined.includes("traditional") ||
    combined.includes("festive") ||
    combined.includes("set")
  ) {
    return "/images/hero/festive-necklace.jpg";
  }
  return "/images/hero/slide-gold-necklaces.jpg";
}

const defaultQuickCategories: QuickCategoryItem[] = [
  {
    name: "Necklace",
    href: "/collections/necklace",
    image: "/images/hero/slide-gold-necklaces.jpg",
    label: "Chokers & Chains",
    itemCount: "4 items",
    isHot: true,
  },
  {
    name: "Bangles",
    href: "/collections/bangles",
    image: "/images/hero/slide-bangles-bracelets.jpg",
    label: "Anti-Tarnish",
    itemCount: "4 items",
    isHot: true,
  },
  {
    name: "Rings",
    href: "/collections/rings",
    image: "/images/hero/slide-solitaire-rings.jpg",
    label: "American Diamond",
    itemCount: "2 items",
  },
  {
    name: "Earrings",
    href: "/collections/ear-rings",
    image: "/images/hero/slide-earrings-luxury.jpg",
    label: "Studs & Drops",
    itemCount: "4 items",
  },
  {
    name: "Bracelets",
    href: "/collections/bracelets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=900&auto=format&fit=crop",
    label: "Waterproof Cuffs",
    itemCount: "3 items",
  },
  {
    name: "Men's Accessories",
    href: "/collections/mens-accessories",
    image: "https://cdn.shopify.com/s/files/1/1044/1939/3858/files/photo-1611652022419-a9419f74343d.jpg?v=1793808270",
    label: "Modern Luxe",
    itemCount: "1 item",
  },
  {
    name: "Anklets",
    href: "/collections/anklets",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop",
    label: "Daily Payals",
    itemCount: "2 items",
  },
];

interface CategoryQuickStripProps {
  collections?: ShopifyCollection[];
}

export default function CategoryQuickStrip({ collections }: CategoryQuickStripProps) {
  // 1. Filter out empty collections (0 products in Shopify)
  const validCollections = (collections || []).filter((col) => {
    const realCount = col.products?.edges?.length || 0;
    return realCount > 0;
  });

  // 2. Strictly deduplicate collections so duplicate names (like Earrings vs Ear Rings) never repeat
  const seenCanonicalKeys = new Set<string>();
  const uniqueCollections = validCollections.filter((col) => {
    const raw = col.title.toLowerCase().replace(/[\s-_]/g, "").replace(/s$/, "");
    const canonicalKey = raw.includes("ear") ? "earring" : raw;
    if (seenCanonicalKeys.has(canonicalKey)) return false;
    seenCanonicalKeys.add(canonicalKey);
    return true;
  });

  const displayItems: QuickCategoryItem[] =
    uniqueCollections.length > 0
      ? uniqueCollections.slice(0, 8).map((col) => {
          // Priority 1: Shopify Collection Poster Image (if uploaded in Shopify Admin -> Collections)
          const shopifyCover = col.image?.url;

          // Priority 2: Product Image IF unique and not the generic repeated placeholder
          const productImg = col.products?.edges?.[0]?.node?.featuredImage?.url;
          const isGenericSample = productImg?.includes("276d3cfab638");

          // Priority 3: Curated category-specific luxury jewelry photo
          const curatedFallback = getCategoryCuratedImage(col.handle, col.title);

          const finalImage =
            shopifyCover || (!isGenericSample && productImg ? productImg : curatedFallback);

          const realCount = col.products?.edges?.length || 0;
          const countText = `${realCount} ${realCount === 1 ? "item" : "items"}`;

          // Format clean title (e.g. normalize "Ear Rings" to "Earrings")
          const isEarrings =
            col.title.toLowerCase().replace(/[\s-_]/g, "").includes("earring") ||
            col.handle.toLowerCase().includes("ear");
          const cleanTitle = isEarrings ? "Earrings" : col.title;

          return {
            name: cleanTitle,
            href: `/collections/${col.handle}`,
            image: finalImage,
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
        {/* Centered Category Header */}
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

        {/* Responsive Collection Cards Grid with Edge-to-Edge Full-Fit Images */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex flex-col p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white border border-stone-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(36,24,21,0.08)] hover:border-[#C59B4E]/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer reveal-on-scroll-scale stagger-${(idx % 12) + 1}`}
            >
              {/* Product Showcase Image Container: Full Fit edge-to-edge without letterboxing or inner borders */}
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
            href="/products"
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
