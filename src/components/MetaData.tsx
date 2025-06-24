
import { useEffect } from 'react';

interface MetaDataProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export const MetaData = ({
  title = "Hearing Test App - Professional Online Hearing Assessment",
  description = "Take a comprehensive online hearing test from the comfort of your home. Professional-grade hearing assessment with detailed results and recommendations.",
  keywords = "hearing test, online hearing assessment, audiometry, hearing loss, hearing health, professional hearing test",
  ogTitle,
  ogDescription,
  ogImage = "https://your-domain.com/og-image.jpg",
  ogUrl = "https://your-domain.com/",
  twitterTitle,
  twitterDescription,
  twitterImage = "https://your-domain.com/twitter-card.jpg",
  canonical = "https://your-domain.com/"
}: MetaDataProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update canonical link
    const updateCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl, true);

    // Twitter tags
    updateMetaTag('twitter:title', twitterTitle || title);
    updateMetaTag('twitter:description', twitterDescription || description);
    updateMetaTag('twitter:image', twitterImage);

    // Canonical URL
    updateCanonical(canonical);
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, twitterTitle, twitterDescription, twitterImage, canonical]);

  return null;
};
