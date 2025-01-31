import React from "react";
import Footer from "@/components/Footer";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";

const About = () => {
  useTheme();
  
  return (
    <>
      <SEO
        title="About SIP Calculator"
        description="Discover the purpose and features of SIP Calculator. Learn why our tool is essential for your financial planning."
        canonicalUrl="https://sip-calculator.mutualfundjournal.in/about"
        robots="max-image-preview:large"
        ogTitle="About SIP Calculator"
        ogDescription="Discover the purpose and features of SIP Calculator. Learn why our tool is essential for your financial planning."
        ogUrl="https://sip-calculator.mutualfundjournal.in/about"
        ogImage="https://sip-calculator.mutualfundjournal.in/banner.jpg"
        ogType="article"
      />
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
        <AdSenseHorizontal />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            About SIP Calculator
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-lg">
            Welcome to our advanced Systematic Investment Plan (SIP) Calculator, a comprehensive tool designed to make investment planning accessible for everyone.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our SIP Calculator?</h2>
            <p className="mb-4">Our calculator stands out by offering advanced features in one place, completely free of charge. Unlike other calculators, we provide:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Multi-currency support for global investors</li>
              <li>Real-time calculations with instant updates</li>
              <li>Step-up SIP and inflation adjustment options</li>
              <li>XIRR calculations for better return analysis</li>
              <li>User-friendly interface with dark/light mode</li>
              <li>Responsive design for all devices</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="mb-4">We believe that investment planning should be accessible to everyone. Our mission is to empower individuals to make informed investment decisions by providing:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free access to advanced financial tools</li>
              <li>Clear and transparent calculations</li>
              <li>Educational resources about SIP investing</li>
              <li>Regular updates and improvements based on user feedback</li>
            </ul>
          </div>

          <p>
            By making these tools freely available, we aim to help investors better understand and plan their systematic investments, ultimately contributing to their financial well-being.
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