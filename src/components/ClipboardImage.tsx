
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Download, RefreshCcw, ChevronDown } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClipboardImage = () => {
  const { 
    image, 
    isDragging,
    format,
    setFormat,
    handlePaste, 
    downloadImage, 
    resetImage,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  } = useClipboard();

  const [isFormatSelectOpen, setIsFormatSelectOpen] = useState(false);

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
            <div className="flex justify-center">
              <Select 
                value={format} 
                onValueChange={(value: "png" | "jpg" | "webp") => setFormat(value)}
                open={isFormatSelectOpen}
                onOpenChange={setIsFormatSelectOpen}
              >
                <SelectTrigger className="w-30">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={downloadImage} 
              className="w-80 gap-2"
              disabled={isFormatSelectOpen}
            >
              <Download className="w-5 h-5" />
              Download Image
            </Button>
            <Button 
              onClick={resetImage} 
              variant="outline" 
              className="w-32 gap-2"
              disabled={isFormatSelectOpen}
            >
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
