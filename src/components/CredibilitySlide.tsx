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
    <section className="h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-xs font-light uppercase tracking-widest mb-8 opacity-70">Trusted by</p>

          <div className="flex flex-wrap items-center justify-center gap-6 opacity-50">
            <div className="text-white/40 text-sm font-light px-8 py-3 border border-white/5 rounded-lg backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
              Client Logo 1
            </div>
            <div className="text-white/40 text-sm font-light px-8 py-3 border border-white/5 rounded-lg backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
              Client Logo 2
            </div>
            <div className="text-white/40 text-sm font-light px-8 py-3 border border-white/5 rounded-lg backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
              Client Logo 3
            </div>
            <div className="text-white/40 text-sm font-light px-8 py-3 border border-white/5 rounded-lg backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
              Client Logo 4
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="py-12">
            <blockquote className="text-3xl md:text-4xl font-light text-white leading-relaxed mb-10 text-center drop-shadow-lg">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <p className="text-white font-light text-xl mb-1">{currentTestimonial.name}</p>
                <p className="text-gray-400 font-extralight text-base tracking-wide">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>
              </div>

              <div className="inline-block bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 border-y border-red-500/20 px-8 py-3 mt-2">
                <span className="text-red-400 font-light text-lg tracking-wide">{currentTestimonial.metric}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-10">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex ? 'bg-red-500 w-10' : 'bg-white/20 w-2 hover:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={onScrollToCases}
            className="group inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="font-light text-sm tracking-wide">
              Read the 3 quick case tiles
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
