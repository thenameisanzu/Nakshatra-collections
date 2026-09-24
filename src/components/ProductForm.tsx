"use client";

import { useState, useMemo } from "react";
import type { ShopifyProduct, ShopifyProductVariant, ShopifyImage } from "@/types/shopify";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  ShoppingBag,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Loader2,
  Lock,
  ChevronDown,
  Sparkles,
  Headphones,
  Heart,
} from "lucide-react";

interface ProductFormProps {
  product: ShopifyProduct;
  onVariantChange?: (variantImage: ShopifyImage | null) => void;
}

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

export default function ProductForm({ product, onVariantChange }: ProductFormProps) {
  const { addItem, cart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const variants = useMemo(
    () => product.variants?.edges.map((e) => e.node) || [],
    [product.variants]
  );
  const options = useMemo(() => product.options || [], [product.options]);

  // Initial selected state
  const initialSelections = useMemo(() => {
    const defaultState: Record<string, string> = {};
    if (variants.length > 0) {
      const firstAvailable = variants.find((v) => v.availableForSale) || variants[0];
      firstAvailable.selectedOptions.forEach((opt) => {
        defaultState[opt.name] = opt.value;
      });
    } else {
      options.forEach((opt) => {
        if (opt.values.length > 0) {
          defaultState[opt.name] = opt.values[0];
        }
      });
    }
    return defaultState;
  }, [variants, options]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialSelections);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isBuyingNow, setIsBuyingNow] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  // Find matching active variant based on selected options
  const activeVariant: ShopifyProductVariant | undefined = useMemo(() => {
    if (variants.length === 0) return undefined;
    return variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      )
    );
  }, [variants, selectedOptions]);

  // Check if active variant or product is available
  const isAvailable = activeVariant ? activeVariant.availableForSale : product.availableForSale;

  const currentPrice = activeVariant
    ? activeVariant.price
    : product.priceRange.minVariantPrice;

  const compareAtPrice = activeVariant?.compareAtPrice || product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(currentPrice.amount);

  const discountPercent =
    hasDiscount && compareAtPrice
      ? Math.round(
          ((parseFloat(compareAtPrice.amount) - parseFloat(currentPrice.amount)) /
            parseFloat(compareAtPrice.amount)) *
            100
        )
      : null;

  const formattedPrice = formatPrice(currentPrice.amount, currentPrice.currencyCode);
  const formattedComparePrice =
    hasDiscount && compareAtPrice
      ? formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)
      : null;

  const handleOptionChange = (optionName: string, value: string) => {
    const updated = {
      ...selectedOptions,
      [optionName]: value,
    };
    setSelectedOptions(updated);

    // Notify parent if new variant has an image
    if (variants.length > 0) {
      const match = variants.find((variant) =>
        variant.selectedOptions.every((opt) => updated[opt.name] === opt.value)
      );
      if (match?.image && onVariantChange) {
        onVariantChange(match.image);
      }
    }
  };

  // 1. ADD TO CART
  const handleAddToCart = async () => {
    const variantIdToUse = activeVariant?.id || variants[0]?.id;
    if (!variantIdToUse) return;

    try {
      setIsAdding(true);
      await addItem(variantIdToUse, quantity);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to add to bag:", err);
    } finally {
      setIsAdding(false);
    }
  };

  // 2. BUY NOW (Direct Express Checkout via Shopify Storefront Cart)
  const handleBuyNow = async () => {
    const variantIdToUse = activeVariant?.id || variants[0]?.id;
    if (!variantIdToUse) return;

    try {
      setIsBuyingNow(true);
      // Create or update cart specifically for direct checkout
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          lines: [{ merchandiseId: variantIdToUse, quantity }],
        }),
      });

      const data = await res.json();
      if (data.cart?.checkoutUrl) {
        window.location.href = data.cart.checkoutUrl;
      } else if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      } else {
        // Fallback to normal add item and drawer
        await addItem(variantIdToUse, quantity);
      }
    } catch (err) {
      console.error("Failed to initiate express checkout:", err);
      // Fallback
      await addItem(variantIdToUse, quantity);
    } finally {
      setIsBuyingNow(false);
    }
  };

  // 3. WISHLIST TOGGLE
  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id,
      handle: product.handle,
      title: product.title,
      price: {
        amount: currentPrice.amount,
        currencyCode: currentPrice.currencyCode,
      },
      compareAtPrice: compareAtPrice
        ? {
            amount: compareAtPrice.amount,
            currencyCode: compareAtPrice.currencyCode,
          }
        : null,
      imageUrl: product.featuredImage?.url || null,
      imageAlt: product.featuredImage?.altText || product.title,
      productType: product.productType,
      availableForSale: product.availableForSale,
    });
  };

  // Check if options are meaningful (not just single Default Title)
  const hasRealOptions =
    options.length > 0 &&
    options.some((opt) => opt.name !== "Title" || opt.values.length > 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Price & Tax Overview */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {formattedPrice}
          </span>

          {formattedComparePrice && (
            <span
              className="text-base sm:text-lg line-through opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              {formattedComparePrice}
            </span>
          )}

          {hasDiscount && discountPercent && (
            <span
              className="rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider shadow-xs"
              style={{
                backgroundColor: "var(--badge-sale-bg)",
                color: "var(--badge-sale-text)",
              }}
            >
              Save {discountPercent}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <span>{currentPrice.currencyCode}</span>
          <span>•</span>
          <span>Inclusive of all local taxes</span>
          <span>•</span>
          <span className="font-semibold" style={{ color: "var(--accent-gold)" }}>
            Complimentary Insured Shipping
          </span>
        </div>
      </div>

      {/* Availability Notice */}
      <div
        className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-medium border transition-colors"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-secondary)",
        }}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
            isAvailable ? "bg-emerald-600 animate-pulse" : "bg-amber-600"
          }`}
        />
        <span>
          {isAvailable
            ? "Ready to Ship — Dispatched in Signature Velvet Presentation Box"
            : "Made to Order in Atelier — Bespoke Crafting Upon Request"}
        </span>
      </div>

      {/* Dynamic Shopify Variant Selectors (Ring Size, Color, Metal, etc.) */}
      {hasRealOptions && (
        <div
          className="flex flex-col gap-5 border-t pt-5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {options.map((option) => {
            if (option.name === "Title" && option.values.length <= 1) return null;

            return (
              <div key={option.id || option.name} className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="font-bold" style={{ color: "var(--text-primary)" }}>
                    {option.name}
                  </span>
                  <span className="font-semibold" style={{ color: "var(--accent-gold)" }}>
                    {selectedOptions[option.name]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {option.values.map((val) => {
                    const isSelected = selectedOptions[option.name] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleOptionChange(option.name, val)}
                        className={`min-w-[48px] rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "shadow-sm ring-2 ring-offset-1"
                            : "border opacity-85 hover:opacity-100"
                        }`}
                        style={{
                          backgroundColor: isSelected
                            ? "var(--accent-cta)"
                            : "var(--bg-primary)",
                          color: isSelected
                            ? "var(--accent-cta-text)"
                            : "var(--text-primary)",
                          borderColor: isSelected
                            ? "var(--accent-gold)"
                            : "var(--border-medium)",
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quantity & CTA Action Buttons */}
      <div
        className="flex flex-col gap-3.5 border-t pt-5"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quantity Stepper */}
          <div
            className="flex items-center justify-between sm:justify-center rounded-2xl border h-13 px-2 shrink-0"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-medium)",
            }}
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || isAdding || isBuyingNow}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:opacity-70 disabled:opacity-30"
              style={{ color: "var(--text-primary)" }}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span
              className="w-8 sm:w-10 text-center text-xs sm:text-sm font-semibold select-none"
              style={{ color: "var(--text-primary)" }}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              disabled={isAdding || isBuyingNow}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:opacity-70 disabled:opacity-30"
              style={{ color: "var(--text-primary)" }}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* ADD TO CART Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || isBuyingNow}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl h-13 px-3 sm:px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer min-w-0"
            style={{
              backgroundColor: isAdded ? "#2D6A4F" : "var(--accent-cta)",
              color: "var(--accent-cta-text)",
            }}
          >
            {isAdding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                <span className="truncate">Adding...</span>
              </>
            ) : isAdded ? (
              <>
                <Check className="h-4 w-4 shrink-0" />
                <span className="truncate">Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span className="truncate">Add to Shopping Bag</span>
              </>
            )}
          </button>

          {/* Wishlist Toggle Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer ${
              isWishlisted
                ? "text-rose-600 border-rose-300 bg-rose-50/60"
                : "border-[var(--border-medium)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-rose-600"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
          >
            <Heart
              className={`h-5 w-5 transition-transform duration-200 ${
                isWishlisted ? "fill-rose-600 stroke-rose-600 scale-110" : ""
              }`}
            />
          </button>
        </div>

        {/* BUY NOW Button (Express Direct Checkout) */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isAdding || isBuyingNow}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl h-12 px-4 sm:px-6 text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] border transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--accent-gold)",
            color: "var(--text-primary)",
          }}
        >
          {isBuyingNow ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin shrink-0" style={{ color: "var(--accent-gold)" }} />
              <span>Connecting to Secure Checkout...</span>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-gold)" }} />
              <span>Buy Now — Express Checkout</span>
            </>
          )}
        </button>
      </div>

      {/* Trust & Shopping Information Badges */}
      <div
        className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl border p-3.5 sm:p-4 text-center transition-colors"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="flex flex-col items-center gap-1.5 p-1">
          <Truck className="h-4 w-4" style={{ color: "var(--accent-cta)" }} />
          <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>
            Kerala &amp; India Express
          </span>
          <span className="text-[9px] sm:text-[10px] hidden sm:block" style={{ color: "var(--text-muted)" }}>
            Tracked Delivery
          </span>
        </div>

        <div
          className="flex flex-col items-center gap-1.5 p-1 border-x"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <ShieldCheck className="h-4 w-4" style={{ color: "var(--accent-cta)" }} />
          <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>
            100% Anti-Tarnish
          </span>
          <span className="text-[9px] sm:text-[10px] hidden sm:block" style={{ color: "var(--text-muted)" }}>
            Skin Friendly
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 p-1">
          <RotateCcw className="h-4 w-4" style={{ color: "var(--accent-cta)" }} />
          <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>
            Easy Exchange
          </span>
          <span className="text-[9px] sm:text-[10px] hidden sm:block" style={{ color: "var(--text-muted)" }}>
            Hassle Free
          </span>
        </div>
      </div>

      {/* Product Details & Specifications Accordion */}
      <div
        className="flex flex-col border-t divide-y transition-colors pt-2"
        style={{
          borderColor: "var(--border-subtle)",
        }}
      >
        {/* Accordion 1: Description */}
        <div className="py-3">
          <button
            type="button"
            onClick={() =>
              setOpenAccordion(openAccordion === "description" ? "" : "description")
            }
            className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider py-2 cursor-pointer transition hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Description & Atelier Notes
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                openAccordion === "description" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openAccordion === "description" && (
            <div
              className="pt-2 pb-3 text-xs leading-relaxed animate-in fade-in-50 duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              {product.descriptionHtml ? (
                <div
                  className="prose prose-sm max-w-none text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : product.description ? (
                <p className="whitespace-pre-line">{product.description}</p>
              ) : (
                <p>
                  A signature creation from the Nakshatra atelier, balancing timeless elegance
                  with modern luxury craftsmanship.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: Product Specifications */}
        <div className="py-3">
          <button
            type="button"
            onClick={() =>
              setOpenAccordion(openAccordion === "details" ? "" : "details")
            }
            className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider py-2 cursor-pointer transition hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Product Specifications
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                openAccordion === "details" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openAccordion === "details" && (
            <div
              className="pt-2 pb-3 text-xs leading-relaxed animate-in fade-in-50 duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <dt className="font-semibold" style={{ color: "var(--text-muted)" }}>
                    Category
                  </dt>
                  <dd style={{ color: "var(--text-primary)" }}>
                    {product.productType || "Artificial Jewellery"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold" style={{ color: "var(--text-muted)" }}>
                    Brand / Atelier
                  </dt>
                  <dd style={{ color: "var(--text-primary)" }}>NAKSHATRA COLLECTIONS</dd>
                </div>
                <div>
                  <dt className="font-semibold" style={{ color: "var(--text-muted)" }}>
                    Packaging
                  </dt>
                  <dd style={{ color: "var(--text-primary)" }}>
                    Signature Velvet Luxury Box
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold" style={{ color: "var(--text-muted)" }}>
                    Product Handle
                  </dt>
                  <dd className="font-mono text-[11px]" style={{ color: "var(--text-primary)" }}>
                    {product.handle}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* Accordion 3: Shipping & Returns */}
        <div className="py-3">
          <button
            type="button"
            onClick={() =>
              setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")
            }
            className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider py-2 cursor-pointer transition hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Shipping & 30-Day Returns
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                openAccordion === "shipping" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openAccordion === "shipping" && (
            <div
              className="pt-2 pb-3 text-xs leading-relaxed space-y-2 animate-in fade-in-50 duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                <strong>Complimentary Insured Courier:</strong> Every order is dispatched in tamper-evident, secure packaging with tracking directly to your doorstep.
              </p>
              <p>
                <strong>Hassle-Free 30-Day Returns:</strong> If you are not completely enchanted with your creation, return it within 30 days in its original condition for an exchange or full refund.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 4: Care & Support */}
        <div className="py-3">
          <button
            type="button"
            onClick={() =>
              setOpenAccordion(openAccordion === "support" ? "" : "support")
            }
            className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider py-2 cursor-pointer transition hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="flex items-center gap-2">
              <Headphones className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Care Advice & Customer Support
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                openAccordion === "support" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openAccordion === "support" && (
            <div
              className="pt-2 pb-3 text-xs leading-relaxed space-y-2 animate-in fade-in-50 duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                <strong>Jewellery Care:</strong> Store each piece separately in your Nakshatra velvet box. Avoid contact with perfumes, sanitizers, and chlorine. Gently wipe with a soft lint-free cloth after wearing.
              </p>
              <p>
                <strong>Customer Support:</strong> Have questions about sizing or delivery in Kerala? Our team is ready to assist you on WhatsApp and call.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Add To Bag Floating Footer */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 liquid-glass border-t shadow-2xl animate-in slide-in-from-bottom duration-300"
        style={{
          borderColor: "var(--border-medium)",
        }}
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider truncate" style={{ color: "var(--accent-gold)" }}>
              {product.title}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {formattedPrice}
              </span>
              {formattedComparePrice && (
                <span className="text-xs line-through opacity-60" style={{ color: "var(--text-muted)" }}>
                  {formattedComparePrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || isBuyingNow}
              className="flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
              style={{
                backgroundColor: isAdded ? "#2D6A4F" : "var(--accent-cta)",
                color: "var(--accent-cta-text)",
              }}
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isAdding || isBuyingNow}
              className="flex items-center justify-center rounded-full px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border liquid-glass active:scale-95 transition-all cursor-pointer"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--accent-gold)",
              }}
            >
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
