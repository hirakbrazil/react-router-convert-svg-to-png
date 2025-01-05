import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';  // Support for dynamic og:type
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  robots = "index, follow",
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType = 'website',  // Default to 'website' for most pages
}) => {
  return (
    <Helmet>
      {/* Title and Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots meta tag */}
      <meta name="robots" content={robots} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />  {/* Dynamic og:type */}
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || "https://swp-calculator.mutualfundjournal.in/banner.jpg"} />
      <meta property="og:site_name" content="SWP Calculator" />
    </Helmet>
  );
};

export default SEO;
