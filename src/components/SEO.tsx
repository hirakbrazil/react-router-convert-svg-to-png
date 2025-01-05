import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, canonicalUrl, socialMeta, robots = "max-image-preview:large" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Social Meta */}
      {socialMeta && (
        <>
          <meta property="og:type" content={socialMeta.type || "website"} />
          <meta property="og:url" content={socialMeta.url} />
          <meta property="og:title" content={socialMeta.title} />
          <meta property="og:description" content={socialMeta.description} />
          <meta property="og:image" content={socialMeta.image} />
          <meta property="og:site_name" content="SWP Calculator" />
        </>
      )}
    </Helmet>
  );
};

export default SEO;
