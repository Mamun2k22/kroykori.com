import React, { useState, useEffect, memo } from "react";

// Interactive micro-animations
const AnimatedProductCard = memo(({ delay }) => (
  <div 
    className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg transform transition-all duration-500 hover:scale-105"
    style={{ 
      animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
      willChange: 'transform'
    }}
  >
    <div className="relative w-full pb-[100%] mb-3 overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer bg-[length:200%_100%]"></div>
    </div>
    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2 animate-pulse"></div>
    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-3 animate-pulse"></div>
    <div className="h-9 bg-gradient-to-r from-yellow-400 to-red-500 rounded-xl animate-pulse"></div>
  </div>
));

// Fun facts that change every 3 seconds
const funFacts = [
  "🔥 Today's Deal: Up to 70% OFF!",
  "🎁 Free Shipping on orders $50+",
  "⚡ Limited Time Offer Ending Soon",
  "✨ New Arrivals Just Landed",
  "💎 Exclusive Member Discounts",
  "🎯 2 Million+ Happy Customers",
  "🚚 Same Day Delivery Available",
  "💳 Easy EMI Options Available"
];

// Interactive mini-game loader
const ClickToReveal = ({ onComplete }) => {
  const [clicks, setClicks] = useState(0);
  const [message, setMessage] = useState("Tap to reveal surprise 🎁");
  
  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    if (newClicks === 3) {
      setMessage("✨ SURPRISE! 20% OFF CODE: WELCOME20 ✨");
      setTimeout(() => onComplete(), 2000);
    } else if (newClicks === 2) {
      setMessage("Almost there! One more tap! 🎉");
    } else {
      setMessage("Keep tapping! Mystery gift inside! 🎁");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center transform animate-bounce-in">
        <div className="text-6xl mb-4 animate-float">🎁</div>
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
          {message}
        </h3>
        <button
          onClick={handleClick}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-600 text-white rounded-xl font-semibold transform transition hover:scale-105 active:scale-95"
        >
          Tap Me! ({3 - clicks} taps left)
        </button>
        <p className="text-sm text-gray-500 mt-4">Skip the wait & get rewarded! ⚡</p>
      </div>
    </div>
  );
};

// Treasure hunt loader
const TreasureHunt = ({ onFound }) => {
  const [found, setFound] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!found) {
        setFound(true);
        onFound();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [found, onFound]);
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative group cursor-pointer" onClick={() => {
        setFound(true);
        onFound();
      }}>
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-gradient-to-r from-yellow-500 to-red-500 rounded-full p-3 shadow-lg transform transition hover:scale-110">
          <span className="text-2xl">💎</span>
        </div>
        <div className="absolute bottom-full right-0 mb-2 bg-black/80 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
          Hidden coupon inside! Click me!
        </div>
      </div>
    </div>
  );
};

// Main loader with gamification
const ProductLoader = () => {
  const [showGame, setShowGame] = useState(false);
  const [funFact, setFunFact] = useState(funFacts[0]);
  const [progress, setProgress] = useState(0);
  const [treasureFound, setTreasureFound] = useState(false);
  
  // Rotate fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setFunFact(prev => {
        const currentIndex = funFacts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % funFacts.length;
        return funFacts[nextIndex];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, []);
  
  // Auto-show game if loading takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 80) {
        setShowGame(true);
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  if (treasureFound) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="text-center text-white animate-bounce-in">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-2">You Found Treasure!</h2>
          <p className="text-xl mb-4">Get FLAT 30% OFF on your first order!</p>
          <p className="text-2xl font-mono bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            CODE: TREASURE30
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      
      {/* Floating progress bar with percentage */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-gray-200 dark:bg-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 transition-all duration-300 relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full px-2 py-0.5 text-xs font-bold shadow-lg">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
      </div>
      
      {/* Fun fact banner */}
      <div className="pt-8 px-4 text-center">
        <div className="inline-block bg-gradient-to-r from-yellow-100 to-red-100 dark:from-yellow-900/30 dark:to-red-900/30 rounded-full px-6 py-2 mb-4 animate-slide-down">
          <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
            💡 {funFact}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Finding Best Deals For You...
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Hold tight! Great products are loading 🚀</p>
      </div>
      
      {/* Skeleton grid with staggered animations */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
        {[...Array(8)].map((_, i) => (
          <AnimatedProductCard key={i} delay={i * 50} />
        ))}
      </div>
      
      {/* Engagement badges */}
      <div className="fixed bottom-4 left-4 flex gap-2">
        <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1.5 shadow-lg text-xs font-semibold animate-pulse">
          🔥 1,234 people viewing
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1.5 shadow-lg text-xs font-semibold">
          ⚡ Selling fast!
        </div>
      </div>
      
      {/* Surprise elements */}
      {!showGame && progress < 70 && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float-slow">
            <span className="text-4xl opacity-20">🎈</span>
          </div>
          <div className="absolute bottom-1/3 right-1/4 animate-float">
            <span className="text-3xl opacity-20">🎨</span>
          </div>
        </div>
      )}
      
      {/* Interactive game loader */}
      {showGame && progress < 90 && (
        <ClickToReveal onComplete={() => {
          setProgress(100);
          setTimeout(() => {
            // Simulate loading complete
            window.location.reload();
          }, 1000);
        }} />
      )}
      
      {/* Treasure hunt */}
      {progress > 30 && progress < 85 && !treasureFound && (
        <TreasureHunt onFound={() => setTreasureFound(true)} />
      )}
      
      {/* Loading completion animation */}
      {progress >= 100 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center transform animate-bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Ready for you!</h2>
            <p className="text-gray-600 mb-4">Redirecting to amazing products...</p>
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }
  
  .animate-bounce-in {
    animation: bounce-in 0.5s ease-out;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float 5s ease-in-out infinite;
  }
  
  .animate-slide-down {
    animation: slide-down 0.5s ease-out;
  }
  
  .animate-gradient {
    background-size: 200% auto;
    animation: shimmer 2s linear infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-float, .animate-bounce, .animate-pulse {
      animation: none;
    }
  }
`;

document.head.appendChild(style);

export default memo(ProductLoader);