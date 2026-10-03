import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { TAGS } from "@/lib/shopify";

export const dynamic = "force-dynamic";

/**
 * Shopify Revalidation Webhook & API Handler
 * Compatible with Netlify, Vercel, and custom Node.js hosting.
 *
 * Supports:
 * 1. Shopify Webhooks (products/create, products/update, products/delete, etc.)
 * 2. Manual HTTP trigger with ?secret=... or x-revalidate-secret header
 */
export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const secretFromQuery = url.searchParams.get("secret");
    const secretFromHeader = req.headers.get("x-revalidate-secret");
    const configuredSecret = process.env.SHOPIFY_REVALIDATION_SECRET || "nakshatra_secret_key";

    const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
    const topic = req.headers.get("x-shopify-topic") || "manual";

    let rawBody = "";
    let bodyJson: Record<string, unknown> = {};

    try {
      rawBody = await req.text();
      if (rawBody) {
        bodyJson = JSON.parse(rawBody);
      }
    } catch {
      // Body is not JSON or empty
    }

    // Verify authentication
    let isAuthorized = false;

    if (secretFromQuery === configuredSecret || secretFromHeader === configuredSecret) {
      isAuthorized = true;
    } else if (hmacHeader && process.env.SHOPIFY_REVALIDATION_SECRET) {
      const generatedHash = crypto
        .createHmac("sha256", process.env.SHOPIFY_REVALIDATION_SECRET)
        .update(rawBody, "utf8")
        .digest("base64");

      if (crypto.timingSafeEqual(Buffer.from(hmacHeader), Buffer.from(generatedHash))) {
        isAuthorized = true;
      }
    }

    // Allow without secret in local development
    if (process.env.NODE_ENV === "development") {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized. Provide valid secret token or Shopify HMAC." },
        { status: 401 }
      );
    }

    const revalidatedItems: string[] = [];

    // Revalidate based on webhook topic or general request
    const isCollectionEvent = topic.startsWith("collections/") || url.searchParams.get("tag") === "collections";
    const isProductEvent = topic.startsWith("products/") || url.searchParams.get("tag") === "products";

    // Handle specific product handle if provided
    const productHandle = (bodyJson.handle as string) || url.searchParams.get("handle");

    if (isProductEvent || (!isCollectionEvent && !isProductEvent)) {
      revalidateTag(TAGS.products, "max");
      revalidatedItems.push(`tag:${TAGS.products}`);
      if (productHandle) {
        revalidateTag(`product-${productHandle}`, "max");
        revalidatedItems.push(`tag:product-${productHandle}`);
      }
    }

    if (isCollectionEvent || (!isCollectionEvent && !isProductEvent)) {
      revalidateTag(TAGS.collections, "max");
      revalidatedItems.push(`tag:${TAGS.collections}`);
    }

    // Revalidate essential routes for Netlify / Next.js
    revalidatePath("/", "page");
    revalidatePath("/collections", "page");
    revalidatePath("/collections/[handle]", "page");
    revalidatePath("/products/[handle]", "page");
    revalidatedItems.push("paths: / , /collections , /collections/[handle] , /products/[handle]");

    return NextResponse.json({
      revalidated: true,
      now: new Date().toISOString(),
      topic,
      revalidatedItems,
      message: "Cache successfully revalidated across all pages.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Revalidation failed";
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Support GET for easy browser testing / manual webhook pings
  return POST(req);
}
