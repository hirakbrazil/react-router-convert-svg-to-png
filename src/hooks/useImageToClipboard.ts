
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useImageToClipboard = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchImageWithProxy = async (url: string) => {
    try {
      console.log("Fetching image via proxy:", url);

      const response = await supabase.functions.invoke("fetch-image-proxy", {
        body: { url },
        responseType: 'arraybuffer'
      });

      if (response.error) {
        console.error("Proxy error:", response.error);
        throw new Error(response.error.message);
      }

      if (!response.data) {
        throw new Error("No data received from proxy");
      }

      // Create blob from the array buffer response
      const blob = new Blob([response.data]);
      const imageUrl = URL.createObjectURL(blob);
      console.log("Successfully created blob URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Proxy error:", error);
      throw error;
    }
  };

  const fetchImage = async (url: string) => {
    try {
      setIsLoading(true);
      let imageUrl: string;

      try {
        console.log('Attempting direct fetch:', url);
        // First try direct fetch
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
          throw new Error('URL does not point to a valid image');
        }

        const blob = await response.blob();
        imageUrl = URL.createObjectURL(blob);
        console.log('Direct fetch successful');
      } catch (error) {
        console.log('Direct fetch failed, trying proxy:', error);
        // If direct fetch fails, try using the proxy
        imageUrl = await fetchImageWithProxy(url);
      }

      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const copyToClipboard = async () => {
    if (!image) return;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);

      toast({
        title: "Success",
        description: "Image copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy image to clipboard. Make sure you're using a supported browser.",
        variant: "destructive",
      });
      console.error('Clipboard error:', error);
    }
  };

  const reset = () => {
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
    }
  };

  return {
    image,
    isLoading,
    fetchImage,
    handleFileUpload,
    copyToClipboard,
    reset,
  };
};
