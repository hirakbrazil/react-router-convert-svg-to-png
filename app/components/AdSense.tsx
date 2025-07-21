import React, { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface AdSenseProps {
  format?: 'horizontal' | 'responsive';
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  format = 'responsive', 
  style = {},
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Return null if AdSense config is missing
  if (!siteConfig.adsense?.pubId || !siteConfig.adsense?.adSlot) return null;

  // Configure styles and props based on format
  const isHorizontal = format === 'horizontal';
  const defaultStyle = isHorizontal 
    ? { display: 'block', minHeight: '100px', ...style }
    : { display: 'block', ...style };

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={defaultStyle}
      data-ad-client={siteConfig.adsense.pubId}
      data-ad-slot={siteConfig.adsense.adSlot}
      data-ad-format={isHorizontal ? 'horizontal' : 'auto'}
      data-full-width-responsive={isHorizontal ? 'false' : 'true'}
    />
  );
};

export default AdSense;
