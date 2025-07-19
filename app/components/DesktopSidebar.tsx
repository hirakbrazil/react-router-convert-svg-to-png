import React, { useEffect, useState } from "react";
import AdSenseResponsive from "./AdSenseResponsive";

const DesktopSidebar = () => {
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateMatch = () => setIsLgUp(mediaQuery.matches);

    updateMatch(); // Initial check
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  if (!isLgUp) return null; // Don't render anything on < lg screens

  return (
    <div className="hidden lg:block w-[300px] fixed right-0 top-0 h-screen p-4 bg-background">
      <div className="sticky top-4">
        <AdSenseResponsive />
      </div>
    </div>
  );
};

export default DesktopSidebar;
