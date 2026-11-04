import type { Metadata } from "next";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductsCatalogView from "@/components/ProductsCatalogView";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products | NAKSHATRA COLLECTIONS - 18K Gold Plated Jewellery",
  description:
    "Discover our curated collection of premium anti-tarnish artificial jewellery. Waterproof necklaces, earrings, bangles, rings, and bridal sets with fast delivery across Kerala and India.",
};

export default async function ProductsPage() {
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
    console.error("Error fetching catalogue data in ProductsPage:", error);
  }

  return (
    <ProductsCatalogView
      initialProducts={products}
      initialCollections={collections}
      pageTitle="Products"
      pageSubtitle="Discover our curated collection of premium products"
    />
  );
}
