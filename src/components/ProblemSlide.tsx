import React from 'react';
import { FileX, Layers, Cpu, TrendingDown, AlertTriangle } from 'lucide-react';

export default function ProblemSlide() {
  const problems = [
    {
      icon: FileX,
      title: "Notes after calls, inconsistent follow-ups",
      description: "Sales reps spend hours reconstructing conversations instead of selling"
    },
    {
      icon: Layers,
      title: "Tool sprawl and shadow spreadsheets",
      description: "Critical data lives in 12 different places; nothing talks to anything"
    },
    {
      icon: Cpu,
      title: '"AI pilots" with zero adoption or KPIs',
      description: "Shiny new tools that nobody uses and can't prove ROI"
    },
    {
      icon: TrendingDown,
      title: "Dirty CRM → weak forecasting → wasted spend",
      description: "Garbage in, garbage out. You're flying blind on your pipeline"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
            Why your acquisition feels{' '}
            <span className="font-normal text-gray-400">busy</span>
            —but not{' '}
            <span
              className="font-normal"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              compounding
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center border border-red-500/10 group-hover:border-red-500/30 transition-all duration-300">
                    <Icon className="w-7 h-7 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-light text-xl mb-3 tracking-wide">{problem.title}</h3>
                    <p className="text-gray-400 font-extralight text-base leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 border-y border-red-500/20 py-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <p className="text-white font-light text-xl tracking-wide">
                Busy work ≠ pipeline.{' '}
                <span className="text-red-400 font-normal">Let's change that.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
