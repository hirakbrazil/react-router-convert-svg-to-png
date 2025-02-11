
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Download, RefreshCcw } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";

const ClipboardImage = () => {
  const { 
    image, 
    isDragging,
    handlePaste, 
    downloadImage, 
    resetImage,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  } = useClipboard();

  useEffect(() => {
    const handleKeyboardPaste = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        handlePaste();
      }
    };

    window.addEventListener("keydown", handleKeyboardPaste);
    return () => window.removeEventListener("keydown", handleKeyboardPaste);
  }, [handlePaste]);

  return (
    <div className="space-y-6">
      {!image ? (
        <Button
          onClick={handlePaste}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full py-8 text-lg gap-3 relative",
            "border-2 border-dashed",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            "transition-colors duration-200"
          )}
          variant="outline"
        >
          <ImageIcon className="w-6 h-6" />
          {isDragging ? "Drop Image Here" : "Paste or Drop Image"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img src={image} alt="Pasted image" className="w-full h-auto" />
          </div>
          <div className="space-y-2">
            <Button onClick={downloadImage} className="w-full gap-2">
              <Download className="w-5 h-5" />
              Download Image
            </Button>
            <Button onClick={resetImage} variant="outline" className="w-full gap-2">
              <RefreshCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClipboardImage;
