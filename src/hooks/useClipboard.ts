
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
      
      // Only return false if explicitly denied
      return result.state !== "denied";
    } catch (error) {
      // For browsers that don't support the Permissions API,
      // return true and let the actual clipboard operation handle any errors
      return true;
    }
  };

  const handlePaste = async () => {
    try {
      const hasPermission = await checkClipboardPermission();
      
      if (!hasPermission) {
        toast({
          title: "Permission Denied",
          description: "Please allow clipboard access in your browser settings",
          variant: "destructive",
          duration: 7000,
        });
        return;
      }

      const items = await navigator.clipboard.read();
      let foundImage = false;
      
      for (const item of items) {
        if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
          const blob = await item.getType(
            item.types.includes("image/png") ? "image/png" : "image/jpeg"
          );
          const url = URL.createObjectURL(blob);
          setImage(url);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        toast({
          title: "No Image Found",
          description: "Please copy an image to your clipboard first",
          variant: "destructive",
          duration: 7000,
        });
      }
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        toast({
          title: "Access Denied",
          description: "Please allow clipboard access when prompted",
          variant: "destructive",
          duration: 7000,
        });
      } else if (error.name === "SecurityError") {
        toast({
          title: "Security Error",
          description: "Clipboard access is restricted in this context",
          variant: "destructive",
          duration: 7000,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to read from clipboard. Please try again.",
          variant: "destructive",
          duration: 7000,
        });
      }
      console.error("Clipboard error:", error);
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

  const resetImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
    }
  };

  return {
    image,
    handlePaste,
    downloadImage,
    resetImage,
  };
};
