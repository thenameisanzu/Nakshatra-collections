"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Lock, Loader2, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";

function formatPrice(amount: string, currencyCode: string): string {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) return `${currencyCode} ${amount}`;

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(parsed);
  } catch {
    return `${currencyCode} ${parsed.toFixed(0)}`;
  }
}

export default function CartPage() {
  const { cart, isLoading, isUpdating, updateItem, removeItem, error, totalQuantity } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const lines = cart?.lines.edges.map((edge) => edge.node) || [];
  const subtotal = cart?.cost.subtotalAmount;

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return;
    setIsRedirecting(true);
    window.location.href = cart.checkoutUrl;
  };

  if (isLoading) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center transition-colors"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--accent-cta)" }} />
        <p className="mt-4 text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--text-muted)" }}>
          Loading your shopping bag...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 sm:py-12 md:py-16 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-3 pb-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <h1
              className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Shopping Bag
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-light" style={{ color: "var(--text-muted)" }}>
              {totalQuantity} {totalQuantity === 1 ? "Creation" : "Creations"} curated in your bag
            </p>
          </div>
          <Link
            href="/#products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:underline self-start sm:self-auto"
            style={{ color: "var(--accent-cta)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {error && (
          <div
            className="mb-6 flex items-center gap-2 rounded-2xl border p-4 text-xs font-medium"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-medium)",
              color: "var(--accent-cta)",
            }}
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {lines.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 sm:py-24 text-center shadow-xs px-4"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div
              className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full mb-4 liquid-glass"
            >
              <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9" style={{ color: "var(--accent-gold)" }} />
            </div>
            <h2
              className="font-serif-luxury text-2xl sm:text-3xl font-normal"
              style={{ color: "var(--text-primary)" }}
            >
              Your shopping bag is empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm max-w-md font-light" style={{ color: "var(--text-muted)" }}>
              Explore our handcrafted necklaces, earrings, and rings to begin your bespoke collection.
            </p>
            <Link
              href="/#products"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-widest shadow-md transition hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Explore Jewellery</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left Column: Items List (Span 7) */}
            <div className="lg:col-span-7">
              <div
                className="rounded-3xl border p-4 sm:p-8 shadow-sm divide-y"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-medium)",
                }}
              >
                {lines.map((item) => {
                  const merchandise = item.merchandise;
                  const itemTotal = formatPrice(
                    item.cost.totalAmount.amount,
                    item.cost.totalAmount.currencyCode
                  );
                  const unitPrice = formatPrice(
                    merchandise.price.amount,
                    merchandise.price.currencyCode
                  );

                  return (
                    <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex gap-4 sm:gap-5">
                      <div
                        className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl border"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-subtle)",
                        }}
                      >
                        {merchandise.image ? (
                          <Image
                            src={merchandise.image.url}
                            alt={merchandise.image.altText || merchandise.product.title}
                            fill
                            sizes="112px"
                            className="object-cover object-center p-2"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px]" style={{ color: "var(--text-muted)" }}>
                            Nakshatra
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <Link
                              href={`/products/${merchandise.product.handle}`}
                              className="font-serif-luxury text-base sm:text-lg font-normal hover:underline line-clamp-1"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {merchandise.product.title}
                            </Link>
                            <span
                              className="text-sm sm:text-base font-bold shrink-0"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {itemTotal}
                            </span>
                          </div>

                          {merchandise.title && merchandise.title !== "Default Title" && (
                            <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                              Variant: {merchandise.title}
                            </p>
                          )}
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {unitPrice} each
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div
                            className="flex items-center rounded-full border liquid-glass"
                            style={{
                              borderColor: "var(--border-medium)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, item.quantity - 1)}
                              disabled={isUpdating}
                              className="flex h-8 w-8 items-center justify-center disabled:opacity-40 cursor-pointer active:scale-90"
                              style={{ color: "var(--text-primary)" }}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span
                              className="w-8 text-center text-xs font-semibold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                              className="flex h-8 w-8 items-center justify-center disabled:opacity-40 cursor-pointer active:scale-90"
                              style={{ color: "var(--text-primary)" }}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            disabled={isUpdating}
                            className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:underline disabled:opacity-40 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Liquid Glass Order Summary (Span 5) */}
            <div className="lg:col-span-5">
              <div
                className="sticky top-28 rounded-3xl border p-6 sm:p-8 shadow-xl transition-colors liquid-glass"
                style={{
                  borderColor: "var(--border-medium)",
                }}
              >
                <h2
                  className="font-serif-luxury text-xl font-normal mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Order Summary
                </h2>

                <div
                  className="flex flex-col gap-3 border-b pb-4 text-xs"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                    <span>Subtotal</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                    <span>Insured Courier</span>
                    <span className="font-semibold" style={{ color: "var(--accent-gold)" }}>Complimentary</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                    <span>Signature Velvet Packaging</span>
                    <span className="font-semibold" style={{ color: "var(--accent-gold)" }}>Included</span>
                  </div>
                </div>

                <div className="py-4 flex justify-between items-baseline">
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    Estimated Total
                  </span>
                  <span
                    className="font-serif-luxury text-2xl sm:text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : "—"}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isUpdating || isRedirecting || !cart?.checkoutUrl}
                  onClick={handleCheckout}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-4 px-4 text-xs font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer hover:scale-[1.01]"
                  style={{
                    backgroundColor: "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Redirecting to Checkout...</span>
                    </>
                  ) : isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating Bag...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      <span>Proceed to Checkout</span>
                    </>
                  )}
                </button>

                <div
                  className="mt-4 flex items-center justify-center gap-1.5 text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                  <span>Encrypted 256-bit SSL Shopify Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
