import React, { useState } from 'react';
import { Mic, Send, BarChart3, ArrowRight, Calendar, X, Play } from 'lucide-react';

interface SystemsSlideProps {
  onOpenSchedule?: () => void;
}

export default function SystemsSlide({ onOpenSchedule }: SystemsSlideProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const systems = [
    {
      id: 1,
      title: "AI Sales Co-Pilot",
      icon: Mic,
      color: "blue",
      description: "Records meetings → extracts decisions & next steps → drafts follow-ups → updates CRM.",
      kpis: ["Meeting→proposal rate ↑", "Admin hours ↓"],
      stack: "Gong/Fathom • HubSpot/Salesforce • Custom assistant",
      details: [
        "Auto-capture every sales call with 95%+ accuracy",
        "Extract action items, pain points, and buying signals",
        "Generate personalized follow-up emails in your voice",
        "Push all data to CRM fields automatically",
        "Weekly KPI dashboard: conversion rates, follow-up speed, pipeline health"
      ]
    },
    {
      id: 2,
      title: "Outreach & Lead Ops Automation",
      icon: Send,
      color: "amber",
      description: "Intent lists, personalized sequences, reply parsing into CRM; clean, deduped data.",
      kpis: ["Reply rate ↑", "Qualified meetings/SDR ↑"],
      stack: "Clay/Apollo • Instantly • Custom parsers",
      details: [
        "Build intent-based prospect lists automatically",
        "Generate hyper-personalized sequences at scale",
        "Parse and categorize all replies (interested/not now/objection)",
        "Auto-update CRM with engagement data",
        "Clean and dedupe contacts continuously"
      ]
    },
    {
      id: 3,
      title: "Acquisition Analytics Layer",
      icon: BarChart3,
      color: "green",
      description: "GA4/GAds/GSC + CRM unified; alerts on bottlenecks; weekly KPI email.",
      kpis: ["CAC ↓", "Cycle time ↓", "Attribution clarity ↑"],
      stack: "GA4/Ads/GSC • Make/Zapier • Looker/Metabase",
      details: [
        "Unify marketing and sales data in one dashboard",
        "See true attribution: which channels drive closed deals",
        "Auto-alert on bottlenecks (drop-off points in funnel)",
        "Weekly KPI email to leadership: CAC, cycle time, win rates",
        "Forecast pipeline with 85%+ accuracy"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        border: "border-blue-500/30",
        bg: "from-blue-600/20 to-blue-700/20",
        bgHover: "from-blue-600/30 to-blue-700/30",
        text: "text-blue-400",
        buttonBg: "from-blue-600 to-blue-700",
        buttonHover: "hover:from-blue-700 hover:to-blue-800",
        shadow: "shadow-blue-600/25"
      },
      amber: {
        border: "border-amber-500/30",
        bg: "from-amber-600/20 to-amber-700/20",
        bgHover: "from-amber-600/30 to-amber-700/30",
        text: "text-amber-400",
        buttonBg: "from-amber-600 to-amber-700",
        buttonHover: "hover:from-amber-700 hover:to-amber-800",
        shadow: "shadow-amber-600/25"
      },
      green: {
        border: "border-green-500/30",
        bg: "from-green-600/20 to-green-700/20",
        bgHover: "from-green-600/30 to-green-700/30",
        text: "text-green-400",
        buttonBg: "from-green-600 to-green-700",
        buttonHover: "hover:from-green-700 hover:to-green-800",
        shadow: "shadow-green-600/25"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight tracking-tight mb-2 sm:mb-3">
            3 Systems, <span className="text-red-600 font-normal">KPI-Tied</span>
          </h2>
        </div>

        {/* Systems Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {systems.map((system) => {
            const Icon = system.icon;
            const colors = getColorClasses(system.color);
            const isExpanded = expandedCard === system.id;

            return (
              <div
                key={system.id}
                className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300"
              >
                {/* Icon & Title */}
                <div className="mb-3 sm:mb-4">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3" strokeWidth={1.5} />
                  <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">{system.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 font-normal text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  {system.description}
                </p>

                {/* KPIs */}
                <div className="space-y-1.5 sm:space-y-2">
                  {system.kpis.map((kpi, index) => (
                    <div key={index} className="text-gray-300 text-xs sm:text-sm font-medium">
                      {kpi}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <button
            onClick={onOpenSchedule}
            className="group inline-flex items-center justify-center space-x-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 font-normal text-sm sm:text-base tracking-tight w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
          >
            <span>Book the 20-min Audit</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
