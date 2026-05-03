// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// // ✅ Circle Loader
// const CircularProgressRing = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
//     }, 50);
//     return () => clearInterval(timer);
//   }, []);

//   const radius = 40;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <div className="relative w-24 h-24">
//       <svg className="w-full h-full -rotate-90">
//         <circle
//           cx="48"
//           cy="48"
//           r={radius}
//           stroke="#e5e7eb"
//           strokeWidth="4"
//           fill="none"
//         />
//         <motion.circle
//           cx="48"
//           cy="48"
//           r={radius}
//           stroke="url(#gradient)"
//           strokeWidth="4"
//           fill="none"
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//         />
//         <defs>
//           <linearGradient id="gradient">
//             <stop offset="0%" stopColor="#ec4899" />
//             <stop offset="100%" stopColor="#f97316" />
//           </linearGradient>
//         </defs>
//       </svg>

//       {/* Center Dot */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse" />
//       </div>
//     </div>
//   );
// };

// // ✅ Dots
// const DancingDots = () => (
//   <div className="flex gap-2 justify-center">
//     {[...Array(3)].map((_, i) => (
//       <motion.div
//         key={i}
//         animate={{ y: [0, -10, 0] }}
//         transition={{
//           duration: 0.6,
//           repeat: Infinity,
//           delay: i * 0.2,
//         }}
//         className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"
//       />
//     ))}
//   </div>
// );

// // ✅ Wave Lines
// const WaveLines = () => (
//   <div className="flex justify-center gap-1">
//     {[...Array(12)].map((_, i) => (
//       <motion.div
//         key={i}
//         animate={{ height: [4, 20, 4] }}
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           delay: i * 0.08,
//         }}
//         className="w-1 bg-gradient-to-t from-pink-500 to-orange-500 rounded-full"
//       />
//     ))}
//   </div>
// );

// // ✅ FINAL CLEAN LOADER
// export default function CleanLoader() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      
//       <CircularProgressRing />

//       <div className="mt-4">
//         <DancingDots />
//       </div>

//       <div className="mt-4">
//         <WaveLines />
//       </div>

//     </div>
//   );
// }