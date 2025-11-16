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
    <section className="h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative max-w-7xl mx-auto z-10 w-full h-full overflow-y-auto px-2 py-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
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

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="group p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-red-900/20 hover:border-red-600/40 transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/20 to-red-700/20 flex items-center justify-center group-hover:from-red-600/30 group-hover:to-red-700/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-light text-base mb-1">{problem.title}</h3>
                    <p className="text-gray-400 font-extralight text-xs leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call-out Bar */}
        <div className="relative">
          <div className="bg-gradient-to-r from-red-600/10 via-red-600/20 to-red-600/10 border border-red-500/30 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <p className="text-white font-light text-base md:text-lg">
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
