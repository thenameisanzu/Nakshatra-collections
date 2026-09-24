export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-zinc-50/50 py-10 dark:bg-zinc-950 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Collection Header Skeleton */}
        <div className="mb-10 rounded-3xl border border-zinc-200/80 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="h-6 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 h-10 w-64 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-3 h-5 w-96 max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-square w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-4 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-2 h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-4 h-6 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
