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
    <section className="h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative max-w-7xl mx-auto z-10 w-full h-full overflow-y-auto px-2 py-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
            3 steps.{' '}
            <span
              className="font-normal"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Measured weekly
            </span>
          </h2>
          <p className="text-gray-400 font-extralight text-lg">
            Time-boxed, de-risked, and tied to your KPIs
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);

            return (
              <div key={index} className="relative">
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}

                <div className={`relative p-4 rounded-xl bg-black/30 backdrop-blur-sm border ${colors.border} hover:border-opacity-60 transition-all duration-300 h-full`}>
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-light uppercase tracking-wider">{step.week}</p>
                      <h3 className={`text-xl font-light ${colors.text}`}>{step.title}</h3>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Deliverables</p>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, idx) => {
                        const DeliverableIcon = deliverable.icon;
                        return (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300 font-extralight">
                            <DeliverableIcon className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                            <span>{deliverable.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* You Provide */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">You provide</p>
                    <ul className="space-y-2">
                      {step.youProvide.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-400 font-extralight">
                          <span className={`${colors.text} mt-1`}>•</span>
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
        <div className="bg-gradient-to-r from-red-600/10 via-red-600/20 to-red-600/10 border border-red-500/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-white font-light text-lg">
              <span className="font-normal text-red-400">No vanity AI:</span> if it won't move pipeline or time saved, we don't sell it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
