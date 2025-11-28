import React, { useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, FileText, Target } from 'lucide-react';

interface BookAuditSlideProps {
  isOpen?: boolean;
}

export default function BookAuditSlide({ isOpen }: BookAuditSlideProps) {
  const benefits = [
    { icon: Target, text: "See where your revenue is leaking" },
    { icon: FileText, text: "Get a prioritized 3-item action plan" },
    { icon: CheckCircle2, text: "Learn which 1–2 systems pay back fastest" },
    { icon: Clock, text: "Leave with clarity in 20 minutes" }
  ];

  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight mb-2 sm:mb-3">
            See where your revenue is leaking
            {' '}—in{' '}
            <span
              className="font-normal"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              20 minutes
            </span>
          </h2>
          <p className="text-gray-400 font-extralight text-sm sm:text-base">
            No pitch. No fluff. Just a clear action plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left: Benefits */}
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4 order-2 lg:order-1">
            <h3 className="text-base sm:text-lg font-light text-white mb-2 sm:mb-3">What you'll get:</h3>

            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-2.5 sm:space-x-3">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-600/20 to-red-700/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </div>
                  <p className="text-gray-300 font-light text-sm sm:text-base md:text-lg flex-1 pt-1.5 sm:pt-2">{benefit.text}</p>
                </div>
              );
            })}

            {/* Micro-assurance */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-600/10 via-green-600/20 to-green-600/10 border border-green-500/30">
              <p className="text-green-300 font-extralight text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                We reply within 24 business hours. Kickoff in 7–10 days after contract.
              </p>
            </div>
          </div>

          {/* Right: Calendly Embed */}
          <div className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border border-white/5 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 overflow-hidden order-1 lg:order-2">
            <div className="h-[500px] sm:h-[550px] md:h-[600px] overflow-y-auto rounded-lg">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/lubo-daniel-dilov/acquisition-audit-20-minute-strategy-call?hide_gdpr_banner=1&primary_color=c40000"
                style={{ minWidth: '280px', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
