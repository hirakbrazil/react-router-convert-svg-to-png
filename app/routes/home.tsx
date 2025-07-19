import React from "react";
import type { Route } from "./+types/home";
import Footer from "@/components/Footer";
import HeaderContent from "@/components/HeaderContent";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";
import SvgToPngConverter from "@/components/SvgToPngConverter";
import HomepageContent from "@/components/HomepageContent";
import { CustomMeta } from "@/components/CustomMeta";

export default function Home() {
  return (
    <>
      <CustomMeta
        title="Convert SVG to PNG"
        description="Convert SVG files to high-quality PNG images with smart resizing. Free online SVG to PNG converter with 4000px quality output."
        canonicalUrl="/"
        robots="max-image-preview:large"
        ogTitle="Convert SVG to PNG"
        ogDescription="Convert SVG files to high-quality PNG images with smart resizing. Free online SVG to PNG converter with 4000px quality output."
        ogUrl="/"
        ogImage="/banner.jpg"
        ogType="website"
      />
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-8 lg:mr-[300px]">
        <AdSenseResponsive />
        <HeaderContent />
        <div className="border border-border bg-card dark:bg-card rounded-xl p-6">
          <SvgToPngConverter />
        </div>
        <AdSenseResponsive />
        <HomepageContent />
        <AdSenseResponsive />
        <Footer />
      </div>
      <DesktopSidebar />
    </div>
    </>
  );
};
