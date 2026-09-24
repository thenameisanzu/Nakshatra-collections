import { Layers, ShieldCheck, Palette, Zap, Code2, Rocket } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

const features: Feature[] = [
  {
    title: "Next.js 15 App Router",
    description: "Leverage React Server Components, streaming SSR, and optimized nested layouts by default.",
    icon: Layers,
    badge: "Modern",
  },
  {
    title: "Strict TypeScript Setup",
    description: "End-to-end type safety across components, props, API handlers, and route definitions.",
    icon: ShieldCheck,
  },
  {
    title: "Tailwind CSS Styling",
    description: "Utility-first design with custom color scales, responsive utilities, and dark mode support.",
    icon: Palette,
  },
  {
    title: "Lightning Fast Performance",
    description: "Optimized asset delivery, automatic font optimization, and minimal client-side JavaScript.",
    icon: Zap,
    badge: "Speed",
  },
  {
    title: "Organized Architecture",
    description: "Clean folder structure separating components, utilities, types, and application routes.",
    icon: Code2,
  },
  {
    title: "Production Ready",
    description: "Configured with ESLint, metadata management for SEO, and streamlined build pipelines.",
    icon: Rocket,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Everything You Need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Built for Developer Experience
          </p>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            A solid baseline equipped with all essential foundations to accelerate your development workflow.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-500/40"
              >
                {feature.badge && (
                  <span className="absolute top-6 right-6 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {feature.badge}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
