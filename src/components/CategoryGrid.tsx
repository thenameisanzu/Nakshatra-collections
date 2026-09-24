import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface Category {
  title: string;
  subtitle: string;
  handle: string;
  tag: string;
}

const categories: Category[] = [
  {
    title: "Necklaces",
    subtitle: "Chokers, delicate chains & statement pieces",
    handle: "necklaces",
    tag: "Signature",
  },
  {
    title: "Earrings",
    subtitle: "Studs, elegant hoops & luminous drops",
    handle: "earrings",
    tag: "Essential",
  },
  {
    title: "Rings",
    subtitle: "Solitaires, statement rings & stackables",
    handle: "rings",
    tag: "Iconic",
  },
  {
    title: "Bracelets",
    subtitle: "Refined chains, tennis bracelets & cuffs",
    handle: "bracelets",
    tag: "Bespoke",
  },
  {
    title: "Jewellery Sets",
    subtitle: "Harmonious sets for celebrations and special occasions",
    handle: "jewellery-sets",
    tag: "Curated",
  },
];

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-16 md:py-24 border-t transition-colors" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--tag-bg)",
              color: "var(--tag-text)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Collections
          </span>
          <h2
            className="font-serif-luxury mt-3 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Shop by Category
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Explore our curated selections designed to complement your individual elegance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className={`group relative overflow-hidden rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                index === 4 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--tag-bg)",
                      color: "var(--tag-text)",
                    }}
                  >
                    {cat.tag}
                  </span>
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--accent-cta)",
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <h3
                    className="font-serif-luxury text-2xl font-normal tracking-tight transition-colors group-hover:opacity-90"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="mt-2 text-xs sm:text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
