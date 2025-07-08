import React from "react";
import Footer from "@/components/Footer";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";
import { Sparkles, Shield, Globe } from "lucide-react";

export default function Page() {
  useTheme();
  
  return (
    <>
      <SEO
        title="About Paste Image to Download"
        description="Learn about Paste Image to Download tool. Convert clipboard images instantly with our user-friendly tool."
        canonicalUrl="/about"
        robots="max-image-preview:large"
        ogTitle="About Paste Image to Download"
        ogDescription="Learn about Paste Image to Download tool. Download clipboard images instantly with our user-friendly tool."
        ogUrl="/about"
        ogImage="/banner.jpg"
        ogType="article"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              About Paste Image to Download
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-lg">
              Welcome to Paste Image to Download, a simple yet powerful tool designed to help you download clipboard images instantly.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quick clipboard-to-image conversion with just one paste</li>
                <li>Keyboard shortcut support (Ctrl+V / Cmd+V)</li>
                <li>Dark and light mode for comfortable viewing</li>
                <li>Local processing - your images never leave your browser</li>
                <li>Cross-browser compatibility</li>
                <li>Instant image downloads in PNG format</li>
                <li>No registration required</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Privacy & Security
              </h2>
              <p className="mb-4">
                Your privacy is our priority. All image processing happens locally in your browser - we never store or transmit your images to any server. This ensures your content remains completely private and secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Browser Support
              </h2>
              <p className="mb-4">
                Our tool works seamlessly across all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.
              </p>
            </div>

            <p>
              Start using Paste Image to Download today - it's free, fast, and focused on providing the best image conversion experience possible!
            </p>
          </div>
          <AdSenseResponsive />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
}