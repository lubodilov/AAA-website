import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface ScheduleCallProps {
  isOpen: boolean;
}

export default function ScheduleCall({ isOpen }: ScheduleCallProps) {
  const CALENDLY_URL = 'https://calendly.com/lubo-daniel-dilov/30min';

  const openCalendlyInNewTab = () => {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      {/* Calendly embed attempt with fallback */}
      <div className="space-y-6">
        {/* Primary CTA - Open in new tab */}
        <div className="text-center">
          <button
            onClick={openCalendlyInNewTab}
            className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-light text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto shadow-xl shadow-red-600/25 hover:scale-105"
          >
            <Calendar className="w-6 h-6" />
            <span>Schedule Your Call</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
          <p className="text-white/70 text-sm mt-3">
            Opens in a new tab for the best scheduling experience
          </p>
        </div>

        {/* Alternative: Direct link */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 className="text-white font-light text-lg mb-3">Direct Link</h4>
          <p className="text-white/80 text-sm mb-4">
            You can also visit the link directly:
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm break-all underline"
          >
            {CALENDLY_URL}
          </a>
        </div>

        {/* Embedded iframe with error handling */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h4 className="text-white font-light">Quick Schedule (if available)</h4>
          </div>
          <div className="relative" style={{ height: '500px' }}>
            <iframe
              src={CALENDLY_URL}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a call with Lubo"
              className="rounded-b-xl"
              onError={() => {
                console.log('Calendly iframe failed to load');
              }}
            />
            {/* Fallback overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="text-center text-white/80">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Click the button above if calendar doesn't load</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-600/10 border border-amber-600/20 rounded-xl p-4">
          <h4 className="text-amber-400 font-light text-sm mb-2">📅 Scheduling Instructions</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• Choose a convenient 30-minute time slot</li>
            <li>• You'll receive a confirmation email with meeting details</li>
            <li>• We'll discuss your business goals and AI opportunities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}