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
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-normal text-white leading-tight mb-2">
            <span className="text-green-600">Zero risk.</span> Maximum security.
          </h2>
          <p className="text-gray-400 text-base font-light">
            We protect your business like it's our own
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* No-Risk Rules */}
          <div>
            <h3 className="text-xl font-normal text-white mb-4">No-risk rules</h3>

            <div className="space-y-4">
              {noRiskRules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={index}
                    className="group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center border border-green-500/10 group-hover:border-green-500/30 transition-all duration-300">
                        <Icon className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-1">{rule.title}</h4>
                        <p className="text-gray-300 font-normal text-base leading-relaxed">
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
            <h3 className="text-xl font-normal text-white mb-4">Security stance</h3>

            <div className="py-3">
              <div className="grid grid-cols-1 gap-3 mb-4">
                {securityPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center border border-blue-500/10">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-gray-200 font-medium text-base">{point.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="py-3 border-t border-white/5">
                <p className="text-gray-400 font-extralight text-sm leading-relaxed mb-3">
                  <span className="text-white font-light">Pentest specialists</span> review critical flows on request.
                  We maintain SOC 2 Type II equivalent controls.
                </p>

                <div className="bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 border-y border-blue-500/20 py-3 text-center">
                  <p className="text-blue-300 font-extralight text-sm">
                    <Shield className="w-4 h-4 inline mr-2" />
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
