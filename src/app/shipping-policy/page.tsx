import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, PackageCheck, Shield, Sparkles, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | NAKSHATRA COLLECTIONS",
  description:
    "Learn about express shipping timelines, delivery across Kerala & India, packaging standards, and tracking for Nakshatra Collections artificial jewellery.",
};

export default function ShippingPolicyPage() {
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
          <span className="text-[var(--accent-cta)] font-semibold">Shipping Policy</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full mb-3 border shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--accent-gold)",
            }}
          >
            <Truck className="h-6 w-6" />
          </div>
          <h1
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Shipping &amp; Delivery Policy
          </h1>
          <p
            className="mt-3 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Fast, insured, and tamper-proof express delivery across Kerala and all Indian pin codes.
          </p>
        </div>

        {/* Delivery Timelines Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          <div
            className="p-6 rounded-3xl border shadow-xs card-lift"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                Express Zone
              </span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Within Kerala
            </h3>
            <p className="text-2xl font-bold font-serif mb-2" style={{ color: "var(--accent-cta)" }}>
              2 &ndash; 4 Business Days
            </p>
            <p className="text-xs font-light" style={{ color: "var(--text-secondary)" }}>
              Dispatched directly from our Kerala studio via express courier partners with daily live tracking updates.
            </p>
          </div>

          <div
            className="p-6 rounded-3xl border shadow-xs card-lift"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                Pan-India Zone
              </span>
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Rest of India
            </h3>
            <p className="text-2xl font-bold font-serif mb-2" style={{ color: "var(--text-primary)" }}>
              4 &ndash; 7 Business Days
            </p>
            <p className="text-xs font-light" style={{ color: "var(--text-secondary)" }}>
              Reliable air/surface cargo shipping to all 28 states &amp; union territories with PIN-code level validation.
            </p>
          </div>
        </div>

        {/* Detailed Shipping Guidelines */}
        <div
          className="rounded-3xl border p-6 sm:p-10 space-y-8 shadow-xs leading-relaxed"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
            color: "var(--text-secondary)",
          }}
        >
          {/* Section 1: Dispatch & Processing */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              1. Order Processing &amp; Dispatch Timeline
            </h2>
            <p className="text-xs sm:text-sm font-light">
              All in-stock orders placed before <strong>2:00 PM IST</strong> Monday through Saturday are packed and handed over to courier partners on the same business day.
            </p>
            <p className="text-xs sm:text-sm font-light">
              Orders placed on Sundays or national public holidays are processed on the subsequent working morning.
            </p>
          </section>

          {/* Section 2: Shipping Charges */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              2. Shipping Charges &amp; Free Delivery
            </h2>
            <div
              className="p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-medium"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
            >
              <span>Prepaid Orders above &#8377;999</span>
              <span className="font-bold text-emerald-600">FREE SHIPPING</span>
            </div>
            <div
              className="p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-medium"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
            >
              <span>Standard Orders below &#8377;999</span>
              <span className="font-bold" style={{ color: "var(--text-primary)" }}>Flat &#8377;49 across Kerala</span>
            </div>
          </section>

          {/* Section 3: Courier Partners & Tracking */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              3. Courier Partners &amp; Tracking
            </h2>
            <p className="text-xs sm:text-sm font-light">
              We partner with India&apos;s leading logistics networks to guarantee safe delivery:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-semibold py-2">
              <div className="p-3 rounded-xl border bg-neutral-50 dark:bg-neutral-900" style={{ borderColor: "var(--border-subtle)" }}>
                Delhivery Express
              </div>
              <div className="p-3 rounded-xl border bg-neutral-50 dark:bg-neutral-900" style={{ borderColor: "var(--border-subtle)" }}>
                Blue Dart Air
              </div>
              <div className="p-3 rounded-xl border bg-neutral-50 dark:bg-neutral-900" style={{ borderColor: "var(--border-subtle)" }}>
                DTDC Courier
              </div>
              <div className="p-3 rounded-xl border bg-neutral-50 dark:bg-neutral-900" style={{ borderColor: "var(--border-subtle)" }}>
                India Post Speed
              </div>
            </div>
            <p className="text-xs sm:text-sm font-light">
              Once dispatched, you will automatically receive an SMS and WhatsApp alert containing your live <strong>AWB Tracking Number</strong> and courier tracking link.
            </p>
          </section>

          {/* Section 4: Tamper-Proof Packaging */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              4. Safe &amp; Tamper-Evident Packaging
            </h2>
            <p className="text-xs sm:text-sm font-light">
              Every Nakshatra piece is nestled inside a velvet-lined luxury gift box, sealed with high-density anti-shock bubble wrap, and enclosed in a tamper-evident waterproof polybag. If the outer courier seal appears broken or opened upon delivery, please refuse receipt and contact us immediately.
            </p>
          </section>

          {/* WhatsApp Support CTA */}
          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div>
              <h4 className="font-serif text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Questions regarding your shipment?
              </h4>
              <p className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
                Track your package in real-time or reach out to our logistics desk.
              </p>
            </div>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:scale-102"
              style={{ backgroundColor: "var(--accent-cta)" }}
            >
              <PackageCheck className="h-4 w-4" />
              <span>Track Order Status</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
