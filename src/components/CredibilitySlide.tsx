import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Booked 31% more meetings in 6 weeks; reps stopped drowning in admin.",
    name: "Michael Chen",
    role: "VP Sales",
    company: "B2B SaaS",
    metric: "+31% meetings"
  },
  {
    quote: "Refunds −11% with AI triage; CX happier.",
    name: "Sarah Williams",
    role: "Head of CX",
    company: "E-commerce",
    metric: "−11% refunds"
  },
  {
    quote: "7.2h saved/rep/week; forecast accuracy +14%.",
    name: "David Rodriguez",
    role: "RevOps Lead",
    company: "Professional Services",
    metric: "7.2h saved/week"
  }
];

interface CredibilitySlideProps {
  onScrollToCases?: () => void;
}

export default function CredibilitySlide({ onScrollToCases }: CredibilitySlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] z-0"></div>

      <div className="relative max-w-4xl mx-auto z-10 w-full text-center">
        <span className="inline-block text-xs font-medium text-gray-600 uppercase tracking-[0.25em] mb-16">
          Client Results
        </span>

        <blockquote className="text-3xl md:text-4xl font-light text-white leading-relaxed mb-12">
          "{currentTestimonial.quote}"
        </blockquote>

        <div className="mb-8">
          <p className="text-white text-lg mb-1">{currentTestimonial.name}</p>
          <p className="text-gray-500 text-sm">
            {currentTestimonial.role}, {currentTestimonial.company}
          </p>
        </div>

        <div className="inline-block px-6 py-2 border border-red-500/30 rounded-full">
          <span className="text-red-400 text-sm font-medium">{currentTestimonial.metric}</span>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-16">
          <button
            onClick={prevTestimonial}
            className="p-2 text-gray-500 hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-red-500 w-8' : 'bg-gray-700 w-1.5'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 text-gray-500 hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
