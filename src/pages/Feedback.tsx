import React from "react";
import Footer from "@/components/Footer";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";  // Import SEO component


const Feedback = () => {
  useTheme();
  
  return (
    <>
      <SEO
        title="Feedback - SWP Calculator"
        description="We value your feedback! Share your thoughts, queries, or suggestions with us to help us improve."
        canonicalUrl="https://swp-calculator.mutualfundjournal.in/feedback"
        robots="max-image-preview:large"
        ogTitle="Feedback - SWP Calculator"
        ogDescription="We value your feedback! Share your thoughts, queries, or suggestions with us to help us improve."
        ogUrl="https://swp-calculator.mutualfundjournal.in/feedback"
        ogImage="https://swp-calculator.mutualfundjournal.in/banner.jpg"
        ogType="article"  {/* Setting og:type as article for feedback page */}
      />
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Feedback
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-lg">
            Your feedback is invaluable to us! It helps us improve and implement new features that matter to you.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              For any queries, feedback, suggestions, or bug reports, please email us at:{" "}
              <a 
                href="mailto:info@mutualfundjournal.in"
                className="text-primary hover:underline"
              >
                info@mutualfundjournal.in
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Advertising</h2>
            <p className="mb-4">
              For advertising opportunities, please visit our{" "}
              <a 
                href="https://mutualfundjournal.in/advertise/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Advertise on MFJ
              </a>
              {" "}page.
            </p>
          </div>

          <p>
            We appreciate your support in making this tool better for everyone!
          </p>
        </div>

        <Footer />
      </div>
    </div>
      </>
  );
};

export default Feedback;
