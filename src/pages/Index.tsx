
import React from "react";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";
import ClipboardImage from "@/components/ClipboardImage";
import HomepageContent from "@/components/HomepageContent";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paste Image to Download",
    "description": "Easily download copied images with Paste Image to Download tool.",
    "url": "https://pasteimagetodownload.com/",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Paste Image to Download"
    }
  };

  return (
    <>
      <SEO
        title="Paste Image to Download"
        description="Easily download copied images with Paste Image to Download tool."
        canonicalUrl="https://pasteimagetodownload.com/"
        robots="max-image-preview:large"
        ogTitle="Paste Image to Download"
        ogDescription="Easily download copied images with Paste Image to Download tool."
        ogUrl="https://pasteimagetodownload.com/"
        ogImage="https://pasteimagetodownload.com/banner.jpg"
        ogType="website"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseResponsive />
          <CalculatorHeader />
          <div className="border border-border bg-card dark:bg-card rounded-xl p-6">
            <ClipboardImage />
          </div>
          <AdSenseResponsive />
          <HomepageContent />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default Index;
