
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Download } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";

const ClipboardImage = () => {
  const { image, handlePaste, downloadImage } = useClipboard();

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
          className="w-full py-8 text-lg gap-3"
          variant="outline"
        >
          <ImageIcon className="w-6 h-6" />
          Paste Image
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img src={image} alt="Pasted content" className="w-full h-auto" />
          </div>
          <Button onClick={downloadImage} className="w-full gap-2">
            <Download className="w-5 h-5" />
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClipboardImage;
