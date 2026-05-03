import React, { useEffect, useRef } from "react";

const AutoScrollingProducts = () => {
  const scrollRef = useRef(null);

  const productImages = [
    "https://i.ibb.co/Q7f97rHP/Spiderman-Electric-Remote-control-2.png",
    "https://i.ibb.co/4wFSGWGh/Spiderman-Electric-Remote-control-5.png",
    "https://i.ibb.co/PdPzSpX/Spiderman-Electric-Remote-control-7.png",
    "https://i.ibb.co/VW3c7qXx/Spiderman-Electric-Remote-control-6.png",
  ];

  const duplicatedImages = [...productImages, ...productImages, ...productImages];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 1.2;

    const scroll = () => {
      scrollPosition += speed;

      const firstImage = scrollContainer.children[0];
      if (firstImage) {
        const imageWidth = firstImage.clientWidth;
        const gap = 20;
        const singleSetWidth = (imageWidth + gap) * productImages.length;

        if (scrollPosition >= singleSetWidth) scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const pauseScroll = () => cancelAnimationFrame(animationId);
    const resumeScroll = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", pauseScroll);
    scrollContainer.addEventListener("mouseleave", resumeScroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", pauseScroll);
      scrollContainer.removeEventListener("mouseleave", resumeScroll);
    };
  }, [productImages.length]);

  return (
   <section className="relative w-full py-8 md:py-14 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
  
  {/* background glow */}
  <div className="absolute -top-20 left-0 w-[400px] h-[400px] bg-orange-200/30 blur-3xl rounded-full" />
  <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-indigo-200/30 blur-3xl rounded-full" />

  <div className="relative max-w-full mx-auto px-0">

    {/* header */}
  <div className="text-center mb-2 md:mb-10">
  <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
    Trending Now
  </h2>

  <p className="mt-2 text-slate-500 text-sm">
    Discover what people are loving right now
  </p>
</div>

    {/* scroll */}
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={index}
            className="group relative flex-none w-[30vw] h-[30vw] min-w-[95px] min-h-[95px] max-w-[250px] max-h-[250px] rounded-xl md:rounded-2xl overflow-hidden bg-white/70 backdrop-blur border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
          >
            {/* subtle overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <img
              src={img}
              alt=""
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
  );
};

export default AutoScrollingProducts;