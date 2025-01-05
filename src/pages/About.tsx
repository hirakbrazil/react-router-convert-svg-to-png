import React from "react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";

const About = () => {
  useTheme();
  
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            About SWP Calculator
          </h1>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            Welcome to our advanced Systematic Withdrawal Plan (SWP) Calculator, a comprehensive tool designed to make financial planning accessible for everyone.
          </p>

          <h2>Why Choose Our SWP Calculator?</h2>
          <p>
            Our calculator stands out by offering advanced features in one place, completely free of charge. Unlike other calculators, we provide:
          </p>
          <ul>
            <li>Multi-currency support for global investors</li>
            <li>Real-time calculations with instant updates</li>
            <li>Detailed withdrawal analysis and projections</li>
            <li>User-friendly interface with dark/light mode</li>
            <li>Responsive design for all devices</li>
          </ul>

          <h2>Our Vision</h2>
          <p>
            We believe that financial planning should be accessible to everyone. Our mission is to empower individuals to make informed financial decisions by providing:
          </p>
          <ul>
            <li>Free access to advanced financial tools</li>
            <li>Clear and transparent calculations</li>
            <li>Educational resources about SWP</li>
            <li>Regular updates and improvements based on user feedback</li>
          </ul>

          <p>
            By making these tools freely available, we aim to help investors better understand and plan their systematic withdrawals, ultimately contributing to their financial well-being.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;