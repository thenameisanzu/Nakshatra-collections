import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import CartDrawer from "@/components/Cart/CartDrawer";
import WhatsAppSupportButton from "@/components/WhatsAppSupportButton";
import QuickViewModal from "@/components/QuickViewModal";
import MobileBottomNav from "@/components/MobileBottomNav";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
      data-theme="champagne-luxury"
      suppressHydrationWarning
      className={`${playfair.variable} ${jakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#C9A45C]/30 selection:text-[#261C14] pb-16 lg:pb-0">
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer />
                <CartDrawer />
                <WhatsAppSupportButton />
                <QuickViewModal />
                <MobileBottomNav />
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
