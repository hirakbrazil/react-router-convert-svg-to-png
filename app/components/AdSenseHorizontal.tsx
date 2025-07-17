import React, { useEffect } from 'react';
import { siteConfig } from '@/config/site';

const AdSenseHorizontal: React.FC = () => {
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
      style={{ display: 'block', minHeight: '100px' }}
      data-ad-client={siteConfig.adsense.pubId}
      data-ad-slot={siteConfig.adsense.adSlot}
      data-ad-format="horizontal"
      data-full-width-responsive="false"
    ></ins>
  );
};

export default AdSenseHorizontal;
