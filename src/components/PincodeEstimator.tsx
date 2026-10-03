"use client";

import { useState } from "react";
import { Truck, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";

export default function PincodeEstimator() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [message, setMessage] = useState<{
    zone: string;
    days: string;
    date: string;
    cod: boolean;
  } | null>(null);

  const calculateDeliveryDate = (daysToAdd: number) => {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    return today.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();

    if (!/^\d{6}$/.test(cleanPin)) {
      setStatus("invalid");
      return;
    }

    setStatus("checking");

    setTimeout(() => {
      // Kerala pincodes start with 67, 68, 69
      const isKerala =
        cleanPin.startsWith("67") ||
        cleanPin.startsWith("68") ||
        cleanPin.startsWith("69");

      // South India: 56-59 (Karnataka/TN/AP/Telangana)
      const isSouthIndia =
        cleanPin.startsWith("56") ||
        cleanPin.startsWith("57") ||
        cleanPin.startsWith("58") ||
        cleanPin.startsWith("59") ||
        cleanPin.startsWith("60") ||
        cleanPin.startsWith("61") ||
        cleanPin.startsWith("62") ||
        cleanPin.startsWith("63") ||
        cleanPin.startsWith("64");

      if (isKerala) {
        setMessage({
          zone: "Kerala Express Priority",
          days: "2 – 3 Business Days",
          date: calculateDeliveryDate(2),
          cod: true,
        });
      } else if (isSouthIndia) {
        setMessage({
          zone: "South India Express",
          days: "3 – 4 Business Days",
          date: calculateDeliveryDate(3),
          cod: true,
        });
      } else {
        setMessage({
          zone: "National Air Express",
          days: "4 – 5 Business Days",
          date: calculateDeliveryDate(4),
          cod: true,
        });
      }

      setStatus("valid");
    }, 350);
  };

  return (
    <div
      className="rounded-2xl border p-4 transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
            Delivery &amp; Pincode Check
          </span>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--accent-cta)" }}
        >
          Free Insured Delivery
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2 mt-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Enter 6-digit Pincode (e.g. 682001)"
          className="flex-1 rounded-xl px-3.5 py-2 text-xs font-semibold border focus:outline-none transition-all placeholder:text-neutral-400"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: status === "invalid" ? "#EF4444" : "var(--border-medium)",
            color: "var(--text-primary)",
          }}
        />
        <button
          type="submit"
          className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xs transition hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          style={{
            backgroundColor: "var(--accent-cta)",
            color: "var(--accent-cta-text)",
          }}
        >
          {status === "checking" ? "Checking..." : "Check"}
        </button>
      </form>

      {status === "invalid" && (
        <p className="mt-2 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Please enter a valid 6-digit Indian postal pincode.</span>
        </p>
      )}

      {status === "valid" && message && (
        <div className="mt-3 p-3 rounded-xl border bg-white/60 dark:bg-black/20 flex flex-col gap-1.5 animate-in fade-in" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{message.zone}</span>
            </span>
            <span style={{ color: "var(--accent-cta)" }}>By {message.date}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
            <span>Estimated time: {message.days}</span>
            <span className="font-semibold text-emerald-700">Cash on Delivery Available</span>
          </div>
        </div>
      )}

      {/* Trust Highlights */}
      <div className="mt-3 pt-2.5 border-t flex items-center justify-between text-[10px] font-semibold" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
          100% Anti-Tarnish
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
          Zero Transit Damage Guarantee
        </span>
      </div>
    </div>
  );
}
