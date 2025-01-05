import React from "react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";

const Feedback = () => {
  useTheme();
  
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Feedback
          </h1>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            Your feedback is invaluable to us! It helps us improve and implement new features that matter to you.
          </p>

          <h2>Contact Us</h2>
          <p>
            For any queries, feedback, suggestions, or bug reports, please email us at:{" "}
            <a href="mailto:info@mutualfundjournal.in" className="text-primary hover:underline">
              info@mutualfundjournal.in
            </a>
          </p>

          <h2>Advertising</h2>
          <p>
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

          <p>
            We appreciate your support in making this tool better for everyone!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;