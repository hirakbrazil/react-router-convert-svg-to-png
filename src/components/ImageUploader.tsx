
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Upload, Copy, RefreshCcw, Link } from "lucide-react";
import { useImageToClipboard } from "@/hooks/useImageToClipboard";

const ImageUploader = () => {
  const [url, setUrl] = useState("");
  const { image, isLoading, fetchImage, handleFileUpload, copyToClipboard, reset } = useImageToClipboard();

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      fetchImage(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
          <Button
            variant="outline"
            className="w-full py-8 text-lg gap-3"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <Upload className="w-6 h-6" />
            Upload Image
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button 
            onClick={handleUrlSubmit}
            disabled={isLoading || !url}
          >
            <Link className="w-4 h-4 mr-2" />
            Fetch
          </Button>
        </div>
      </div>

      {image && (
        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img src={image} alt="Preview" className="w-full h-auto" />
          </div>
          <div className="space-y-2">
            <Button onClick={copyToClipboard} className="w-full gap-2">
              <Copy className="w-5 h-5" />
              Copy to Clipboard
            </Button>
            <Button onClick={reset} variant="outline" className="w-full gap-2">
              <RefreshCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
