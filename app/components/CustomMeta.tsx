import React from "react";
import { siteConfig } from "@/config/site";

interface CustomMetaProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export const CustomMeta: React.FC<CustomMetaProps> = ({
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
  const resolveUrl = (path?: string) => {
    if (!path) return undefined;
    if (path.startsWith("http")) return path;
    return `${siteConfig.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  };

  // Use title, description, and canonicalUrl as fallbacks for OG properties
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || canonicalUrl;

  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonicalUrl && (
        <link rel="canonical" href={resolveUrl(canonicalUrl)} />
      )}
      {robots && <meta name="robots" content={robots} />}
      {finalOgTitle && <meta property="og:title" content={finalOgTitle} />}
      {finalOgDescription && (
        <meta property="og:description" content={finalOgDescription} />
      )}
      {finalOgUrl && <meta property="og:url" content={resolveUrl(finalOgUrl)} />}
      {ogImage && <meta property="og:image" content={resolveUrl(ogImage)} />}
      {ogType && <meta property="og:type" content={ogType} />}
      <meta property="og:site_name" content={siteConfig.name} />
    </>
  );
};
