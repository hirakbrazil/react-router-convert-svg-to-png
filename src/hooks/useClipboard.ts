
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useClipboard = () => {
  const [image, setImage] = useState<string | null>(null);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
        });
      }
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        toast({
          title: "Access Denied",
          description: "Please allow clipboard access when prompted",
          variant: "destructive",
        });
      } else if (error.name === "SecurityError") {
        toast({
          title: "Security Error",
          description: "Clipboard access is restricted in this context",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to read from clipboard. Please try again.",
          variant: "destructive",
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
      // Store the current image URL for potential undo
      setPreviousImage(image);
      
      // Clear current image
      URL.revokeObjectURL(image);
      setImage(null);

      // Disable reset button
      setIsResetDisabled(true);

      // Show toast with undo button
      toast({
        title: "Reset Complete",
        description: "Image has been cleared",
        duration: 7000,
        action: (
          <button
            onClick={() => {
              if (previousImage) {
                setImage(previousImage);
                setPreviousImage(null);
                toast({
                  title: "Image Restored",
                  description: "Previous image has been restored",
                  duration: 5000,
                });
              }
            }}
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Undo
          </button>
        ),
      });

      // Enable reset button after 7 seconds
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      resetTimeoutRef.current = setTimeout(() => {
        setIsResetDisabled(false);
        if (previousImage) {
          URL.revokeObjectURL(previousImage);
          setPreviousImage(null);
        }
      }, 7000);
    }
  };

  return {
    image,
    handlePaste,
    downloadImage,
    resetImage,
    isResetDisabled,
  };
};
