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
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FAF2F2] text-[#6C080C] border border-[#E8D2D4] shadow-xs">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl font-serif-luxury">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm text-stone-600">
        We encountered a momentary issue while loading this piece from Shopify.
      </p>

      {error?.message && (
        <div className="mt-4 max-w-md rounded-xl bg-[#FAF2F2] p-3 text-left text-xs font-mono text-[#6C080C] border border-[#E8D2D4] overflow-x-auto">
          <p className="font-semibold">Diagnostic:</p>
          <p className="mt-1">{error.message}</p>
          {error.digest && <p className="mt-1 text-[#861014]/60 text-[10px]">Digest: {error.digest}</p>}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#6C080C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#861014] active:scale-[0.98] cursor-pointer transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Refresh Page</span>
        </button>
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    </div>
  );
}
