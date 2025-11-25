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
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-3">
            3 steps. <span className="text-red-600 font-normal">Measured weekly</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);

            return (
              <div key={index} className="relative">
                <div className="relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 h-full">
                  {/* Title */}
                  <div className="mb-4">
                    <Icon className="w-7 h-7 text-white mb-3" strokeWidth={1.5} />
                    <p className="text-gray-600 text-xs font-light mb-1">{step.week}</p>
                    <h3 className="text-lg font-normal text-white tracking-tight">{step.title}</h3>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2">
                    {step.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="text-gray-500 text-sm font-light">
                        {deliverable.text}
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
