import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown, Quote } from 'lucide-react';

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

  const logos = [
    '/logo1.png',
    '/logo2.png',
    '/logo3.png',
    '/logo4.png',
    '/logo5.png',
    '/logo6.png'
  ];

  // Rotate testimonials
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
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="text-center mb-8">
          <p className="text-gray-400 text-xs font-light uppercase tracking-widest mb-8 opacity-70">Trusted by</p>

          <div className="relative overflow-hidden h-36">
            <div className="flex items-center gap-8 animate-scroll-left">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4 py-3 border border-white/30 rounded-xl backdrop-blur-sm bg-white/[0.08] hover:bg-white/[0.12] hover:border-white/40 transition-all duration-300"
                >
                  <img
                    src={logo}
                    alt={`Client logo ${(index % logos.length) + 1}`}
                    className="h-16 w-auto object-contain filter brightness-110 hover:brightness-125 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="py-12">
            {/* Testimonial Card */}
            <div
              key={currentIndex}
              className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl testimonial-fade"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 opacity-10">
                <Quote className="w-16 h-16 text-red-600" />
              </div>

              {/* Metric Badge - Prominent Display */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-red-600/20 border border-red-600/30 rounded-full">
                  <span className="text-red-500 font-semibold text-2xl tracking-tight">
                    {currentTestimonial.metric}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-10 text-center tracking-tight">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 border-t border-white/10">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-600/40 shadow-xl ring-4 ring-red-600/10">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Professional business executive testimonial"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="80"
                    height="80"
                    decoding="async"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-white font-semibold text-xl mb-1">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-gray-400 font-normal text-base">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-red-500 font-medium text-sm mt-1">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8">
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

        <div className="text-center mt-10">
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
