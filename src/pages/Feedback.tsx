
import React from "react";
import Footer from "@/components/Footer";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";

const Feedback = () => {
  useTheme();

  return (
    <>
      <SEO
        title="Feedback - Paste Image to Download"
        description="Share your feedback about Paste Image to Download. Help us improve your image conversion experience."
        canonicalUrl="https://pasteimagetodownload.com/feedback"
        robots="max-image-preview:large"
        ogTitle="Feedback - Paste Image to Download"
        ogDescription="Share your feedback about Paste Image to Download. Help us improve your image conversion experience."
        ogUrl="https://pasteimagetodownload.com/feedback"
        ogImage="https://pasteimagetodownload.com/banner.jpg"
        ogType="article"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Feedback
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-lg">
              We value your feedback! Your input helps us improve and provide a better image conversion experience with our Paste Image to Download tool.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p>
                For any queries, feedback, suggestions, or bug reports, please email us at:{" "}
                <a
                  href="mailto:info@pasteimagetodownload.com"
                  className="text-primary hover:underline"
                >
                  info@pasteimagetodownload.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">What We'd Love to Hear About</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Image conversion quality and performance</li>
                <li>User interface and experience</li>
                <li>Browser compatibility issues</li>
                <li>Additional features you'd like to see</li>
                <li>Any bugs or issues you've encountered</li>
                <li>Suggestions for improvement</li>
              </ul>
            </div>

            <p>
              Thank you for helping us make Paste Image to Download better for everyone!
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

export default Feedback;
