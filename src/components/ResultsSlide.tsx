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
      problem: "Late follow-ups; messy notes; low meeting→proposal rate.",
      intervention: "Co-Pilot + CRM updates + weekly KPI email.",
      impact: [
        { label: "Meetings", value: "+31%", icon: TrendingUp },
        { label: "Time saved/rep/week", value: "7.2h", icon: Clock },
        { label: "Forecast accuracy", value: "+14%", icon: Target }
      ],
      timeline: "6 weeks",
      stack: "Gong • HubSpot • Custom assistant",
      color: "blue"
    },
    {
      id: 2,
      title: "Professional Services",
      subtitle: "12-person sales team",
      problem: "Leaky lead ops; replies lost in inboxes.",
      intervention: "Enrichment + sequences + reply parser to CRM.",
      impact: [
        { label: "Qualified meetings", value: "+22%", icon: TrendingUp },
        { label: "CAC reduction", value: "−17%", icon: Target },
        { label: "Response time", value: "−40%", icon: Clock }
      ],
      timeline: "5 weeks",
      stack: "Clay • Instantly • HubSpot",
      color: "amber"
    },
    {
      id: 3,
      title: "Healthcare Clinic",
      subtitle: "8-location network",
      problem: "Slow intake & overloaded staff.",
      intervention: "AI receptionist + triage + SOPs.",
      impact: [
        { label: "First response time", value: "−43%", icon: Clock },
        { label: "Staff time reclaimed", value: "12h/day", icon: Target },
        { label: "Patient satisfaction", value: "+26%", icon: TrendingUp }
      ],
      timeline: "4–8 weeks",
      stack: "Custom AI • Twilio • EMR integration",
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

        {/* Visual Element - Dashboard/Analytics imagery */}
        <div className="mb-6 max-w-3xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-zinc-800/60 shadow-xl">
            <img
              src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Analytics dashboard showing growth metrics"
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

                {/* Quote */}
                <div className="mb-4">
                  <p className="text-gray-300 text-base font-normal leading-relaxed italic">
                    "{caseStudy.problem}"
                  </p>
                </div>

                {/* Impact */}
                <div className="space-y-2.5">
                  {caseStudy.impact.map((metric, index) => {
                    return (
                      <div key={index} className="flex items-baseline justify-between">
                        <span className="text-gray-300 text-sm font-medium">{metric.label}</span>
                        <span className="text-white text-xl font-bold">{metric.value}</span>
                      </div>
                    );
                  })}
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
