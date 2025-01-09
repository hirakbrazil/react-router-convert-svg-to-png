import React, { useEffect } from "react";

const AdSenseHorizontal: React.FC = () => {
  useEffect(() => {
    // Check if adsbygoogle is available and load ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px" }}
        data-ad-client="ca-pub-5161705954627943"
        data-ad-slot="1345119377"
        data-ad-format="horizontal"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
};

export default AdSenseHorizontal;
