"use client";

import Image from "next/image";
import { Star, Sparkles, CheckCircle2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  product: string;
  comment: string;
  date: string;
  verified: boolean;
  photo?: string;
}

const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Anjali Menon",
    location: "Kochi, Kerala",
    rating: 5,
    product: "Royal Kundan Choker Set",
    comment:
      "Wore this for my cousin's wedding in Thrissur and received endless compliments! Everyone thought it was 22K pure gold. No skin irritation even after 10 hours.",
    date: "Verified Purchase • 3 days ago",
    verified: true,
    photo: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/26096492af4818da9104753e8af444d6df2653a7d76abd88c3a84a2c07e99686.png?v=1790240242",
  },
  {
    id: "rev-2",
    name: "Devika Pillai",
    location: "Trivandrum, Kerala",
    rating: 5,
    product: "Rose Gold Layered Necklace",
    comment:
      "Waterproof promise is 100% genuine! I wear this daily to my office in Infopark. The 18K micro-polish shine hasn't faded one bit. Express 2-day delivery was super fast.",
    date: "Verified Purchase • 1 week ago",
    verified: true,
    photo: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/04a0f6367f40b11fdd9a8f07233351b49f94e9eda12869616f0db06f34e1a11f_270d1797-e20a-4840-ba59-ba23533fcb94.png?v=1790240167",
  },
  {
    id: "rev-3",
    name: "Meera Nambiar",
    location: "Calicut, Kerala",
    rating: 5,
    product: "Luminous Pearl Drop Jhumkas",
    comment:
      "The finishing is royal and lightweight. Even with sensitive ears, I didn't feel any heaviness or pulling. Beautiful luxury packaging too!",
    date: "Verified Purchase • 2 weeks ago",
    verified: true,
    photo: "https://cdn.shopify.com/s/files/1/0830/8224/8405/files/cfcff7f80632b30fda8cc118d5faf3ba65f6ee80182e57bea5943f7b85484728.png?v=1790240218",
  },
];

export default function CustomerReviews() {
  return (
    <section
      id="reviews"
      className="py-16 sm:py-20 md:py-28 border-t transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Customer Reviews & Testimonials"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-gold)" }} />
              Verified Stories
            </span>
            <h2
              className="font-serif-luxury mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Loved By Women Across Kerala
            </h2>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed font-medium max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Real experiences from clients who wear Nakshatra artificial jewellery daily and for wedding celebrations.
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 border liquid-glass text-xs font-bold shrink-0"
            style={{ borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
          >
            <div className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span>4.9 / 5 Average Rating (1,200+ Reviews)</span>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl border p-6 sm:p-7 flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-medium)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                {/* Comment */}
                <p
                  className="text-sm leading-relaxed font-normal italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Tagged Product */}
                <div
                  className="mt-4 pt-3 border-t flex items-center gap-2 text-xs font-bold font-serif-luxury"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--accent-cta)" }}
                >
                  <Sparkles className="h-3 w-3 shrink-0" style={{ color: "var(--accent-gold)" }} />
                  <span className="truncate">{rev.product}</span>
                </div>
              </div>

              {/* Author & Photo Footer */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold font-serif-luxury shrink-0 shadow-xs"
                    style={{
                      borderColor: "var(--accent-gold)",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--accent-cta)",
                    }}
                  >
                    {rev.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-serif-luxury" style={{ color: "var(--text-primary)" }}>
                      {rev.name}
                    </h4>
                    <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                      {rev.location}
                    </p>
                  </div>
                </div>

                {rev.photo && (
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden border shadow-2xs" style={{ borderColor: "var(--border-subtle)" }}>
                    <Image src={rev.photo} alt={rev.product} fill sizes="40px" className="object-contain p-0.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
