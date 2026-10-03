import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | NAKSHATRA COLLECTIONS",
  description:
    "Terms of Service for purchasing artificial jewellery, bridal sets, and accessories at Nakshatra Collections.",
};

export default function TermsOfServicePage() {
  return (
    <div
      className="min-h-screen py-10 sm:py-16 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[var(--accent-cta)] font-semibold">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full mb-3 border shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--accent-gold)",
            }}
          >
            <Scale className="h-6 w-6" />
          </div>
          <h1
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Terms of Service
          </h1>
          <p
            className="mt-3 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Please read these terms carefully before placing an order on Nakshatra Collections.
          </p>
        </div>

        {/* Content */}
        <div
          className="rounded-3xl border p-6 sm:p-10 space-y-8 shadow-xs leading-relaxed text-xs sm:text-sm font-light"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
            color: "var(--text-secondary)",
          }}
        >
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              1. General Store Conditions
            </h2>
            <p>
              By accessing our website and purchasing products from <strong>Nakshatra Collections</strong>, you agree to be bound by these Terms and Conditions. Our products are intended for personal retail use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              2. Product Descriptions &amp; Accuracy
            </h2>
            <p>
              We make every effort to display the colors, stones, and craftsmanship of our 18K gold-plated jewellery accurately. However, minor variations in shade may occur due to photography lighting and screen color calibrations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              3. Pricing &amp; Payments
            </h2>
            <p>
              All prices listed on our website are in Indian Rupees (INR) and inclusive of applicable GST taxes. We reserve the right to modify prices or discontinue products without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms of Service and any separate agreements shall be governed by and construed in accordance with the laws of India, under the jurisdiction of courts in Kerala.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
