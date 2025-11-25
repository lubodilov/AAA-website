import React from 'react';
import { Calendar, CheckCircle2, Clock, FileText, Target } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

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

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-2">
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
          <p className="text-gray-400 font-extralight text-base">
            No pitch. No fluff. Just a clear action plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: Benefits */}
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-lg font-light text-white mb-3">What you'll get:</h3>

            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/20 to-red-700/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-gray-300 font-light text-lg flex-1 pt-2">{benefit.text}</p>
                </div>
              );
            })}

            {/* Micro-assurance */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-green-600/10 via-green-600/20 to-green-600/10 border border-green-500/30">
              <p className="text-green-300 font-extralight text-sm">
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                We reply within 24 business hours. Kickoff in 7–10 days after contract.
              </p>
            </div>
          </div>

          {/* Right: Calendly Embed */}
          <div className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-2 overflow-hidden">
            <div className="h-[600px] overflow-y-auto rounded-lg">
              {isOpen && (
                <InlineWidget
                  url="https://calendly.com/your-calendly-link"
                  styles={{
                    height: '100%',
                    minWidth: '100%'
                  }}
                  pageSettings={{
                    backgroundColor: '000000',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: 'ef4444',
                    textColor: 'ffffff'
                  }}
                  prefill={{
                    customAnswers: {
                      a1: '',
                      a2: '',
                      a3: '',
                      a4: '',
                      a5: '',
                      a6: '',
                      a7: '',
                      a8: ''
                    }
                  }}
                />
              )}
            </div>

            {/* Fallback for when Calendly isn't loaded */}
            {!isOpen && (
              <div className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-gray-400 font-light">Calendar loading...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
