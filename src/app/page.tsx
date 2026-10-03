import Hero from "@/components/Hero";
import CategoryQuickStrip from "@/components/CategoryQuickStrip";
import ShopByBudget from "@/components/ShopByBudget";
import CuratedCollections from "@/components/CuratedCollections";
import FeaturedJewellery from "@/components/FeaturedJewellery";
import ShopByOccasion from "@/components/ShopByOccasion";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import CampaignStatement from "@/components/CampaignStatement";
import WhyNakshatra from "@/components/WhyNakshatra";
import CustomerReviews from "@/components/CustomerReviews";
import { getProducts, getCollectionByHandle, getCollections } from "@/lib/shopify";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";

export const revalidate = 3600;

export default async function Home() {
  let newArrivalsProducts: ShopifyProduct[] = [];
  let featuredProducts: ShopifyProduct[] = [];
  let collections: ShopifyCollection[] = [];

  try {
    const [newArrivalsCollection, allProducts, shopifyCollections] = await Promise.all([
      getCollectionByHandle("new-arrivals", 8).catch((err) => {
        console.error("Failed to load new-arrivals collection:", err);
        return null;
      }),
      getProducts(12).catch((err) => {
        console.error("Failed to load products catalogue:", err);
        return [];
      }),
      getCollections(20).catch((err) => {
        console.error("Failed to load collections from Shopify:", err);
        return [];
      }),
    ]);

    if (newArrivalsCollection?.products?.edges && newArrivalsCollection.products.edges.length > 0) {
      newArrivalsProducts = newArrivalsCollection.products.edges.map((e) => e.node);
    } else {
      newArrivalsProducts = allProducts.slice(0, 4);
    }

    featuredProducts = allProducts;
    collections = shopifyCollections;
  } catch (error) {
    console.error("Failed to load catalog data from Shopify:", error);
  }

  return (
    <main className="flex-1 transition-colors" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* 01 — Top Promo Hero Showcase */}
      <Hero />

      {/* 02 — Myntra/Nykaa Style Circular Category Stories */}
      <CategoryQuickStrip collections={collections} />

      {/* 03 — Shop By Budget Store (Under ₹999, Under ₹1499, Bridal) */}
      <ShopByBudget />

      {/* 04 — Trending Bestsellers with 1-Tap Cart & Ratings */}
      <FeaturedJewellery products={featuredProducts} />

      {/* 05 — Curated Collections Mosaic */}
      <CuratedCollections collections={collections} />

      {/* 06 — Shop By Occasion (Daily Office, Kerala Wedding, Party, Gifts) */}
      <ShopByOccasion />

      {/* 07 — Fresh 2026 New Arrivals */}
      <NewArrivalsSection products={newArrivalsProducts} />

      {/* 08 — Why Nakshatra Atelier Standards & Guarantees */}
      <WhyNakshatra />

      {/* 09 — Verified Customer Photo Reviews */}
      <CustomerReviews />

      {/* 10 — Campaign Statement */}
      <CampaignStatement />
    </main>
  );
}
