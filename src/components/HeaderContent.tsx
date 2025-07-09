
import React from "react";
import { FileImage, Zap, Shield } from "lucide-react";

const HeaderContent = () => {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Convert SVG to PNG
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your SVG files into high-quality PNG images
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileImage className="w-4 h-4 text-primary" />
          <span>High Quality Output</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span>Smart Resizing</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4 text-primary" />
          <span>Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
