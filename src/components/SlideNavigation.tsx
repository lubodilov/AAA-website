import React from 'react';

interface SlideNavigationProps {
  slides: { id: string; name: string }[];
  currentSlide: number;
  onSlideChange: (slideIndex: number) => void;
}

export default function SlideNavigation({ slides, currentSlide, onSlideChange }: SlideNavigationProps) {
  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          onClick={() => onSlideChange(index)}
          className="group relative"
          aria-label={`Go to ${slide.name} slide`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-red-600 scale-125'
                : 'bg-white/30 hover:bg-white/50 hover:scale-110'
            }`}
          />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {slide.name}
          </span>
        </button>
      ))}
    </div>
  );
}
