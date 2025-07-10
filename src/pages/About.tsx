
import React from "react";
import Footer from "@/components/Footer";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";
import { Sparkles, Shield, Globe } from "lucide-react";

const About = () => {
  useTheme();
  
  return (
    <>
      <SEO
        title="About Convert SVG to PNG"
        description="Learn about Convert SVG to PNG tool. Transform your SVG files into high-quality PNG images with smart resizing and quality options."
        canonicalUrl="/about"
        robots="max-image-preview:large"
        ogTitle="About Convert SVG to PNG"
        ogDescription="Learn about Convert SVG to PNG tool. Transform your SVG files into high-quality PNG images with smart resizing and quality options."
        ogUrl="/about"
        ogImage="/banner.jpg"
        ogType="article"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              About Convert SVG to PNG
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-lg">
              Welcome to Convert SVG to PNG, a powerful and user-friendly tool designed to transform your SVG files into high-quality PNG images with advanced features and customization options.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Drag-and-drop SVG file upload with instant preview</li>
                <li>Batch conversion - process multiple SVG files at once</li>
                <li>Smart quality enhancement up to 4000px for crisp results</li>
                <li>Custom width settings with automatic aspect ratio preservation</li>
                <li>Live preview comparison with interactive slider</li>
                <li>Download individual files or bulk ZIP download</li>
                <li>Dark and light mode for comfortable viewing</li>
                <li>Real-time conversion progress tracking</li>
                <li>File size and dimension information display</li>
                <li>Cross-browser compatibility</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Privacy & Security
              </h2>
              <p className="mb-4">
                Your privacy is our top priority. All SVG processing and PNG conversion happens entirely in your browser using client-side JavaScript. Your files never leave your device or get uploaded to any server, ensuring complete privacy and security of your content.
              </p>
              <p>
                This offline processing approach means your sensitive designs, logos, and graphics remain completely confidential while still providing professional-quality conversion results.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Technical Capabilities
              </h2>
              <p className="mb-4">
                Our converter supports all standard SVG features and automatically handles complex graphics, text, gradients, and effects. The smart resizing algorithm ensures your converted PNG images maintain perfect quality whether you're working with small icons or large illustrations.
              </p>
              <p>
                Compatible with all modern browsers including Chrome, Firefox, Safari, and Edge. No software installation or plugins required - just open your browser and start converting.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Perfect For</h2>
              <div className="space-y-3">
                <p><strong>Web Developers:</strong> Convert SVG icons and graphics for websites and applications that require PNG format.</p>
                <p><strong>Designers:</strong> Transform vector graphics into raster images for presentations, mockups, and client deliverables.</p>
                <p><strong>Print Professionals:</strong> Generate high-resolution PNG files for print materials and marketing collateral.</p>
                <p><strong>Social Media:</strong> Create PNG versions of logos and graphics for platforms that don't support SVG format.</p>
              </div>
            </div>

            <p>
              Start using Convert SVG to PNG today - it's free, fast, secure, and designed to provide the best SVG conversion experience possible!
            </p>
          </div>
          <AdSenseResponsive />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default About;
