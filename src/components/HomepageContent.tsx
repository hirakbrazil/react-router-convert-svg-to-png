
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
            Simply upload your SVG files using drag-and-drop or the file browser. Our tool automatically processes your SVGs and converts them to high-quality PNG images with advanced features like batch processing and smart resizing.
          </p>
          <p>
            All processing happens directly in your browser - your files never leave your device, ensuring complete privacy and security. The conversion works offline once loaded, making it fast and secure.
          </p>
          <p>
            Upload multiple SVG files at once for batch conversion or paste SVG code to download it as svg or png format. Choose between original size conversion or high-quality mode that automatically resizes smaller SVGs up to 10,000px while maintaining perfect aspect ratios.
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
            <h3 className="font-medium mb-2 text-foreground">Web Development & Design</h3>
            <p>
              Convert SVG icons, logos, and graphics to PNG for use in websites, applications, and design projects where PNG format is required or preferred.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Print & Marketing Materials</h3>
            <p>
              Generate ultra-high-resolution PNG images from SVG files for print materials, posters, business cards, and marketing collateral with crystal-clear quality.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Social Media & Presentations</h3>
            <p>
              Create PNG versions of your SVG logos and graphics for social media platforms, presentations, and documents that don't support SVG format.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Batch Processing</h3>
            <p>
              Process multiple SVG files simultaneously, saving time when converting entire icon sets, logo variations, or graphic collections.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
          <Lightbulb className="w-6 h-6 text-primary" />
          Advanced Features & Tips
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="font-medium mb-2 text-foreground">Smart Quality Enhancement</h3>
            <p>
              Enable "High Quality" mode to automatically upscale SVGs smaller than 4000px to ensure crisp, professional results. Choose up to 10,000px width for ultra-high resolution output.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Custom Width Settings</h3>
            <p>
              Set precise custom size for your hd quality PNG output while maintaining aspect ratios. Perfect for creating consistent sizing across multiple graphics.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Live Preview Comparison</h3>
            <p>
              Use the interactive slider to compare your original SVG with the converted PNG side-by-side before downloading. See exactly how your conversion will look.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Bulk Download Options</h3>
            <p>
              Download individual files or get all your converted PNGs in a single ZIP file. Perfect for batch processing workflows and organizing your converted files.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-foreground">Browser Compatibility & Privacy</h3>
            <p>
              Works seamlessly with all modern browsers including Chrome, Firefox, Safari, and Edge. No plugins required, and all processing happens locally for maximum privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;
