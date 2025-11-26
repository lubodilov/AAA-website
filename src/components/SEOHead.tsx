import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = 'AI Automation & Sales Intelligence Systems | Upgrade Vision AI',
  description = 'Transform your B2B acquisition with AI-powered automation. Proven systems for sales teams, lead operations, and business intelligence. +31% qualified meetings, 7.2h saved per rep weekly.',
  keywords = 'AI automation, sales intelligence, B2B sales automation, CRM optimization, lead generation automation',
  canonical,
  ogImage = 'https://www.upgradevision.ai/upgrade_vision_ai.png',
}: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update description
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', `https://www.upgradevision.ai${location.pathname}`, true);

    // Update Twitter Card tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || `https://www.upgradevision.ai${location.pathname}`;
  }, [title, description, keywords, canonical, ogImage, location.pathname]);

  return null;
}
