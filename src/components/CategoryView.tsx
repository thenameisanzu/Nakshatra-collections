"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";
import ProductCard from "./ProductCard";
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  ChevronDown,
  Truck,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  HelpCircle,
} from "lucide-react";

interface CategoryViewProps {
  collection: ShopifyCollection;
  allCollections: ShopifyCollection[];
  initialProducts: ShopifyProduct[];
}

const categoryIcons: Record<string, string> = {
  necklaces: "📿",
  earrings: "💎",
  rings: "💍",
  bracelets: "🌟",
  "jewellery-sets": "👑",
  "new-arrivals": "🔥",
};

const categoryFaqs: Record<string, Array<{ q: string; a: string }>> = {
  necklaces: [
    {
      q: "Does the gold polish fade with daily wear?",
      a: "No. Our necklaces are crafted with 18K micro-gold plating over high-grade stainless steel, ensuring the polish stays vibrant and anti-tarnish for everyday wear.",
    },
    {
      q: "Is this necklace safe for sensitive skin?",
      a: "Yes, all Nakshatra jewellery is 100% nickel-free, lead-free, and hypoallergenic. It will never turn your skin green or cause itching.",
    },
    {
      q: "How fast is delivery in Kerala?",
      a: "Orders across Kerala are delivered within 2 to 4 business days via express tracked courier.",
    },
  ],
  earrings: [
    {
      q: "Are these earrings lightweight for all-day comfort?",
      a: "Yes, our earrings are ergonomically designed to be comfortable and lightweight so you can wear them from morning to night without pulling on earlobes.",
    },
    {
      q: "Can I wear these earrings in the shower?",
      a: "Yes! Our stainless steel and anti-tarnish studs and drops are 100% waterproof and sweat-resistant.",
    },
  ],
  rings: [
    {
      q: "Are the rings adjustable in size?",
      a: "Most of our daily wear and solitaire rings feature adjustable comfort bands to fit various finger sizes comfortably.",
    },
    {
      q: "What stones are used in the solitaires?",
      a: "We use AAA+ brilliant-cut American Diamonds and Cubic Zirconia that match the optical brilliance and sparkle of natural diamonds.",
    },
  ],
  bracelets: [
    {
      q: "Can I wear the bracelet during workouts or in the rain?",
      a: "Yes. Our bracelets are sweatproof, waterproof, and perfume-resistant, making them ideal for everyday active lifestyles.",
    },
  ],
  default: [
    {
      q: "How do I care for my Nakshatra jewellery?",
      a: "Keep your pieces in the provided velvet pouch when not in use. Wipe gently with a soft dry cloth after wearing to maintain lasting shine.",
    },
    {
      q: "What is the return & replacement policy?",
      a: "We provide a 7-day easy replacement guarantee if you receive a damaged or incorrect product.",
    },
  ],
};

