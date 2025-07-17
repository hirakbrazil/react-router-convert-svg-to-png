import React, { useEffect } from 'react';
import { siteConfig } from '@/config/site';

const AdSenseResponsive: React.FC = () => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!siteConfig.adsense?.pubId || !siteConfig.adsense?.adSlot) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={siteConfig.adsense.pubId}
      data-ad-slot={siteConfig.adsense.adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSenseResponsive;
