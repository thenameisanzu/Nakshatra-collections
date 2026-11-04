"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer 
      className="mt-auto border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
        color: "var(--text-secondary)",
      }}
    >
      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Column (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-start reveal-on-scroll">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA Collections"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-medium tracking-[0.16em] uppercase leading-none text-gray-900">
                  Nakshatra Collections
                </span>
                <span className="text-[8px] font-semibold tracking-[0.28em] uppercase leading-none mt-1 text-amber-700">
                  ANTI-TARNISH JEWELLERY
                </span>
              </div>
            </Link>

            <p className="mt-3 text-xs leading-relaxed max-w-sm text-gray-500 font-light">
              Premium 18K real gold plated anti-tarnish jewellery. Waterproof, sweatproof, and designed for everyday elegance.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span>Wholesale &amp; Retail</span>
              <span className="opacity-40">&bull;</span>
              <span>Kerala &amp; Pan-India Delivery</span>
            </div>
          </div>

          {/* Quick Links (Span 3) */}
          <div className="lg:col-span-3 reveal-on-scroll stagger-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-gray-900">
              Collections
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-500 font-light">
              <li>
                <Link href="/collections" className="hover:text-black transition-colors">All Jewellery</Link>
              </li>
              <li>
                <Link href="/collections/necklaces" className="hover:text-black transition-colors">Necklaces &amp; Pendants</Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:text-black transition-colors">Earrings &amp; Studs</Link>
              </li>
              <li>
                <Link href="/collections/bangles" className="hover:text-black transition-colors">Bangles &amp; Cuffs</Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:text-black transition-colors">Solitaires &amp; Rings</Link>
              </li>
              <li>
                <Link href="/collections/bridal-jewellery" className="hover:text-black transition-colors">Bridal Sets</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support (Span 4) */}
          <div className="lg:col-span-4 reveal-on-scroll stagger-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-gray-900">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-500 font-light">
              <li>
                <Link href="/account" className="hover:text-black transition-colors">Track Your Order</Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-black transition-colors">Shipping &amp; Delivery Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-black transition-colors">Returns &amp; Exchanges</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors">Contact WhatsApp Support</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy &amp; Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400 reveal-on-scroll">
          <p>
            &copy; {new Date().getFullYear()} Nakshatra Collections. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-gray-500">
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <Link href="/terms-of-service" className="hover:underline">Terms</Link>
            <Link href="/refund-policy" className="hover:underline">Refunds</Link>
            <Link href="/shipping-policy" className="hover:underline">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
