import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "@/hooks/useTheme";
import SEO from "@/components/SEO";

const NotFound = () => {
  useTheme(); // Apply theme using the custom hook
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        robots="follow, noindex"
      />
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
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
      </>
  );
};

export default NotFound;
