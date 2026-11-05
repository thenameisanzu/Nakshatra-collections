"use client";

import { useState, useEffect } from "react";
import type { ShopifyProduct, ShopifyImage } from "@/types/shopify";
import ProductGallery from "@/components/ProductGallery";
import ProductForm from "@/components/ProductForm";
import { Gem, Sparkles } from "lucide-react";
import { shopifyFetch, GET_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";

interface ProductDetailViewProps {
  product: ShopifyProduct;
}

export default function ProductDetailView({ product: initialProduct }: ProductDetailViewProps) {
  const [product, setProduct] = useState<ShopifyProduct>(initialProduct);
  const [selectedVariantImage, setSelectedVariantImage] = useState<ShopifyImage | null>(null);

  // Client-Side Live Sync: Fetch real-time price, discount, and availability directly from Shopify
  useEffect(() => {
    let isMounted = true;
    async function syncLiveProduct() {
      try {
        const data = await shopifyFetch<{
          product: ShopifyProduct | null;
        }>({
          query: GET_PRODUCT_BY_HANDLE_QUERY,
          variables: { handle: initialProduct.handle },
        });

        if (!isMounted) return;
        const liveProduct = data?.product;
        if (liveProduct) {
          setProduct((prev) => ({
            ...prev,
            ...liveProduct,
            options:
              liveProduct.options && liveProduct.options.length > 0
                ? liveProduct.options
                : prev.options,
            variants:
              liveProduct.variants?.edges && liveProduct.variants.edges.length > 0
                ? liveProduct.variants
                : prev.variants,
            images:
              liveProduct.images?.edges && liveProduct.images.edges.length > 0
                ? liveProduct.images
                : prev.images,
          }));
        }
      } catch (err) {
        console.warn("Client live product sync fallback:", err);
      }
    }

    syncLiveProduct();
    return () => {
      isMounted = false;
    };
  }, [initialProduct.handle]);

  // Extract all images from edges or fallback to featuredImage
  const images: ShopifyImage[] =
    product.images && product.images.edges.length > 0
      ? product.images.edges.map((edge) => edge.node)
      : product.featuredImage
      ? [product.featuredImage]
      : [];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-start max-w-6xl mx-auto">
      {/* Left Column: Image Showcase Gallery (Sticky on Desktop) */}
      <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 w-full flex flex-col items-center">
        <ProductGallery
          images={images}
          title={product.title}
          productType={product.productType}
          selectedVariantImage={selectedVariantImage}
        />
      </div>

      {/* Right Column: Information, Pricing, Variants & Purchase Actions */}
      <div
        className="flex flex-col gap-6 lg:col-span-7 xl:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-sm transition-all duration-300"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-medium)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Category & Title Header */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-xs"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
              {product.productType || "Artificial Jewellery"}
            </span>

            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              <Gem className="h-3 w-3" />
              Nakshatra Atelier
            </span>
          </div>

          <h1
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.15] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h1>
        </div>

        {/* Dynamic Product Form (Variants, Pricing, Quantity, Add to Cart, Buy Now, Trust Badges, Accordion) */}
        <ProductForm
          product={product}
          onVariantChange={(img) => setSelectedVariantImage(img)}
        />
      </div>
    </div>
  );
}
