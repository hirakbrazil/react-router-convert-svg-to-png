
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useClipboard = () => {
  const [image, setImage] = useState<string | null>(null);
  const { toast } = useToast();

  const checkClipboardPermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: "clipboard-read" as PermissionName,
      });
      return result.state === "granted";
    } catch (error) {
      return true; // Fallback for browsers that don't support permission API
    }
  };

  const handlePaste = async () => {
    const hasPermission = await checkClipboardPermission();
    
    if (!hasPermission) {
      toast({
        title: "Permission Denied",
        description: "Please allow clipboard access to paste images",
        variant: "destructive",
      });
      return;
    }

    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
          const blob = await item.getType(item.types.includes("image/png") ? "image/png" : "image/jpeg");
          const url = URL.createObjectURL(blob);
          setImage(url);
          return;
        }
      }
      toast({
        title: "No Image Found",
        description: "Please copy an image to your clipboard first",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read from clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadImage = () => {
    if (!image) return;
    
    const link = document.createElement("a");
    link.href = image;
    link.download = `clipboard-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    image,
    handlePaste,
    downloadImage,
  };
};
