import React from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
        robots="follow, noindex"
        canonicalUrl=""
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Page not found
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => navigate("/")}
              className="inline-flex items-center"
            >
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;