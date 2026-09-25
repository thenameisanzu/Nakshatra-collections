import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import { Gem } from "lucide-react";

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-medium)",
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
          style={{
            backgroundColor: "var(--tag-bg)",
            color: "var(--accent-gold)",
          }}
        >
          <Gem className="h-6 w-6" />
        </div>
        <h3
          className="font-serif-luxury text-xl font-normal"
          style={{ color: "var(--text-primary)" }}
        >
          No creations found in this collection
        </h3>
        <p className="mt-1 text-xs max-w-sm" style={{ color: "var(--text-muted)" }}>
          Our atelier is preparing new bespoke additions. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
