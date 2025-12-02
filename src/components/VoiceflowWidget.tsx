// src/components/VoiceflowWidget.tsx
import React, { useEffect } from 'react';

type Props = {
  projectID: string;
  url?: string;        // Voiceflow runtime
  versionID?: string;  // 'production' or version id
  embeddedTargetId?: string; // optional: if you want embedded mode (not floating)
};

declare global {
  interface Window {
    voiceflow?: any;
    __vfWidgetLoaded?: boolean;
  }
}

export default function VoiceflowWidget({
  projectID,
  url = 'https://general-runtime.voiceflow.com',
  versionID = 'production',
  embeddedTargetId, // omit for floating bubble
}: Props) {
  useEffect(() => {
    // Defer Voiceflow loading by 3 seconds to prioritize initial page load
    const loadTimer = setTimeout(() => {
      // Load Voiceflow bundle once
      if (window.__vfWidgetLoaded) return;

    const init = () => {
      if (!window.voiceflow?.chat?.load) {
        setTimeout(init, 50);
        return;
      }

      const options: any = {
        verify: { projectID },
        url,
        versionID,
        voice: {
          url: "https://runtime-api.voiceflow.com"
        },
      };

      // If you want embedded mode (mounted into a specific element):
      if (embeddedTargetId) {
        options.render = {
          mode: 'embedded',
          target: document.getElementById(embeddedTargetId),
        };
      }

      window.voiceflow.chat.load(options);

      window.__vfWidgetLoaded = true;
    };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
      script.defer = true;
      script.onload = init;
      script.onerror = () => console.error('Voiceflow widget failed to load.');
      document.head.appendChild(script);
    }, 3000);

    // Keep widget across unmounts (don't remove script or unset flag)
    return () => clearTimeout(loadTimer);
  }, [projectID, url, versionID, embeddedTargetId]);

  return null;
}
