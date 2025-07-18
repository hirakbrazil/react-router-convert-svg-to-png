
import { useEffect } from "react";

// Apply theme synchronously before React renders
const applyThemeSync = () => {
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
};

// Apply theme immediately when module loads
if (typeof window !== "undefined") {
  applyThemeSync();
}

const useTheme = () => {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const themeColor = isDark ? "#020817" : "#ffffff";

      // Update existing theme-color meta tags
      const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
      existingMetas.forEach(meta => meta.remove());

      // Create new theme-color meta tag
      const newMeta = document.createElement("meta");
      newMeta.name = "theme-color";
      newMeta.content = themeColor;
      document.head.appendChild(newMeta);
    };

    // Apply theme immediately (in case it wasn't applied during module load)
    applyThemeSync();
    updateThemeColor();

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
