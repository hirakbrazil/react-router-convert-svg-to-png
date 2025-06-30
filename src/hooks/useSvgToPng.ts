
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type QualityOption = 'high' | 'original';

interface SvgDimensions {
  width: number;
  height: number;
}

export const useSvgToPng = () => {
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [svgDimensions, setSvgDimensions] = useState<SvgDimensions | null>(null);
  const [pngDataUrl, setPngDataUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState<QualityOption>('high');
  const { toast } = useToast();

  const resetState = useCallback(() => {
    setSvgFile(null);
    setSvgContent("");
    setSvgDimensions(null);
    setPngDataUrl("");
  }, []);

  const extractSvgDimensions = (svgString: string): SvgDimensions => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    
    if (!svgElement) {
      throw new Error('Invalid SVG file');
    }

    let width = 300; // default width
    let height = 150; // default height

    // Try to get width and height from attributes
    const widthAttr = svgElement.getAttribute('width');
    const heightAttr = svgElement.getAttribute('height');
    
    if (widthAttr && heightAttr) {
      width = parseFloat(widthAttr.replace(/[^0-9.]/g, ''));
      height = parseFloat(heightAttr.replace(/[^0-9.]/g, ''));
    } else {
      // Try to get from viewBox
      const viewBox = svgElement.getAttribute('viewBox');
      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);
        width = vbWidth || width;
        height = vbHeight || height;
      }
    }

    return { width, height };
  };

  const convertSvgToPng = useCallback(async (svgString: string, dimensions: SvgDimensions): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      let targetWidth = dimensions.width;
      let targetHeight = dimensions.height;

      // Apply smart resizing logic for high quality
      if (quality === 'high' && dimensions.width < 4000) {
        const scaleFactor = 4000 / dimensions.width;
        targetWidth = 4000;
        targetHeight = dimensions.height * scaleFactor;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const dataUrl = URL.createObjectURL(blob);
            resolve(dataUrl);
          } else {
            reject(new Error('Failed to convert to PNG'));
          }
        }, 'image/png', 1.0);
      };
      
      img.onerror = () => reject(new Error('Failed to load SVG'));
      
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      img.src = URL.createObjectURL(svgBlob);
    });
  }, [quality]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.includes('svg')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an SVG file (.svg)",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    
    try {
      const svgText = await file.text();
      const dimensions = extractSvgDimensions(svgText);
      
      setSvgFile(file);
      setSvgContent(svgText);
      setSvgDimensions(dimensions);
      
      const pngUrl = await convertSvgToPng(svgText, dimensions);
      setPngDataUrl(pngUrl);
      
      toast({
        title: "Conversion Successful",
        description: "SVG has been converted to PNG",
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion Failed",
        description: "Failed to convert SVG. Please check if the file is valid.",
        variant: "destructive",
      });
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, toast, resetState]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const svgFile = files.find(file => file.type.includes('svg'));
    
    if (svgFile) {
      await handleFileUpload(svgFile);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please drop an SVG file",
        variant: "destructive",
      });
    }
  }, [handleFileUpload, toast]);

  const downloadPng = useCallback(() => {
    if (!pngDataUrl || !svgFile) return;
    
    const link = document.createElement('a');
    link.href = pngDataUrl;
    link.download = `${svgFile.name.replace('.svg', '')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pngDataUrl, svgFile]);

  const handleQualityChange = useCallback(async (newQuality: QualityOption) => {
    setQuality(newQuality);
    
    if (svgContent && svgDimensions) {
      setIsConverting(true);
      try {
        const pngUrl = await convertSvgToPng(svgContent, svgDimensions);
        setPngDataUrl(pngUrl);
      } catch (error) {
        console.error('Re-conversion error:', error);
        toast({
          title: "Conversion Failed",
          description: "Failed to re-convert with new quality settings",
          variant: "destructive",
        });
      } finally {
        setIsConverting(false);
      }
    }
  }, [svgContent, svgDimensions, convertSvgToPng, toast]);

  return {
    svgFile,
    svgContent,
    svgDimensions,
    pngDataUrl,
    isDragging,
    isConverting,
    quality,
    handleFileUpload,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    downloadPng,
    resetState,
    handleQualityChange,
  };
};
