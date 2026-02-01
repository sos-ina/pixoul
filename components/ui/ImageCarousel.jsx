"use client";

import { useState } from "react";

export default function ImageCarousel({ items }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const activeItem = items[current];

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">

      {/* Image */}
      <img
        src={activeItem.image}
        alt={activeItem.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end px-6 pb-10">
        <div className="max-w-7xl mx-auto w-full">

          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            {activeItem.title}
          </h3>

          {activeItem.subtitle && (
            <p className="text-gray-300 max-w-xl">
              {activeItem.subtitle}
            </p>
          )}

        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-3 rounded-full hover:bg-black/80 transition"
      >
        ←
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-3 rounded-full hover:bg-black/80 transition"
      >
        →
      </button>

    </section>
  );
}
