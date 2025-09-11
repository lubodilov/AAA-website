import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SlideNavigationProps {
  slides: { id: string; name: string }[];
  currentSlide: number;
  onSlideChange: (slideIndex: number) => void;
}

export default function SlideNavigation({ slides, currentSlide, onSlideChange }: SlideNavigationProps) {
  return (
    <></>
  );
}