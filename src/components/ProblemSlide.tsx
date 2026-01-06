import React from 'react';
import { FileX, Layers, Cpu, TrendingDown } from 'lucide-react';

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
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
            Why acquisition feels <span className="text-gray-600">busy</span>
            <br />
            —but not <span className="text-red-600 font-normal">compounding</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="group relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl glass-panel transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-3 sm:mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-red-500 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-medium mb-2 sm:mb-3 tracking-tight group-hover:text-red-100 transition-colors">{problem.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Element - Frustrated professional/chaos */}
        <div className="mb-3 sm:mb-4 max-w-2xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-zinc-800/60 shadow-xl">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Professional working with multiple systems struggling with complexity"
              className="w-full h-24 sm:h-32 object-cover opacity-40"
              loading="lazy"
              width="1200"
              height="128"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>
        </div>

        <div className="text-center px-4">
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light tracking-tight">
            Busy work ≠ pipeline. <span className="text-white font-normal">Let's change that.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
