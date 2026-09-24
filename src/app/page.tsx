import Hero from "@/components/Hero";
import CuratedCollections from "@/components/CuratedCollections";
import FeaturedJewellery from "@/components/FeaturedJewellery";
import EditorialStory from "@/components/EditorialStory";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import CampaignStatement from "@/components/CampaignStatement";
import WhyNakshatra from "@/components/WhyNakshatra";
import Newsletter from "@/components/Newsletter";
import { getProducts, getCollectionByHandle } from "@/lib/shopify";
import type { ShopifyProduct } from "@/types/shopify";

export const revalidate = 3600;

export default async function Home() {
  let newArrivalsProducts: ShopifyProduct[] = [];
  let featuredProducts: ShopifyProduct[] = [];

  try {
    const [newArrivalsCollection, allProducts] = await Promise.all([
      getCollectionByHandle("new-arrivals", 8).catch((err) => {
        console.error("Failed to load new-arrivals collection:", err);
        return null;
      }),
      getProducts(12).catch((err) => {
        console.error("Failed to load products catalogue:", err);
        return [];
      }),
    ]);

    if (newArrivalsCollection?.products?.edges && newArrivalsCollection.products.edges.length > 0) {
      newArrivalsProducts = newArrivalsCollection.products.edges.map((e) => e.node);
    } else {
      newArrivalsProducts = allProducts.slice(0, 4);
    }

    featuredProducts = allProducts;
  } catch (error) {
    console.error("Failed to load catalog data from Shopify:", error);
  }

  return (
    <main className="flex-1 transition-colors" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* 01 — Cinematic Hero Carousel */}
      <Hero />

      {/* 02 — Curated Collections */}
      <CuratedCollections />

      {/* 03 — Featured Jewellery Spotlight */}
      <FeaturedJewellery products={featuredProducts} />

      {/* 04 — Editorial Story */}
      <EditorialStory />

      {/* 05 — New Arrivals */}
      <NewArrivalsSection products={newArrivalsProducts} />

      {/* 06 — Campaign Statement */}
      <CampaignStatement />

      {/* 07 — Why Nakshatra */}
      <WhyNakshatra />

      {/* 08 — Newsletter */}
      <Newsletter />
    </main>
  );
}
