import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NAKSHATRA COLLECTIONS",
  description:
    "Privacy Policy for Nakshatra Collections. Learn how we collect, protect, and manage your personal data and payments securely.",
};

export default function PrivacyPolicyPage() {
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
          <span className="text-[var(--accent-cta)] font-semibold">Privacy Policy</span>
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
            <Lock className="h-6 w-6" />
          </div>
          <h1
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Privacy Policy
          </h1>
          <p
            className="mt-3 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
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
              1. Information We Collect
            </h2>
            <p>
              When you visit or make a purchase from <strong>Nakshatra Collections</strong>, we collect certain details necessary to fulfill your orders and enhance your shopping experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Personal Details:</strong> Name, delivery address, phone number, and email address.</li>
              <li><strong>Payment Information:</strong> Processed through PCI-DSS compliant gateways (Razorpay / Shopify Payments). We never store your full card numbers or banking passwords.</li>
              <li><strong>Device &amp; Browsing Data:</strong> IP address, device type, browser cookies for shopping bag persistence.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              2. How We Use Your Information
            </h2>
            <p>We use your personal data exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing and delivering your jewellery orders across Kerala and India.</li>
              <li>Sending automated courier tracking updates via SMS and WhatsApp.</li>
              <li>Providing customer care, replacement support, and responding to your queries.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              3. Data Security &amp; Sharing
            </h2>
            <p>
              Your data is strictly confidential. We do not sell, rent, or trade your personal information to third parties. We only share essential delivery data with licensed logistics partners (e.g. Delhivery, Blue Dart, Speed Post) strictly for order fulfillment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              4. Contact Us Regarding Your Privacy
            </h2>
            <p>
              For any questions regarding our privacy practices or to request deletion of your account data, please contact our privacy desk at <strong>care@nakshatracollections.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
