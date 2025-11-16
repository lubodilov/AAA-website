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
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-10 w-full flex flex-col justify-center">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
            <span
              className="font-normal"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Zero risk.
            </span>
            {' '}Maximum security.
          </h2>
          <p className="text-gray-400 font-extralight text-lg">
            We protect your business like it's our own
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* No-Risk Rules */}
          <div>
            <h3 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-400" />
              <span>No-risk rules</span>
            </h3>

            <div className="space-y-4">
              {noRiskRules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border border-green-900/20 hover:border-green-600/40 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-600/20 to-green-700/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-light text-lg mb-2">{rule.title}</h4>
                        <p className="text-gray-400 font-extralight text-sm leading-relaxed">
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
            <h3 className="text-xl font-light text-white mb-6 flex items-center space-x-3">
              <Lock className="w-5 h-5 text-blue-400" />
              <span>Security stance</span>
            </h3>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border border-blue-900/20">
              <div className="grid grid-cols-1 gap-4 mb-6">
                {securityPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-700/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-gray-300 font-light">{point.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-gray-400 font-extralight text-sm leading-relaxed">
                  <span className="text-white font-light">Pentest specialists</span> review critical flows on request.
                  We maintain SOC 2 Type II equivalent controls.
                </p>
              </div>
            </div>

            {/* Additional Security Note */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-600/20 to-blue-600/10 border border-blue-500/30">
              <p className="text-blue-300 font-extralight text-sm text-center">
                <Shield className="w-4 h-4 inline mr-2" />
                Your data never trains our models. Ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
