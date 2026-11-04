import Hero from "@/components/Hero";
import CategoryQuickStrip from "@/components/CategoryQuickStrip";
import FeaturedJewellery from "@/components/FeaturedJewellery";
import { getProducts, getCollections } from "@/lib/shopify";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";

export const revalidate = 3600;

export default async function Home() {
  let featuredProducts: ShopifyProduct[] = [];
  let collections: ShopifyCollection[] = [];

  try {
    const [allProducts, shopifyCollections] = await Promise.all([
      getProducts(12).catch((err) => {
        console.error("Failed to load products catalogue:", err);
        return [];
      }),
      getCollections(20).catch((err) => {
        console.error("Failed to load collections from Shopify:", err);
        return [];
      }),
    ]);

    featuredProducts = allProducts;
    collections = shopifyCollections;
  } catch (error) {
    console.error("Failed to load catalog data from Shopify:", error);
  }

  return (
    <main className="flex-1 bg-white">
      {/* 01 — Minimal Split Hero Showcase */}
      <Hero />

      {/* 02 — Curated Collections (Circular Stories) */}
      <CategoryQuickStrip collections={collections} />

      {/* 03 — Bestsellers Grid (Minimal & Clean) */}
      <FeaturedJewellery products={featuredProducts} />
    </main>
  );
}