export default function CategoryView({
  collection,
  allCollections,
  initialProducts,
}: CategoryViewProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [priceFilter, setPriceFilter] = useState<"all" | "under-2000" | "2000-3500" | "above-3500">("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by stock
    if (inStockOnly) {
      list = list.filter((p) => p.availableForSale);
    }

    // Filter by price
    if (priceFilter === "under-2000") {
      list = list.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) < 2000);
    } else if (priceFilter === "2000-3500") {
      list = list.filter((p) => {
        const amt = parseFloat(p.priceRange.minVariantPrice.amount);
        return amt >= 2000 && amt <= 3500;
      });
    } else if (priceFilter === "above-3500") {
      list = list.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) > 3500);
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === "price-desc") {
      list.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === "name") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [initialProducts, inStockOnly, priceFilter, sortBy]);

  const faqs = categoryFaqs[collection.handle] || categoryFaqs.default;

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {/* ---------------------------------------------------------------------- */}
      {/* 1. HORIZONTAL FLIPKART/AMAZON-STYLE CATEGORY PILL STRIP                 */}
      {/* ---------------------------------------------------------------------- */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max">
          <Link
            href="/#products"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border liquid-glass hover:scale-105"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border-medium)",
            }}
          >
            <span>✨</span>
            <span>All Jewellery</span>
          </Link>

          {allCollections.map((col) => {
            const isActive = col.handle === collection.handle;
            const icon = categoryIcons[col.handle] || "💎";
            return (
              <Link
                key={col.id}
                href={`/collections/${col.handle}`}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "shadow-md scale-105"
                    : "border liquid-glass hover:scale-105"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--accent-cta)" : "var(--bg-surface)",
                  color: isActive ? "var(--accent-cta-text)" : "var(--text-secondary)",
                  borderColor: isActive ? "transparent" : "var(--border-medium)",
                }}
              >
                <span>{icon}</span>
                <span>{col.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. DEDICATED CATEGORY HERO BANNER                                      */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="relative overflow-hidden rounded-3xl border p-6 sm:p-10 md:p-12 shadow-sm transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-medium)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-xs liquid-glass mb-3">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              <span style={{ color: "var(--accent-cta)" }}>Category Collection</span>
            </div>

            <h1
              className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {collection.title}
            </h1>

            <p
              className="mt-3 text-sm sm:text-base leading-relaxed font-normal max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {collection.description ||
                `Explore our collection of ${collection.title.toLowerCase()} crafted with 18K gold polish, anti-tarnish finish, and skin-friendly materials.`}
            </p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span
                className="px-3.5 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                {initialProducts.length} Designs Available
              </span>
              <span
                className="px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                100% Anti-Tarnish Guaranteed
              </span>
            </div>
          </div>

          {/* Banner Graphic if available */}
          {collection.image && (
            <div
              className="relative h-44 w-full sm:h-52 sm:w-52 lg:h-60 lg:w-60 shrink-0 overflow-hidden rounded-2xl border shadow-inner"
              style={{ borderColor: "var(--border-medium)" }}
            >
              <Image
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. AMAZON/FLIPKART STYLE VALUE ASSURANCE BAR                            */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl border transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2.5 p-2">
          <Truck className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
              Kerala Express
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              2-4 Days Delivery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2">
          <ShieldCheck className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
              100% Anti-Tarnish
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Daily Wear Safe
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2">
          <RotateCcw className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
              7-Day Exchange
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Hassle-Free Returns
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2">
          <BadgeCheck className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
              Skin Friendly
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Hypoallergenic
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 4. FLIPKART/AMAZON STYLE FILTER & SORT CONTROL BAR                     */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="sticky top-16 sm:top-20 z-30 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl border shadow-md liquid-glass transition-colors"
        style={{
          borderColor: "var(--border-medium)",
        }}
      >
        {/* Left: Price Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block mr-1" style={{ color: "var(--text-muted)" }}>
            Price:
          </span>
          {[
            { id: "all", label: "All Prices" },
            { id: "under-2000", label: "Under ₹1,999" },
            { id: "2000-3500", label: "₹2,000 – ₹3,500" },
            { id: "above-3500", label: "Above ₹3,500" },
          ].map((pill) => {
            const isSelected = priceFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setPriceFilter(pill.id as any)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "font-bold shadow-xs"
                    : "border opacity-80 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: isSelected ? "var(--accent-cta)" : "var(--bg-primary)",
                  color: isSelected ? "var(--accent-cta-text)" : "var(--text-primary)",
                  borderColor: isSelected ? "transparent" : "var(--border-subtle)",
                }}
              >
                {pill.label}
              </button>
            );
          })}

          {/* In Stock Filter */}
          <button
            type="button"
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              inStockOnly
                ? "font-bold border shadow-xs"
                : "border opacity-80 hover:opacity-100"
            }`}
            style={{
              backgroundColor: inStockOnly ? "var(--tag-bg)" : "var(--bg-primary)",
              color: inStockOnly ? "var(--tag-text)" : "var(--text-primary)",
              borderColor: inStockOnly ? "var(--accent-gold)" : "var(--border-subtle)",
            }}
          >
            {inStockOnly && <Check className="h-3 w-3 text-emerald-600" />}
            <span>In Stock Only</span>
          </button>
        </div>

        {/* Right: Sort & Grid View Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl px-2.5 py-1.5 text-xs font-medium bg-transparent border cursor-pointer focus:outline-none"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border-medium)",
                backgroundColor: "var(--bg-primary)",
              }}
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Grid Layout Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-1 border rounded-xl p-0.5" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-primary)" }}>
            <button
              type="button"
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded-lg transition ${gridCols === 2 ? "bg-white/80 shadow-xs" : "opacity-60"}`}
              style={{ color: "var(--text-primary)" }}
              aria-label="2 Columns"
            >
              <Grid2X2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded-lg transition ${gridCols === 3 ? "bg-white/80 shadow-xs" : "opacity-60"}`}
              style={{ color: "var(--text-primary)" }}
              aria-label="3 Columns"
            >
              <Grid3X3 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded-lg transition ${gridCols === 4 ? "bg-white/80 shadow-xs" : "opacity-60"}`}
              style={{ color: "var(--text-primary)" }}
              aria-label="4 Columns"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 5. PRODUCT RESULTS GRID                                                */}
      {/* ---------------------------------------------------------------------- */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            Showing <strong style={{ color: "var(--text-primary)" }}>{filteredProducts.length}</strong> of {initialProducts.length} items in {collection.title}
          </p>

          {(priceFilter !== "all" || inStockOnly) && (
            <button
              type="button"
              onClick={() => {
                setPriceFilter("all");
                setInStockOnly(false);
              }}
              className="text-xs underline cursor-pointer"
              style={{ color: "var(--accent-cta)" }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 text-center"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <Sparkles className="h-8 w-8 mb-3" style={{ color: "var(--accent-gold)" }} />
            <h3 className="font-serif-luxury text-xl font-normal" style={{ color: "var(--text-primary)" }}>
              No items match your filter
            </h3>
            <p className="mt-1 text-xs max-w-sm" style={{ color: "var(--text-muted)" }}>
              Try adjusting your price range or stock filter to see more designs.
            </p>
            <button
              type="button"
              onClick={() => {
                setPriceFilter("all");
                setInStockOnly(false);
              }}
              className="mt-4 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider border cursor-pointer"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 gap-2.5 sm:gap-4 ${
              gridCols === 2
                ? "md:grid-cols-2 lg:grid-cols-2"
                : gridCols === 3
                ? "sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
                : "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 6. FLIPKART/AMAZON STYLE BUYING GUIDE & FAQS                            */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="rounded-3xl border p-6 sm:p-10 transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal" style={{ color: "var(--text-primary)" }}>
            Frequently Asked Questions — {collection.title}
          </h3>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q} className="py-3 sm:py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-bold transition hover:opacity-80 cursor-pointer"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--accent-gold)" }}
                  />
                </button>
                {isOpen && (
                  <p
                    className="mt-2 text-xs sm:text-sm leading-relaxed font-normal animate-in fade-in-50 duration-200"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
