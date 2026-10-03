import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : null;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : null;
    const sort = searchParams.get("sort") || "relevance";

    let products = await searchProducts(query, 30);

    // Apply category filter if specified
    if (category && category !== "all") {
      const normalizedCat = category.toLowerCase().replace(/[-_]/g, " ");
      products = products.filter((p) => {
        const type = (p.productType || "").toLowerCase();
        const handle = (p.handle || "").toLowerCase();
        const title = (p.title || "").toLowerCase();
        return (
          type.includes(normalizedCat) ||
          handle.includes(category.toLowerCase()) ||
          title.includes(normalizedCat)
        );
      });
    }

    // Apply price range filter if specified
    if (minPrice !== null) {
      products = products.filter((p) => {
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        return price >= minPrice;
      });
    }

    if (maxPrice !== null) {
      products = products.filter((p) => {
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        return price <= maxPrice;
      });
    }

    // Apply sorting
    if (sort === "price-asc") {
      products.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (sort === "price-desc") {
      products.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (sort === "newest") {
      // Keep recent order
    }

    return NextResponse.json({
      success: true,
      query,
      totalCount: products.length,
      products: products.slice(0, 16),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Search failed";
    console.error("[Search API Error]:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
        products: [],
        totalCount: 0,
      },
      { status: 500 }
    );
  }
}
