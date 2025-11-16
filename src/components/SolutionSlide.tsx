import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SolutionSlideProps {
  onScrollToSystems?: () => void;
}

export default function SolutionSlide({ onScrollToSystems }: SolutionSlideProps) {
  const solutions = [
    "Auto-notes & follow-ups straight to CRM",
    "One pipeline dashboard (GA4/GAds/GSC + CRM)",
    "Pilots live in weeks, tied to meetings / cycle / CAC",
    "Adoption & training included (no shelfware)"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0"></div>

      <div className="relative max-w-4xl mx-auto z-10 w-full text-center">
        <span className="inline-block text-xs font-medium text-gray-600 uppercase tracking-[0.25em] mb-8">
          The Solution
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-6">
          Systems that turn{' '}
          <span className="text-gray-500">activity</span>
          {' '}into{' '}
          <span
            className="font-medium"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            revenue
          </span>
        </h2>

        <div className="max-w-2xl mx-auto mt-16 space-y-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="text-left py-6 border-b border-white/5 last:border-0"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-300 text-lg font-light leading-relaxed flex-1">
                  {solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <button
            onClick={onScrollToSystems}
            className="text-gray-400 hover:text-white transition-colors text-sm font-light"
          >
            See how it works →
          </button>
        </div>
      </div>
    </section>
  );
}
