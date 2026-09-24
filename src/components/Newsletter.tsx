"use client";

import { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-14 text-center border shadow-xl relative overflow-hidden"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-medium)",
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              backgroundColor: "var(--tag-bg)",
              color: "var(--tag-text)",
            }}
          >
            <Sparkles className="h-3 w-3" />
            VIP Access
          </div>

          <h2
            className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Stay in the Nakshatra
          </h2>

          <p
            className="mt-4 text-sm sm:text-base leading-relaxed max-w-lg mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Be the first to discover new arrivals, special collections and exclusive offers.
          </p>

          {isSubmitted ? (
            <div
              className="mt-8 inline-flex items-center gap-2 rounded-2xl p-4 text-sm font-semibold"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--accent-cta)",
              }}
            >
              <Check className="h-5 w-5" />
              <span>Thank you for joining. Check your inbox for your welcome privilege.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <div className="relative w-full">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-full py-3.5 pl-11 pr-4 text-xs tracking-wider border focus:outline-none transition"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-medium)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-widest shadow-md transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "var(--accent-cta)",
                  color: "var(--accent-cta-text)",
                }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-[10px]" style={{ color: "var(--text-muted)" }}>
            We respect your privacy. You may unsubscribe from our salon letters at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
