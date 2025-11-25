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
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
            Why acquisition feels <span className="text-gray-600">busy</span>
            <br />
            —but not <span className="text-red-600 font-normal">compounding</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="group p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300">
                <div className="mb-4">
                  <Icon className="w-7 h-7 text-red-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-white text-lg font-normal mb-3 tracking-tight">{problem.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-tight">
            Busy work ≠ pipeline. <span className="text-white font-normal">Let's change that.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
