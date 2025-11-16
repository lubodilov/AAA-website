import React from 'react';

export default function ProblemSlide() {
  const problems = [
    "Notes after calls, inconsistent follow-ups",
    "Tool sprawl and shadow spreadsheets",
    '"AI pilots" with zero adoption or KPIs',
    "Dirty CRM → weak forecasting → wasted spend"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-black z-0"></div>

      <div className="relative max-w-4xl mx-auto z-10 w-full text-center">
        <span className="inline-block text-xs font-medium text-gray-600 uppercase tracking-[0.25em] mb-8">
          The Problem
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-6">
          Why your acquisition feels{' '}
          <span className="text-gray-500">busy</span>
          —but not{' '}
          <span
            className="font-medium"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            compounding
          </span>
        </h2>

        <div className="max-w-2xl mx-auto mt-16 space-y-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="text-left py-6 border-b border-white/5 last:border-0"
            >
              <div className="flex items-start space-x-4">
                <span className="text-red-500 text-xl font-light mt-1">×</span>
                <p className="text-gray-300 text-lg font-light leading-relaxed flex-1">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-gray-400 text-lg font-light">
            Busy work ≠ pipeline.{' '}
            <span className="text-red-400">Let's change that.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
