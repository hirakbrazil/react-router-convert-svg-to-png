
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type QualityOption = 'original' | 'high' | 'very-high' | 'custom';

interface SvgDimensions {
  width: number;
  height: number;
}

interface ProcessedSvg {
  id: string;
  file: File;
  svgContent: string;
  dimensions: SvgDimensions;
  pngDataUrl: string;
}

const QUALITY_STORAGE_KEY = 'svg-to-png-quality';
const CUSTOM_WIDTH_STORAGE_KEY = 'svg-to-png-custom-width';

export const useSvgToPng = () => {
  const [processedSvgs, setProcessedSvgs] = useState<ProcessedSvg[]>([]);
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
    setProcessedSvgs([]);
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
    
    // Scale both up and down based on the target width
    const scaleFactor = targetWidth / dimensions.width;
    return {
      width: targetWidth,
      height: Math.round(dimensions.height * scaleFactor)
    };
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
      
      const pngUrl = await convertSvgToPng(svgText, dimensions, quality);
      
      const processedSvg: ProcessedSvg = {
        id: crypto.randomUUID(),
        file,
        svgContent: svgText,
        dimensions,
        pngDataUrl: pngUrl
      };
      
      setProcessedSvgs([processedSvg]);
      
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

  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const svgFiles = fileArray.filter(file => file.type.includes('svg'));
    
    if (svgFiles.length === 0) {
      toast({
        title: "Invalid File Type",
        description: "Please upload SVG files (.svg)",
        variant: "destructive",
      });
      return;
    }

    if (svgFiles.length > 10) {
      toast({
        title: "Too Many Files",
        description: "Maximum 10 files allowed at once",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    const newProcessedSvgs: ProcessedSvg[] = [];

    try {
      for (const file of svgFiles) {
        const svgText = await file.text();
        const dimensions = extractSvgDimensions(svgText);
        const pngUrl = await convertSvgToPng(svgText, dimensions, quality);
        
        newProcessedSvgs.push({
          id: crypto.randomUUID(),
          file,
          svgContent: svgText,
          dimensions,
          pngDataUrl: pngUrl
        });
      }
      
      setProcessedSvgs(newProcessedSvgs);
      
      toast({
        title: "Conversion Successful",
        description: `${svgFiles.length} SVG${svgFiles.length > 1 ? 's have' : ' has'} been converted to PNG`,
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion Failed",
        description: "Failed to convert one or more SVG files",
        variant: "destructive",
      });
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, quality, toast, resetState]);

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
    await handleFileUpload(files);
  }, [handleFileUpload]);

  const downloadPng = useCallback((processedSvg: ProcessedSvg) => {
    const link = document.createElement('a');
    link.href = processedSvg.pngDataUrl;
    link.download = `${processedSvg.file.name.replace('.svg', '')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleQualityChange = useCallback(async (newQuality: QualityOption) => {
    setQuality(newQuality);
    saveQualityPreference(newQuality);
    
    if (processedSvgs.length > 0) {
      setIsConverting(true);
      try {
        const updatedSvgs = await Promise.all(
          processedSvgs.map(async (svg) => {
            const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, newQuality);
            return { ...svg, pngDataUrl: pngUrl };
          })
        );
        setProcessedSvgs(updatedSvgs);
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
  }, [processedSvgs, convertSvgToPng, saveQualityPreference, toast]);

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
    
    // Then trigger conversion with the validated value if needed
    if (quality === 'custom' && processedSvgs.length > 0) {
      setIsConverting(true);
      try {
        const updatedSvgs = await Promise.all(
          processedSvgs.map(async (svg) => {
            const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, 'custom');
            return { ...svg, pngDataUrl: pngUrl };
          })
        );
        setProcessedSvgs(updatedSvgs);
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
  }, [customWidth, quality, processedSvgs, convertSvgToPng, saveCustomWidthPreference, toast]);

  const getAvailableQualityOptions = useCallback(() => {
    if (processedSvgs.length === 0) return ['original', 'high', 'very-high', 'custom'] as QualityOption[];
    
    // Find the largest SVG to determine available options
    const maxWidth = Math.max(...processedSvgs.map(svg => svg.dimensions.width));
    
    if (maxWidth >= 6000) {
      return [] as QualityOption[]; // Hide quality selector entirely
    }
    
    if (maxWidth >= 4000) {
      return ['original', 'very-high', 'custom'] as QualityOption[];
    }
    
    return ['original', 'high', 'very-high', 'custom'] as QualityOption[];
  }, [processedSvgs]);

  const shouldShowQualitySelector = useCallback(() => {
    return getAvailableQualityOptions().length > 0;
  }, [getAvailableQualityOptions]);

  return {
    processedSvgs,
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
