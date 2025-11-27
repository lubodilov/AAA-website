// src/components/ScheduleCall.tsx
import React, { useEffect, useState } from 'react';

export default function ScheduleCall({ isOpen }: { isOpen: boolean }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Only load Calendly script when modal is actually opened
    if (!isOpen) return;

    // Check if script is already loaded
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, [isOpen]);

  return (
    <div className="relative">
      {!scriptLoaded && isOpen && (
        <div className="flex items-center justify-center h-[700px]">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading calendar...</p>
          </div>
        </div>
      )}
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/lubo-daniel-dilov/acquisition-audit-20-minute-strategy-call?hide_gdpr_banner=1&primary_color=c40000"
        style={{ minWidth: '320px', height: '700px', opacity: scriptLoaded ? 1 : 0 }}
      />
    </div>
  );
}
