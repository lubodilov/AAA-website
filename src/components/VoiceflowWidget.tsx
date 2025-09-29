// src/components/VoiceflowWidget.tsx
import React, { useEffect } from 'react';

type Props = {
  projectID: string;
  url?: string;        // Voiceflow runtime
  versionID?: string;  // 'production' or version id
  stylesheetUrl?: string; // <-- NEW: your custom CSS file (absolute or public path)
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
  stylesheetUrl = '/voiceflow-custom.css', // default to a file in /public
  embeddedTargetId, // omit for floating bubble
}: Props) {
  useEffect(() => {
    // (A) Preload your stylesheet so it’s ready before the widget paints (reduces FOUC)
    if (stylesheetUrl) {
      const preload = document.createElement('link');
      preload.rel = 'preload';
      preload.as = 'style';
      preload.href = stylesheetUrl;
      document.head.appendChild(preload);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = stylesheetUrl;
      document.head.appendChild(link);
    }

    // (B) Load Voiceflow bundle once
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
        assistant: {
          // This is how we inject our CSS overrides
          stylesheet: stylesheetUrl,
        },
      };

      // If you want embedded mode (mounted into a specific element):
      if (embeddedTargetId) {
        options.render = {
          mode: 'embedded',
          target: document.getElementById(embeddedTargetId),
        };
      }

      // (C) IMPORTANT: wait for the widget to finish initializing
      window.voiceflow.chat
        .load(options)
        .then(() => {
          // 🔥 You can safely manipulate DOM/CSS now or do programmatic actions
          // Example: proactively start a conversation
          // window.voiceflow.chat.proactive.push({ type: 'launch' });

          // Example: tweak container at runtime (in addition to CSS file)
          const root =
            document.querySelector('[data-testid="vf-chat"]') ||
            document.querySelector('.vfrc-widget') || // floating bubble
            document.querySelector('.vfrc-container'); // fallback

          if (root instanceof HTMLElement) {
            // minor style nudges if desired
            root.style.setProperty('--uv-accent', '#ef4444');
            // root.style.zIndex = '70';
          }
        });

      window.__vfWidgetLoaded = true;
    };

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.defer = true;
    script.onload = init;
    script.onerror = () => console.error('Voiceflow widget failed to load.');
    document.head.appendChild(script);

    // Keep widget across unmounts (don’t remove script or unset flag)
  }, [projectID, url, versionID, stylesheetUrl, embeddedTargetId]);

  return null;
}
