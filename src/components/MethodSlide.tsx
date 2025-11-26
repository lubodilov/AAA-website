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
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-3">
            3 steps. <span className="text-red-600 font-bold">Measured weekly</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);

            return (
              <div key={index} className="relative group">
                {/* Arrow connector (not on last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="flex items-center">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-red-600 to-red-500"></div>
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-red-500"></div>
                    </div>
                  </div>
                )}

                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 border-2 border-zinc-800/80 hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-900/50 transition-all duration-500 h-full">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center border-4 border-black shadow-lg">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>

                  {/* Title */}
                  <div className="mb-6 pt-2">
                    <Icon className="w-10 h-10 text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">{step.week}</p>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-4">{step.title}</h3>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Deliverables</p>
                    {step.deliverables.map((deliverable, idx) => {
                      const DeliverableIcon = deliverable.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3 text-gray-300 text-sm font-normal">
                          <DeliverableIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{deliverable.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* You Provide */}
                  <div className="pt-4 border-t border-zinc-800/60">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">You Provide</p>
                    {step.youProvide.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Note */}
        <div className="text-center mt-6">
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-tight">
            <span className="text-white font-normal">No vanity AI.</span> If it won't move pipeline, we don't sell it.
          </p>
        </div>
      </div>
    </section>
  );
}
