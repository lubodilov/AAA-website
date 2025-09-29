import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const faqs = [
    {
      q: 'How long does an AI engagement usually take?',
      a: 'Most discovery→prototype cycles take 2–4 weeks; production rollouts run 6–12 weeks depending on data access, integrations, and security reviews.',
    },
    {
      q: 'Can you work with our existing stack and data?',
      a: 'Yes. We integrate with popular clouds (AWS/GCP/Azure), data warehouses (Snowflake/BigQuery/Redshift), and product stacks. We start with read-only access and escalate as needed.',
    },
    {
      q: 'What about model privacy and IP?',
      a: 'We default to private deployments and strict data minimization. We can run models in your VPC and sign standard DPAs and IP assignments as required.',
    },
    {
      q: 'Do you support multi-language or region-specific models?',
      a: 'Absolutely. We fine-tune multilingual models and implement locale-aware routing for content, redaction, and guardrails.',
    },
    {
      q: 'How do we measure ROI?',
      a: 'We define KPI baselines in week one (time saved, conversion lift, SLAs) and ship dashboards that attribute gains to features and models.',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background tint to match site */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-thin text-white">
              Frequently Asked{' '}
              <span
                className="font-extralight italic"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Questions
              </span>
            </h1>
            <p className="text-white/70 mt-2 font-extralight">
              Quick answers about our process, privacy, and timelines.
            </p>
          </div>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition"
          >
            <span>Back to site</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 space-y-8">
          {faqs.map((item, idx) => (
            <div key={idx} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
              <h3 className="text-white font-light text-lg md:text-xl mb-2">{item.q}</h3>
              <p className="text-white/80 font-extralight leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-white/50 text-sm font-extralight mt-8">
          Didn’t find what you need?{' '}
          <Link to="/" className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline">
            open the contact form
          </Link>{' '}
          and we’ll help.
        </p>
      </div>
    </div>
  );
}
