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
    <section className="h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative max-w-7xl mx-auto z-10 w-full max-h-full overflow-y-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            Real Results,{' '}
            <span
              className="font-normal"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Real Timelines
            </span>
          </h2>
          <p className="text-gray-400 font-extralight text-lg">
            3 client transformations, measured weekly
          </p>
        </div>

        {/* Case Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {cases.map((caseStudy) => {
            const colors = getColorClasses(caseStudy.color);

            return (
              <div
                key={caseStudy.id}
                className={`p-6 rounded-xl bg-black/30 backdrop-blur-sm border ${colors.border} hover:border-opacity-60 transition-all duration-300`}
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className={`text-2xl font-light ${colors.text} mb-1`}>{caseStudy.title}</h3>
                  <p className="text-gray-500 text-sm font-extralight">{caseStudy.subtitle}</p>
                </div>

                {/* Problem */}
                <div className="mb-4">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Problem</p>
                  <p className="text-gray-300 text-sm font-extralight leading-relaxed">{caseStudy.problem}</p>
                </div>

                {/* Intervention */}
                <div className="mb-4">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Intervention</p>
                  <p className="text-gray-300 text-sm font-extralight leading-relaxed">{caseStudy.intervention}</p>
                </div>

                {/* Impact */}
                <div className="mb-4">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Impact ({caseStudy.timeline})</p>
                  <div className="space-y-3">
                    {caseStudy.impact.map((metric, index) => {
                      const Icon = metric.icon;
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-4 h-4 ${colors.text}`} />
                            <span className="text-gray-400 text-xs font-extralight">{metric.label}</span>
                          </div>
                          <span className={`text-lg font-medium ${colors.text}`}>{metric.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stack */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Stack</p>
                  <p className="text-gray-400 text-xs font-extralight">{caseStudy.stack}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote & CTA */}
        <div className="text-center space-y-6">
          <p className="text-gray-500 text-xs font-extralight max-w-2xl mx-auto">
            Ranges vary by size & baseline. Full references on request.
          </p>

          <button
            onClick={onOpenSchedule}
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105"
          >
            <span className="font-light">See if your numbers are possible</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="text-gray-400 text-sm font-extralight">
            Book the 20-min Audit
          </p>
        </div>
      </div>
    </section>
  );
}
