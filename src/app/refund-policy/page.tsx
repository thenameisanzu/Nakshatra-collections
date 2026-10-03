import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, ShieldCheck, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Return & Refund Policy | NAKSHATRA COLLECTIONS",
  description:
    "Learn about our 7-Day Hassle-Free Replacement and Refund Policy for artificial jewellery, bridal sets, and accessories at Nakshatra Collections.",
};

export default function RefundPolicyPage() {
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
          <span className="text-[var(--accent-cta)] font-semibold">Refund Policy</span>
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
            <RotateCcw className="h-6 w-6" />
          </div>
          <h1
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Return &amp; Refund Policy
          </h1>
          <p
            className="mt-3 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            We take pride in delivering handcrafted 18K gold-plated jewellery in pristine condition. Here is our transparent 7-day policy.
          </p>
        </div>

        {/* Policy Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <div
            className="p-5 rounded-3xl border text-center shadow-xs"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
            <h3 className="font-serif text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              7 Days Window
            </h3>
            <p className="text-[11px] font-light" style={{ color: "var(--text-muted)" }}>
              Easy replacements for defective, wrong, or damaged items upon delivery.
            </p>
          </div>

          <div
            className="p-5 rounded-3xl border text-center shadow-xs"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-amber-500" />
            <h3 className="font-serif text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              100% Free Replacement
            </h3>
            <p className="text-[11px] font-light" style={{ color: "var(--text-muted)" }}>
              No extra shipping charge for replacing verified transit damaged creations.
            </p>
          </div>

          <div
            className="p-5 rounded-3xl border text-center shadow-xs"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <RotateCcw className="h-6 w-6 mx-auto mb-2" style={{ color: "var(--accent-cta)" }} />
            <h3 className="font-serif text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Fast UPI / Bank Refunds
            </h3>
            <p className="text-[11px] font-light" style={{ color: "var(--text-muted)" }}>
              Processed within 3 to 5 business days to your original payment method.
            </p>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div
          className="rounded-3xl border p-6 sm:p-10 space-y-8 shadow-xs leading-relaxed"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
            color: "var(--text-secondary)",
          }}
        >
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              1. Eligibility for Returns &amp; Replacements
            </h2>
            <p className="text-xs sm:text-sm font-light">
              To be eligible for a replacement or return, your item must meet the following criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>Request must be raised within <strong>7 days</strong> of delivery.</li>
              <li>The item must be unused, unworn, and in the same original condition as received.</li>
              <li>The item must be in its original Nakshatra luxury packaging box with tags intact.</li>
              <li>Product delivered was physically damaged, missing parts, or incorrect piece received.</li>
            </ul>
          </section>

          {/* Section 2: Unboxing Video */}
          <section
            className="p-5 rounded-2xl border flex items-start gap-3"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <strong className="font-medium" style={{ color: "var(--text-primary)" }}>
                Mandatory Unboxing Video for Damaged Items
              </strong>
              <p className="font-light text-xs">
                To protect against fraudulent claims and ensure instant replacement approval, we kindly request customers to record a continuous 360&deg; unboxing video while opening the courier package.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              2. Items Not Eligible for Return
            </h2>
            <p className="text-xs sm:text-sm font-light">
              Due to hygiene and bespoke craftsmanship standards, the following cannot be returned:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>Items showing visible signs of wear, perfume sprays, or alteration.</li>
              <li>Items bought during clearance sales or special promotional combo deals marked as non-returnable.</li>
              <li>Customized bridal sets specially assembled upon customer request.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              3. How to Initiate a Return or Replacement
            </h2>
            <p className="text-xs sm:text-sm font-light">
              Initiating a replacement is fast and simple via WhatsApp or Email:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm font-light">
              <li>
                Send a WhatsApp message to our client care team with your <strong>Order ID</strong> and photo/video of the issue.
              </li>
              <li>
                Our quality team will review and approve your return within <strong>4 to 6 business hours</strong>.
              </li>
              <li>
                We will schedule a reverse pickup from your address or provide courier return instructions.
              </li>
            </ol>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: "var(--text-primary)" }}>
              4. Refund Processing Timelines
            </h2>
            <p className="text-xs sm:text-sm font-light">
              Once your returned package is received and inspected at our Kerala fulfilment studio:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>
                <strong>Prepaid Orders (UPI / Cards / NetBanking):</strong> Refund will be credited back to your original payment account within 3&ndash;5 business days.
              </li>
              <li>
                <strong>Cash on Delivery (COD) Orders:</strong> Refund will be sent directly via UPI (Google Pay, PhonePe, Paytm) or direct bank transfer.
              </li>
            </ul>
          </section>

          {/* WhatsApp Support CTA */}
          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div>
              <h4 className="font-serif text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Need help with an order?
              </h4>
              <p className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
                Chat with our dedicated support team on WhatsApp for instant assistance.
              </p>
            </div>
            <a
              href="https://wa.me/918075000000?text=Hello%20Nakshatra%20Collections,%20I%20need%20help%20with%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:scale-102"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
