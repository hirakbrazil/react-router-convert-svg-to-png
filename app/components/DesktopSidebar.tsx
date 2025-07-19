import React, { useEffect, useState } from "react";
import AdSenseResponsive from "./AdSenseResponsive";

const DesktopSidebar = () => {
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // 🛡️ Prevent SSR crash

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLgUp(mediaQuery.matches);

    handleResize(); // Initial check on mount
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Prevent mismatch between server/client render
  if (typeof window === "undefined") return null;

  return (
    <div className="hidden lg:block w-[300px] fixed right-0 top-0 h-screen p-4 bg-background">
      <div className="sticky top-4">
        {isLgUp && <AdSenseResponsive />}
      </div>
    </div>
  );
};

export default DesktopSidebar;
