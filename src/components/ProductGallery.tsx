"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/types/shopify";
import { Sparkles, ChevronLeft, ChevronRight, ZoomIn, Gem, ShieldCheck } from "lucide-react";

interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
  productType?: string;
  selectedVariantImage?: ShopifyImage | null;
}

export default function ProductGallery({
  images,
  title,
  productType,
  selectedVariantImage,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // If a variant image is passed and exists in images, switch to it
  useEffect(() => {
    if (selectedVariantImage?.url && images.length > 0) {
      const idx = images.findIndex((img) => img.url === selectedVariantImage.url);
      if (idx !== -1) {
        setSelectedIndex(idx);
      }
    }
  }, [selectedVariantImage, images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 40;

    if (diff > swipeThreshold && selectedIndex < images.length - 1) {
      // Swiped Left -> Next
      setSelectedIndex((prev) => prev + 1);
    } else if (diff < -swipeThreshold && selectedIndex > 0) {
      // Swiped Right -> Prev
      setSelectedIndex((prev) => prev - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextImage = useCallback(() => {
    if (images.length > 0) {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length > 0) {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  // Fallback placeholder when no images are uploaded on Shopify
  if (!images || images.length === 0) {
    return (
      <div
        className="relative flex aspect-square sm:aspect-[4/5] w-full flex-col items-center justify-between overflow-hidden rounded-3xl border p-8 sm:p-12 text-center transition-all duration-300 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-medium)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Subtle Decorative Background Geometry */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--accent-gold) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Atelier Badge */}
        <div className="z-10 flex items-center justify-between w-full">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-xs"
            style={{
              backgroundColor: "var(--tag-bg)",
              color: "var(--tag-text)",
            }}
          >
            <Gem className="h-3.5 w-3.5" />
            {productType || "Bespoke Creation"}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-widest opacity-60"
            style={{ color: "var(--text-muted)" }}
          >
            Atelier Edition
          </span>
        </div>

        {/* Centerpiece Emblem & Branding */}
        <div className="z-10 my-auto flex flex-col items-center justify-center py-8">
          {/* Animated Halo Crest */}
          <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border border-dashed opacity-40 animate-[spin_25s_linear_infinite]"
              style={{ borderColor: "var(--accent-gold)" }}
            />
            <div
              className="absolute inset-2 rounded-full border opacity-30"
              style={{ borderColor: "var(--accent-gold)" }}
            />
            <div
              className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full shadow-inner transition-transform duration-500 hover:scale-110"
              style={{
                backgroundColor: "var(--tag-bg)",
                border: "1px solid var(--border-medium)",
              }}
            >
              <Sparkles className="h-8 w-8" style={{ color: "var(--accent-gold)" }} />
            </div>
          </div>

          <span
            className="font-serif-luxury text-2xl sm:text-3xl font-normal tracking-[0.22em] uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            NAKSHATRA
          </span>
          <span
            className="text-[11px] font-medium tracking-[0.3em] uppercase mt-2"
            style={{ color: "var(--accent-gold)" }}
          >
            COLLECTIONS
          </span>

          <p
            className="mt-4 max-w-xs text-xs sm:text-sm font-light leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {title}
          </p>
        </div>

        {/* Bottom Assurance Note */}
        <div
          className="z-10 w-full pt-4 border-t flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-wider"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent-cta)" }} />
          <span>Handcrafted Luxury • Signature Atelier Piece</span>
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-3 w-full max-w-[420px] mx-auto">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="group relative aspect-square w-full overflow-hidden rounded-2xl border shadow-sm transition-colors select-none cursor-crosshair"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-medium)",
          boxShadow: "var(--card-shadow)",
        }}
        aria-label={`${title} image showcase`}
      >
        {/* Zoomable Image Element */}
        <div
          className="relative h-full w-full transition-transform duration-150 ease-out"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
          }}
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || `${title} - View ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover object-center"
          />
        </div>

        {/* Zoom Hint (Desktop) */}
        <div
          className={`pointer-events-none absolute bottom-3 right-3 hidden md:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-md transition-opacity duration-300 ${
            isZoomed ? "opacity-0" : "opacity-90"
          }`}
          style={{
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <ZoomIn className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
          <span>Hover to inspect</span>
        </div>

        {/* Navigation Arrows (visible if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full shadow-md backdrop-blur-md opacity-80 transition-all hover:opacity-100 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              }}
              aria-label="Previous product image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full shadow-md backdrop-blur-md opacity-80 transition-all hover:opacity-100 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              }}
              aria-label="Next product image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Mobile Pagination Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex md:hidden items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-md bg-black/20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex ? "w-4" : "w-1.5 opacity-50"
                  }`}
                  style={{
                    backgroundColor: idx === selectedIndex ? "var(--accent-gold)" : "#FFFFFF",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row (if multiple images) */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={img.url + index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "ring-2 shadow-xs scale-[0.98]"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  borderColor: isSelected ? "var(--accent-cta)" : "var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                }}
                aria-label={`View product image ${index + 1} of ${images.length}`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `${title} thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
