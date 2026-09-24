import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const quickCategories = [
  { name: "Necklaces", href: "/collections/necklaces", icon: "📿", label: "Chokers & Chains" },
  { name: "Earrings", href: "/collections/earrings", icon: "💎", label: "Studs & Drops" },
  { name: "Rings", href: "/collections/rings", icon: "💍", label: "Solitaires & Bands" },
  { name: "Bracelets", href: "/collections/bracelets", icon: "🌟", label: "Waterproof Cuffs" },
  { name: "Jewellery Sets", href: "/collections/jewellery-sets", icon: "👑", label: "Bridal & Festive" },
  { name: "New Arrivals", href: "/collections/new-arrivals", icon: "🔥", label: "Latest Designs" },
];

export default function CategoryQuickStrip() {
  return (
    <section
      className="py-6 border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Category Quick Links"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
              Explore Jewellery By Category
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
            style={{ color: "var(--accent-cta)" }}
          >
            <span>All Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Horizontal Category Strip (Flipkart & Amazon Style) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5">
          {quickCategories.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border liquid-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 text-center"
              style={{
                borderColor: "var(--border-subtle)",
              }}
            >
              <span className="text-2xl sm:text-3xl mb-1.5 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="text-xs font-bold font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                {item.name}
              </span>
              <span className="text-[10px] hidden sm:block mt-0.5" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
