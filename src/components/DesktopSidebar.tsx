import React from "react";
import AdSenseResponsive from "./AdSenseResponsive";

const DesktopSidebar = () => {
  return (
    <div className="hidden lg:block w-[300px] fixed right-0 top-0 h-screen p-4 bg-background">
      <div className="sticky top-4">
        <AdSenseResponsive />
      </div>
    </div>
  );
};

export default DesktopSidebar;