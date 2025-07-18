// app/components/CustomMeta.tsx
import React from "react";
import { siteConfig } from "@/config/site";

interface MetaProps {
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

export function CustomMeta({
  title,
  description,
  canonicalUrl,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType,
}: MetaProps) {
  const resolveUrl = (path?: string) => {
    if (!path) return undefined;
    if (path.startsWith("http")) return path;
    return `${siteConfig.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={resolveUrl(canonicalUrl)} />}
      {robots && <meta name="robots" content={robots} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogUrl && <meta property="og:url" content={resolveUrl(ogUrl)} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={resolveUrl(ogImage)} />}
      <meta property="og:site_name" content={siteConfig.name} />

      {/* AdSense script */}
      {siteConfig.adsense?.pubId && (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.pubId}`}
          crossOrigin="anonymous"
        ></script>
      )}

      {/* Google Analytics GA4 */}
      {siteConfig.analytics?.ga4MeasurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4MeasurementId}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics.ga4MeasurementId}');
            `,
            }}
          />
        </>
      )}
    </>
  );
}
