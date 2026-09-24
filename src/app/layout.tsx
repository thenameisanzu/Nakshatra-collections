import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/Cart/CartDrawer";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAKSHATRA | Fancy Jewellery, Cosmetics, Gifts & Toys",
  description:
    "Discover Nakshatra - exquisite fancy jewellery, curated gifts, cosmetics, and timeless heirlooms crafted with elegance.",
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
      className={`${playfair.variable} ${jakarta.variable} h-full scroll-smooth antialiased`}
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
