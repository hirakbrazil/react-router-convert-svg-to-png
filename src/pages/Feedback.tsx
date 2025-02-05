import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const Feedback = () => {
  return (
    <>
      <SEO
        title="Feedback - Lumpsum Calculator"
        description="Share your feedback about our Lumpsum Calculator. Help us improve your investment planning experience."
        canonicalUrl="https://lumpsum-calculator.mutualfundjournal.in/feedback"
        robots="max-image-preview:large"
        ogTitle="Feedback - Lumpsum Calculator"
        ogDescription="Share your feedback about our Lumpsum Calculator. Help us improve your investment planning experience."
        ogUrl="https://lumpsum-calculator.mutualfundjournal.in/feedback"
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

          <h1 className="text-4xl font-bold mb-8">Feedback</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              We value your feedback! If you have any suggestions, comments, or issues regarding our Lumpsum Calculator, please feel free to reach out to us. Your input helps us improve and provide a better investment planning experience.
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p>
                You can send your feedback to:{" "}
                <a
                  href="mailto:feedback@mutualfundjournal.in"
                  className="text-primary hover:underline"
                >
                  feedback@mutualfundjournal.in
                </a>
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">What We'd Love to Hear About</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>User interface and experience</li>
                <li>Calculator features and functionality</li>
                <li>Accuracy and reliability of calculations</li>
                <li>Additional features you'd like to see</li>
                <li>Any issues or bugs you've encountered</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;