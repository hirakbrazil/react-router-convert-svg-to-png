import React from "react";
import type { Route } from "./+types/home";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AdSense from "@/components/AdSense";
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
        ogImage="/banner.jpg"
        ogType="website"
      />
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
        <AdSense format="horizontal" />
        <Header />
          <main>
           <div className="border border-border bg-card dark:bg-card rounded-xl p-6">
             <SvgToPngConverter />
           </div>
           <AdSense format="responsive" />
           <HomepageContent />
           <AdSense format="responsive" />
          </main>
        <Footer />
      </div>
      <DesktopSidebar />
    </div>
    </>
  );
};
