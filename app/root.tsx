import {
  isRouteErrorResponse,
  Links,
  useNavigate,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useTheme from "@/hooks/useTheme";
import { siteConfig } from "@/config/site";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Route } from "./+types/root";
import "./app.css";

const queryClient = new QueryClient();

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  { rel: "icon", href: "/icon.png" },
  { rel: "apple-touch-icon", href: "/icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Apply theme immediately to prevent flash
              (function() {
                const theme = localStorage.getItem("theme");
                const root = document.documentElement;
                
                root.classList.remove("light", "dark");
                
                if (theme === "dark") {
                  root.classList.add("dark");
                } else if (theme === "light") {
                  root.classList.add("light");
                } else {
                  // Handle system theme
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  root.classList.add(systemTheme);
                }
              })();
            `,
          }}
        />
        {/* AdSense */}
      {siteConfig.adsense?.pubId && (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.pubId}`}
          crossOrigin="anonymous"
        ></script>
      )}
      {/* Google Analytics */}
      {siteConfig.analytics?.ga4MeasurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4MeasurementId}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.analytics.ga4MeasurementId}');
              `,
            }}
          />
        </>
      )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  useTheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster richColors />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}

// Custom 404 Component
function Custom404() {
  const navigate = useNavigate();

  return (
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
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    // For 404 errors, render the custom 404 component
    if (error.status === 404) {
      return (
        <AppProviders>
          <Custom404 />
        </AppProviders>
      );
    }
    
    message = "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <AppProviders>
      <main className="pt-16 p-4 container mx-auto">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    </AppProviders>
  );
}
