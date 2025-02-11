
import React from "react";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";
import ImageUploader from "@/components/ImageUploader";
import ImageToClipContent from "@/components/ImageToClipContent";

const ImageToClipboard = () => {
  return (
    <>
      <SEO
        title="Image to Clipboard - Upload and Copy Images"
        description="Upload images or fetch from URL and copy them directly to your clipboard with our free Image to Clipboard tool."
        canonicalUrl="https://clipboard-to-image.toolyoulove.com/imagetoclipboard"
        robots="max-image-preview:large"
        ogTitle="Image to Clipboard - Upload and Copy Images"
        ogDescription="Upload images or fetch from URL and copy them directly to your clipboard with our free Image to Clipboard tool."
        ogUrl="https://clipboard-to-image.toolyoulove.com/imagetoclipboard"
        ogImage="https://clipboard-to-image.toolyoulove.com/banner.jpg"
        ogType="website"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Image to Clipboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Copy image to your clipboard from a file or URL
            </p>
          </div>
          <div className="border border-border bg-card dark:bg-card rounded-xl p-6">
            <ImageUploader />
          </div>
          <ImageToClipContent />
          <AdSenseResponsive />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default ImageToClipboard;

