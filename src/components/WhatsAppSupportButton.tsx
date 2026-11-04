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
    <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-40 flex items-center group">
      {/* Tooltip on Desktop */}
      <span className="hidden md:inline-block mr-2.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-md bg-white border border-gray-200 text-gray-800 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
        WhatsApp Order Support
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 text-white bg-[#25D366]"
        aria-label="Chat with Nakshatra Collections on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
      </a>
    </div>
  );
}
