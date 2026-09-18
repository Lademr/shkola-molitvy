import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  ogImage,
  canonical 
}: SEOHeadProps) {
  useEffect(() => {
    // Сохраняем оригинальные значения
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const originalKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
    const originalOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    const originalCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

    // Устанавливаем новые значения
    document.title = title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }

    if (keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywords);
      }
    }

    // Open Graph
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', title);
    }

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', description);
    }

    if (ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', ogImage);
      }
    }

    if (canonical) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      }
    }

    // Восстанавливаем оригинальные значения при размонтировании
    return () => {
      document.title = originalTitle;
      
      if (descMeta) {
        descMeta.setAttribute('content', originalDescription);
      }
      
      if (keywords) {
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
          keywordsMeta.setAttribute('content', originalKeywords);
        }
      }

      if (ogTitleMeta) {
        ogTitleMeta.setAttribute('content', originalOgTitle);
      }

      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', originalOgDescription);
      }

      if (ogImage) {
        const ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (ogImageMeta) {
          ogImageMeta.setAttribute('content', originalOgImage);
        }
      }

      if (canonical) {
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.setAttribute('href', originalCanonical);
        }
      }
    };
  }, [title, description, keywords, ogImage, canonical]);

  return null;
}
