import type { Metadata } from "next";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import ClientCollectionView from "@/components/ClientCollectionView";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const collections = await getCollections(100);
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
  const collection = await getCollectionByHandle(handle).catch(() => null);

  if (!collection) {
    return {
      title: `${handle.toUpperCase()} | NAKSHATRA COLLECTIONS`,
    };
  }

  return {
    title: `${collection.title} | NAKSHATRA COLLECTIONS - Artificial Jewellery Store`,
    description:
      collection.description ||
      `Shop the ${collection.title} artificial jewellery collection from Nakshatra Collections. Fast delivery across Kerala and India.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle).catch(() => null);
  const initialProducts = collection?.products?.edges?.map((e) => e.node) || [];

  return (
    <ClientCollectionView
      handle={handle}
      initialTitle={collection?.title}
      initialDescription={collection?.description}
      initialProducts={initialProducts}
    />
  );
}
