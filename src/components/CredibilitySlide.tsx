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
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-white/40 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] mb-8 sm:mb-10">
            Trusted by industry leaders
          </p>

          <div 
            className="relative overflow-hidden h-16 sm:h-20 md:h-24 w-full max-w-5xl mx-auto"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <div className="flex items-center gap-12 sm:gap-20 animate-scroll-left w-max">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center group"
                >
                  <img
                    src={logo}
                    alt={`Client logo ${(index % logos.length) + 1}`}
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain filter grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 will-change-[opacity,filter]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="py-6 sm:py-8">
            <blockquote className="text-lg sm:text-2xl md:text-3xl font-light text-gray-400 leading-relaxed mb-6 sm:mb-8 text-center tracking-tight px-2">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="flex flex-col items-center space-y-2 sm:space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-red-600/30 shadow-lg">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Professional business executive testimonial"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="64"
                  height="64"
                  decoding="async"
                />
              </div>
              <div className="text-center">
                <p className="text-red-600 font-normal text-sm sm:text-base mb-1">{currentTestimonial.name}</p>
                <p className="text-gray-600 font-light text-xs sm:text-sm">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              <div className="flex space-x-2 sm:space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex ? 'bg-red-500 w-8 sm:w-10' : 'bg-white/20 w-1.5 sm:w-2 hover:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={onScrollToCases}
            className="group inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 px-4"
          >
            <span className="font-light text-xs sm:text-sm tracking-wide">
              Read the 3 quick case tiles
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
