import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { getProductByHandle, getRelatedProducts, getProducts } from "@/lib/shopify";
import ProductDetailView from "@/components/ProductDetailView";
import ProductCard from "@/components/ProductCard";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    console.error("Failed to generate static params for products:", error);
    return [];
  }
}

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found | NAKSHATRA COLLECTIONS",
    };
  }

  const title = `${product.title} | NAKSHATRA COLLECTIONS`;
  const description =
    product.description ||
    `Discover ${product.title}, premium anti-tarnish artificial jewellery from Nakshatra Collections.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.featuredImage
        ? [{ url: product.featuredImage.url, alt: product.featuredImage.altText || product.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Determine primary collection for breadcrumb and related recommendations
  const primaryCollection =
    product.collections && product.collections.edges.length > 0
      ? product.collections.edges[0].node
      : null;

  const collectionTitle = primaryCollection?.title || product.productType || "Creations";
  const collectionHref = primaryCollection
    ? `/collections/${primaryCollection.handle}`
    : "/#products";

  // Fetch related products (up to 4)
  const relatedProducts = await getRelatedProducts(
    product.handle,
    primaryCollection?.handle,
    4
  );

  return (
    <div
      className="min-h-screen pt-6 sm:pt-10 md:pt-14 pb-28 lg:pb-14 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Subtle Breadcrumb Navigation */}
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
            href={collectionHref}
            className="transition-colors hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            {collectionTitle}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <span
            className="font-bold line-clamp-1"
            style={{ color: "var(--text-primary)" }}
            aria-current="page"
          >
            {product.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href={collectionHref}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-transform hover:-translate-x-1"
            style={{ color: "var(--accent-cta)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {collectionTitle}</span>
          </Link>
        </div>

        {/* Main Product Showcase (Left: Image Gallery, Right: Details & Variants) */}
        <section aria-label="Product Information">
          <ProductDetailView product={product} />
        </section>

        {/* 10. Related Products Section */}
        {relatedProducts.length > 0 && (
          <section
            className="mt-16 sm:mt-24 lg:mt-32 border-t pt-12 sm:pt-16 transition-colors"
            style={{ borderColor: "var(--border-subtle)" }}
            aria-labelledby="related-products-heading"
          >
            <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest mb-2.5 shadow-xs"
                  style={{
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--tag-text)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                  Atelier Curation
                </span>
                <h2
                  id="related-products-heading"
                  className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  You May Also Admire
                </h2>
                <p
                  className="mt-2 text-xs sm:text-sm max-w-xl"
                  style={{ color: "var(--text-muted)" }}
                >
                  Explore complementary handcrafted jewellery pieces curated to elevate your personal collection.
                </p>
              </div>

              <Link
                href="/#products"
                className="text-xs font-bold uppercase tracking-widest hover:underline transition-colors shrink-0"
                style={{ color: "var(--accent-cta)" }}
              >
                View Full Catalogue &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
