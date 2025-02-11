
import { useEffect } from "react";

const useTheme = () => {
  useEffect(() => {
    const updateThemeColor = () => {
      const theme = localStorage.getItem("theme");
      const root = document.documentElement;
      const isDark = theme === "dark" || 
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      
      const meta = document.querySelector('meta[name="theme-color"]');
      const themeColor = isDark ? "#000000" : "#07a36c";

      if (meta) {
        meta.setAttribute("content", themeColor);
      }
    };

    const applyTheme = () => {
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

      updateThemeColor();
    };

    applyTheme();

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
        updateThemeColor();
      }
    };

    darkThemeMq.addEventListener("change", handleThemeChange);

    // Observe for changes in the document class (theme change)
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      darkThemeMq.removeEventListener("change", handleThemeChange);
      observer.disconnect();
    };
  }, []);
};

export default useTheme;
