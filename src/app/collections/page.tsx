import type { Metadata } from "next";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductsCatalogView from "@/components/ProductsCatalogView";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Collections | NAKSHATRA COLLECTIONS - 18K Gold Plated Jewellery",
  description:
    "Explore our complete range of anti-tarnish artificial jewellery. Necklaces, earrings, rings, bangles, and bridal sets with fast delivery in Kerala and India.",
};

export default async function CollectionsIndexPage() {
  let products: ShopifyProduct[] = [];
  let collections: ShopifyCollection[] = [];

  try {
    const [allProducts, allCollections] = await Promise.all([
      getProducts(100).catch((err) => {
        console.error("Failed to load products from Shopify:", err);
        return [];
      }),
      getCollections(30).catch((err) => {
        console.error("Failed to load collections from Shopify:", err);
        return [];
      }),
    ]);

    products = allProducts;
    collections = allCollections;
  } catch (error) {
    console.error("Error fetching data in CollectionsPage:", error);
  }

  return (
    <ProductsCatalogView
      initialProducts={products}
      initialCollections={collections}
      defaultCategory="all"
      pageTitle="Collections"
      pageSubtitle="Discover our curated collection of premium products"
    />
  );
}
