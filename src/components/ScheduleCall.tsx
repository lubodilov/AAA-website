// src/components/ScheduleCall.tsx
import React from 'react';
import { InlineWidget } from 'react-calendly';

export default function ScheduleCall({ isOpen }: { isOpen: boolean }) {
  const CALENDLY_URL = 'https://calendly.com/lubo-daniel-dilov/30min'; // your link

  return (
    <div className="relative">
      {/* Optional: faint loader behind the widget */}
      <div className="absolute inset-0 bg-white/5 rounded-xl" />

      <div className={`relative ${isOpen ? 'opacity-100' : 'opacity-100'}`}>
        {/* Keep it mounted at all times */}
        <InlineWidget
          url={CALENDLY_URL}
          styles={{
            height: '70vh',
            width: '100%',
          }}
          pageSettings={{
            backgroundColor: '0b0b0b',
            primaryColor: 'ef4444',
            textColor: 'ffffff',
          }}
        />
      </div>
    </div>
  );
}
