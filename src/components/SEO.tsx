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
  ogType?: 'website' | 'article'; // Support for dynamic og:type
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
}) => {
  return (
    <Helmet>

      {title && <title>{title}</title>}

      {description && <meta name="description" content={description} />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {robots && <meta name="robots" content={robots} />}

      {ogType && <meta property="og:type" content={ogType} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="SWP Calculator" />
    </Helmet>
  );
};

export default SEO;
