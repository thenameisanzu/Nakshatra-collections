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

export const metadata: Metadata = {
  title: "NAKSHATRA COLLECTIONS | Artificial Jewellery Store",
  description:
    "Discover Nakshatra Collections - anti-tarnish artificial jewellery, 18K gold plated daily wear, wedding jewellery sets, and solitaire rings with fast delivery in Kerala & India.",
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
