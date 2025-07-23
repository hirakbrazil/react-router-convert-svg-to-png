import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import type { Route } from "./+types/404";
import { CustomMeta } from "@/components/CustomMeta";

export function loader() {
  throw new Response("Not Found", { status: 404 });
}

export default function NotFound()  {
  const navigate = useNavigate();

  return (
    <>
      <CustomMeta
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
