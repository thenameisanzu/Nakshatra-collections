import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/Cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAKSHATRA COLLECTIONS | Artificial Jewellery Store",
  description:
    "Discover Nakshatra Collections - anti-tarnish artificial jewellery, 18K gold plated daily wear, wedding jewellery sets, and solitaire rings with fast delivery in Kerala & India.",
};

const themeInitializerScript = `
  (function() {
    try {
      var saved = localStorage.getItem('nakshatra_jewellery_theme') || localStorage.getItem('aurelia_jewellery_theme');
      if (saved && (saved === 'champagne-luxury' || saved === 'soft-blush' || saved === 'sage-contemporary')) {
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'champagne-luxury');
      }
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'champagne-luxury');
    }
  })();
`;

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
      className={`${cormorant.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#C9A45C]/30 selection:text-[#261C14]">
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
