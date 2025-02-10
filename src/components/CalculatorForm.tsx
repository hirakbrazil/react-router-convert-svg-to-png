
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download, ClipboardPaste } from "lucide-react";

const CalculatorForm = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      // Check if clipboard API is supported
      if (!navigator.clipboard) {
        toast({
          title: "Error",
          description: "Clipboard access not supported in your browser",
          variant: "destructive",
        });
        return;
      }

      // Request permission for clipboard read access
      const permissionResult = await navigator.permissions.query({
        name: 'clipboard-read' as PermissionName
      });

      if (permissionResult.state === 'denied') {
        toast({
          title: "Permission Denied",
          description: "Please allow clipboard access to paste images",
          variant: "destructive",
        });
        return;
      }

      const clipboardItems = await navigator.clipboard.read();
      
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImage(imageUrl);
            return;
          }
        }
      }

      toast({
        title: "No Image Found",
        description: "No image data found in clipboard",
        variant: "destructive",
      });
    } catch (error) {
      console.error('Error accessing clipboard:', error);
      toast({
        title: "Error",
        description: "Failed to access clipboard content",
        variant: "destructive",
      });
    }
  };

  const handleKeyboardPaste = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      handlePaste();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboardPaste);
    return () => {
      document.removeEventListener('keydown', handleKeyboardPaste);
    };
  }, []);

  const handleDownload = async () => {
    if (!previewImage) return;

    try {
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `clipboard-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        title: "Error",
        description: "Failed to download the image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border border-border bg-card dark:bg-card rounded-xl p-6 space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={handlePaste}
          className="w-full max-w-md"
          variant="secondary"
        >
          <ClipboardPaste className="mr-2" />
          Paste Image
        </Button>

        {previewImage && (
          <div className="space-y-4 w-full">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full h-auto rounded-lg"
            />
            <Button 
              onClick={handleDownload}
              className="w-full"
              variant="default"
            >
              <Download className="mr-2" />
              Download Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorForm;
