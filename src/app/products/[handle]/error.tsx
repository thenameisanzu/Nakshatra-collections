"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        We encountered an error while loading this product from Shopify.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    </div>
  );
}
