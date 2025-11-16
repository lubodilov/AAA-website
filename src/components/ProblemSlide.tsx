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
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight">
            Why acquisition feels <span className="text-gray-500">busy</span>
            <br />
            —but not <span className="text-red-600">compounding</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="group">
                <div className="mb-4">
                  <Icon className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-white text-2xl font-normal mb-3">{problem.title}</h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-2xl md:text-3xl text-white font-light">
            Busy work ≠ pipeline. <span className="text-red-600 font-normal">Let's change that.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
