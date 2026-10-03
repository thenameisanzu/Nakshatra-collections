import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles, ArrowRight, Truck, ShieldCheck, RotateCcw, Gem, Search, X, Crown, Heart, CircleDot, Flame } from "lucide-react";
import { getCollections, searchProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

export const revalidate = 0; // Dynamic search handling

export const metadata: Metadata = {
  title: "All Categories & Collections | NAKSHATRA COLLECTIONS",
  description:
    "Explore all artificial jewellery categories from Nakshatra Collections - Necklaces, Earrings, Rings, Bracelets, and Bridal Sets.",
};

const categoryThumbnails: Record<string, string> = {
  necklaces:
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
  earrings:
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
  rings:
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/9b7c6affde3ecafe09d7f6354dc119745cc47ad1feb6874e05683cd47b1b00fe.png?v=1790240194",
  bracelets:
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  bangles:
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  "jewellery-sets":
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/97880928ad3d0a92d47f9b88cf464ea07519106093fb6222b07d6124c6ef34a0.png?v=1790240263",
  "necklace-sets":
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/97880928ad3d0a92d47f9b88cf464ea07519106093fb6222b07d6124c6ef34a0.png?v=1790240263",
  "bridal-jewellery":
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/97880928ad3d0a92d47f9b88cf464ea07519106093fb6222b07d6124c6ef34a0.png?v=1790240263",
  anklets:
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  "new-arrivals":
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
};

const categoryBadges: Record<string, string> = {
  necklaces: "Chokers & Layered Chains",
  earrings: "Studs, Jhumkas & Drops",
  rings: "Solitaires & Bands",
  bracelets: "Waterproof Bangles & Cuffs",
  bangles: "Waterproof Bangles & Kadas",
  "jewellery-sets": "Bridal & Festive Chokers",
  "necklace-sets": "Bridal & Festive Chokers",
  "bridal-jewellery": "Kerala Bridal Heritage",
  anklets: "Daily Wear Payals",
  "new-arrivals": "Latest Designs",
};

interface PageProps {
  searchParams: Promise<{ q?: string; search?: string }>;
}

export default async function CollectionsIndexPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const searchQuery = (resolvedParams.q || resolvedParams.search || "").trim();

  const [collections, searchResults] = await Promise.all([
    getCollections(20).catch(() => []),
    searchQuery ? searchProducts(searchQuery, 50).catch(() => []) : Promise.resolve([]),
  ]);

  return (
    <div
      className="min-h-screen py-8 md:py-14 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="mb-4 sm:mb-6 flex items-center gap-2 text-xs uppercase tracking-wider overflow-x-auto whitespace-nowrap scrollbar-none py-1"
          style={{ color: "var(--text-muted)" }}
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <Link
            href="/collections"
            className="transition-colors hover:underline"
            style={{ color: searchQuery ? "var(--text-secondary)" : "var(--text-primary)" }}
          >
            All Categories
          </Link>
          {searchQuery && (
            <>
              <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
              <span className="font-bold" style={{ color: "var(--accent-cta)" }}>
                Search: &ldquo;{searchQuery}&rdquo;
              </span>
            </>
          )}
        </nav>

        {/* 1. If Search Query is active -> Render Search Results Header & Grid */}
        {searchQuery ? (
          <div className="mb-14">
            {/* Search Header Banner */}
            <div
              className="rounded-3xl border p-6 sm:p-10 shadow-sm mb-8 transition-colors"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-xs liquid-glass mb-3"
                    style={{
                      color: "var(--accent-cta)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <Search className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                    Live Search
                  </span>
                  <h1
                    className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Results for &ldquo;{searchQuery}&rdquo;
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm font-light" style={{ color: "var(--text-secondary)" }}>
                    Found {searchResults.length} {searchResults.length === 1 ? "creation" : "creations"} matching your search
                  </p>
                </div>

                <Link
                  href="/collections"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all hover:bg-black/5 self-start sm:self-auto"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Clear Search</span>
                </Link>
              </div>
            </div>

            {/* Results Grid or Empty State */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                className="rounded-3xl border border-dashed p-10 sm:p-16 text-center shadow-xs"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                }}
              >
                <Crown className="h-12 w-12 mx-auto mb-3 opacity-40" style={{ color: "var(--accent-gold)" }} />
                <h3 className="font-serif text-xl sm:text-2xl font-normal" style={{ color: "var(--text-primary)" }}>
                  No jewellery found for &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-light max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                  We couldn&apos;t find an exact match. Try searching for necklaces, bridal chokers, jhumkas, payals, or explore our collections below.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Link
                    href="/collections/bridal-jewellery"
                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border hover:bg-black/5"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                  >
                    Bridal Sets
                  </Link>
                  <Link
                    href="/collections/necklaces"
                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border hover:bg-black/5"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                  >
                    Necklaces
                  </Link>
                  <Link
                    href="/collections/earrings"
                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border hover:bg-black/5"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                  >
                    Earrings
                  </Link>
                  <Link
                    href="/collections/new-arrivals"
                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white"
                    style={{ backgroundColor: "var(--accent-cta)" }}
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
            )}

            {/* Separator before all categories */}
            <div className="mt-16 mb-8 border-t pt-10" style={{ borderColor: "var(--border-subtle)" }}>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
                Explore All Categories
              </h2>
              <p className="text-xs sm:text-sm font-light" style={{ color: "var(--text-secondary)" }}>
                Browse our complete catalogue by jewellery type.
              </p>
            </div>
          </div>
        ) : (
          /* 2. Standard Category Master Header (When No Search Query) */
          <>
            <div
              className="rounded-3xl border p-6 sm:p-10 md:p-12 shadow-sm mb-10 transition-colors"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
              }}
            >
              <div className="max-w-2xl">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-xs liquid-glass mb-3"
                  style={{
                    color: "var(--accent-cta)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                  Category Directory
                </span>

                <h1
                  className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Explore All Categories
                </h1>

                <p
                  className="mt-3 text-sm sm:text-base leading-relaxed font-normal"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Discover dedicated collections of anti-tarnish jewellery, 18K gold plated pieces, bridal necklace sets, and sparkling solitaires.
                </p>
              </div>
            </div>

            {/* Amazon/Flipkart Value Bar */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl border mb-10 transition-colors"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex items-center gap-3 p-2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--accent-gold)",
                  }}
                >
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    Express Delivery
                  </h4>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    2-4 Days in Kerala
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--accent-gold)",
                  }}
                >
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    100% Anti-Tarnish
                  </h4>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Waterproof 18K Polish
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--accent-gold)",
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    7-Day Replacement
                  </h4>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Easy Transit Protection
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--accent-gold)",
                  }}
                >
                  <Gem className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    Hypoallergenic
                  </h4>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Lead &amp; Nickel Free
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Categories Grid Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => {
            const imgSrc =
              col.image?.url ||
              categoryThumbnails[col.handle] ||
              "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242";

            const subtitle =
              categoryBadges[col.handle] || "Curated Jewellery Collection";

            return (
              <Link
                key={col.id}
                href={`/collections/${col.handle}`}
                className="group relative flex flex-col rounded-3xl overflow-hidden border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {/* Visual Image Banner */}
                <div
                  className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border mb-5"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <Image
                    src={imgSrc}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass"
                    style={{ color: "var(--accent-cta)" }}
                  >
                    {subtitle}
                  </span>
                </div>

                {/* Info Container */}
                <div className="flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h2
                      className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-tight group-hover:opacity-80 transition-opacity"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {col.title}
                    </h2>
                    {col.description && (
                      <p
                        className="mt-1 text-xs sm:text-sm line-clamp-2 leading-relaxed font-light"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {col.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                      View Category
                    </span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--accent-cta)",
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
