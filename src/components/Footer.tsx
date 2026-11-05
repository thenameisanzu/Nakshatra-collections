"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons/SocialIcons";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand & Address Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start reveal-on-scroll">
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

            <p className="mt-3 text-xs leading-relaxed max-w-sm text-gray-600 font-light">
              Premium 18K real gold plated anti-tarnish jewellery. Waterproof, sweatproof, and designed for everyday elegance.
            </p>

            {/* Address */}
            <div className="mt-4 flex items-start gap-2 text-xs text-gray-600 leading-relaxed font-light">
              <MapPin className="h-4 w-4 text-[#C59B4E] shrink-0 mt-0.5" />
              <span>
                Theatre road, Kurishinkal, Kanjirappally,<br />
                Keralam &ndash; 686507
              </span>
            </div>

            {/* Social & Contact Icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/919447003584"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#25D366] shadow-xs border border-gray-200 hover:scale-110 active:scale-95 transition-all"
                aria-label="WhatsApp Contact"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/nakshatra.collections.kply/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#E4405F] shadow-xs border border-gray-200 hover:scale-110 active:scale-95 transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>

              <a
                href="mailto:store.nakshatracollections@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-700 shadow-xs border border-gray-200 hover:scale-110 active:scale-95 transition-all"
                aria-label="Email Support"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2 reveal-on-scroll stagger-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-gray-900">
              Collections
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-600 font-light">
              <li>
                <Link href="/collections" className="hover:text-black transition-colors">All Jewellery</Link>
              </li>
              <li>
                <Link href="/collections/necklace" className="hover:text-black transition-colors">Necklaces &amp; Sets</Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:text-black transition-colors">Earrings &amp; Studs</Link>
              </li>
              <li>
                <Link href="/collections/bangles" className="hover:text-black transition-colors">Bangles &amp; Kadas</Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:text-black transition-colors">Solitaires &amp; Rings</Link>
              </li>
              <li>
                <Link href="/collections/bracelets" className="hover:text-black transition-colors">Bracelets</Link>
              </li>
              <li>
                <Link href="/collections/anklets" className="hover:text-black transition-colors">Payals &amp; Anklets</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support (Span 3) */}
          <div className="lg:col-span-3 reveal-on-scroll stagger-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-gray-900">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-600 font-light">
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
                <Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-black transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Desk (Span 3) */}
          <div className="lg:col-span-3 reveal-on-scroll stagger-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-gray-900">
              Reach Out
            </h4>
            <div className="flex flex-col gap-3 text-xs text-gray-600 font-light">
              <a
                href="https://wa.me/919447003584"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366] shrink-0" />
                <span className="font-medium text-gray-900">+91 94470 03584</span>
              </a>

              <a
                href="mailto:store.nakshatracollections@gmail.com"
                className="flex items-center gap-2 hover:text-black transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-[#C59B4E] shrink-0" />
                <span>store.nakshatracollections@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/nakshatra.collections.kply/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <InstagramIcon className="h-4 w-4 text-[#E4405F] shrink-0" />
                <span>@nakshatra.collections.kply</span>
              </a>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-500">
                <Clock className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                <span>Mon &ndash; Sat: 9:30 AM &ndash; 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400 reveal-on-scroll">
          <p>
            &copy; {new Date().getFullYear()} Nakshatra Collections, Kanjirappally. All rights reserved.
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
