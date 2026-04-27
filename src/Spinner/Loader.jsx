import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ ক্রিয়েটিভ অ্যানিমেটেড আইকন রোটেটর
const AnimatedIconSet = () => {
  const icons = [
    { icon: "🛍️", bg: "from-pink-500 to-rose-500" },
    { icon: "🚀", bg: "from-blue-500 to-cyan-500" },
    { icon: "💎", bg: "from-emerald-500 to-teal-500" },
    { icon: "🎁", bg: "from-orange-500 to-red-500" },
    { icon: "⭐", bg: "from-yellow-500 to-amber-500" },
    { icon: "🔥", bg: "from-red-500 to-orange-500" },
    { icon: "💝", bg: "from-pink-500 to-purple-500" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br ${icons[currentIndex].bg} shadow-2xl`}
        >
          <span className="text-6xl animate-bounce">{icons[currentIndex].icon}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ✅ ক্রিয়েটিভ কার্ড স্কেলেটন
const ProductCardSkeleton = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700"
    >
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 p-4">
        <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 rounded-xl animate-shimmer" />
        
        <div className="absolute top-3 left-3">
          <div className="w-10 h-5 bg-gradient-to-r from-pink-500/30 to-orange-500/30 backdrop-blur-sm rounded-full animate-pulse" />
        </div>
        
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full animate-pulse" />
      </div>

      <div className="p-4">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse w-1/2 mb-3" />
        
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 bg-gray-300 dark:bg-slate-600 rounded-lg animate-pulse w-20" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse w-12" />
        </div>
        
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 rounded-xl animate-pulse" />
      </div>
    </motion.div>
  );
});

// ✅ ডটস অ্যানিমেশন
const DancingDots = () => {
  return (
    <div className="flex gap-2 justify-center items-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className={`w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500`}
        />
      ))}
    </div>
  );
};

// ✅ সার্কুলার প্রগ্রেস রিং
const CircularProgressRing = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
          className="dark:stroke-slate-700"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transition={{ duration: 0.1 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
        />
      </div>
    </div>
  );
};

// ✅ মেন লোডার কম্পোনেন্ট
const ProductLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-5">
        
        {/* ✅ Floating Shapes Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * window.innerWidth, y: -100 }}
              animate={{ y: window.innerHeight + 100 }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              className="absolute text-2xl opacity-20"
            >
              {["🛍️", "✨", "🚀", "💎", "🎁", "⭐", "🔥", "💝"][i % 8]}
            </motion.div>
          ))}
        </div>

        {/* ✅ Animated Header Shapes */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear",
                  }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-sm"
                />
              ))}
            </div>
            <DancingDots />
          </div>
        </div>

        {/* ✅ Main Animated Icon */}
        <div className="my-8">
          <AnimatedIconSet />
        </div>

        {/* ✅ Circular Progress + Dancing Dots */}
        <div className="flex flex-col items-center gap-4 my-6">
          <CircularProgressRing />
          <DancingDots />
        </div>

        {/* ✅ Animated Wave Lines */}
        <div className="flex justify-center gap-1 my-4">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 4 }}
              animate={{ height: [4, 20, 4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
              className="w-1 bg-gradient-to-t from-pink-500 to-orange-500 rounded-full"
              style={{ height: 4 }}
            />
          ))}
        </div>

        {/* ✅ Product Grid with Skeleton Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 mt-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>

        {/* ✅ Bottom Floating Animation */}
        <div className="mt-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 bg-opacity-20 p-2"
          >
            <div className="w-full h-full rounded-full border-2 border-white animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ✅ Custom CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            rgba(229, 231, 235, 0.5) 0%,
            rgba(229, 231, 235, 0.8) 50%,
            rgba(229, 231, 235, 0.5) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .dark .animate-shimmer {
          background: linear-gradient(
            90deg,
            rgba(51, 65, 85, 0.5) 0%,
            rgba(51, 65, 85, 0.8) 50%,
            rgba(51, 65, 85, 0.5) 100%
          );
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  );
};

export default memo(ProductLoader);