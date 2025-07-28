import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useNavigate, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, Meta, Links, ScrollRestoration, Scripts, isRouteErrorResponse, useLocation, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { useState, useEffect, useRef, useCallback } from "react";
import { Toaster as Toaster$1, toast } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Home, ChevronRight, Check, Circle, Sun, Moon, Monitor, Info, MessageSquare, Shield, FileImage, Zap, ChevronDown, ChevronUp, Image as Image$1, ArrowRight, Loader2, Download, Upload, RefreshCcw, FileSearch, Layout as Layout$1, Lightbulb, Sparkles, Globe, Mail, HeartHandshake, Lock, Eye, Server, Cookie, ShieldCheck, BadgeCheck, History } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const Toaster = ({ ...props }) => {
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    const detectTheme = () => {
      const root2 = document.documentElement;
      const isDark = root2.classList.contains("dark");
      const isLight = root2.classList.contains("light");
      if (isDark) {
        setTheme("dark");
      } else if (isLight) {
        setTheme("light");
      } else {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(systemTheme);
      }
    };
    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const root2 = document.documentElement;
      if (!root2.classList.contains("light") && !root2.classList.contains("dark")) {
        detectTheme();
      }
    };
    darkThemeMq.addEventListener("change", handleSystemThemeChange);
    return () => {
      observer.disconnect();
      darkThemeMq.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground border-0 rounded-md px-4 py-2 font-semibold cursor-pointer",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group toast group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
          success: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          info: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground dark:group-[.toaster]:text-blue-300 group-[.toaster]:border-border"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const applyThemeSync = () => {
  const theme = localStorage.getItem("theme");
  const root2 = document.documentElement;
  root2.classList.remove("light", "dark");
  if (theme === "dark") {
    root2.classList.add("dark");
  } else if (theme === "light") {
    root2.classList.add("light");
  } else {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    root2.classList.add(systemTheme);
  }
};
if (typeof window !== "undefined") {
  applyThemeSync();
}
const useTheme = () => {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const themeColor = isDark ? "#020817" : "#ffffff";
      const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
      existingMetas.forEach((meta) => meta.remove());
      const newMeta = document.createElement("meta");
      newMeta.name = "theme-color";
      newMeta.content = themeColor;
      document.head.appendChild(newMeta);
    };
    applyThemeSync();
    updateThemeColor();
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => {
      if (!localStorage.getItem("theme")) {
        const root2 = document.documentElement;
        root2.classList.remove("light", "dark");
        root2.classList.add(e.matches ? "dark" : "light");
        updateThemeColor();
      }
    };
    darkThemeMq.addEventListener("change", handleThemeChange);
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => {
      darkThemeMq.removeEventListener("change", handleThemeChange);
      observer.disconnect();
    };
  }, []);
};
const siteConfig = {
  baseUrl: "https://convertsvgtopng.net",
  name: "Convert SVG to PNG",
  description: "Convert high-quality SVG files to PNG images instantly. Resize, optimize, and download your images effortlessly.",
  adsense: {
    pubId: "ca-pub-xxxxxxxxxxxx",
    adSlot: "xxxxxxxx"
  },
  analytics: {
    ga4MeasurementId: "G-xxxxxxxx"
  }
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const CustomMeta = ({
  title,
  description,
  canonicalUrl,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType
}) => {
  const resolveUrl = (path) => {
    if (!path) return void 0;
    if (path.startsWith("http")) return path;
    return `${siteConfig.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  };
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || canonicalUrl;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    title && /* @__PURE__ */ jsx("title", { children: title }),
    description && /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    canonicalUrl && /* @__PURE__ */ jsx("link", { rel: "canonical", href: resolveUrl(canonicalUrl) }),
    robots && /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    finalOgTitle && /* @__PURE__ */ jsx("meta", { property: "og:title", content: finalOgTitle }),
    finalOgDescription && /* @__PURE__ */ jsx("meta", { property: "og:description", content: finalOgDescription }),
    finalOgUrl && /* @__PURE__ */ jsx("meta", { property: "og:url", content: resolveUrl(finalOgUrl) }),
    ogImage && /* @__PURE__ */ jsx("meta", { property: "og:image", content: resolveUrl(ogImage) }),
    ogType && /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteConfig.name })
  ] });
};
function NotFound() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      CustomMeta,
      {
        title: "404 - Page Not Found",
        description: "The page you are looking for doesn't exist or has been moved.",
        robots: "follow, noindex"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 max-w-md", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold text-primary", children: "404" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Page Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "The page you are looking for doesn't exist or has been moved." }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => navigate("/"),
          className: "inline-flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
            "Go to Home"
          ]
        }
      )
    ] }) })
  ] });
}
const queryClient = new QueryClient();
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
}, {
  rel: "icon",
  href: "/icon.png"
}, {
  rel: "apple-touch-icon",
  href: "/icon.png"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "manifest",
        href: "/manifest.json"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        dangerouslySetInnerHTML: {
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
            `
        }
      }), /* @__PURE__ */ jsx("script", {
        async: true,
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.pubId}`,
        crossOrigin: "anonymous"
      }), /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("script", {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4MeasurementId}`
        }), /* @__PURE__ */ jsx("script", {
          dangerouslySetInnerHTML: {
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.analytics.ga4MeasurementId}');
              `
          }
        })]
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
function AppProviders({
  children
}) {
  useTheme();
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ jsxs(TooltipProvider, {
      children: [/* @__PURE__ */ jsx(Toaster, {
        richColors: true
      }), children]
    })
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(AppProviders, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return /* @__PURE__ */ jsx(AppProviders, {
        children: /* @__PURE__ */ jsx(NotFound, {})
      });
    }
    message = "Error";
    details = error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "system";
    }
    return "system";
  });
  useEffect(() => {
    if (!isBrowser) return;
    const root2 = document.documentElement;
    root2.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root2.classList.add(systemTheme);
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange2 = (e) => {
        if (theme === "system") {
          root2.classList.remove("light", "dark");
          root2.classList.add(e.matches ? "dark" : "light");
        }
      };
      darkThemeMq.addEventListener("change", handleThemeChange2);
      return () => darkThemeMq.removeEventListener("change", handleThemeChange2);
    } else {
      root2.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 mr-2" });
      case "dark":
        return /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 mr-2" });
      default:
        return /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4 mr-2" });
    }
  };
  const handleThemeChange = (newTheme) => {
    if (!isBrowser) return;
    if (newTheme === theme) {
      const modeNames = {
        light: "Light",
        dark: "Dark",
        system: "System default"
      };
      toast.info(`${modeNames[newTheme]} mode is already active`, {
        duration: 5e3
      });
      return;
    }
    if (newTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", newTheme);
    }
    setTheme(newTheme);
    toast.success(
      `Theme set to ${newTheme === "system" ? "System default" : newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`,
      {
        duration: 5e3
      }
    );
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "default", className: "flex items-center gap-2 cursor-pointer", children: [
      getThemeIcon(),
      theme.charAt(0).toUpperCase() + theme.slice(1)
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "bg-white dark:bg-[#030c21] border-border", children: [
      /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => handleThemeChange("light"), className: "gap-2 cursor-pointer", children: [
        /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }),
        "Light"
      ] }),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => handleThemeChange("dark"), className: "gap-2 cursor-pointer", children: [
        /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }),
        "Dark"
      ] }),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => handleThemeChange("system"), className: "gap-2 cursor-pointer", children: [
        /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4" }),
        "System"
      ] })
    ] })
  ] });
};
const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isFeedbackPage = location.pathname === "/feedback";
  const isPrivacyPage = location.pathname === "/privacy";
  return /* @__PURE__ */ jsxs("footer", { className: "mt-8 space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(ThemeSwitcher, {}) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap justify-center gap-x-6 gap-y-4", children: [
      !isHomePage && /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
        "Home"
      ] }),
      !isAboutPage && /* @__PURE__ */ jsxs(Link, { to: "/about", className: "inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(Info, { className: "h-4 w-4" }),
        "About"
      ] }),
      !isFeedbackPage && /* @__PURE__ */ jsxs(Link, { to: "/feedback", className: "inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Feedback"
      ] }),
      !isPrivacyPage && /* @__PURE__ */ jsxs(Link, { to: "/privacy", className: "inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }),
        "Privacy"
      ] })
    ] })
  ] });
};
const Header = () => {
  return /* @__PURE__ */ jsxs("header", { className: "text-center space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Convert SVG to PNG" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Transform your SVG files into high-quality PNG images" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(FileImage, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsx("span", { children: "High Quality Output" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsx("span", { children: "Smart Resizing" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsx("span", { children: "Privacy Protected" })
      ] })
    ] })
  ] });
};
const AdSense = ({
  format = "responsive",
  style = {},
  className = ""
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);
  const isHorizontal = format === "horizontal";
  const defaultStyle = isHorizontal ? { display: "block", minHeight: "100px", ...style } : { display: "block", ...style };
  return /* @__PURE__ */ jsx(
    "ins",
    {
      className: `adsbygoogle ${className}`,
      style: defaultStyle,
      "data-ad-client": siteConfig.adsense.pubId,
      "data-ad-slot": siteConfig.adsense.adSlot,
      "data-ad-format": isHorizontal ? "horizontal" : "auto",
      "data-full-width-responsive": isHorizontal ? "false" : "true"
    }
  );
};
const DesktopSidebar = () => {
  const [isLgUp, setIsLgUp] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 64rem)");
    const updateMatch = () => setIsLgUp(mediaQuery.matches);
    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);
  if (!isLgUp) return null;
  return /* @__PURE__ */ jsx("aside", { className: "hidden lg:block w-[300px] fixed right-0 top-0 h-screen p-4 bg-background", children: /* @__PURE__ */ jsx("div", { className: "sticky top-4", children: /* @__PURE__ */ jsx(AdSense, { format: "responsive" }) }) });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const UPLOAD_CONSTANTS = {
  MAX_FILES: 30
};
const QUALITY_STORAGE_KEY = "svg-to-png-quality";
const CUSTOM_WIDTH_STORAGE_KEY = "svg-to-png-custom-width";
const useSvgToPng = () => {
  const [processedSvgs, setProcessedSvgs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState("high");
  const [customWidth, setCustomWidth] = useState(4e3);
  const [previousCustomWidth, setPreviousCustomWidth] = useState(4e3);
  const [svgTextInput, setSvgTextInput] = useState("");
  const dragCounterRef = useRef(0);
  useEffect(() => {
    const savedQuality = localStorage.getItem(QUALITY_STORAGE_KEY);
    if (savedQuality && ["original", "high", "very-high", "custom"].includes(savedQuality)) {
      setQuality(savedQuality);
    }
    const savedCustomWidth = localStorage.getItem(CUSTOM_WIDTH_STORAGE_KEY);
    if (savedCustomWidth) {
      const parsedWidth = parseInt(savedCustomWidth);
      if (!isNaN(parsedWidth) && parsedWidth > 0) {
        setCustomWidth(parsedWidth);
        setPreviousCustomWidth(parsedWidth);
      }
    }
  }, []);
  const saveQualityPreference = useCallback((newQuality) => {
    localStorage.setItem(QUALITY_STORAGE_KEY, newQuality);
  }, []);
  const saveCustomWidthPreference = useCallback((width) => {
    localStorage.setItem(CUSTOM_WIDTH_STORAGE_KEY, width.toString());
  }, []);
  const resetState = useCallback(() => {
    setProcessedSvgs([]);
    setSvgTextInput("");
  }, []);
  const extractSvgDimensions = (svgString) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");
    if (!svgElement) {
      throw new Error("Invalid SVG file");
    }
    let width = 300;
    let height = 150;
    const widthAttr = svgElement.getAttribute("width");
    const heightAttr = svgElement.getAttribute("height");
    if (widthAttr && heightAttr) {
      width = parseFloat(widthAttr.replace(/[^0-9.]/g, ""));
      height = parseFloat(heightAttr.replace(/[^0-9.]/g, ""));
    } else {
      const viewBox = svgElement.getAttribute("viewBox");
      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
        width = vbWidth || width;
        height = vbHeight || height;
      }
    }
    return { width, height };
  };
  const getTargetDimensions = useCallback((dimensions, selectedQuality, explicitCustomWidth) => {
    if (selectedQuality === "original") {
      return dimensions;
    }
    let targetWidth;
    if (selectedQuality === "custom") {
      targetWidth = explicitCustomWidth !== void 0 ? explicitCustomWidth : customWidth;
    } else {
      targetWidth = selectedQuality === "high" ? 4e3 : 6e3;
    }
    const scaleFactor = targetWidth / dimensions.width;
    return {
      width: targetWidth,
      height: Math.round(dimensions.height * scaleFactor)
    };
  }, [customWidth]);
  const convertSvgToPng = useCallback(async (svgString, dimensions, selectedQuality, explicitCustomWidth) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      const targetDimensions = getTargetDimensions(dimensions, selectedQuality, explicitCustomWidth);
      canvas.width = targetDimensions.width;
      canvas.height = targetDimensions.height;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, targetDimensions.width, targetDimensions.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = () => {
              reject(new Error("Failed to read blob as data URL"));
            };
            reader.readAsDataURL(blob);
          } else {
            reject(new Error("Failed to convert to PNG"));
          }
        }, "image/png", 1);
      };
      img.onerror = () => reject(new Error("Failed to load SVG"));
      const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
      img.src = URL.createObjectURL(svgBlob);
    });
  }, [getTargetDimensions]);
  const processSvgContent = useCallback(async (svgText, fileName = "pasted-svg.svg") => {
    setIsConverting(true);
    try {
      const dimensions = extractSvgDimensions(svgText);
      const file = new File([svgText], fileName, { type: "image/svg+xml" });
      const initialSvg = {
        id: crypto.randomUUID(),
        file,
        svgContent: svgText,
        dimensions,
        pngDataUrl: "",
        isConverting: true
      };
      setProcessedSvgs([initialSvg]);
      const conversionPromise = convertSvgToPng(svgText, dimensions, quality);
      toast.promise(conversionPromise, {
        loading: "Converting SVG to PNG...",
        success: "Converted successfully!",
        error: "Failed to convert SVG. Please check if the SVG code is valid."
      });
      const pngUrl = await conversionPromise;
      setProcessedSvgs([{
        ...initialSvg,
        pngDataUrl: pngUrl,
        isConverting: false
      }]);
    } catch (error) {
      console.error("Conversion error:", error);
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, quality, resetState]);
  const handleFileUpload = useCallback(async (files) => {
    const fileArray = Array.from(files);
    const svgFiles = fileArray.filter((file) => file.type.includes("svg"));
    if (svgFiles.length === 0) {
      toast.error("Please upload SVG files (.svg)");
      return;
    }
    const filesToProcess = svgFiles.slice(0, UPLOAD_CONSTANTS.MAX_FILES);
    const ignoredCount = svgFiles.length - filesToProcess.length;
    setIsConverting(true);
    try {
      const initialSvgs = [];
      for (const file of filesToProcess) {
        const svgText = await file.text();
        const dimensions = extractSvgDimensions(svgText);
        initialSvgs.push({
          id: crypto.randomUUID(),
          file,
          svgContent: svgText,
          dimensions,
          pngDataUrl: "",
          isConverting: true
        });
      }
      setProcessedSvgs(initialSvgs);
      let completedCount = 0;
      const totalCount = filesToProcess.length;
      const toastId = toast.loading(`Converting 0/${totalCount} SVG${totalCount > 1 ? "s" : ""} to PNG...`);
      const conversionPromises = initialSvgs.map(async (svg, index) => {
        try {
          const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, quality);
          setProcessedSvgs(
            (prev) => prev.map(
              (item) => item.id === svg.id ? { ...item, pngDataUrl: pngUrl, isConverting: false } : item
            )
          );
          completedCount++;
          toast.loading(`Converted ${completedCount}/${totalCount} SVG${totalCount > 1 ? "s" : ""} to PNG...`, { id: toastId });
          return { success: true, index };
        } catch (error) {
          console.error(`Conversion error for file ${index}:`, error);
          return { success: false, index };
        }
      });
      const results = await Promise.all(conversionPromises);
      const successCount = results.filter((r) => r.success).length;
      if (successCount === totalCount) {
        toast.success("Converted successfully!", { id: toastId });
      } else {
        toast.error(`${successCount}/${totalCount} SVG${totalCount > 1 ? "s were" : " was"} converted successfully`, { id: toastId });
      }
      if (ignoredCount > 0) {
        toast.info(
          `Max limit is ${UPLOAD_CONSTANTS.MAX_FILES}, ${ignoredCount} image${ignoredCount > 1 ? "s" : ""} ignored`,
          {
            duration: 6e3
          }
        );
      }
    } catch (error) {
      console.error("Conversion error:", error);
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, quality, resetState]);
  const handleSvgTextChange = useCallback((e) => {
    setSvgTextInput(e.target.value);
  }, []);
  const handleSvgTextSubmit = useCallback(async () => {
    if (!svgTextInput.trim()) return;
    if (!svgTextInput.includes("<svg")) {
      toast.error("Please enter valid SVG XML code");
      return;
    }
    await processSvgContent(svgTextInput.trim());
  }, [svgTextInput, processSvgContent]);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  }, []);
  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await handleFileUpload(files);
  }, [handleFileUpload]);
  const downloadPng = useCallback((processedSvg) => {
    const link = document.createElement("a");
    link.href = processedSvg.pngDataUrl;
    link.download = `${processedSvg.file.name.replace(".svg", "")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  const handleQualityChange = useCallback(async (newQuality) => {
    setQuality(newQuality);
    saveQualityPreference(newQuality);
    if (processedSvgs.length > 0) {
      setIsConverting(true);
      setProcessedSvgs((prev) => prev.map((svg) => ({ ...svg, isConverting: true })));
      try {
        let completedCount = 0;
        const totalCount = processedSvgs.length;
        const toastId = toast.loading(`Re-converting 0/${totalCount} SVG${totalCount > 1 ? "s" : ""} with new quality settings...`);
        const reconversionPromises = processedSvgs.map(async (svg) => {
          try {
            const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, newQuality);
            setProcessedSvgs(
              (prev) => prev.map(
                (item) => item.id === svg.id ? { ...item, pngDataUrl: pngUrl, isConverting: false } : item
              )
            );
            completedCount++;
            toast.loading(`Re-converted ${completedCount}/${totalCount} SVG${totalCount > 1 ? "s" : ""} with new quality settings...`, { id: toastId });
            return { success: true };
          } catch (error) {
            console.error("Re-conversion error:", error);
            return { success: false };
          }
        });
        const results = await Promise.all(reconversionPromises);
        const successCount = results.filter((r) => r.success).length;
        if (successCount === totalCount) {
          toast.success("Re-converted successfully!", { id: toastId });
        } else {
          toast.error(`${successCount}/${totalCount} image${totalCount > 1 ? "s were" : " was"} re-converted successfully`, { id: toastId });
        }
      } catch (error) {
        console.error("Re-conversion error:", error);
      } finally {
        setIsConverting(false);
      }
    }
  }, [processedSvgs, convertSvgToPng, saveQualityPreference]);
  const handleCustomWidthChange = useCallback((e) => {
    const value = e.target.value;
    setCustomWidth(value === "" ? 0 : parseInt(value) || 0);
  }, []);
  const handleCustomWidthBlur = useCallback(async () => {
    let validatedWidth = customWidth;
    if (validatedWidth < 10) {
      validatedWidth = 10;
    } else if (validatedWidth > 1e4) {
      validatedWidth = 1e4;
    }
    setCustomWidth(validatedWidth);
    saveCustomWidthPreference(validatedWidth);
    if (quality === "custom" && processedSvgs.length > 0 && validatedWidth !== previousCustomWidth) {
      setPreviousCustomWidth(validatedWidth);
      setIsConverting(true);
      setProcessedSvgs((prev) => prev.map((svg) => ({ ...svg, isConverting: true })));
      try {
        let completedCount = 0;
        const totalCount = processedSvgs.length;
        const toastId = toast.loading(`Re-converting 0/${totalCount} SVG${totalCount > 1 ? "s" : ""} with new custom width...`);
        const reconversionPromises = processedSvgs.map(async (svg) => {
          try {
            const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, "custom", validatedWidth);
            setProcessedSvgs(
              (prev) => prev.map(
                (item) => item.id === svg.id ? { ...item, pngDataUrl: pngUrl, isConverting: false } : item
              )
            );
            completedCount++;
            toast.loading(`Re-converted ${completedCount}/${totalCount} SVG${totalCount > 1 ? "s" : ""} with new custom width...`, { id: toastId });
            return { success: true };
          } catch (error) {
            console.error("Re-conversion error:", error);
            return { success: false };
          }
        });
        const results = await Promise.all(reconversionPromises);
        const successCount = results.filter((r) => r.success).length;
        if (successCount === totalCount) {
          toast.success("Re-converted successfully!", { id: toastId });
        } else {
          toast.error(`${successCount}/${totalCount} image${totalCount > 1 ? "s were" : " was"} re-converted successfully`, { id: toastId });
        }
      } catch (error) {
        console.error("Re-conversion error:", error);
      } finally {
        setIsConverting(false);
      }
    } else if (validatedWidth !== customWidth) {
      setPreviousCustomWidth(validatedWidth);
    }
  }, [customWidth, previousCustomWidth, quality, processedSvgs, convertSvgToPng, saveCustomWidthPreference]);
  const getAvailableQualityOptions = useCallback(() => {
    return ["original", "high", "very-high", "custom"];
  }, []);
  const shouldShowQualitySelector = useCallback(() => {
    return true;
  }, []);
  return {
    processedSvgs,
    isDragging,
    isConverting,
    quality,
    customWidth,
    svgTextInput,
    handleFileUpload,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    downloadPng,
    resetState,
    handleQualityChange,
    handleCustomWidthChange,
    handleCustomWidthBlur,
    getTargetDimensions,
    getAvailableQualityOptions,
    shouldShowQualitySelector,
    handleSvgTextChange,
    handleSvgTextSubmit
  };
};
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0.00 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};
const ImageComparisonSlider = ({ svgContent, pngDataUrl, svgFileSize, pngFileSize, className }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, x / rect.width * 100));
    setSliderPosition(percentage);
  }, []);
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [updateSliderPosition]);
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [isDragging, updateSliderPosition]);
  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleContainerClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      updateSliderPosition(e.clientX);
    }
  }, [updateSliderPosition]);
  const svgDataUrl = React__default.useMemo(() => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    return URL.createObjectURL(blob);
  }, [svgContent]);
  React__default.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };
    const handleGlobalTouchEnd = () => setIsDragging(false);
    const handleGlobalTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      updateSliderPosition(touch.clientX);
    };
    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("touchend", handleGlobalTouchEnd);
      document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
    }
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
    };
  }, [isDragging, updateSliderPosition]);
  return /* @__PURE__ */ jsx("div", { className: cn("relative w-full h-96 overflow-hidden rounded-lg border", className), children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full select-none",
      onMouseMove: handleMouseMove,
      onMouseUp: () => setIsDragging(false),
      onClick: handleContainerClick,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0",
            style: { clipPath: `inset(0 0 0 ${sliderPosition}%)` },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: pngDataUrl,
                  alt: "PNG Version",
                  className: "w-full h-full object-contain pointer-events-none",
                  draggable: false
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 right-2 bg-secondary text-primary px-2 py-1 rounded text-sm font-medium pointer-events-none", children: [
                "PNG • ",
                formatFileSize(pngFileSize)
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: { clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: svgDataUrl,
                  alt: "SVG Version",
                  className: "w-full h-full object-contain pointer-events-none",
                  draggable: false
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 bg-secondary text-primary px-2 py-1 rounded text-sm font-medium pointer-events-none", children: [
                "SVG • ",
                formatFileSize(svgFileSize)
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 cursor-col-resize z-10 touch-none flex items-center justify-center",
            style: {
              left: `calc(${sliderPosition}% - 15px)`,
              width: "30px"
              // Increased from 24px to 30px wide touch area (15px on each side of the line)
            },
            onMouseDown: handleMouseDown,
            onTouchStart: handleTouchStart,
            children: /* @__PURE__ */ jsx("div", { className: "w-0.5 h-full bg-black dark:bg-white shadow-lg pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black dark:bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white dark:bg-black rounded-full" }) }) })
          }
        )
      ]
    }
  ) });
};
const SvgItem = ({ processedSvg, targetDimensions, onDownload, isConverting }) => {
  const svgDataUrl = React__default.useMemo(() => {
    const blob = new Blob([processedSvg.svgContent], { type: "image/svg+xml" });
    return URL.createObjectURL(blob);
  }, [processedSvg.svgContent]);
  const pngFileSize = React__default.useMemo(() => {
    if (!processedSvg.pngDataUrl) return 0;
    const base64Data = processedSvg.pngDataUrl.split(",")[1];
    if (!base64Data) return 0;
    const padding = (base64Data.match(/=/g) || []).length;
    return base64Data.length * 3 / 4 - padding;
  }, [processedSvg.pngDataUrl]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Image$1, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: processedSvg.file.name }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground space-y-1", children: /* @__PURE__ */ jsxs("p", { children: [
          "Original: ",
          Math.round(processedSvg.dimensions.width),
          " × ",
          Math.round(processedSvg.dimensions.height),
          "px",
          /* @__PURE__ */ jsxs("span", { className: "ml-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "inline h-4 w-4 text-muted-foreground" }),
            "PNG: ",
            targetDimensions.width,
            " × ",
            targetDimensions.height,
            "px"
          ] })
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: processedSvg.isConverting ? (
      // Show blurred SVG preview while converting
      /* @__PURE__ */ jsxs("div", { className: "relative w-full h-96 overflow-hidden rounded-lg border", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: svgDataUrl,
            alt: "SVG Preview",
            className: "w-full h-full object-contain blur-sm",
            draggable: false
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/10 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Converting to PNG..." })
        ] }) })
      ] })
    ) : (
      // Show comparison slider when conversion is done
      /* @__PURE__ */ jsx(
        ImageComparisonSlider,
        {
          svgContent: processedSvg.svgContent,
          pngDataUrl: processedSvg.pngDataUrl,
          svgFileSize: processedSvg.file.size,
          pngFileSize
        }
      )
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => onDownload(processedSvg),
        disabled: !!processedSvg.isConverting || !processedSvg.pngDataUrl,
        className: "gap-2",
        children: processedSvg.isConverting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
          "Download PNG"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
          "Download PNG"
        ] })
      }
    ) })
  ] });
};
const SvgToPngConverter = () => {
  const {
    processedSvgs,
    isDragging,
    isConverting,
    quality,
    customWidth,
    svgTextInput,
    handleFileUpload,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    downloadPng,
    resetState,
    handleQualityChange,
    handleCustomWidthChange,
    handleCustomWidthBlur,
    getTargetDimensions,
    getAvailableQualityOptions,
    shouldShowQualitySelector,
    handleSvgTextChange,
    handleSvgTextSubmit
  } = useSvgToPng();
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };
  const handleDownloadAll = () => {
    processedSvgs.forEach((processedSvg) => {
      if (processedSvg.pngDataUrl && !processedSvg.isConverting) {
        downloadPng(processedSvg);
      }
    });
  };
  const getQualityLabel = (qualityOption) => {
    switch (qualityOption) {
      case "original":
        return "Original";
      case "high":
        return "High (4000px)";
      case "very-high":
        return "Very High (6000px)";
      case "custom":
        return "Custom Size";
      default:
        return qualityOption;
    }
  };
  const availableOptions = getAvailableQualityOptions();
  const allImagesConverted = processedSvgs.length > 0 && processedSvgs.every((svg) => !svg.isConverting && svg.pngDataUrl);
  const showDownloadAll = processedSvgs.length > 1;
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: processedSvgs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        ),
        onDragOver: handleDragOver,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "file-upload",
              type: "file",
              accept: ".svg",
              multiple: true,
              onChange: handleFileInputChange,
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
              disabled: isConverting
            }
          ),
          /* @__PURE__ */ jsxs("label", { htmlFor: "file-upload", className: "flex flex-col items-center gap-4 cursor-pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-primary" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-lg font-semibold mb-2", children: isDragging ? "Drop SVG files here" : "Upload or Drop Files" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-2 pointer-events-none select-none", children: [
                "Max ",
                UPLOAD_CONSTANTS.MAX_FILES,
                " images at once"
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Separator, { className: "flex-1" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "or" }),
      /* @__PURE__ */ jsx(Separator, { className: "flex-1" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "svg-text", children: "Paste SVG Code" }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          id: "svg-text",
          placeholder: "Paste your SVG XML code here...",
          value: svgTextInput,
          onChange: handleSvgTextChange,
          className: "min-h-[120px] font-mono text-base mt-[17px]",
          disabled: isConverting
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSvgTextSubmit,
          disabled: !svgTextInput.trim() || isConverting,
          children: "Convert SVG Code"
        }
      ) })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    shouldShowQualitySelector() && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "quality-select", children: "Output quality:" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: quality,
              onValueChange: handleQualityChange,
              disabled: isConverting,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: availableOptions.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option, className: "cursor-pointer", children: getQualityLabel(option) }, option)) })
              ]
            }
          )
        ] }),
        quality === "custom" && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "custom-width", children: "Custom width (px):" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "custom-width",
              type: "number",
              value: customWidth === 0 ? "" : customWidth,
              onChange: handleCustomWidthChange,
              onBlur: handleCustomWidthBlur,
              className: "w-[120px]",
              min: "10",
              max: "10000",
              disabled: isConverting
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3 pt-2", children: [
        showDownloadAll && /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleDownloadAll,
            disabled: !allImagesConverted || isConverting,
            className: "gap-2",
            size: "lg",
            children: [
              isConverting ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
              "Download All"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: resetState,
            variant: "outline",
            className: "gap-2",
            size: "lg",
            disabled: isConverting,
            children: [
              /* @__PURE__ */ jsx(RefreshCcw, { className: "w-5 h-5" }),
              "Convert Another"
            ]
          }
        )
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Preview" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Drag the slider to compare SVG vs PNG" })
    ] }),
    processedSvgs.map((processedSvg, index) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        SvgItem,
        {
          processedSvg,
          targetDimensions: getTargetDimensions(processedSvg.dimensions, quality),
          onDownload: downloadPng,
          isConverting
        }
      ),
      index < processedSvgs.length - 1 && /* @__PURE__ */ jsx("div", { className: "my-8", children: /* @__PURE__ */ jsx(Separator, {}) })
    ] }, processedSvg.id))
  ] }) });
};
const HomepageContent = () => {
  return /* @__PURE__ */ jsxs("article", { className: "space-y-12 mt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold flex items-center gap-2 text-foreground", children: [
        /* @__PURE__ */ jsx(FileSearch, { className: "w-6 h-6 text-primary" }),
        "How It Works"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground", children: [
        /* @__PURE__ */ jsx("p", { children: "Simply upload your SVG files using drag-and-drop or the file browser. Our tool automatically processes your SVGs and converts them to high-quality PNG images with advanced features like batch processing and smart resizing." }),
        /* @__PURE__ */ jsx("p", { children: "All processing happens directly in your browser - your files never leave your device, ensuring complete privacy and security. The conversion works offline once loaded, making it fast and secure." }),
        /* @__PURE__ */ jsx("p", { children: "Upload multiple SVG files at once for batch conversion or paste SVG code to download it as svg or png format. Choose between original size conversion or high-quality mode that automatically resizes smaller SVGs up to 10,000px while maintaining perfect aspect ratios." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold flex items-center gap-2 text-foreground", children: [
        /* @__PURE__ */ jsx(Layout$1, { className: "w-6 h-6 text-primary" }),
        "Perfect For"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Web Development & Design" }),
          /* @__PURE__ */ jsx("p", { children: "Convert SVG icons, logos, and graphics to PNG for use in websites, applications, and design projects where PNG format is required or preferred." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Print & Marketing Materials" }),
          /* @__PURE__ */ jsx("p", { children: "Generate ultra-high-resolution PNG images from SVG files for print materials, posters, business cards, and marketing collateral with crystal-clear quality." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Social Media & Presentations" }),
          /* @__PURE__ */ jsx("p", { children: "Create PNG versions of your SVG logos and graphics for social media platforms, presentations, and documents that don't support SVG format." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Batch Processing" }),
          /* @__PURE__ */ jsx("p", { children: "Process multiple SVG files simultaneously, saving time when converting entire icon sets, logo variations, or graphic collections." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold flex items-center gap-2 text-foreground", children: [
        /* @__PURE__ */ jsx(Lightbulb, { className: "w-6 h-6 text-primary" }),
        "Advanced Features & Tips"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Smart Quality Enhancement" }),
          /* @__PURE__ */ jsx("p", { children: 'Enable "High Quality" mode to automatically upscale SVGs smaller than 4000px to ensure crisp, professional results. Choose up to 10,000px width for ultra-high resolution output.' })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Custom Width Settings" }),
          /* @__PURE__ */ jsx("p", { children: "Set precise custom size for your hd quality PNG output while maintaining aspect ratios. Perfect for creating consistent sizing across multiple graphics." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Live Preview Comparison" }),
          /* @__PURE__ */ jsx("p", { children: "Use the interactive slider to compare your original SVG with the converted PNG side-by-side before downloading. See exactly how your conversion will look." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Bulk Download Options" }),
          /* @__PURE__ */ jsx("p", { children: "Download individual files or get all your converted PNGs in a single ZIP file. Perfect for batch processing workflows and organizing your converted files." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2 text-foreground", children: "Browser Compatibility & Privacy" }),
          /* @__PURE__ */ jsx("p", { children: "Works seamlessly with all modern browsers including Chrome, Firefox, Safari, and Edge. No plugins required, and all processing happens locally for maximum privacy." })
        ] })
      ] })
    ] })
  ] });
};
const home = UNSAFE_withComponentProps(function Home2() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(CustomMeta, {
      title: "Convert SVG to PNG",
      description: "Convert SVG files to high-quality PNG images with smart resizing. Free online SVG to PNG converter with 4000px quality output.",
      canonicalUrl: "/",
      robots: "max-image-preview:large",
      ogImage: "/banner.jpg",
      ogType: "website"
    }), /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl mx-auto space-y-8 lg:mr-[300px]",
        children: [/* @__PURE__ */ jsx(AdSense, {
          format: "horizontal"
        }), /* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "border border-border bg-card dark:bg-card rounded-xl p-6",
            children: /* @__PURE__ */ jsx(SvgToPngConverter, {})
          }), /* @__PURE__ */ jsx(AdSense, {
            format: "responsive"
          }), /* @__PURE__ */ jsx(HomepageContent, {}), /* @__PURE__ */ jsx(AdSense, {
            format: "responsive"
          })]
        }), /* @__PURE__ */ jsx(Footer, {})]
      }), /* @__PURE__ */ jsx(DesktopSidebar, {})]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(CustomMeta, {
      title: "About Convert SVG to PNG",
      description: "Learn about Convert SVG to PNG tool. Transform your SVG files into high-quality PNG images with smart resizing and quality options.",
      canonicalUrl: "/about",
      robots: "max-image-preview:large",
      ogType: "article"
    }), /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl mx-auto space-y-8 lg:mr-[300px]",
        children: [/* @__PURE__ */ jsx(AdSense, {
          format: "horizontal"
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center",
          children: /* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold text-foreground sm:text-4xl",
            children: "About Convert SVG to PNG"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-6",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-lg text-muted-foreground",
            children: "Welcome to Convert SVG to PNG, a powerful and user-friendly tool designed to transform your SVG files into high-quality PNG images with advanced features and customization options."
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold mb-4 flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Sparkles, {
                className: "w-6 h-6 text-primary"
              }), "Key Features"]
            }), /* @__PURE__ */ jsxs("ul", {
              className: "list-disc pl-6 space-y-2 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("li", {
                children: "Drag-and-drop SVG file upload with instant preview"
              }), /* @__PURE__ */ jsx("li", {
                children: "Batch conversion - process multiple SVG files at once"
              }), /* @__PURE__ */ jsx("li", {
                children: "Smart quality enhancement up to 10,000px for crisp results"
              }), /* @__PURE__ */ jsx("li", {
                children: "Custom width settings with automatic aspect ratio preservation"
              }), /* @__PURE__ */ jsx("li", {
                children: "Live preview comparison with interactive slider"
              }), /* @__PURE__ */ jsx("li", {
                children: "Download individual files or bulk ZIP download"
              }), /* @__PURE__ */ jsx("li", {
                children: "Dark and light mode for comfortable viewing"
              }), /* @__PURE__ */ jsx("li", {
                children: "Real-time conversion progress tracking"
              }), /* @__PURE__ */ jsx("li", {
                children: "File size and dimension information display"
              }), /* @__PURE__ */ jsx("li", {
                children: "Cross-browser compatibility"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold mb-4 flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Shield, {
                className: "w-6 h-6 text-primary"
              }), "Privacy & Security"]
            }), /* @__PURE__ */ jsx("p", {
              className: "mb-4 text-muted-foreground",
              children: "Your privacy is our top priority. All SVG processing and PNG conversion happens entirely in your browser using client-side JavaScript. Your files never leave your device or get uploaded to any server, ensuring complete privacy and security of your content."
            }), /* @__PURE__ */ jsx("p", {
              className: "text-muted-foreground",
              children: "This offline processing approach means your sensitive designs, logos, and graphics remain completely confidential while still providing professional-quality conversion results."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold mb-4 flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Globe, {
                className: "w-6 h-6 text-primary"
              }), "Technical Capabilities"]
            }), /* @__PURE__ */ jsx("p", {
              className: "mb-4 text-muted-foreground",
              children: "Our converter supports all standard SVG features and automatically handles complex graphics, text, gradients, and effects. The smart resizing algorithm ensures your converted PNG images maintain perfect quality whether you're working with small icons or large illustrations."
            }), /* @__PURE__ */ jsx("p", {
              className: "text-muted-foreground",
              children: "Compatible with all modern browsers including Chrome, Firefox, Safari, and Edge. No software installation or plugins required - just open your browser and start converting."
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Start using Convert SVG to PNG today - it's free, fast, secure, and designed to provide the best SVG conversion experience possible!"
          })]
        }), /* @__PURE__ */ jsx(AdSense, {
          format: "responsive"
        }), /* @__PURE__ */ jsx(Footer, {})]
      }), /* @__PURE__ */ jsx(DesktopSidebar, {})]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const feedback = UNSAFE_withComponentProps(function Feedback() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(CustomMeta, {
      title: "Feedback - Convert SVG to PNG",
      description: "Share your feedback about Convert SVG to PNG. Help us improve your SVG to PNG conversion experience with better features and functionality.",
      canonicalUrl: "/feedback",
      robots: "max-image-preview:large",
      ogType: "article"
    }), /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl mx-auto space-y-8 lg:mr-[300px]",
        children: [/* @__PURE__ */ jsx(AdSense, {
          format: "horizontal"
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center",
          children: /* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold text-foreground sm:text-4xl",
            children: "Feedback"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-6",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-lg text-muted-foreground",
            children: "We value your feedback! Your input helps us improve and provide a better SVG to PNG conversion experience with enhanced features and functionality."
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 mb-4",
              children: [/* @__PURE__ */ jsx(Mail, {
                className: "w-6 h-6 text-primary"
              }), "Contact Information"]
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-muted-foreground",
              children: ["For any queries, feedback, suggestions, or bug reports regarding our SVG to PNG converter, please email us at:", " ", /* @__PURE__ */ jsx("a", {
                href: "mailto:info@convertsvgtopng.net",
                className: "text-primary hover:underline font-semibold",
                children: "info@convertsvgtopng.net"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 mb-4",
              children: [/* @__PURE__ */ jsx(HeartHandshake, {
                className: "w-6 h-6 text-primary"
              }), "What We'd Love to Hear About"]
            }), /* @__PURE__ */ jsxs("ul", {
              className: "list-disc pl-6 space-y-2 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("li", {
                children: "SVG to PNG conversion quality and accuracy"
              }), /* @__PURE__ */ jsx("li", {
                children: "Batch processing performance and speed"
              }), /* @__PURE__ */ jsx("li", {
                children: "Browser compatibility issues or concerns"
              }), /* @__PURE__ */ jsx("li", {
                children: "SVG file format support and compatibility"
              }), /* @__PURE__ */ jsx("li", {
                children: "Additional conversion features you'd like to see"
              }), /* @__PURE__ */ jsx("li", {
                children: "Any bugs, errors, or technical issues encountered"
              }), /* @__PURE__ */ jsx("li", {
                children: "Suggestions for improving the conversion workflow"
              }), /* @__PURE__ */ jsx("li", {
                children: "Performance feedback for large file processing"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 mb-4",
              children: [/* @__PURE__ */ jsx(Lightbulb, {
                className: "w-6 h-6 text-primary"
              }), "Help Us Improve"]
            }), /* @__PURE__ */ jsx("p", {
              className: "mb-4 text-muted-foreground",
              children: "Whether you're a web developer, graphic designer, or casual user, your experience matters to us. Let us know how we can make Convert SVG to PNG work better for your specific needs and use cases."
            }), /* @__PURE__ */ jsx("p", {
              className: "text-muted-foreground",
              children: "We're constantly working to enhance our conversion algorithms, improve file format support, and add new features that make your workflow more efficient."
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Thank you for helping us make Convert SVG to PNG the best free SVG conversion tool available!"
          })]
        }), /* @__PURE__ */ jsx(AdSense, {
          format: "responsive"
        }), /* @__PURE__ */ jsx(Footer, {})]
      }), /* @__PURE__ */ jsx(DesktopSidebar, {})]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: feedback
}, Symbol.toStringTag, { value: "Module" }));
const privacy = UNSAFE_withComponentProps(function Privacy() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(CustomMeta, {
      title: "Privacy Policy - Convert SVG to PNG",
      description: "Learn about our privacy practices. All SVG to PNG conversions happen locally in your browser - your files never leave your device.",
      canonicalUrl: "/privacy",
      robots: "max-image-preview:large",
      ogType: "article"
    }), /* @__PURE__ */ jsx("div", {
      className: "min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-4xl mx-auto space-y-8",
        children: [/* @__PURE__ */ jsx(AdSense, {
          format: "horizontal"
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-center space-y-4",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-4xl font-bold tracking-tight",
            children: "Privacy Policy"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-muted-foreground",
            children: "Your privacy is our priority. Learn how we protect your data."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Last updated: July 11, 2025"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-12",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(Shield, {
                className: "w-6 h-6 text-primary"
              }), "Privacy First Approach"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: "Convert SVG to PNG is built with privacy as a fundamental principle. We believe your files and data should remain private and secure at all times."
              }), /* @__PURE__ */ jsx("p", {
                children: "Our service processes all SVG to PNG conversions directly in your web browser using client-side JavaScript. This means your files never leave your device and are never uploaded to our servers."
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(Lock, {
                className: "w-6 h-6 text-primary"
              }), "Data We Do NOT Collect"]
            }), /* @__PURE__ */ jsx("div", {
              className: "space-y-4 text-muted-foreground",
              children: /* @__PURE__ */ jsxs("ul", {
                className: "list-disc pl-6 space-y-2",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "Your SVG files or converted PNG images"
                }), /* @__PURE__ */ jsx("li", {
                  children: "File names, content, or metadata"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Personal information unless voluntarily provided"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Login credentials (no account required)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Payment information (service is free)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Location data beyond general geographic region"
                })]
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(Eye, {
                className: "w-6 h-6 text-primary"
              }), "Data We May Collect"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: "We may collect limited, anonymous data to improve our service:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "list-disc pl-6 space-y-2",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "Anonymous usage analytics (page views, feature usage)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "General geographic region for service optimization"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Browser type and version for compatibility"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Technical error logs (without personal information)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Feedback you voluntarily provide through our contact email"
                })]
              }), /* @__PURE__ */ jsx("p", {
                children: "All collected data is aggregated and anonymized. We cannot and do not identify individual users."
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(Server, {
                className: "w-6 h-6 text-primary"
              }), "Third-Party Services"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: "Our website may use the following third-party services:"
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-medium mb-2 text-foreground",
                    children: "Google Analytics"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "We may use Google Analytics to understand how visitors use our site. Google Analytics collects anonymous information about your visit but does not identify you personally."
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-medium mb-2 text-foreground",
                    children: "Google AdSense"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "We may display advertisements through Google AdSense. Google may use cookies to serve ads based on your visits to this and other websites."
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(Cookie, {
                className: "w-6 h-6 text-primary"
              }), "Cookies"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: "We use minimal cookies to:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "list-disc pl-6 space-y-2",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "Remember your theme preference (dark/light mode)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Provide basic analytics (if enabled)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Enable advertising services (if applicable)"
                })]
              }), /* @__PURE__ */ jsx("p", {
                children: "You can disable cookies in your browser settings, though some features may not work properly."
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(ShieldCheck, {
                className: "w-6 h-6 text-primary"
              }), "Data Security"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: "Since all file processing happens in your browser, your files are inherently secure:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "list-disc pl-6 space-y-2",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "Files never leave your device"
                }), /* @__PURE__ */ jsx("li", {
                  children: "No server-side storage or processing"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Conversion happens entirely offline after page load"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Website served over HTTPS for secure communication"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(BadgeCheck, {
                className: "w-6 h-6 text-primary"
              }), "Your Rights"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: "You have the right to:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "list-disc pl-6 space-y-2",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "Use our service without providing personal information"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Disable cookies and analytics in your browser"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Contact us with privacy-related questions"
                }), /* @__PURE__ */ jsx("li", {
                  children: "Request information about any data we may have collected"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(Mail, {
                className: "w-6 h-6 text-primary"
              }), "Contact Us"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsxs("p", {
                children: ["If you have questions about this Privacy Policy or our privacy practices, please contact us through our ", /* @__PURE__ */ jsx(Link, {
                  to: "/feedback",
                  className: "text-primary hover:underline font-semibold",
                  children: "feedback page"
                }), " to email us directly."]
              }), /* @__PURE__ */ jsx("p", {
                children: "We are committed to addressing any privacy concerns promptly and transparently."
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-semibold flex items-center gap-2 text-foreground",
              children: [/* @__PURE__ */ jsx(History, {
                className: "w-6 h-6 text-primary"
              }), "Changes to This Policy"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 text-muted-foreground",
              children: [/* @__PURE__ */ jsx("p", {
                children: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.'
              }), /* @__PURE__ */ jsx("p", {
                children: "We encourage you to review this policy periodically to stay informed about how we protect your privacy."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx(AdSense, {
          format: "responsive"
        }), /* @__PURE__ */ jsx(Footer, {})]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: privacy
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async () => {
  const pubId = siteConfig.adsense.pubId.replace(/^ca-/, "");
  const adsContent = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0`;
  return new Response(adsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400"
      // Cache for 24 hours
    }
  });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async () => {
  const manifest = {
    name: siteConfig.name,
    description: siteConfig.description,
    icons: [{
      src: "icon.png",
      type: "image/png",
      sizes: "512x512"
    }],
    start_url: "./?utm_source=pwa&utm_medium=homescreen&utm_campaign=installed_app",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff"
  };
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400"
      // Cache for 24 hours
    }
  });
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Ba2l50NL.js", "imports": ["/assets/index-D8IgVlhg.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-B__bMMGL.js", "imports": ["/assets/index-D8IgVlhg.js", "/assets/CustomMeta-CL00cgm4.js", "/assets/index-7QAMNHne.js"], "css": ["/assets/root-epI7LRb9.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Dwa1kt4e.js", "imports": ["/assets/index-D8IgVlhg.js", "/assets/AdSense-TwwrARdW.js", "/assets/CustomMeta-CL00cgm4.js", "/assets/DesktopSidebar-BBxeKy8J.js", "/assets/index-7QAMNHne.js", "/assets/lightbulb-kgZvsby1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-BosPT0E9.js", "imports": ["/assets/index-D8IgVlhg.js", "/assets/AdSense-TwwrARdW.js", "/assets/DesktopSidebar-BBxeKy8J.js", "/assets/CustomMeta-CL00cgm4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/feedback": { "id": "routes/feedback", "parentId": "root", "path": "feedback", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/feedback-CYhpD418.js", "imports": ["/assets/index-D8IgVlhg.js", "/assets/AdSense-TwwrARdW.js", "/assets/DesktopSidebar-BBxeKy8J.js", "/assets/CustomMeta-CL00cgm4.js", "/assets/mail-Bkm3Zd_F.js", "/assets/lightbulb-kgZvsby1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privacy": { "id": "routes/privacy", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/privacy-vjMuAF4k.js", "imports": ["/assets/index-D8IgVlhg.js", "/assets/AdSense-TwwrARdW.js", "/assets/CustomMeta-CL00cgm4.js", "/assets/mail-Bkm3Zd_F.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/ads.txt": { "id": "routes/ads.txt", "parentId": "root", "path": "ads.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ads.txt-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/manifest.json": { "id": "routes/manifest.json", "parentId": "root", "path": "manifest.json", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/manifest.json-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-ad6d3970.js", "version": "ad6d3970", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/feedback": {
    id: "routes/feedback",
    parentId: "root",
    path: "feedback",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/privacy": {
    id: "routes/privacy",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/ads.txt": {
    id: "routes/ads.txt",
    parentId: "root",
    path: "ads.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/manifest.json": {
    id: "routes/manifest.json",
    parentId: "root",
    path: "manifest.json",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
