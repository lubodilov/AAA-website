import React from 'react';
import { Calendar, ArrowUpRight, CheckCircle2, TrendingUp, Clock, Database } from 'lucide-react';

interface HeroProps {
  onOpenContact?: () => void;
  onOpenSchedule?: () => void;
  onScrollToResults?: () => void;
}

export default function Hero({ onOpenContact, onOpenSchedule, onScrollToResults }: HeroProps) {
  return (
    <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative text-center max-w-5xl mx-auto z-10">
        {/* H1 - Static for SEO */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight mb-6">
          AI for B2B acquisition that pays for itself in{' '}
          <span
            className="font-normal"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            30–60 days
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl font-extralight text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
          We find your biggest revenue leaks from lead → meeting → close and deploy AI systems that increase qualified meetings, shorten cycles, and cut admin time.
        </p>

        {/* 3 Proof Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600/20 to-red-700/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-white font-light text-sm md:text-base">
              <span className="text-red-400 font-medium text-lg">+20–50%</span><br />
              more qualified meetings
            </p>
            <p className="text-gray-400 text-xs font-extralight">(6–12 weeks, good fit)</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-700/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-white font-light text-sm md:text-base">
              <span className="text-amber-400 font-medium text-lg">30–70%</span><br />
              less manual prospecting
            </p>
            <p className="text-gray-400 text-xs font-extralight">(1–3 months)</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-green-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600/20 to-green-700/20 flex items-center justify-center">
              <Database className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-white font-light text-sm md:text-base">
              <span className="text-green-400 font-medium text-lg">Clean pipeline</span><br />
              visibility; CRM actually used
            </p>
            <p className="text-gray-400 text-xs font-extralight">(real-time accuracy)</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          {/* Primary CTA */}
          <button
            onClick={onOpenSchedule}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-light text-lg">Book a 20-min Acquisition Audit</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onScrollToResults}
            className="group relative bg-transparent border border-gray-600 text-white px-8 py-4 rounded-full hover:border-red-600 transition-all duration-300 flex items-center space-x-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative z-10 font-light">See 3 client wins</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Micro-promise */}
        <p className="text-gray-400 text-sm font-extralight">
          Leave with a 3-item action plan. No fluff.
        </p>
      </div>
    </section>
  );
}
