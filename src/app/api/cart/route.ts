import { NextResponse } from "next/server";
import {
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeFromCart,
} from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch cart";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, cartId, lines, lineIds } = body;

    switch (action) {
      case "create": {
        const cart = await createCart(lines);
        return NextResponse.json({ cart });
      }

      case "add": {
        if (!cartId) {
          const cart = await createCart(lines);
          return NextResponse.json({ cart });
        }
        const cart = await addToCart(cartId, lines);
        return NextResponse.json({ cart });
      }

      case "update": {
        if (!cartId || !lines) {
          return NextResponse.json(
            { error: "cartId and lines are required for update" },
            { status: 400 }
          );
        }
        const cart = await updateCartLine(cartId, lines);
        return NextResponse.json({ cart });
      }

      case "remove": {
        if (!cartId || !lineIds) {
          return NextResponse.json(
            { error: "cartId and lineIds are required for remove" },
            { status: 400 }
          );
        }
        const cart = await removeFromCart(cartId, lineIds);
        return NextResponse.json({ cart });
      }

      case "get": {
        if (!cartId) {
          return NextResponse.json({ cart: null });
        }
        const cart = await getCart(cartId);
        return NextResponse.json({ cart });
      }

      default:
        return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Cart action failed";
    console.error("Cart API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
