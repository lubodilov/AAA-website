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
    <section className="h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight drop-shadow-lg">
            Systems that turn <span className="text-gray-500">activity</span>
            <br />into <span className="text-green-600">revenue</span>
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div key={index} className="group">
                <div className="mb-3">
                  <Icon className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-white text-xl font-normal mb-2">{solution.title}</h3>
                <p className="text-gray-400 text-base font-light leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <button
            onClick={onScrollToSystems}
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-green-600/40 hover:scale-105"
          >
            <span className="font-light text-lg">Show me the 3 systems</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
