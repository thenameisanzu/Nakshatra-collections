"use client";

import { WhatsAppIcon } from "@/components/icons/SocialIcons";

interface WhatsAppSupportButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppSupportButton({
  phoneNumber = "919447003584",
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
        className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 text-white bg-[#25D366] hover:bg-[#20bd5a]"
        aria-label="Chat with Nakshatra Collections on WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6 text-white" />
      </a>
    </div>
  );
}
