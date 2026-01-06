import React from 'react';
import { CheckCircle2, BarChart3, Zap, Users, ArrowRight } from 'lucide-react';

interface SolutionSlideProps {
  onScrollToSystems?: () => void;
}

export default function SolutionSlide({ onScrollToSystems }: SolutionSlideProps) {
  const solutions = [
    {
      icon: CheckCircle2,
      title: "Auto-notes & follow-ups straight to CRM",
      description: "Every conversation captured, every next step logged, zero manual entry"
    },
    {
      icon: BarChart3,
      title: "One pipeline dashboard (GA4/GAds/GSC + CRM)",
      description: "See the full journey from click to close in one unified view"
    },
    {
      icon: Zap,
      title: "Pilots live in weeks, tied to meetings / cycle / CAC",
      description: "No vanity metrics. Only systems that move revenue needles"
    },
    {
      icon: Users,
      title: "Adoption & training included (no shelfware)",
      description: "We stay until your team actually uses it. No adoption = no scale"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight tracking-tight">
            Systems that turn <span className="text-gray-600">activity</span>
            <br />into <span className="text-green-600 font-normal">revenue</span>
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div key={index} className="group relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl glass-panel transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-3 sm:mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-green-500 group-hover:text-green-400 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-medium mb-2 sm:mb-3 tracking-tight group-hover:text-red-100 transition-colors">{solution.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                    {solution.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-6 sm:mt-8 px-4">
          <button
            onClick={onScrollToSystems}
            className="group inline-flex items-center justify-center space-x-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 font-normal text-sm sm:text-base tracking-tight w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
          >
            <span>Show me the 3 systems</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
