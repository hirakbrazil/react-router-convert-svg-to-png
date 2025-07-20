import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { isBrowser } from "@/lib/isBrowser";

type Theme = 'light' | 'dark' | 'system';

// Check if View Transitions API is supported
const supportsViewTransitions = isBrowser && 'startViewTransition' in document;

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || "system";
    }
    return "system";
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isBrowser) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);

      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange = (e: MediaQueryListEvent) => {
        if (theme === "system") {
          root.classList.remove("light", "dark");
          root.classList.add(e.matches ? "dark" : "light");
        }
      };

      darkThemeMq.addEventListener("change", handleThemeChange);
      return () => darkThemeMq.removeEventListener("change", handleThemeChange);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Add the CSS for the circular reveal animation
  useEffect(() => {
    if (!supportsViewTransitions) return;

    const style = document.createElement('style');
    style.textContent = `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      ::view-transition-old(root) {
        z-index: 1;
      }

      ::view-transition-new(root) {
        z-index: 999;
      }

      .dark::view-transition-old(root) {
        z-index: 999;
      }

      .dark::view-transition-new(root) {
        z-index: 1;
      }

      [data-theme-transition] {
        view-transition-name: none !important;
      }
    `;
    
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4 mr-2" />;
      case "dark":
        return <Moon className="h-4 w-4 mr-2" />;
      default:
        return <Monitor className="h-4 w-4 mr-2" />;
    }
  };

  const createCircularRevealTransition = async (newTheme: Theme) => {
    if (!supportsViewTransitions || !buttonRef.current) {
      return Promise.resolve();
    }

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate the center point of the button
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the radius needed to cover the entire viewport
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Create the circular clip path animation
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${maxRadius}px at ${x}px ${y}px)`
    ];

    // Determine if we're going to dark mode
    const isDarkMode = newTheme === 'dark' || 
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    return new Promise<void>((resolve) => {
      if (!document.startViewTransition) {
        resolve();
        return;
      }

      const transition = document.startViewTransition(() => {
        updateTheme(newTheme);
      });

      transition.ready.then(() => {
        const newRoot = document.documentElement;
        newRoot.animate(
          {
            clipPath: isDarkMode ? clipPath : [...clipPath].reverse()
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: isDarkMode ? '::view-transition-new(root)' : '::view-transition-old(root)'
          }
        );
      });

      transition.finished.then(resolve);
    });
  };

  const updateTheme = (newTheme: Theme) => {
    if (!isBrowser) return;
    
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      localStorage.removeItem("theme");
    } else {
      root.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }

    setTheme(newTheme);
  };

  const handleThemeChange = async (newTheme: Theme) => {
    if (!isBrowser) return;
    
    // Check if the selected theme is already active
    if (newTheme === theme) {
      const modeNames = {
        light: "Light",
        dark: "Dark", 
        system: "System default"
      };
      
      toast.info(`${modeNames[newTheme]} mode is already active`, {
        duration: 5000,
      });
      return;
    }

    // Use circular reveal transition if supported, otherwise fallback to normal
    if (supportsViewTransitions) {
      await createCircularRevealTransition(newTheme);
    } else {
      updateTheme(newTheme);
    }

    toast.success(
      `Theme set to ${
        newTheme === "system"
          ? "System default"
          : newTheme.charAt(0).toUpperCase() + newTheme.slice(1)
      }`,
      {
        duration: 5000,
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          ref={buttonRef}
          variant="outline" 
          size="default" 
          className="flex items-center gap-2"
          data-theme-transition
        >
          {getThemeIcon()}
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-[#030c21] border-border">
        <DropdownMenuItem onClick={() => handleThemeChange("light")} className="gap-2 cursor-pointer">
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="gap-2 cursor-pointer">
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")} className="gap-2 cursor-pointer">
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
