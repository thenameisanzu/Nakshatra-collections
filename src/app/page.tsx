import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import BrandStory from "@/components/BrandStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCollectionByHandle } from "@/lib/shopify";
import type { ShopifyProduct } from "@/types/shopify";
import Link from "next/link";
import { ArrowRight, Sparkles, Gem } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
  let newArrivalsProducts: ShopifyProduct[] = [];
  let featuredProducts: ShopifyProduct[] = [];
  let fetchError: string | null = null;

  try {
    const [newArrivalsCollection, necklacesCollection, fallbackProducts] = await Promise.all([
      getCollectionByHandle("new-arrivals", 4).catch((err) => {
        console.error("Failed to load new-arrivals collection:", err);
        return null;
      }),
      getCollectionByHandle("necklaces", 4).catch((err) => {
        console.error("Failed to load necklaces collection:", err);
        return null;
      }),
      getProducts(4).catch((err) => {
        console.error("Failed to load fallback products:", err);
        return [];
      }),
    ]);

    if (newArrivalsCollection?.products?.edges) {
      newArrivalsProducts = newArrivalsCollection.products.edges.map((e) => e.node);
    }

    if (necklacesCollection?.products?.edges && necklacesCollection.products.edges.length > 0) {
      featuredProducts = necklacesCollection.products.edges.map((e) => e.node);
    } else {
      featuredProducts = fallbackProducts;
    }
  } catch (error) {
    console.error("Failed to load catalog data from Shopify:", error);
    fetchError = error instanceof Error ? error.message : "Failed to load catalog";
  }

  return (
    <main className="flex-1 transition-colors" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Category Showcase */}
      <CategoryGrid />

      {/* 3. New Arrivals Section (Dynamic Shopify Collection) */}
      {newArrivalsProducts.length > 0 && (
        <section
          id="new-arrivals"
          className="py-16 md:py-24 border-t transition-colors"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--tag-text)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Latest Additions
                </span>
                <h2
                  className="font-serif-luxury mt-3 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  New Arrivals
                </h2>
                <p
                  className="mt-2 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Discover our latest pieces
                </p>
              </div>

              <Link
                href="/collections/new-arrivals"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                style={{ color: "var(--accent-cta)" }}
              >
                <span>View All New Arrivals</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <ProductGrid products={newArrivalsProducts} />
          </div>
        </section>
      )}

      {/* 4. Featured Collection (Necklaces from Shopify) */}
      <section
        id="featured-collection"
        className="py-16 md:py-24 border-t transition-colors"
        style={{
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                <Gem className="h-3.5 w-3.5" />
                Featured Collection
              </span>
              <h2
                className="font-serif-luxury mt-3 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Curated Necklaces
              </h2>
              <p
                className="mt-2 text-sm sm:text-base leading-relaxed max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Refined pendants, delicate chains, and statement chokers designed for effortless everyday grace.
              </p>
            </div>

            <Link
              href="/collections/necklaces"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
              style={{ color: "var(--accent-cta)" }}
            >
              <span>View All Necklaces</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {fetchError ? (
            <div
              className="rounded-2xl border p-6 text-sm text-center"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                color: "var(--text-secondary)",
              }}
            >
              <p className="font-semibold">Unable to fetch featured products at this moment</p>
              <p className="mt-1 text-xs">{fetchError}</p>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

      {/* 5. Brand Story */}
      <BrandStory />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. VIP Newsletter */}
      <Newsletter />
    </main>
  );
}
