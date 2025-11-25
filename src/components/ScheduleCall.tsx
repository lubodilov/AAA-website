// src/components/ScheduleCall.tsx
import React, { useEffect } from 'react';

export default function ScheduleCall({ isOpen }: { isOpen: boolean }) {
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
    <div className="relative">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/lubo-daniel-dilov/acquisition-audit-20-minute-strategy-call?hide_gdpr_banner=1&primary_color=c40000"
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  );
}
