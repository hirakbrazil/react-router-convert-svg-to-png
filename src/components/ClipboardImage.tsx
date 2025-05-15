
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Download, RefreshCcw } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
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
    autoDownload,
    setAutoDownload,
    handlePaste, 
    downloadImage, 
    resetImage,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    setImage
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChooseFromClipboard = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
          
          <div className="flex items-center space-x-2 justify-center">
            <Switch
              id="auto-download"
              checked={autoDownload}
              onCheckedChange={setAutoDownload}
            />
            <label 
              htmlFor="auto-download" 
              className="text-sm cursor-pointer"
            >
              Auto Download
            </label>
          </div>
          
          <div className="relative flex items-center justify-center">
            <Separator className="flex-grow" />
            <span className="mx-2 text-xs text-muted-foreground">Or</span>
            <Separator className="flex-grow" />
          </div>

          <Button 
            onClick={handleChooseFromClipboard}
            className="w-full"
            variant="outline"
          >
            Choose from Keyboard's Clipboard
          </Button>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
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
              <div className="flex items-center space-x-2 mb-2">
                <Switch
                  id="auto-download-image"
                  checked={autoDownload}
                  onCheckedChange={setAutoDownload}
                />
                <label 
                  htmlFor="auto-download-image" 
                  className="text-sm cursor-pointer"
                >
                  Auto Download
                </label>
              </div>
              <Button 
                onClick={downloadImage} 
                className="w-40 gap-2"
              >
                <Download className="w-5 h-5" />
                Download Image
              </Button>
              <Button 
                onClick={resetImage} 
                variant="outline" 
                className="w-30 gap-2"
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
