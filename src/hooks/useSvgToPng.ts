import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type QualityOption = 'original' | 'high' | 'very-high' | 'custom';

interface SvgDimensions {
  width: number;
  height: number;
}

const QUALITY_STORAGE_KEY = 'svg-to-png-quality';
const CUSTOM_WIDTH_STORAGE_KEY = 'svg-to-png-custom-width';

export const useSvgToPng = () => {
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [svgDimensions, setSvgDimensions] = useState<SvgDimensions | null>(null);
  const [pngDataUrl, setPngDataUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState<QualityOption>('high');
  const [customWidth, setCustomWidth] = useState<number>(4000);
  const [svgTextInput, setSvgTextInput] = useState<string>("");
  const { toast } = useToast();

  // Load quality preference and custom width from localStorage on mount
  useEffect(() => {
    const savedQuality = localStorage.getItem(QUALITY_STORAGE_KEY) as QualityOption;
    if (savedQuality && ['original', 'high', 'very-high', 'custom'].includes(savedQuality)) {
      setQuality(savedQuality);
    }
    
    const savedCustomWidth = localStorage.getItem(CUSTOM_WIDTH_STORAGE_KEY);
    if (savedCustomWidth) {
      const parsedWidth = parseInt(savedCustomWidth);
      if (!isNaN(parsedWidth) && parsedWidth > 0) {
        setCustomWidth(parsedWidth);
      }
    }
  }, []);

  // Save quality preference to localStorage when it changes
  const saveQualityPreference = useCallback((newQuality: QualityOption) => {
    localStorage.setItem(QUALITY_STORAGE_KEY, newQuality);
  }, []);

  // Save custom width preference to localStorage
  const saveCustomWidthPreference = useCallback((width: number) => {
    localStorage.setItem(CUSTOM_WIDTH_STORAGE_KEY, width.toString());
  }, []);

  const resetState = useCallback(() => {
    setSvgFile(null);
    setSvgContent("");
    setSvgDimensions(null);
    setPngDataUrl("");
    setSvgTextInput("");
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

  const getTargetDimensions = useCallback((dimensions: SvgDimensions, selectedQuality: QualityOption) => {
    if (selectedQuality === 'original') {
      return dimensions;
    }

    let targetWidth: number;
    
    if (selectedQuality === 'custom') {
      targetWidth = customWidth;
    } else {
      targetWidth = selectedQuality === 'high' ? 4000 : 6000;
    }
    
    if (dimensions.width < targetWidth) {
      const scaleFactor = targetWidth / dimensions.width;
      return {
        width: targetWidth,
        height: Math.round(dimensions.height * scaleFactor)
      };
    }
    
    return dimensions;
  }, [customWidth]);

  const convertSvgToPng = useCallback(async (svgString: string, dimensions: SvgDimensions, selectedQuality: QualityOption): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      const targetDimensions = getTargetDimensions(dimensions, selectedQuality);
      
      canvas.width = targetDimensions.width;
      canvas.height = targetDimensions.height;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, targetDimensions.width, targetDimensions.height);
        
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
  }, [getTargetDimensions]);

  const processSvgContent = useCallback(async (svgText: string, fileName: string = 'pasted-svg.svg') => {
    setIsConverting(true);
    
    try {
      const dimensions = extractSvgDimensions(svgText);
      
      // Create a fake File object for pasted SVG
      const file = new File([svgText], fileName, { type: 'image/svg+xml' });
      
      setSvgFile(file);
      setSvgContent(svgText);
      setSvgDimensions(dimensions);
      
      const pngUrl = await convertSvgToPng(svgText, dimensions, quality);
      setPngDataUrl(pngUrl);
      
      toast({
        title: "Conversion Successful",
        description: "SVG has been converted to PNG",
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion Failed",
        description: "Failed to convert SVG. Please check if the SVG code is valid.",
        variant: "destructive",
      });
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, quality, toast, resetState]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.includes('svg')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an SVG file (.svg)",
        variant: "destructive",
      });
      return;
    }

    const svgText = await file.text();
    await processSvgContent(svgText, file.name);
  }, [processSvgContent, toast]);

  const handleSvgTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSvgTextInput(e.target.value);
  }, []);

  const handleSvgTextSubmit = useCallback(async () => {
    if (!svgTextInput.trim()) return;
    
    // Basic SVG validation
    if (!svgTextInput.includes('<svg')) {
      toast({
        title: "Invalid SVG Code",
        description: "Please enter valid SVG XML code",
        variant: "destructive",
      });
      return;
    }

    await processSvgContent(svgTextInput.trim());
  }, [svgTextInput, processSvgContent, toast]);

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
    saveQualityPreference(newQuality);
    
    if (svgContent && svgDimensions) {
      setIsConverting(true);
      try {
        const pngUrl = await convertSvgToPng(svgContent, svgDimensions, newQuality);
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
  }, [svgContent, svgDimensions, convertSvgToPng, saveQualityPreference, toast]);

  const handleCustomWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow any input during typing, including empty string
    const value = e.target.value;
    if (value === '') {
      setCustomWidth(0); // Set to 0 for empty, but input will show empty
    } else {
      const numValue = parseInt(value);
      setCustomWidth(isNaN(numValue) ? 0 : numValue);
    }
  }, []);

  const handleCustomWidthBlur = useCallback(async () => {
    // Validate and correct the value onBlur
    let validatedWidth = customWidth;
    
    if (validatedWidth < 10) {
      validatedWidth = 10;
    } else if (validatedWidth > 10000) {
      validatedWidth = 10000;
    }
    
    // Update the state with the validated value first
    setCustomWidth(validatedWidth);
    saveCustomWidthPreference(validatedWidth);
    
    // Then trigger conversion with the validated value
    if (quality === 'custom' && svgContent && svgDimensions) {
      setIsConverting(true);
      try {
        const pngUrl = await convertSvgToPng(svgContent, svgDimensions, 'custom');
        setPngDataUrl(pngUrl);
      } catch (error) {
        console.error('Re-conversion error:', error);
        toast({
          title: "Conversion Failed",
          description: "Failed to re-convert with new custom width",
          variant: "destructive",
        });
      } finally {
        setIsConverting(false);
      }
    }
  }, [customWidth, quality, svgContent, svgDimensions, convertSvgToPng, saveCustomWidthPreference, toast]);

  const getAvailableQualityOptions = useCallback(() => {
    if (!svgDimensions) return ['original', 'high', 'very-high', 'custom'] as QualityOption[];
    
    if (svgDimensions.width >= 6000) {
      return [] as QualityOption[]; // Hide quality selector entirely
    }
    
    if (svgDimensions.width >= 4000) {
      return ['original', 'very-high', 'custom'] as QualityOption[];
    }
    
    return ['original', 'high', 'very-high', 'custom'] as QualityOption[];
  }, [svgDimensions]);

  const shouldShowQualitySelector = useCallback(() => {
    return getAvailableQualityOptions().length > 0;
  }, [getAvailableQualityOptions]);

  return {
    svgFile,
    svgContent,
    svgDimensions,
    pngDataUrl,
    isDragging,
    isConverting,
    quality,
    customWidth,
    svgTextInput,
    handleFileUpload,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    downloadPng,
    resetState,
    handleQualityChange,
    handleCustomWidthChange,
    handleCustomWidthBlur,
    getTargetDimensions,
    getAvailableQualityOptions,
    shouldShowQualitySelector,
    handleSvgTextChange,
    handleSvgTextSubmit,
  };
};
