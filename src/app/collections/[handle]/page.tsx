import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCollectionByHandle, getCollections, getProducts } from "@/lib/shopify";
import ProductsCatalogView from "@/components/ProductsCatalogView";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const collections = await getCollections(20);
    return collections.map((collection) => ({
      handle: collection.handle,
    }));
  } catch (error) {
    console.error("Failed to generate static params for collections:", error);
    return [];
  }
}

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Collection Not Found | NAKSHATRA COLLECTIONS",
    };
  }

  return {
    title: `${collection.title} | NAKSHATRA COLLECTIONS - Artificial Jewellery Store`,
    description:
      collection.description ||
      `Shop the ${collection.title} artificial jewellery collection from Nakshatra Collections. Fast delivery across Kerala and India.`,
    openGraph: {
      title: collection.title,
      description: collection.description || `Shop ${collection.title}`,
      images: collection.image ? [{ url: collection.image.url }] : [],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  const [collection, allCollections, allProducts] = await Promise.all([
    getCollectionByHandle(handle),
    getCollections(30).catch(() => []),
    getProducts(100).catch(() => []),
  ]);

  if (!collection) {
    notFound();
  }

  const collectionProducts = collection.products?.edges.map((edge) => edge.node) || [];
  // Use collection products or all products if collection products list is empty
  const displayProducts = collectionProducts.length > 0 ? collectionProducts : allProducts;

  return (
    <ProductsCatalogView
      initialProducts={allProducts.length > 0 ? allProducts : displayProducts}
      initialCollections={allCollections}
      defaultCategory={collection.handle}
      pageTitle={collection.title}
      pageSubtitle={collection.description || "Discover our curated collection of premium products"}
    />
  );
}
