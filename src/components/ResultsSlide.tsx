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
    <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-10 w-full pt-20 pb-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-3">
            Real Results, <span className="text-red-600">Real Timelines</span>
          </h2>
          <p className="text-gray-400 text-base font-light">
            3 client transformations, measured weekly
          </p>
        </div>

        {/* Case Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
          {cases.map((caseStudy) => {
            const colors = getColorClasses(caseStudy.color);

            return (
              <div
                key={caseStudy.id}
                className={`p-3 rounded-xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border ${colors.border} hover:border-opacity-60 transition-all duration-300`}
              >
                {/* Header */}
                <div className="mb-2">
                  <h3 className={`text-base font-light ${colors.text} mb-0.5`}>{caseStudy.title}</h3>
                  <p className="text-gray-500 text-xs font-extralight">{caseStudy.subtitle}</p>
                </div>

                {/* Problem */}
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-1">Problem</p>
                  <p className="text-gray-300 text-xs font-extralight leading-relaxed">{caseStudy.problem}</p>
                </div>

                {/* Intervention */}
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-1">Intervention</p>
                  <p className="text-gray-300 text-xs font-extralight leading-relaxed">{caseStudy.intervention}</p>
                </div>

                {/* Impact */}
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Impact ({caseStudy.timeline})</p>
                  <div className="space-y-1.5">
                    {caseStudy.impact.map((metric, index) => {
                      const Icon = metric.icon;
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                            <span className="text-gray-400 text-xs font-extralight">{metric.label}</span>
                          </div>
                          <span className={`text-sm font-medium ${colors.text}`}>{metric.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stack */}
                <div className="pt-2 border-t border-white/5">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-1">Stack</p>
                  <p className="text-gray-400 text-xs font-extralight">{caseStudy.stack}</p>
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
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105"
          >
            <span className="font-light text-sm">See if your numbers are possible</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="text-gray-400 text-xs font-extralight">
            Book the 20-min Audit
          </p>
        </div>
      </div>
    </section>
  );
}
