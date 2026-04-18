import React from "react";

const ProductLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      
      {/* Top text */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
          Preparing awesome products for you...
        </h2>
      </div>

      {/* Product skeleton grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm animate-pulse"
          >
            {/* Image */}
            <div className="w-full h-32 bg-gray-200 dark:bg-slate-700 rounded-lg mb-3"></div>

            {/* Title */}
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>

            {/* Price */}
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-3"></div>

            {/* Button */}
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* Bottom mini loader */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;