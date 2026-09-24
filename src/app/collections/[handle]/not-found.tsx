import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

export default function CollectionNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
        <Layers className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
        Collection Not Found
      </h1>
      <p className="mt-3 max-w-md text-base text-zinc-600 dark:text-zinc-400">
        The collection you are looking for may have been unpublished, renamed, or does not exist in your Shopify store.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Products</span>
        </Link>
      </div>
    </div>
  );
}
