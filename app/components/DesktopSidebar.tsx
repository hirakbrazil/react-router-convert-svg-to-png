import React, { useEffect, useState } from "react";
import AdSense from "./AdSense";

const DesktopSidebar = () => {
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 64rem)");
    const updateMatch = () => setIsLgUp(mediaQuery.matches);

    updateMatch(); // Initial check
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  if (!isLgUp) return null; // Don't render anything on < lg screens

  return (
    <aside className="hidden lg:block w-[300px] fixed right-0 top-0 h-screen p-4 bg-background">
      <div className="sticky top-4">
        <AdSense format="responsive" />
      </div>
    </aside>
  );
};

export default DesktopSidebar;
