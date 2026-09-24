"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, AlertCircle, Lock, Sparkles, ShieldCheck } from "lucide-react";

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

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    isUpdating,
    updateItem,
    removeItem,
    error,
    totalQuantity,
  } = useCart();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return;
    setIsRedirecting(true);
    window.location.href = cart.checkoutUrl;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const lines = cart?.lines.edges.map((edge) => edge.node) || [];
  const subtotal = cart?.cost.subtotalAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Liquid Blur Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md shadow-2xl flex flex-col border-l animate-in slide-in-from-right duration-300 transition-colors"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 sm:py-5 border-b"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" style={{ color: "var(--accent-cta)" }} />
              <h2
                className="font-serif-luxury text-lg font-bold tracking-wide"
                style={{ color: "var(--text-primary)" }}
              >
                Shopping Bag ({totalQuantity})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="flex h-9 w-9 items-center justify-center rounded-full liquid-glass liquid-glass-hover active:scale-95 cursor-pointer"
              style={{ color: "var(--text-primary)" }}
              aria-label="Close cart drawer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mx-4 mt-3 flex items-center gap-2 rounded-2xl p-3 text-xs"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--accent-cta)",
                border: "1px solid var(--border-medium)",
              }}
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {lines.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full mb-4 liquid-glass"
                >
                  <ShoppingBag className="h-8 w-8" style={{ color: "var(--accent-gold)" }} />
                </div>
                <h3
                  className="font-serif-luxury text-xl font-normal"
                  style={{ color: "var(--text-primary)" }}
                >
                  Your shopping bag is empty
                </h3>
                <p className="mt-2 text-xs max-w-xs font-light" style={{ color: "var(--text-muted)" }}>
                  Discover bespoke necklaces, earrings, and rings to curate your collection.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-6 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
                {lines.map((item) => {
                  const merchandise = item.merchandise;
                  const itemPrice = formatPrice(
                    item.cost.totalAmount.amount,
                    item.cost.totalAmount.currencyCode
                  );
                  const unitPrice = formatPrice(
                    merchandise.price.amount,
                    merchandise.price.currencyCode
                  );

                  return (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      {/* Product Image */}
                      <div
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border"
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
                            sizes="80px"
                            className="object-cover object-center p-1.5"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px]" style={{ color: "var(--text-muted)" }}>
                            Nakshatra
                          </div>
                        )}
                      </div>

                      {/* Product Details & Actions */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              href={`/products/${merchandise.product.handle}`}
                              onClick={closeCart}
                              className="font-serif-luxury text-sm font-semibold line-clamp-1 hover:underline"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {merchandise.product.title}
                            </Link>
                            <span
                              className="text-xs font-bold shrink-0"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {itemPrice}
                            </span>
                          </div>

                          {merchandise.title && merchandise.title !== "Default Title" && (
                            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {merchandise.title}
                            </p>
                          )}
                          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                            {unitPrice} each
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
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
                              className="flex h-7 w-7 items-center justify-center disabled:opacity-40 cursor-pointer active:scale-90"
                              style={{ color: "var(--text-primary)" }}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span
                              className="w-6 text-center text-xs font-semibold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                              className="flex h-7 w-7 items-center justify-center disabled:opacity-40 cursor-pointer active:scale-90"
                              style={{ color: "var(--text-primary)" }}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            disabled={isUpdating}
                            className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:underline disabled:opacity-40 cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {lines.length > 0 && (
            <div
              className="border-t p-4 sm:p-6 transition-colors liquid-glass"
              style={{
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-xs uppercase font-bold tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Subtotal
                </span>
                <span
                  className="font-serif-luxury text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : "—"}
                </span>
              </div>

              <p className="text-[10px] mb-4 text-center" style={{ color: "var(--text-muted)" }}>
                Complimentary insured delivery &amp; taxes calculated at checkout.
              </p>

              <button
                type="button"
                disabled={isUpdating || isRedirecting || !cart?.checkoutUrl}
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-4 text-xs font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer hover:scale-[1.01]"
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
                    <span>Checkout &bull; {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : ""}</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px]" style={{ color: "var(--text-muted)" }}>
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
                <span>Shopify Secure 256-Bit SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
