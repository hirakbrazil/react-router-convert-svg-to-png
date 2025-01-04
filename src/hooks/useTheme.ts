import { useEffect } from "react";

const useTheme = () => {
  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem("theme") || "system";
      const root = document.documentElement;

      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();

    // Add listener for system theme changes
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme") || localStorage.getItem("theme") === "system") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      }
    };

    darkThemeMq.addEventListener("change", handleThemeChange);

    return () => darkThemeMq.removeEventListener("change", handleThemeChange);
  }, []);
};

export default useTheme;
