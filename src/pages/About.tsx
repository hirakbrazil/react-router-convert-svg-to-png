import React from "react";
import Footer from "@/components/Footer";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";

const About = () => {
  useTheme();
  
  return (
    <>
      <SEO
        title="About SWP Calculator"
        description="Discover the purpose and features of SWP Calculator. Learn why our tool is essential for your financial planning."
        canonicalUrl="https://swp-calculator.mutualfundjournal.in/about"
        socialMeta={{
          url: "https://swp-calculator.mutualfundjournal.in/about",
          title: "About SWP Calculator",
          description: "Discover the purpose and features of SWP Calculator. Learn why our tool is essential for your financial planning.",
          image: "https://swp-calculator.mutualfundjournal.in/banner.jpg",
        }}
      />
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            About SWP Calculator
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-lg">
            Welcome to our advanced Systematic Withdrawal Plan (SWP) Calculator, a comprehensive tool designed to make financial planning accessible for everyone.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our SWP Calculator?</h2>
            <p className="mb-4">Our calculator stands out by offering advanced features in one place, completely free of charge. Unlike other calculators, we provide:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Multi-currency support for global investors</li>
              <li>Real-time calculations with instant updates</li>
              <li>Detailed withdrawal analysis and projections</li>
              <li>User-friendly interface with dark/light mode</li>
              <li>Responsive design for all devices</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="mb-4">We believe that financial planning should be accessible to everyone. Our mission is to empower individuals to make informed financial decisions by providing:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free access to advanced financial tools</li>
              <li>Clear and transparent calculations</li>
              <li>Educational resources about SWP</li>
              <li>Regular updates and improvements based on user feedback</li>
            </ul>
          </div>

          <p>
            By making these tools freely available, we aim to help investors better understand and plan their systematic withdrawals, ultimately contributing to their financial well-being.
          </p>
        </div>

        <Footer />
      </div>
    </div>
      </>
  );
};

export default About;
