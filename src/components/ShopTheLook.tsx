"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, ArrowRight, Check, Plus, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { ShopifyProduct } from "@/types/shopify";

interface LookHotspot {
  id: string;
  name: string;
  tag: string;
  price: string;
  x: number; // percentage from left
  y: number; // percentage from top
  handle: string;
  image: string;
}

const lookItems: LookHotspot[] = [
  {
    id: "hotspot-1",
    name: "Royal Kundan Choker Set",
    tag: "Necklace Set",
    price: "₹3,499",
    x: 48,
    y: 38,
    handle: "royal-kundan-choker-set",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
  },
  {
    id: "hotspot-2",
    name: "Luminous Pearl Drop Jhumkas",
    tag: "Earrings",
    price: "₹1,499",
    x: 36,
    y: 28,
    handle: "elegant-pearl-drop-necklace",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
  },
  {
    id: "hotspot-3",
    name: "18K Gold Plated Heritage Kadas",
    tag: "Bangles",
    price: "₹1,899",
    x: 62,
    y: 72,
    handle: "rose-gold-layered-necklace",
    image: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  },
];

export default function ShopTheLook({ products }: { products?: ShopifyProduct[] }) {
  const [activeHotspot, setActiveHotspot] = useState<LookHotspot>(lookItems[0]);
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Match live product from Shopify if available
  const currentLiveProduct = products?.find((p) => p.handle === activeHotspot.handle);

  const handleAddActivePiece = async () => {
    try {
      setIsAdding(true);
      // Find variant ID
      const variantId = currentLiveProduct?.variants?.edges?.[0]?.node?.id;
      if (variantId) {
        await addItem(variantId, 1);
      } else {
        openCart();
      }
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add look item:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section
      id="shop-the-look"
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Shop The Look Visual Styling"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Visual Styling Canvas
            </span>
            <h2
              className="font-serif-luxury mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Shop The Curated Look
            </h2>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed font-medium max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover how our royal neckpieces, drop earrings, and gold-plated bangles pair together for weddings and festive celebrations.
            </p>
          </div>

          <Link
            href="/collections/bridal-jewellery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest hover:underline transition-colors shrink-0"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>Explore Bridal Ensembles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2-Column Visual Hotspot Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Lifestyle Model Canvas (Span 7) */}
          <div
            className="relative lg:col-span-7 rounded-3xl overflow-hidden border shadow-xl aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full"
            style={{
              borderColor: "var(--border-medium)",
              backgroundColor: "#17120F",
            }}
          >
            <Image
              src="/images/hero/temple-choker.jpg"
              alt="Nakshatra Collections Bridal Jewellery Styling"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-103"
            />

            {/* Ambient subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Top Prompt */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider liquid-glass-dark text-white border border-white/20">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Tap Points to Inspect Jewellery
              </span>
            </div>

            {/* Pulsing Hotspots */}
            {lookItems.map((item) => {
              const isActive = activeHotspot.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveHotspot(item)}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300`}
                  aria-label={`Inspect ${item.name}`}
                >
                  {/* Outer pulse ring */}
                  <span
                    className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                      isActive ? "bg-amber-400 scale-150" : "bg-white/60"
                    }`}
                  />
                  {/* Core button */}
                  <div
                    className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full shadow-2xl border-2 transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-white text-slate-900"
                        : "border-white/80 text-white hover:scale-110"
                    }`}
                    style={{
                      backgroundColor: isActive ? "var(--accent-gold)" : "rgba(18, 14, 12, 0.75)",
                    }}
                  >
                    <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Piece Inspector & Pairings (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Active Piece Highlight Card */}
            <div
              className="rounded-3xl border p-6 sm:p-7 shadow-lg transition-all duration-500 flex flex-col justify-between card-lift"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border shrink-0 shadow-xs"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <Image
                    src={activeHotspot.image}
                    alt={activeHotspot.name}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-[0.2em] mb-1"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {activeHotspot.tag}
                  </span>

                  <h3
                    className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {activeHotspot.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-extrabold" style={{ color: "var(--text-primary)" }}>
                      {activeHotspot.price}
                    </span>
                    <span className="text-xs line-through opacity-60" style={{ color: "var(--text-muted)" }}>
                      ₹4,999
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t flex items-center gap-3" style={{ borderColor: "var(--border-subtle)" }}>
                <button
                  type="button"
                  onClick={handleAddActivePiece}
                  disabled={isAdding}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl h-12 px-4 text-xs font-extrabold uppercase tracking-widest shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  style={{
                    backgroundColor: isAdded ? "#2D6A4F" : "var(--accent-cta)",
                    color: "var(--accent-cta-text)",
                  }}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add This Piece</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/products/${activeHotspot.handle}`}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border transition hover:scale-105"
                  style={{
                    borderColor: "var(--border-medium)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="View details"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick List of All 3 Coordinated Pieces */}
            <div
              className="rounded-2xl border p-4 transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <span className="text-xs font-extrabold uppercase tracking-wider block mb-2.5" style={{ color: "var(--text-muted)" }}>
                Coordinated In This Ensemble:
              </span>

              <div className="flex flex-col gap-2">
                {lookItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveHotspot(item)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                      activeHotspot.id === item.id
                        ? "border-amber-400/80 bg-white dark:bg-black/40 shadow-xs scale-[1.01]"
                        : "border-transparent hover:bg-black/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-8 w-8 rounded-lg overflow-relative border shrink-0 relative overflow-hidden"
                        style={{ borderColor: "var(--border-subtle)" }}
                      >
                        <Image src={item.image} alt={item.name} fill sizes="32px" className="object-contain p-0.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold font-serif-luxury line-clamp-1" style={{ color: "var(--text-primary)" }}>
                          {item.name}
                        </p>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold shrink-0 ml-2" style={{ color: "var(--accent-cta)" }}>
                      {item.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
