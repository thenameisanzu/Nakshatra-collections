import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
                <Image
                  src="/nakshatra-logo.png"
                  alt="NAKSHATRA"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  NAKSHATRA
                </span>
                <span
                  className="text-[9px] font-medium tracking-[0.3em] uppercase leading-none mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Fine Jewellery
                </span>
              </div>
            </Link>

            <p
              className="mt-4 text-xs sm:text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Curating elegant jewellery, bespoke gifts, and timeless designs for everyday grace and memorable moments.
            </p>

            {/* Social Media Placeholders */}
            <div className="mt-6 flex items-center gap-4 text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Follow Along
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 rounded-full border transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2 rounded-full border transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/collections/necklaces" className="hover:underline">Collections</Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:underline font-semibold" style={{ color: "var(--accent-cta)" }}>New Arrivals</Link>
              </li>
              <li>
                <Link href="/#about-story" className="hover:underline">About</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Shop */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/collections/necklaces" className="hover:underline">Necklaces</Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:underline">Earrings</Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:underline">Rings</Link>
              </li>
              <li>
                <Link href="/collections/bracelets" className="hover:underline">Bracelets</Link>
              </li>
              <li>
                <Link href="/collections/jewellery-sets" className="hover:underline">Jewellery Sets</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Customer */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Customer
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/cart" className="hover:underline">Cart</Link>
              </li>
              <li>
                <Link href="/#about-story" className="hover:underline">Shipping</Link>
              </li>
              <li>
                <Link href="/#about-story" className="hover:underline">Returns</Link>
              </li>
              <li>
                <Link href="/#privacy" className="hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} NAKSHATRA. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
