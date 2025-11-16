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
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
            Systems that turn{' '}
            <span className="text-gray-400 font-normal">activity</span>
            {' '}into{' '}
            <span
              className="font-normal"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              revenue
            </span>
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-green-900/20 hover:border-green-600/40 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-green-600/20 to-green-700/20 flex items-center justify-center group-hover:from-green-600/30 group-hover:to-green-700/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-light text-lg mb-2">{solution.title}</h3>
                    <p className="text-gray-400 font-extralight text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
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
