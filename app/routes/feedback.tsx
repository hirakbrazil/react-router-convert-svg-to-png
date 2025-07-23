
import React from "react";
import type { Route } from "./+types/feedback";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import DesktopSidebar from "@/components/DesktopSidebar";
import { Mail, HeartHandshake, Lightbulb } from "lucide-react";
import { CustomMeta } from "@/components/CustomMeta";

export default function Feedback() {
  return (
    <>
      <CustomMeta
        title="Feedback - Convert SVG to PNG"
        description="Share your feedback about Convert SVG to PNG. Help us improve your SVG to PNG conversion experience with better features and functionality."
        canonicalUrl="/feedback"
        robots="max-image-preview:large"
        ogType="article"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSense format="horizontal" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Feedback
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              We value your feedback! Your input helps us improve and provide a better SVG to PNG conversion experience with enhanced features and functionality.
            </p>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                Contact Information</h2>
              <p className="text-muted-foreground">
                For any queries, feedback, suggestions, or bug reports regarding our SVG to PNG converter, please email us at:{" "}
                <a
                  href="mailto:info@convertsvgtopng.net"
                  className="text-primary hover:underline font-semibold"
                >
                  info@convertsvgtopng.net
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                <HeartHandshake className="w-6 h-6 text-primary" />
                What We'd Love to Hear About</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>SVG to PNG conversion quality and accuracy</li>
                <li>Batch processing performance and speed</li>
                <li>Browser compatibility issues or concerns</li>
                <li>SVG file format support and compatibility</li>
                <li>Additional conversion features you'd like to see</li>
                <li>Any bugs, errors, or technical issues encountered</li>
                <li>Suggestions for improving the conversion workflow</li>
                <li>Performance feedback for large file processing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
                Help Us Improve</h2>
              <p className="mb-4 text-muted-foreground">
                Whether you're a web developer, graphic designer, or casual user, your experience matters to us. Let us know how we can make Convert SVG to PNG work better for your specific needs and use cases.
              </p>
              <p className="text-muted-foreground">
                We're constantly working to enhance our conversion algorithms, improve file format support, and add new features that make your workflow more efficient.
              </p>
            </div>

            <p className="text-muted-foreground">
              Thank you for helping us make Convert SVG to PNG the best free SVG conversion tool available!
            </p>
          </div>
          <AdSense format="responsive" />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};
