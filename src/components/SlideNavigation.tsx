import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SlideNavigationProps {
  slides: { id: string; name: string }[];
  currentSlide: number;
  onSlideChange: (slideIndex: number) => void;
}

export default function SlideNavigation({ slides, currentSlide, onSlideChange }: SlideNavigationProps) {
  return (
    <>
      {/* Dot Navigation - Right Side */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => onSlideChange(index)}
            className="group relative"
            aria-label={`Go to ${slide.name} section`}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-red-600 scale-125 shadow-lg shadow-red-600/50' 
                  : 'bg-white/30 hover:bg-red-600/60 hover:scale-110'
              }`}
            />
            
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
                {slide.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Arrow Navigation - Left Side */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        <button
          onClick={() => onSlideChange(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            currentSlide === 0
              ? 'bg-black/20 border-white/10 text-white/30 cursor-not-allowed'
              : 'bg-black/40 border-white/20 text-white hover:bg-red-600/20 hover:border-red-600/40 hover:text-red-400'
          }`}
          aria-label="Previous slide"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => onSlideChange(Math.min(slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === slides.length - 1}
          className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            currentSlide === slides.length - 1
              ? 'bg-black/20 border-white/10 text-white/30 cursor-not-allowed'
              : 'bg-black/40 border-white/20 text-white hover:bg-red-600/20 hover:border-red-600/40 hover:text-red-400'
          }`}
          aria-label="Next slide"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Counter - Bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
          <span className="text-white text-sm font-light">
            <span className="text-red-400 font-medium">{currentSlide + 1}</span>
            <span className="text-white/60 mx-2">/</span>
            <span className="text-white/80">{slides.length}</span>
          </span>
        </div>
      </div>
    </>
  );
}