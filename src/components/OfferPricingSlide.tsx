import React from 'react';
import { Calendar, CheckCircle2, DollarSign, FileText, Target, TrendingUp, ArrowRight, Users } from 'lucide-react';

interface OfferPricingSlideProps {
  onOpenSchedule?: () => void;
}

export default function OfferPricingSlide({ onOpenSchedule }: OfferPricingSlideProps) {
  const auditIncludes = [
    { icon: Users, text: "Deep-dive with founder / sales lead" },
    { icon: Target, text: "Map of your acquisition funnel & data flows" },
    { icon: TrendingUp, text: "Prioritized opportunity matrix (impact × effort)" },
    { icon: FileText, text: "Written Systems Blueprint (what to automate, where AI fits, expected impact)" },
    { icon: CheckCircle2, text: "1–2 recommended Pilot options with timelines & budget ranges" }
  ];

  const pricingTiers = [
    {
      title: "Acquisition Audit & Roadmap",
      description: "Inside 7–10 business days",
      price: "From mid-four figures",
      features: [
        "Audit fee credited if you proceed to Pilot"
      ],
      highlight: false
    },
    {
      title: "Pilots",
      description: "4–8 weeks, measured weekly",
      price: "Low–mid five figures",
      features: [
        "1–2 use cases live",
        "Adoption training included",
        "Weekly KPI tracking"
      ],
      highlight: true
    },
    {
      title: "Optimization Plan",
      description: "Ongoing support & refinement",
      price: "Monthly retainer from low four figures",
      features: [
        "Continuous improvement",
        "New use case rollout",
        "Strategic guidance"
      ],
      highlight: false
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-3">
            Start with an <span className="text-red-600 font-normal">Acquisition Audit</span>
          </h2>
        </div>


        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-lg font-normal text-white mb-2 tracking-tight">
                  {tier.title}
                </h3>
                <p className="text-gray-600 text-sm font-light mb-4">{tier.description}</p>
                <p className="text-white text-2xl font-light tracking-tight">
                  {tier.price}
                </p>
              </div>

              <ul className="space-y-2.5">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-500 font-light">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onOpenSchedule}
            className="group inline-flex items-center space-x-2 bg-white text-black px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 font-normal text-base tracking-tight"
          >
            <span>Book the 20-min Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
