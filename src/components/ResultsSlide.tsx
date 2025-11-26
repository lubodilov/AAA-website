import React from 'react';
import { TrendingUp, Target, Clock, Calendar, ArrowRight } from 'lucide-react';

interface ResultsSlideProps {
  onOpenSchedule?: () => void;
}

export default function ResultsSlide({ onOpenSchedule }: ResultsSlideProps) {
  const cases = [
    {
      id: 1,
      title: "B2B SaaS",
      subtitle: "24 reps",
      problem: "Late follow-ups and messy notes killed our pipeline.",
      result: "+31% more meetings",
      detail: "7.2h saved per rep, every week",
      color: "blue"
    },
    {
      id: 2,
      title: "Professional Services",
      subtitle: "12-person sales team",
      problem: "Leads slipped through cracks in our inbox.",
      result: "+22% qualified meetings",
      detail: "17% lower customer acquisition cost",
      color: "amber"
    },
    {
      id: 3,
      title: "Healthcare Clinic",
      subtitle: "8-location network",
      problem: "Slow intake process overwhelmed our staff.",
      result: "43% faster response",
      detail: "12 hours reclaimed daily across locations",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        border: "border-blue-500/30",
        bg: "from-blue-600/20 to-blue-700/20",
        text: "text-blue-400",
        badge: "bg-blue-600/20 border-blue-500/30"
      },
      amber: {
        border: "border-amber-500/30",
        bg: "from-amber-600/20 to-amber-700/20",
        text: "text-amber-400",
        badge: "bg-amber-600/20 border-amber-500/30"
      },
      green: {
        border: "border-green-500/30",
        bg: "from-green-600/20 to-green-700/20",
        text: "text-green-400",
        badge: "bg-green-600/20 border-green-500/30"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
            <span className="text-red-600 font-normal">Real results.</span>
            <br />
            <span className="text-gray-600">Proof. Not promises.</span>
          </h2>
        </div>

        {/* Visual Element - Business imagery */}
        <div className="mb-6 max-w-3xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-zinc-800/60 shadow-xl">
            <img
              src="/business.png"
              alt="Business growth and success"
              className="w-full h-32 object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>
        </div>

        {/* Case Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {cases.map((caseStudy) => {
            const colors = getColorClasses(caseStudy.color);

            return (
              <div
                key={caseStudy.id}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{caseStudy.title}</h3>
                  <p className="text-gray-500 text-sm font-medium">{caseStudy.subtitle}</p>
                </div>

                {/* Problem */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm leading-relaxed italic">
                    "{caseStudy.problem}"
                  </p>
                </div>

                {/* Result */}
                <div className="mb-3">
                  <div className={`text-2xl font-bold ${colors.text}`}>
                    {caseStudy.result}
                  </div>
                </div>

                {/* Detail */}
                <div>
                  <p className="text-gray-300 text-sm font-normal">
                    {caseStudy.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote & CTA */}
        <div className="text-center space-y-3">
          <p className="text-gray-500 text-xs font-extralight max-w-2xl mx-auto">
            Ranges vary by size & baseline. Full references on request.
          </p>

          <button
            onClick={onOpenSchedule}
            className="group inline-flex items-center space-x-2 bg-white text-black px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 font-normal text-base tracking-tight"
          >
            <span>See if your numbers are possible</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
