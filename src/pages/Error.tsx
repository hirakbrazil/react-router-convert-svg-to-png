import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Button 
        onClick={() => navigate("/")}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Home className="h-4 w-4" />
        Go to Home
      </Button>
    </div>
  );
};

export default Error;