import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import { SearchProvider } from "@/context/SearchContext";
import CartDrawer from "@/components/Cart/CartDrawer";
import WhatsAppSupportButton from "@/components/WhatsAppSupportButton";
import QuickViewModal from "@/components/QuickViewModal";
import InstantSearchModal from "@/components/InstantSearchModal";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://nakshatra-collections.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NAKSHATRA COLLECTIONS | 18K Real Gold Plated Anti-Tarnish Jewellery",
    template: "%s | NAKSHATRA COLLECTIONS",
  },
  description:
    "Discover Nakshatra Collections - 100% waterproof, sweatproof, 18K real gold plated anti-tarnish jewellery. Handcrafted necklaces, earrings, bangles, and rings for everyday luxury.",
  applicationName: "Nakshatra Collections",
  keywords: [
    "Nakshatra Collections",
    "Anti-tarnish jewellery",
    "18K gold plated jewellery",
    "Artificial jewellery Kerala",
    "Waterproof jewellery",
    "Kanjirappally jewellery",
    "Online Jewellery Destination",
  ],
  authors: [{ name: "Nakshatra Collections" }],
  creator: "Nakshatra Collections",
  publisher: "Nakshatra Collections",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Nakshatra Collections",
    title: "NAKSHATRA COLLECTIONS | Your Online Jewellery Destination",
    description:
      "100% waterproof, sweatproof, 18K real gold plated anti-tarnish jewellery. Pan-India delivery with signature luxury packaging.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 576,
        alt: "Nakshatra Collections - Your Online Jewellery Destination",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAKSHATRA COLLECTIONS | Your Online Jewellery Destination",
    description:
      "100% waterproof, sweatproof, 18K real gold plated anti-tarnish jewellery. Pan-India delivery with signature luxury packaging.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="minimal-clean"
      suppressHydrationWarning
      className={`${outfit.variable} font-sans h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#6C080C]/20 selection:text-[#6C080C]">
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <SearchProvider>
                  <ScrollRevealProvider>
                    <Navbar />
                    <div className="flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">{children}</div>
                    <Footer />
                    <MobileBottomNav />
                    <CartDrawer />
                    <WhatsAppSupportButton />
                    <QuickViewModal />
                    <InstantSearchModal />
                  </ScrollRevealProvider>
                </SearchProvider>
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
