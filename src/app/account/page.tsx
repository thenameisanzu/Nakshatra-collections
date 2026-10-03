"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, Heart, ShieldCheck, ArrowRight, MessageCircle, ExternalLink, Sparkles } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<string | null>(null);
  const { totalWishlistItems } = useWishlist();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setTrackingStatus(
      `Checking status for Order #${orderNumber.replace("#", "")}. If recently placed, tracking details have also been sent to your WhatsApp/Email.`
    );
  };

  const shopifyLoginUrl = "https://nakshatra-collections-ttrghptp.myshopify.com/account/login";

  return (
    <div
      className="min-h-screen py-8 sm:py-14 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[var(--accent-cta)] font-semibold">Customer Account</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div
            className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full mb-3 border shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--accent-gold)",
            }}
          >
            <User className="h-6 w-6" />
          </div>
          <h1
            className="font-serif text-3xl sm:text-4xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Customer Account &amp; Orders
          </h1>
          <p
            className="mt-2 text-xs sm:text-sm max-w-md mx-auto font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Access your Shopify account, track express courier delivery in Kerala, and manage your saved wishlist.
          </p>
        </div>

        {/* Account Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* 1. Shopify Customer Portal Login */}
          <div
            className="rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-xs card-lift"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider liquid-glass border"
                  style={{
                    color: "var(--accent-cta)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  Shopify Member
                </span>
                <ExternalLink className="h-4 w-4 opacity-40" />
              </div>

              <h2
                className="font-serif text-xl sm:text-2xl font-normal"
                style={{ color: "var(--text-primary)" }}
              >
                Sign In to Nakshatra
              </h2>
              <p
                className="mt-2 text-xs sm:text-sm font-light leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Sign in with your email to view your past order history, saved addresses, and express checkout details powered by Shopify.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <a
                href={shopifyLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full py-3 px-4 text-xs font-semibold uppercase tracking-widest shadow-md transition-all hover:scale-102 active:scale-98 text-white"
                style={{
                  backgroundColor: "var(--accent-cta)",
                }}
              >
                <span>Login / Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 2. Instant Order Tracking */}
          <div
            className="rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-xs"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5" style={{ color: "var(--accent-gold)" }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Track Express Order
                </span>
              </div>

              <h2
                className="font-serif text-xl sm:text-2xl font-normal"
                style={{ color: "var(--text-primary)" }}
              >
                Check Delivery Status
              </h2>

              <form onSubmit={handleTrackOrder} className="mt-4 flex flex-col gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    Order Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #1042"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden focus:border-[var(--accent-gold)] transition-colors"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    Phone or Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone or email used at checkout"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden focus:border-[var(--accent-gold)] transition-colors"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full flex items-center justify-center gap-2 rounded-full py-3 px-4 text-xs font-semibold uppercase tracking-widest border transition-all hover:bg-black/5 active:scale-98 cursor-pointer"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border-medium)",
                  }}
                >
                  <span>Track Package</span>
                  <Package className="h-4 w-4" />
                </button>
              </form>

              {trackingStatus && (
                <div
                  className="mt-3 p-3 rounded-xl text-xs leading-relaxed border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {trackingStatus}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links & Concierge */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/wishlist"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md group"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Heart className="h-5 w-5 fill-rose-600 stroke-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Saved Wishlist
                </h3>
                <p className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
                  {totalWishlistItems} jewellery pieces saved
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" style={{ color: "var(--text-muted)" }} />
          </Link>

          <a
            href="https://wa.me/919446000000?text=Hi%20Nakshatra%20Collections!%20I%20have%20a%20question%20regarding%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md group"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  WhatsApp Concierge
                </h3>
                <p className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
                  Direct support for Kerala orders
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" style={{ color: "var(--text-muted)" }} />
          </a>
        </div>
      </div>
    </div>
  );
}
