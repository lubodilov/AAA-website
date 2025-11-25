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
  const [logoSet, setLogoSet] = useState(0);

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

  // Rotate logo sets (show 4 at a time)
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoSet((prev) => (prev + 1) % 2); // 2 sets: 0-3 and 2-5 (overlapping)
    }, 4000);

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

          <div className="relative overflow-hidden h-28">
            <div
              className="flex items-center justify-center gap-8 absolute inset-0 transition-all duration-[1500ms] ease-in-out"
              style={{
                transform: logoSet === 0 ? 'translateX(0)' : 'translateX(-100%)',
                opacity: 1,
              }}
            >
              {logos.slice(0, 4).map((logo, index) => (
                <div
                  key={`set1-${index}`}
                  className="flex-shrink-0 px-8 py-6 border border-white/30 rounded-xl backdrop-blur-sm bg-white/[0.08] hover:bg-white/[0.12] hover:border-white/40 transition-all duration-300"
                >
                  <img
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    className="h-12 w-auto object-contain filter brightness-110 hover:brightness-125 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-center gap-8 absolute inset-0 transition-all duration-[1500ms] ease-in-out"
              style={{
                transform: logoSet === 0 ? 'translateX(100%)' : 'translateX(0)',
                opacity: 1,
              }}
            >
              {logos.slice(2, 6).map((logo, index) => (
                <div
                  key={`set2-${index}`}
                  className="flex-shrink-0 px-8 py-6 border border-white/30 rounded-xl backdrop-blur-sm bg-white/[0.08] hover:bg-white/[0.12] hover:border-white/40 transition-all duration-300"
                >
                  <img
                    src={logo}
                    alt={`Client logo ${index + 3}`}
                    className="h-12 w-auto object-contain filter brightness-110 hover:brightness-125 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="py-8">
            <blockquote className="text-2xl md:text-3xl font-light text-gray-400 leading-relaxed mb-8 text-center tracking-tight">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-600/30 shadow-lg">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Professional testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-red-600 font-normal text-base mb-1">{currentTestimonial.name}</p>
                <p className="text-gray-600 font-light text-sm">
                  {currentTestimonial.role}
                </p>
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
