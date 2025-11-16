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
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight mb-6">
            3 Systems, <span className="text-red-600">KPI-Tied</span>
          </h2>
          <p className="text-gray-400 text-xl font-light">
            No vanity AI. Only systems that move the revenue needle.
          </p>
        </div>

        {/* Systems Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {systems.map((system) => {
            const Icon = system.icon;
            const colors = getColorClasses(system.color);
            const isExpanded = expandedCard === system.id;

            return (
              <div
                key={system.id}
                className={`group p-5 rounded-2xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border ${colors.border} hover:border-opacity-60 transition-all duration-500 shadow-lg`}
              >
                {/* Icon & Title */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} group-hover:${colors.bgHover} flex items-center justify-center transition-all duration-300`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="text-white font-light text-lg flex-1">{system.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 font-extralight text-xs leading-relaxed mb-3">
                  {system.description}
                </p>

                {/* Primary KPIs */}
                <div className="mb-3">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Primary KPIs</p>
                  <div className="flex flex-wrap gap-2">
                    {system.kpis.map((kpi, index) => (
                      <span
                        key={index}
                        className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text}`}
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div className="mb-3">
                  <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-2">Stack</p>
                  <p className="text-gray-400 text-xs font-extralight">{system.stack}</p>
                </div>

                {/* How it works button */}
                <button
                  onClick={() => setExpandedCard(isExpanded ? null : system.id)}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${colors.buttonBg} text-white px-4 py-2 rounded-lg ${colors.buttonHover} transition-all duration-300 text-sm font-light`}
                >
                  <Play className="w-4 h-4" />
                  <span>{isExpanded ? 'Close' : 'How it works in 120s'}</span>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <ul className="space-y-2">
                      {system.details.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-300 font-extralight">
                          <span className={`${colors.text} mt-1`}>•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mini-CTA Bar */}
        <div className="bg-gradient-to-r from-red-600/10 via-red-600/20 to-red-600/10 border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-white font-light text-base mb-3">
            Not sure where to start?
          </p>
          <button
            onClick={onOpenSchedule}
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-light text-sm">Book the 20-min Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <p className="text-gray-400 text-xs font-extralight mt-3">
            We'll pick the 1–2 use cases that pay back fastest.
          </p>
        </div>
      </div>
    </section>
  );
}
