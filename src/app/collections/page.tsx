import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles, ArrowRight, Truck, ShieldCheck, RotateCcw, Gem } from "lucide-react";
import { getCollections } from "@/lib/shopify";

export const revalidate = 3600;

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
  "jewellery-sets":
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/97880928ad3d0a92d47f9b88cf464ea07519106093fb6222b07d6124c6ef34a0.png?v=1790240263",
  "new-arrivals":
    "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
};

const categoryBadges: Record<string, string> = {
  necklaces: "Chokers & Layered Chains",
  earrings: "Studs, Jhumkas & Drops",
  rings: "Solitaires & Bands",
  bracelets: "Waterproof Bangles & Cuffs",
  "jewellery-sets": "Bridal & Festive Chokers",
  "new-arrivals": "Latest Designs",
};

export default async function CollectionsIndexPage() {
  const collections = await getCollections(20).catch(() => []);

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
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            All Categories
          </span>
        </nav>

        {/* Master Header */}
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
          <div className="flex items-center gap-2.5 p-2">
            <Truck className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                Fast Kerala Delivery
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                Tracked Express
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
                Shower &amp; Sweat Safe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2">
            <RotateCcw className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                Easy Exchange
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                7-Day Window
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2">
            <Gem className="h-5 w-5 shrink-0" style={{ color: "var(--accent-cta)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                18K Real Gold Look
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                Premium Micro-Plating
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Categories Grid (Amazon & Flipkart Style Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => {
            const imgSrc =
              col.image?.url ||
              categoryThumbnails[col.handle] ||
              categoryThumbnails.necklaces;
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
