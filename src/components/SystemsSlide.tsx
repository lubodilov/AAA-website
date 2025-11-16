import React from 'react';
import { Calendar } from 'lucide-react';

interface SystemsSlideProps {
  onOpenSchedule?: () => void;
}

export default function SystemsSlide({ onOpenSchedule }: SystemsSlideProps) {
  const systems = [
    {
      title: "AI Sales Co-Pilot",
      description: "Records meetings → extracts decisions & next steps → drafts follow-ups → updates CRM",
      kpis: "Meeting→proposal rate ↑  |  Admin hours ↓"
    },
    {
      title: "Outreach & Lead Ops Automation",
      description: "Intent lists, personalized sequences, reply parsing into CRM; clean, deduped data",
      kpis: "Reply rate ↑  |  Qualified meetings/SDR ↑"
    },
    {
      title: "Acquisition Analytics Layer",
      description: "GA4/GAds/GSC + CRM unified; alerts on bottlenecks; weekly KPI email",
      kpis: "CAC ↓  |  Cycle time ↓  |  Attribution clarity ↑"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0"></div>

      <div className="relative max-w-4xl mx-auto z-10 w-full text-center">
        <span className="inline-block text-xs font-medium text-gray-600 uppercase tracking-[0.25em] mb-8">
          Our Services
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-6">
          3 Systems,{' '}
          <span
            className="font-medium"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            KPI-Tied
          </span>
        </h2>

        <p className="text-gray-400 text-lg font-light mb-16 max-w-2xl mx-auto">
          No vanity AI. Only systems that move the revenue needle.
        </p>

        <div className="space-y-12 max-w-3xl mx-auto">
          {systems.map((system, index) => (
            <div key={index} className="text-left pb-12 border-b border-white/5 last:border-0">
              <h3 className="text-white text-2xl font-light mb-4">{system.title}</h3>
              <p className="text-gray-400 text-base font-light leading-relaxed mb-4">
                {system.description}
              </p>
              <p className="text-gray-600 text-sm font-light">
                {system.kpis}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-gray-400 text-base font-light mb-6">
            Not sure where to start?
          </p>
          <button
            onClick={onOpenSchedule}
            className="px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Book the 20-min Audit</span>
          </button>
          <p className="text-gray-600 text-sm font-light mt-4">
            We'll pick the 1–2 use cases that pay back fastest.
          </p>
        </div>
      </div>
    </section>
  );
}
