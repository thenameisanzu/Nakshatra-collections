import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Sparkles, Gem } from "lucide-react";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import ProductGrid from "@/components/ProductGrid";

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
      title: "Collection Not Found | Nakshatra",
    };
  }

  return {
    title: `${collection.title} - Fancy Jewellery Collection | NAKSHATRA`,
    description:
      collection.description ||
      `Shop the ${collection.title} collection from Nakshatra.`,
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
      className="min-h-screen py-8 md:py-12 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          <Link
            href="/"
            className="transition-colors hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <Link
            href="/#categories"
            className="transition-colors hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            Collections
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {collection.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:underline"
            style={{ color: "var(--accent-cta)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Collections</span>
          </Link>
        </div>

        {/* Collection Hero Header */}
        <div
          className="relative mb-12 overflow-hidden rounded-3xl border p-8 md:p-14 shadow-sm transition-colors"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--tag-text)",
                }}
              >
                <Gem className="h-3.5 w-3.5" />
                Nakshatra Collection
              </span>

              <h1
                className="font-serif-luxury mt-4 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {collection.title}
              </h1>

              {collection.description && (
                <p
                  className="mt-4 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {collection.description}
                </p>
              )}

              <div
                className="mt-6 flex items-center gap-3 text-xs uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="px-2.5 py-1 rounded-full text-[11px]"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                  }}
                >
                  {products.length} {products.length === 1 ? "Creation" : "Creations"}
                </span>
                <span>Handcrafted with 100% certified gold & jewels</span>
              </div>
            </div>

            {collection.image && (
              <div
                className="relative h-48 w-full md:h-56 md:w-56 shrink-0 overflow-hidden rounded-2xl border shadow-inner"
                style={{ borderColor: "var(--border-medium)" }}
              >
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 224px"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Quick Collection Category Switcher */}
          {allCollections.length > 0 && (
            <div
              className="mt-10 border-t pt-6"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div
                className="flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Switch Collection</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {allCollections.map((col) => {
                  const isActive = col.handle === handle;
                  return (
                    <Link
                      key={col.id}
                      href={`/collections/${col.handle}`}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        isActive ? "shadow-xs ring-2" : "border"
                      }`}
                      style={{
                        backgroundColor: isActive ? "var(--accent-cta)" : "var(--bg-primary)",
                        color: isActive ? "var(--accent-cta-text)" : "var(--text-secondary)",
                        borderColor: "var(--border-medium)",
                      }}
                    >
                      {col.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Product Grid Section */}
        <section id="collection-products">
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
