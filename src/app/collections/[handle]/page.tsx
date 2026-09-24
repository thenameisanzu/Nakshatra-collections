import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import CategoryView from "@/components/CategoryView";

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

  const [collection, allCollections] = await Promise.all([
    getCollectionByHandle(handle),
    getCollections(20).catch(() => []),
  ]);

  if (!collection) {
    notFound();
  }

  const products = collection.products?.edges.map((edge) => edge.node) || [];

  return (
    <div
      className="min-h-screen py-6 sm:py-10 md:py-14 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="mb-4 sm:mb-6 flex items-center gap-2 text-xs uppercase tracking-wider overflow-x-auto whitespace-nowrap scrollbar-none py-1"
          style={{ color: "var(--text-muted)" }}
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <Link
            href="/collections"
            className="transition-colors hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            All Categories
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <span className="font-semibold line-clamp-1" style={{ color: "var(--text-primary)" }}>
            {collection.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:underline"
            style={{ color: "var(--accent-cta)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Categories</span>
          </Link>
        </div>

        {/* Amazon/Flipkart-Style Interactive Category View */}
        <CategoryView
          collection={collection}
          allCollections={allCollections}
          initialProducts={products}
        />
      </div>
    </div>
  );
}
