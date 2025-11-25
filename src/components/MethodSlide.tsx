import React from 'react';
import { Search, Zap, Rocket, Users, FileText, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MethodSlide() {
  const steps = [
    {
      week: "Week 1",
      title: "Diagnose",
      icon: Search,
      color: "blue",
      deliverables: [
        { text: "Audit deck", icon: FileText },
        { text: "KPI baseline", icon: BarChart3 },
        { text: "Prioritized backlog", icon: CheckCircle2 }
      ],
      youProvide: [
        "2–3 stakeholders",
        "Tool access"
      ]
    },
    {
      week: "Weeks 2–4",
      title: "Pilot",
      icon: Zap,
      color: "amber",
      deliverables: [
        { text: "1–2 use cases live", icon: Rocket },
        { text: "Adoption training", icon: Users },
        { text: "Weekly KPI email", icon: BarChart3 }
      ],
      youProvide: [
        "1 weekly 30-min check-in"
      ]
    },
    {
      week: "Weeks 5–8",
      title: "Scale",
      icon: Rocket,
      color: "green",
      deliverables: [
        { text: "Rollout plan", icon: FileText },
        { text: "Playbooks", icon: CheckCircle2 },
        { text: "Dashboards", icon: BarChart3 },
        { text: "Handover or ongoing support", icon: Users }
      ],
      youProvide: [
        "Ongoing engagement decision"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        border: "border-blue-500/30",
        bg: "from-blue-600/20 to-blue-700/20",
        text: "text-blue-400",
        iconBg: "bg-blue-600/20"
      },
      amber: {
        border: "border-amber-500/30",
        bg: "from-amber-600/20 to-amber-700/20",
        text: "text-amber-400",
        iconBg: "bg-amber-600/20"
      },
      green: {
        border: "border-green-500/30",
        bg: "from-green-600/20 to-green-700/20",
        text: "text-green-400",
        iconBg: "bg-green-600/20"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="h-screen flex items-start justify-center px-6 pt-0 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-10 w-full mt-32">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-normal text-white leading-tight drop-shadow-lg mb-3">
            3 steps. <span className="text-red-600">Measured weekly</span>
          </h2>
          <p className="text-gray-400 text-base font-light">
            Time-boxed, de-risked, and tied to your KPIs
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);

            return (
              <div key={index} className="relative">
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}

                <div className={`relative p-3 rounded-xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border ${colors.border} hover:border-opacity-60 transition-all duration-300 h-full`}>
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-light uppercase tracking-wider">{step.week}</p>
                      <h3 className={`text-lg font-light ${colors.text}`}>{step.title}</h3>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-3">
                    <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Deliverables</p>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((deliverable, idx) => {
                        const DeliverableIcon = deliverable.icon;
                        return (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-gray-300 font-extralight">
                            <DeliverableIcon className={`w-3.5 h-3.5 ${colors.text} mt-0.5 flex-shrink-0`} />
                            <span>{deliverable.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* You Provide */}
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">You provide</p>
                    <ul className="space-y-1.5">
                      {step.youProvide.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-gray-400 font-extralight">
                          <span className={`${colors.text} mt-0.5`}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Note */}
        <div className="text-center mt-4">
          <p className="text-lg md:text-xl text-white font-light">
            <span className="text-red-600 font-normal">No vanity AI:</span> if it won't move pipeline or time saved, we don't sell it.
          </p>
        </div>
      </div>
    </section>
  );
}
