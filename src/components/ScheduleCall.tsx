// src/components/ScheduleCall.tsx
import React, { useEffect, useRef, useState } from 'react';

export default function ScheduleCall({ isOpen }: { isOpen: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const initWidget = () => {
      if (containerRef.current && (window as any).Calendly) {
        // Clear previous children to prevent duplicates if toggled multiple times
        containerRef.current.innerHTML = ''; 
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/lubo-daniel-dilov/acquisition-audit-20-minute-strategy-call?hide_gdpr_banner=1&primary_color=c40000',
          parentElement: containerRef.current,
        });
        setTimeout(() => setIsLoaded(true), 500); // Give it a moment to render the iframe
      }
    };

    const scriptUrl = 'https://assets.calendly.com/assets/external/widget.js';
    let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;

    if (script) {
      // Script is already loaded
      if ((window as any).Calendly) {
        initWidget();
      } else {
        // Script is in DOM but hasn't finished loading yet
        const oldOnload = script.onload;
        script.onload = (e) => {
          if (oldOnload && typeof oldOnload === 'function') oldOnload.call(script, e);
          initWidget();
        };
      }
    } else {
      // Load script for the first time
      script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  return (
    <div className="relative w-full h-[700px]">
      {!isLoaded && isOpen && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading calendar...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        style={{ minWidth: '320px', height: '700px', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      />
    </div>
  );
}
