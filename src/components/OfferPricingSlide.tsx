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
    <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full pt-20 pb-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-2">
            Start with an <span className="text-red-600">Acquisition Audit</span> & Roadmap
          </h2>
          <p className="text-gray-400 text-base font-light">
            Clear pricing. No surprises. Pay for outcomes.
          </p>
        </div>

        {/* What You Get */}
        <div className="mb-4">
          <div className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border border-white/5 rounded-xl p-3">
            <h3 className="text-base font-light text-white mb-3 text-center">
              What you get <span className="text-gray-500">(inside 7–10 business days)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {auditIncludes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-red-600/20 to-red-700/20 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-red-400" />
                    </div>
                    <p className="text-gray-300 font-extralight text-xs leading-relaxed flex-1">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                tier.highlight
                  ? 'bg-black/40 border-red-500/50 scale-105 shadow-lg shadow-red-600/20'
                  : 'bg-black/30 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-center mb-3">
                <h3 className={`text-base font-light mb-1 ${tier.highlight ? 'text-red-400' : 'text-white'}`}>
                  {tier.title}
                </h3>
                <p className="text-gray-500 text-xs font-extralight mb-2">{tier.description}</p>
                <div className="flex items-center justify-center space-x-1">
                  <DollarSign className={`w-4 h-4 ${tier.highlight ? 'text-red-400' : 'text-gray-400'}`} />
                  <p className={`text-base font-light ${tier.highlight ? 'text-red-400' : 'text-white'}`}>
                    {tier.price}
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-gray-300 font-extralight">
                    <CheckCircle2 className={`w-3 h-3 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-red-400' : 'text-gray-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-2">
          <button
            onClick={onOpenSchedule}
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-light text-sm">Book the 20-min Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="text-gray-400 text-xs font-extralight">
            3 bottlenecks, 3 fixes, zero fluff.
          </p>
        </div>
      </div>
    </section>
  );
}
