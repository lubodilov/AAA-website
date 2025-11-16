import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSlide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "We tried AI; it didn't move revenue.",
      answer: "Because it wasn't tied to meetings/cycle/CAC. Ours is. Every system we build has a direct line to pipeline metrics. We refuse vanity AI that can't prove ROI within 30–60 days."
    },
    {
      question: "Will my team actually use it?",
      answer: "We co-design workflows with your team, provide hands-on training, and track adoption weekly. No adoption = no scale. We don't move to the next phase until your team is using the system daily."
    },
    {
      question: "How fast to results?",
      answer: "Most good-fit clients see measurable impact in 30–60 days post-kickoff. That means +20–50% more qualified meetings, 30–70% less manual work, or cleaner pipeline visibility. Timelines depend on your baseline and team size."
    },
    {
      question: "Who maintains it?",
      answer: "You choose. We can hand over complete documentation and playbooks to your team, or we can run ongoing optimization on a monthly retainer. Most clients start with handover and return for new use cases."
    },
    {
      question: "Data residency & compliance?",
      answer: "We adapt to your stack and requirements. We sign DPAs, maintain audit logs, and offer EU-friendly hosting options (Azure OpenAI, EU data centers). GDPR, SOC 2, and HIPAA-aligned practices are standard."
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/5 z-0"></div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight mb-6">
            Objections <span className="text-gray-500">→</span> <span className="text-red-600">Answers</span>
          </h2>
          <p className="text-gray-400 text-xl font-light">
            The 5 questions every serious buyer asks
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl border-b border-white/5 hover:border-red-600/20 transition-all duration-300 overflow-hidden pb-2"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between p-6 text-left"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-red-600/20 to-red-700/20 flex items-center justify-center mt-1">
                      <HelpCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-normal text-xl mb-1">{faq.question}</h3>
                      {isOpen && (
                        <p className="text-gray-400 font-light text-lg leading-relaxed mt-4">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm font-extralight">
            Still have questions? Let's talk.
          </p>
        </div>
      </div>
    </section>
  );
}
