import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Download, RefreshCcw, Clipboard } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
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
    setImage,
    handlePaste, 
    downloadImage, 
    resetImage,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  } = useClipboard();

  const [isFormatSelectOpen, setIsFormatSelectOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyboardPaste = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        handlePaste();
      }
    };

    window.addEventListener("keydown", handleKeyboardPaste);
    return () => window.removeEventListener("keydown", handleKeyboardPaste);
  }, [handlePaste]);

  const handleClipboardButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            setImage(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
    // Clear input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <div className="space-y-4">
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
          
          <div className="flex items-center gap-4">
            <Separator className="flex-grow" />
            <span className="text-sm text-muted-foreground">Or</span>
            <Separator className="flex-grow" />
          </div>
          
          <Button 
            onClick={handleClipboardButtonClick}
            className="w-full py-6 gap-3"
            variant="outline"
          >
            <Clipboard className="w-5 h-5" />
            Choose from Keyboard's Clipboard
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            // This attribute helps on mobile to access the camera/gallery/clipboard
            capture="user"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img src={image} alt="Pasted image" className="w-full h-auto" />
          </div>
          <div className="space-y-2">
            <div
              className={`flex justify-center transition-all duration-500 ${
                isFormatSelectOpen ? "mb-32" : "mb-0"
              }`}
            >
              <Select 
                value={format} 
                onValueChange={(value: "png" | "jpg" | "webp") => setFormat(value)}
                open={isFormatSelectOpen}
                onOpenChange={setIsFormatSelectOpen}
              >
                <SelectTrigger className="w-[90px] focus:ring-0 focus:outline-none">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2 items-center">
            <Button 
              onClick={downloadImage} 
              className="w-40 gap-2"
              disabled={isFormatSelectOpen}
            >
              <Download className="w-5 h-5" />
              Download Image
            </Button>
            <Button 
              onClick={resetImage} 
              variant="outline" 
              className="w-30 gap-2"
              disabled={isFormatSelectOpen}
            >
              <RefreshCcw className="w-5 h-5" />
              Reset
            </Button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClipboardImage;
