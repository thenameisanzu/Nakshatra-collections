import Hero from "@/components/Hero";
import CategoryQuickStrip from "@/components/CategoryQuickStrip";
import CuratedCollections from "@/components/CuratedCollections";
import FeaturedJewellery from "@/components/FeaturedJewellery";
import CampaignStatement from "@/components/CampaignStatement";
import WhyNakshatra from "@/components/WhyNakshatra";
import CustomerReviews from "@/components/CustomerReviews";
import { getProducts, getCollectionByHandle, getCollections } from "@/lib/shopify";
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
    <main className="flex-1 transition-colors" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* 01 — Cinematic Editorial Hero Showcase */}
      <Hero />

      {/* 02 — Category Quick Navigation Strip */}
      <CategoryQuickStrip collections={collections} />

      {/* 03 — Curated Collections Editorial Mosaic */}
      <CuratedCollections collections={collections} />

      {/* 04 — Trending Bestsellers with 1-Tap Cart & Ratings */}
      <FeaturedJewellery products={featuredProducts} />

      {/* 05 — Why Nakshatra Atelier Standards & Anti-Tarnish Promise */}
      <WhyNakshatra />

      {/* 06 — Verified Customer Photo Reviews Across Kerala */}
      <CustomerReviews />

      {/* 07 — Campaign Closing Statement */}
      <CampaignStatement />
    </main>
  );
}
