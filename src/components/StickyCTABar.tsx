import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface StickyCTABarProps {
  currentSlide: number;
  totalSlides: number;
  onOpenSchedule?: () => void;
  isVisible?: boolean;
}

export default function StickyCTABar({
  currentSlide,
  totalSlides,
  onOpenSchedule,
  isVisible = true
}: StickyCTABarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-white/10 shadow-lg shadow-black/50 transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Progress Dots */}
          <div className="hidden md:flex items-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-red-500'
                    : index < currentSlide
                    ? 'w-2 bg-red-500/50'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
            <span className="text-gray-400 text-xs font-extralight ml-2">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOpenSchedule}
            className="group flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105 ml-auto"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-light text-sm md:text-base">Book Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
