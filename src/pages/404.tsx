import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-xl text-foreground">Oops! Page not found</p>
        <p className="text-gray-600 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;