export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-zinc-50/50 py-8 md:py-12 dark:bg-zinc-950 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Back link skeleton */}
        <div className="mb-6">
          <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Gallery skeleton */}
          <div className="lg:col-span-7">
            <div className="aspect-square w-full rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-4 flex gap-3">
              <div className="h-20 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-20 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-20 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Details skeleton */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="h-6 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 w-1/3 rounded-lg bg-zinc-200 dark:bg-zinc-800" />

            <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <div className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
              <div className="flex gap-2">
                <div className="h-10 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-10 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-10 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <div className="flex gap-4">
                <div className="h-12 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-12 flex-1 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
