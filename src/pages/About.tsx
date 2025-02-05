import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO
        title="About - Lumpsum Calculator"
        description="Learn more about our Lumpsum Calculator tool and how it can help you plan your one-time investments better."
        canonicalUrl="https://lumpsum-calculator.mutualfundjournal.in/about"
        robots="max-image-preview:large"
        ogTitle="About - Lumpsum Calculator"
        ogDescription="Learn more about our Lumpsum Calculator tool and how it can help you plan your one-time investments better."
        ogUrl="https://lumpsum-calculator.mutualfundjournal.in/about"
        ogImage="https://lumpsum-calculator.mutualfundjournal.in/banner.jpg"
        ogType="website"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Calculator
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8">About Lumpsum Calculator</h1>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <p>
              Welcome to our Lumpsum Calculator! This tool is designed to help you calculate the potential returns on your one-time investments. Whether you're planning for long-term wealth creation or evaluating investment opportunities, our calculator provides you with clear insights into your investment's growth potential.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Calculate returns on one-time investments</li>
              <li>Adjust for inflation to see real returns</li>
              <li>Support for multiple currencies</li>
              <li>Easy-to-understand visual representation of your investment growth</li>
              <li>Share your calculations with others</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
            <p>
              Our calculator uses compound interest principles to project your investment's growth over time. Simply input your investment amount, expected return rate, and investment duration to see how your money could grow.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
            <p>
              The calculations provided are for illustration purposes only. Actual returns may vary based on market conditions, taxes, and other factors. Always consult with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;