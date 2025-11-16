import React from 'react';
import { Calendar, ArrowDown } from 'lucide-react';

interface HeroProps {
  onOpenContact?: () => void;
  onOpenSchedule?: () => void;
  onScrollToResults?: () => void;
}

export default function Hero({ onOpenSchedule, onScrollToResults }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a] z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8">
          <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-[0.25em]">
            Revenue Operations AI
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.15] mb-8 tracking-tight">
          Turn your sales & marketing data
          <br />
          into{' '}
          <span
            className="font-medium"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            compounding growth
          </span>
        </h1>

        <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          No vanity AI. Only systems that move the revenue needle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onOpenSchedule}
            className="group px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Book 20-min Audit</span>
          </button>

          <button
            onClick={onScrollToResults}
            className="group px-8 py-4 bg-transparent border border-gray-700 text-white rounded-full hover:border-gray-600 transition-all duration-300 flex items-center space-x-2"
          >
            <span className="font-light">See Results</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-12 border-t border-white/5">
          <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-6">Trusted by</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <span className="text-gray-600 text-sm">B2B SaaS</span>
            <span className="text-gray-700 text-xs">•</span>
            <span className="text-gray-600 text-sm">E-commerce</span>
            <span className="text-gray-700 text-xs">•</span>
            <span className="text-gray-600 text-sm">Professional Services</span>
          </div>
        </div>
      </div>
    </section>
  );
}
