import React, { memo } from "react";

const ProductCardSkeleton = memo(() => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="w-full aspect-square bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse mb-3" />

      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-4/5 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-3/5 mb-3" />

      <div className="flex items-center justify-between mb-3">
        <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded animate-pulse w-16" />
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-10" />
      </div>

      <div className="h-9 bg-gray-300 dark:bg-slate-600 rounded-lg animate-pulse" />
    </div>
  );
});

const ProductLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Top trust bar */}
        <div className="mb-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-300">
            <span>🚚 Fast Delivery</span>
            <span>🔒 Secure Checkout</span>
            <span>↩️ Easy Returns</span>
            <span>⭐ Trusted by Customers</span>
          </div>
        </div>

        {/* Header skeleton */}
        <div className="mb-5">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-48 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-72 max-w-full" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>

        {/* Bottom reassurance */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Loading the best products for you...
        </p>
      </div>
    </div>
  );
};

export default memo(ProductLoader);