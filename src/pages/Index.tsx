
import React from "react";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";
import ClipboardImage from "@/components/ClipboardImage";

const Index = () => {
  return (
    <>
      <SEO
        title="Clipboard to Image - Paste Image to Download"
        description="Easily download copied clipboard images with our free Clipboard to Image tool. Simply Paste Image to Download!"
        canonicalUrl="https://clipboard-to-image.toolyoulove.com/"
        robots="max-image-preview:large"
        ogTitle="Clipboard to Image - Paste Image to Download"
        ogDescription="Easily download copied clipboard images with our free Clipboard to Image tool. Simply Paste Image to Download!"
        ogUrl="https://clipboard-to-image.toolyoulove.com/"
        ogImage="https://clipboard-to-image.toolyoulove.com/banner.jpg"
        ogType="website"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <CalculatorHeader />
          <div className="border border-border bg-card dark:bg-card rounded-xl p-6">
            <ClipboardImage />
          </div>
          <AdSenseResponsive />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default Index;
