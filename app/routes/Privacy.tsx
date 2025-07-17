
import React from "react";
import type { Route } from "./+types/Privacy";
import { Link } from "react-router";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Lock, Eye, Server, Cookie, ShieldCheck, BadgeCheck, Mail, History } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - Convert SVG to PNG" },
    { 
      name: "description", 
      content: "Learn about our privacy practices. All SVG to PNG conversions happen locally in your browser - your files never leave your device." 
    },
    { name: "robots", content: "max-image-preview:large" },
    { property: "og:title", content: "Privacy Policy - Convert SVG to PNG" },
    { 
      property: "og:description", 
      content: "Learn about our privacy practices. All SVG to PNG conversions happen locally in your browser - your files never leave your device." 
    },
    { property: "og:url", content: "/privacy" },
    { property: "og:image", content: "/banner.jpg" },
    { property: "og:type", content: "article" },
  ];
}

const Privacy = () => {
  return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is our priority. Learn how we protect your data.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: July 11, 2025
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Shield className="w-6 h-6 text-primary" />
                Privacy First Approach
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Convert SVG to PNG is built with privacy as a fundamental principle. We believe your files and data should remain private and secure at all times.
                </p>
                <p>
                  Our service processes all SVG to PNG conversions directly in your web browser using client-side JavaScript. This means your files never leave your device and are never uploaded to our servers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Lock className="w-6 h-6 text-primary" />
                Data We Do NOT Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your SVG files or converted PNG images</li>
                  <li>File names, content, or metadata</li>
                  <li>Personal information unless voluntarily provided</li>
                  <li>Login credentials (no account required)</li>
                  <li>Payment information (service is free)</li>
                  <li>Location data beyond general geographic region</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Eye className="w-6 h-6 text-primary" />
                Data We May Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may collect limited, anonymous data to improve our service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Anonymous usage analytics (page views, feature usage)</li>
                  <li>General geographic region for service optimization</li>
                  <li>Browser type and version for compatibility</li>
                  <li>Technical error logs (without personal information)</li>
                  <li>Feedback you voluntarily provide through our contact email</li>
                </ul>
                <p>
                  All collected data is aggregated and anonymized. We cannot and do not identify individual users.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Server className="w-6 h-6 text-primary" />
                Third-Party Services
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our website may use the following third-party services:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 text-foreground">Google Analytics</h3>
                    <p>
                      We may use Google Analytics to understand how visitors use our site. Google Analytics collects anonymous information about your visit but does not identify you personally.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-foreground">Google AdSense</h3>
                    <p>
                      We may display advertisements through Google AdSense. Google may use cookies to serve ads based on your visits to this and other websites.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Cookie className="w-6 h-6 text-primary" />
                Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use minimal cookies to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your theme preference (dark/light mode)</li>
                  <li>Provide basic analytics (if enabled)</li>
                  <li>Enable advertising services (if applicable)</li>
                </ul>
                <p>
                  You can disable cookies in your browser settings, though some features may not work properly.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Since all file processing happens in your browser, your files are inherently secure:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Files never leave your device</li>
                  <li>No server-side storage or processing</li>
                  <li>Conversion happens entirely offline after page load</li>
                  <li>Website served over HTTPS for secure communication</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <BadgeCheck className="w-6 h-6 text-primary" />
                Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our service without providing personal information</li>
                  <li>Disable cookies and analytics in your browser</li>
                  <li>Contact us with privacy-related questions</li>
                  <li>Request information about any data we may have collected</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Mail className="w-6 h-6 text-primary" />
                Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us through our <Link to="/feedback" className="text-primary hover:underline">feedback page</Link> to email us directly.
                </p>
                <p>
                  We are committed to addressing any privacy concerns promptly and transparently.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                <History className="w-6 h-6 text-primary" />
                Changes to This Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
                </p>
                <p>
                  We encourage you to review this policy periodically to stay informed about how we protect your privacy.
                </p>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
  );
};

export default Privacy;
