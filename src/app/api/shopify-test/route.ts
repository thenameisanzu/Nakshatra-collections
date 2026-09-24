import { NextResponse } from "next/server";
import { testShopifyConnection, getCollections } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [result, collections] = await Promise.all([
      testShopifyConnection(5),
      getCollections(20).catch(() => []),
    ]);

    return NextResponse.json({
      status: "success",
      message: "Successfully connected to Shopify Storefront API!",
      data: result,
      collections: collections.map((c) => ({
        id: c.id,
        handle: c.handle,
        title: c.title,
        description: c.description,
      })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to Shopify Storefront API",
        details: message,
      },
      { status: 500 }
    );
  }
}
