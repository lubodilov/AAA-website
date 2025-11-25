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

      <div className="relative max-w-4xl mx-auto z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
            <span className="text-gray-600">Objections</span> <span className="text-red-600 font-normal">→ Answers</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-normal text-lg mb-3 tracking-tight">{faq.question}</h3>
                    {isOpen && (
                      <p className="text-gray-500 font-light text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 flex-shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
