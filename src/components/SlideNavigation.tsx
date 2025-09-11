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