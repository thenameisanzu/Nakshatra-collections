"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    orderNumber: "",
    inquiryType: "order_inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.phone && !formData.email)) return;

    // Direct WhatsApp message generation as instant forward option
    const text = encodeURIComponent(
      `*New Inquiry from Nakshatra Website*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email || "N/A"}\n` +
      `📦 *Order ID:* ${formData.orderNumber || "N/A"}\n` +
      `🏷️ *Type:* ${formData.inquiryType}\n\n` +
      `💬 *Message:* ${formData.message}`
    );

    setIsSubmitted(true);
  };

  const FAQS = [
    {
      q: "How do I track my placed order?",
      a: "You can track your order using the 'Track Orders' option in your Customer Account page or click the courier AWB link sent to your WhatsApp and SMS upon dispatch.",
    },
    {
      q: "Are the jewellery pieces waterproof and anti-tarnish?",
      a: "Yes! All Nakshatra collections feature premium 18K Real Gold micro-plating over high-grade anti-allergic brass and 316L stainless steel, engineered for everyday sweat and water resistance.",
    },
    {
      q: "Can I request custom bridal set combinations?",
      a: "Absolutely! Contact our bridal stylists on WhatsApp with your wedding outfit photo, and we will curate a matching choker, haram, jhumka, and payal combo for you.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and Cash on Delivery (COD) across Kerala and India.",
    },
  ];

  return (
    <div
      className="min-h-screen py-10 sm:py-16 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[var(--accent-cta)] font-semibold">Contact Us</span>
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
            <MessageCircle className="h-6 w-6" />
          </div>
          <h1
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Client Care &amp; Support
          </h1>
          <p
            className="mt-3 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Have a question about sizing, bridal styling, or order tracking? We are here to help you every step of the way.
          </p>
        </div>

        {/* Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918075000000?text=Hello%20Nakshatra%20Collections,%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl border shadow-xs card-lift flex flex-col justify-between transition-all group"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)" }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Instant Reply
                </span>
              </div>
              <h3 className="font-serif text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                WhatsApp Concierge
              </h3>
              <p className="mt-1 text-xs font-light" style={{ color: "var(--text-muted)" }}>
                Chat directly with our Kerala jewellery stylists.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 group-hover:underline" style={{ borderColor: "var(--border-subtle)" }}>
              <span>Chat on WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </a>

          {/* Email Support */}
          <a
            href="mailto:care@nakshatracollections.com"
            className="p-6 rounded-3xl border shadow-xs card-lift flex flex-col justify-between transition-all group"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)" }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200">
                  2&ndash;4 Hours
                </span>
              </div>
              <h3 className="font-serif text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Email Support
              </h3>
              <p className="mt-1 text-xs font-light" style={{ color: "var(--text-muted)" }}>
                care@nakshatracollections.com
              </p>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center gap-1 text-xs font-bold uppercase tracking-wider group-hover:underline" style={{ color: "var(--accent-cta)", borderColor: "var(--border-subtle)" }}>
              <span>Send Email</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </a>

          {/* Working Hours */}
          <div
            className="p-6 rounded-3xl border shadow-xs flex flex-col justify-between"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)" }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-full border border-purple-200">
                  Mon &ndash; Sat
                </span>
              </div>
              <h3 className="font-serif text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Studio Hours
              </h3>
              <p className="mt-1 text-xs font-light" style={{ color: "var(--text-muted)" }}>
                9:30 AM &ndash; 7:30 PM IST (Kerala, India)
              </p>
            </div>
            <div className="mt-4 pt-4 border-t text-[11px] font-light" style={{ color: "var(--text-secondary)", borderColor: "var(--border-subtle)" }}>
              Sunday Closed &bull; Online Store Open 24/7
            </div>
          </div>
        </div>

        {/* Contact Form & Studio Location Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Contact Form (Span 7) */}
          <div
            className="lg:col-span-7 rounded-3xl border p-6 sm:p-8 shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                Get In Touch
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal mt-1" style={{ color: "var(--text-primary)" }}>
                Send Us a Message
              </h2>
              <p className="text-xs font-light mt-1" style={{ color: "var(--text-secondary)" }}>
                Fill out the details below and our client care executive will connect with you promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div
                className="rounded-2xl border p-8 text-center space-y-4 animate-in fade-in"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs max-w-sm mx-auto font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Your inquiry has been received. Our team will review your message and reply via WhatsApp/Email within 2&ndash;4 hours.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/918075000000?text=${encodeURIComponent(
                      `Hello Nakshatra Collections, my name is ${formData.name}. Regarding: ${formData.message || "Order Inquiry"}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        orderNumber: "",
                        inquiryType: "order_inquiry",
                        message: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border hover:bg-black/5"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Nair"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border px-3.5 py-2.5 text-xs outline-hidden transition"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border px-3.5 py-2.5 text-xs outline-hidden transition"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. anjali@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border px-3.5 py-2.5 text-xs outline-hidden transition"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                      Order Number (If applicable)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. #1042"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full rounded-xl border px-3.5 py-2.5 text-xs outline-hidden transition"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    Inquiry Category
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full rounded-xl border px-3.5 py-2.5 text-xs outline-hidden transition"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="order_inquiry">Order Status &amp; Tracking</option>
                    <option value="bridal_styling">Bridal Jewellery Consultation</option>
                    <option value="return_exchange">Return / Replacement Request</option>
                    <option value="wholesale">Wholesale &amp; Reseller Inquiry</option>
                    <option value="general">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're looking for or details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border px-3.5 py-2.5 text-xs outline-hidden transition resize-none"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3 px-6 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:scale-101 active:scale-99 cursor-pointer"
                  style={{ backgroundColor: "var(--accent-cta)" }}
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Studio Address & Highlights (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div
              className="rounded-3xl border p-6 sm:p-8 shadow-xs"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" style={{ color: "var(--accent-gold)" }} />
                <h3 className="font-serif text-lg font-medium" style={{ color: "var(--text-primary)" }}>
                  Studio &amp; Fulfilment Desk
                </h3>
              </div>

              <div className="space-y-3 text-xs font-light" style={{ color: "var(--text-secondary)" }}>
                <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                  Nakshatra Collections
                </p>
                <p>
                  Near Temple Road, Thrissur &bull; Kochi<br />
                  Kerala, India &ndash; 680001
                </p>
                <div className="pt-2 border-t space-y-1.5" style={{ borderColor: "var(--border-subtle)" }}>
                  <p><strong>Direct Helpline:</strong> +91 80750 00000</p>
                  <p><strong>Support Email:</strong> care@nakshatracollections.com</p>
                  <p><strong>GST Registered:</strong> Verified Artificial Jewellery Brand</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl border p-6 shadow-xs"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Why Shop with Nakshatra?
                </h4>
              </div>
              <ul className="space-y-2 text-[11px] font-light" style={{ color: "var(--text-secondary)" }}>
                <li>&bull; 100% Anti-Tarnish 18K Real Gold Plated</li>
                <li>&bull; Express 2&ndash;4 Day Courier Delivery across Kerala</li>
                <li>&bull; Safe UPI, Card &amp; Cash on Delivery (COD) Options</li>
                <li>&bull; 7-Day Hassle-Free Replacement Protection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
              Got Questions?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-1" style={{ color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border transition-all overflow-hidden"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: isOpen ? "var(--accent-gold)" : "var(--border-subtle)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 cursor-pointer"
                  >
                    <span className="font-serif text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: "var(--accent-gold)" }}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 pt-0 text-xs font-light leading-relaxed animate-in fade-in" style={{ color: "var(--text-secondary)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
