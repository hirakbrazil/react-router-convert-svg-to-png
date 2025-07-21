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

  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonicalUrl && (
        <link rel="canonical" href={resolveUrl(canonicalUrl)} />
      )}
      {robots && <meta name="robots" content={robots} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogUrl && <meta property="og:url" content={resolveUrl(ogUrl)} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogImage && <meta property="og:image" content={resolveUrl(ogImage)} />}
      <meta property="og:site_name" content={siteConfig.name} />
    </>
  );
};
