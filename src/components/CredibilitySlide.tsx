import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

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
    }, 5000);

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
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-10 w-full">
        {/* Trusted By Section */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm font-light uppercase tracking-wider mb-8">Trusted by</p>

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {/* Placeholder logos - replace with real client logos */}
            <div className="text-white/50 text-lg font-light px-6 py-3 border border-white/10 rounded-lg">
              Client Logo 1
            </div>
            <div className="text-white/50 text-lg font-light px-6 py-3 border border-white/10 rounded-lg">
              Client Logo 2
            </div>
            <div className="text-white/50 text-lg font-light px-6 py-3 border border-white/10 rounded-lg">
              Client Logo 3
            </div>
            <div className="text-white/50 text-lg font-light px-6 py-3 border border-white/10 rounded-lg">
              Client Logo 4
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            {/* Quote */}
            <blockquote className="text-xl md:text-3xl font-light text-white leading-relaxed mb-8 text-center">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-center">
                <p className="text-white font-medium text-lg">{currentTestimonial.name}</p>
                <p className="text-gray-400 font-light text-sm">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>
              </div>

              {/* Metric Badge */}
              <div className="inline-block bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 rounded-full px-6 py-2 mt-4">
                <span className="text-red-400 font-medium text-sm">{currentTestimonial.metric}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-red-500 w-8' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="text-center mt-12">
          <button
            onClick={onScrollToCases}
            className="group inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <span className="font-light text-sm underline decoration-gray-600 group-hover:decoration-white">
              Read the 3 quick case tiles
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
