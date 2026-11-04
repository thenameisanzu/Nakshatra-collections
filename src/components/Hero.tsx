"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[60vh] md:min-h-[70vh] flex flex-col md:flex-row w-full overflow-hidden bg-white relative border-b border-gray-100">
      {/* 1. Text Column (Top on Mobile, Left on Desktop) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-10 px-6 sm:px-8 md:px-12 lg:px-16 bg-white relative z-10 min-h-[35vh] md:min-h-[70vh] space-y-4">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 mb-1">
            <Image
              src="/nakshatra-logo.png"
              alt="Nakshatra Collections"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.16em] text-gray-900 uppercase">
            Nakshatra Collections
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-amber-700 font-semibold mt-0.5">
            ANTI-TARNISH JEWELLERY
          </span>
        </div>

        {/* Headline Stack (Exact Budget Blings typography) */}
        <div className="space-y-1">
          <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
            WHOLESALE &amp; RETAIL
          </p>
          <h1 className="font-sans text-sm sm:text-base md:text-lg font-bold tracking-[0.16em] text-gray-900 uppercase">
            ANTI-TARNISH JEWELLERY
          </h1>
          <p className="font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] text-gray-500 uppercase">
            FOR EVERYDAY LUXURY
          </p>
        </div>

        {/* Action Buttons: Solid Black Pill [ ⊞ COLLECTIONS ] + Outline Pill [ SHOP ALL → ] */}
        <div className="flex items-center gap-3 pt-1">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-black text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all active:scale-95 shadow-xs"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>COLLECTIONS</span>
          </Link>
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full border border-gray-900 text-gray-900 text-[11px] sm:text-xs font-semibold uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95"
          >
            <span>SHOP ALL &rarr;</span>
          </Link>
        </div>

        {/* Micro-Trust Information */}
        <div className="pt-2 text-[11px] sm:text-xs text-gray-500 space-y-1 font-light">
          <p className="flex items-center justify-center gap-2">
            <span>₹500 min order</span>
            <span className="opacity-40">&bull;</span>
            <span>₹60 domestic express shipping</span>
          </p>
          <p className="text-[10.5px] sm:text-[11px] text-gray-400">
            100% waterproof &amp; anti-tarnish stainless steel
          </p>
          <p className="text-[10px] text-gray-400">
            worldwide express delivery
          </p>
        </div>
      </div>

      {/* 2. Lifestyle Photo Column (Bottom on Mobile, Right on Desktop) */}
      <div className="w-full md:w-1/2 min-h-[38vh] sm:min-h-[45vh] md:min-h-[70vh] relative overflow-hidden bg-white">
        <Image
          src="/images/hero/hero-desktop.webp"
          alt="Nakshatra Anti-Tarnish Jewellery on Model"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
