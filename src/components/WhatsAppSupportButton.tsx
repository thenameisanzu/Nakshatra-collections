"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppSupportButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppSupportButton({
  phoneNumber = "919446000000",
  defaultMessage = "Hi Nakshatra Collections! I would like to know more about your 18K gold plated anti-tarnish jewellery.",
}: WhatsAppSupportButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip on Desktop */}
      <span
        className="hidden md:inline-block mr-2.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg liquid-glass border transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap"
        style={{
          color: "var(--text-primary)",
          borderColor: "var(--border-medium)",
        }}
      >
        💬 WhatsApp Support &bull; Kerala
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white"
        style={{
          backgroundColor: "#25D366",
        }}
        aria-label="Chat with Nakshatra Collections on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-white" />
      </a>
    </div>
  );
}
