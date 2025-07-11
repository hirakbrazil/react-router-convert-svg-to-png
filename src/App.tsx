import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import useTheme from "@/hooks/useTheme";
import Index from "./pages/Index";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/404";

const queryClient = new QueryClient();

const App = () => {
  useTheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster richColors
          toastOptions={{
            info: {
              className: "text-red-600 dark:text-red-100", // Light blue in dark mode
              },
          }}
          />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
