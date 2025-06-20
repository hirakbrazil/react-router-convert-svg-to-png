
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/404";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const App = ({ location }: { location: string }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StaticRouter location={location}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StaticRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export async function prerender(context: { route: string }) {
  const html = ReactDOMServer.renderToString(
    React.createElement(App, { location: context.route })
  );
  
  return { html };
}
