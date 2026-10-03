import Hero from "@/components/Hero";
import CategoryQuickStrip from "@/components/CategoryQuickStrip";
import CuratedCollections from "@/components/CuratedCollections";
import FeaturedJewellery from "@/components/FeaturedJewellery";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import ShopTheLook from "@/components/ShopTheLook";
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
      {/* 01 — Cinematic Hero Carousel */}
      <Hero />

      {/* 01.5 — Category Quick Strip */}
      <CategoryQuickStrip collections={collections} />

      {/* 02 — Curated Collections Mosaic */}
      <CuratedCollections collections={collections} />

      {/* 03 — Featured Jewellery Spotlight */}
      <FeaturedJewellery products={featuredProducts} />

      {/* 04 — New Arrivals */}
      <NewArrivalsSection products={newArrivalsProducts} />

      {/* 05 — Shop The Look / Visual Styling Canvas */}
      <ShopTheLook products={featuredProducts} />

      {/* 06 — Campaign Statement */}
      <CampaignStatement />

      {/* 07 — Why Nakshatra Atelier Standards */}
      <WhyNakshatra />

      {/* 08 — Customer Photo Reviews & Stories */}
      <CustomerReviews />
    </main>
  );
}
