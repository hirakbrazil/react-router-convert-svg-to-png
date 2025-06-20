
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType,
  structuredData,
}) => {
  const defaultTitle = 'Paste Image to Download';
  const defaultDescription = 'Easily download copied images with Paste Image to Download tool.';
  const defaultImage = 'https://pasteimagetodownload.com/banner.jpg';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Enhanced meta tags for better SEO */}
      <meta name="author" content="Paste Image to Download" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph tags */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:title" content={ogTitle || title || defaultTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:site_name" content="Paste Image to Download" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title || defaultTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Google AdSense and Analytics */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3677847561110212"
        crossOrigin="anonymous"
      ></script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-RG2EBW5W0Y"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RG2EBW5W0Y');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
