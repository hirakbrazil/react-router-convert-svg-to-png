
import React from "react";
import { FileSearch, Layout, Lightbulb } from "lucide-react";

const HomepageContent = () => {
  return (
    <div className="space-y-12 mt-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
          <FileSearch className="w-6 h-6 text-primary" />
          How It Works
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Simply upload your SVG file using drag-and-drop or the file browser. Our tool automatically processes your SVG and converts it to a high-quality PNG image with smart resizing capabilities.
          </p>
          <p>
            All processing happens directly in your browser - your files never leave your device, ensuring complete privacy and security. The conversion works offline once loaded.
          </p>
          <p>
            Choose between original size conversion or high-quality mode that automatically resizes smaller SVGs to HD quality while maintaining perfect aspect ratios.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
          <Layout className="w-6 h-6 text-primary" />
          Perfect For
        </h2>
        <div className="grid gap-4 text-muted-foreground">
          <div>
            <h3 className="font-medium mb-2 text-foreground">Web Development</h3>
            <p>
              Convert SVG icons and graphics to PNG for use in websites, applications, and presentations where PNG format is required.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Print Materials</h3>
            <p>
              Generate high-resolution PNG images from SVG files for print materials, posters, and marketing collateral.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Social Media</h3>
            <p>
              Create PNG versions of your SVG logos and graphics for social media platforms that don't support SVG format.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
          <Lightbulb className="w-6 h-6 text-primary" />
          Features & Tips
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="font-medium mb-2 text-foreground">Smart Quality Enhancement</h3>
            <p>
              Enable "High Quality" mode to automatically upscale SVGs smaller than 4000px to ensure crisp, professional results at any size.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Live Preview Comparison</h3>
            <p>
              Use the interactive slider to compare your original SVG with the converted PNG side-by-side before downloading.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Browser Compatibility</h3>
            <p>
              Works seamlessly with all modern browsers including Chrome, Firefox, Safari, and Edge. No plugins or software installation required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;
