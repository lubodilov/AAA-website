import React from 'react';
import { Shield, Lock, FileCheck, AlertOctagon, CheckCircle2, Globe } from 'lucide-react';

export default function RiskReversalSlide() {
  const noRiskRules = [
    {
      icon: AlertOctagon,
      title: "No vanity AI pilots",
      description: "We refuse projects without KPI tie-in. Your success is our reputation."
    },
    {
      icon: CheckCircle2,
      title: "Go/No-Go gates",
      description: "Stop anytime at stage boundaries. No lock-in, no penalties."
    },
    {
      icon: FileCheck,
      title: "Audit credit",
      description: "Apply the full audit fee to implementation. Risk-free discovery."
    }
  ];

  const securityPoints = [
    {
      icon: Lock,
      text: "Least-privilege access"
    },
    {
      icon: FileCheck,
      text: "Audit logs"
    },
    {
      icon: Shield,
      text: "GDPR-aligned practices"
    },
    {
      icon: Globe,
      text: "EU-friendly options (Azure/OpenAI)"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight mb-6">
            <span className="text-green-600">Zero risk.</span> Maximum security.
          </h2>
          <p className="text-gray-400 text-xl font-light">
            We protect your business like it's our own
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* No-Risk Rules */}
          <div>
            <h3 className="text-2xl font-normal text-white mb-8">No-risk rules</h3>

            <div className="space-y-6">
              {noRiskRules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={index}
                    className="group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center border border-green-500/10 group-hover:border-green-500/30 transition-all duration-300">
                        <Icon className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-normal text-xl mb-2">{rule.title}</h4>
                        <p className="text-gray-400 font-light text-lg leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Stance */}
          <div>
            <h3 className="text-2xl font-normal text-white mb-8">Security stance</h3>

            <div className="py-6">
              <div className="grid grid-cols-1 gap-5 mb-8">
                {securityPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center border border-blue-500/10">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <p className="text-gray-300 font-light text-lg">{point.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="py-6 border-t border-white/5">
                <p className="text-gray-400 font-extralight text-base leading-relaxed mb-6">
                  <span className="text-white font-light">Pentest specialists</span> review critical flows on request.
                  We maintain SOC 2 Type II equivalent controls.
                </p>

                <div className="bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 border-y border-blue-500/20 py-4 text-center">
                  <p className="text-blue-300 font-extralight text-base">
                    <Shield className="w-5 h-5 inline mr-2" />
                    Your data never trains our models. Ever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
