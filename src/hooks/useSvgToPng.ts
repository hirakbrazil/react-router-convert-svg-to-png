import { useState, useCallback, useEffect } from "react";
import { toast } from 'sonner';
import { UPLOAD_CONSTANTS } from '@/config/constants';

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
  isConverting?: boolean;
}

const QUALITY_STORAGE_KEY = 'svg-to-png-quality';
const CUSTOM_WIDTH_STORAGE_KEY = 'svg-to-png-custom-width';

export const useSvgToPng = () => {
  const [processedSvgs, setProcessedSvgs] = useState<ProcessedSvg[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState<QualityOption>('high');
  const [customWidth, setCustomWidth] = useState<number>(4000);
  const [previousCustomWidth, setPreviousCustomWidth] = useState<number>(4000); // Track previous value
  const [svgTextInput, setSvgTextInput] = useState<string>("");

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
        setPreviousCustomWidth(parsedWidth); // Initialize previous value
      }
    }
  }, []);

  const saveQualityPreference = useCallback((newQuality: QualityOption) => {
    localStorage.setItem(QUALITY_STORAGE_KEY, newQuality);
  }, []);

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
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.onerror = () => {
              reject(new Error('Failed to read blob as data URL'));
            };
            reader.readAsDataURL(blob);
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
      
      // Create initial SVG with loading state
      const initialSvg: ProcessedSvg = {
        id: crypto.randomUUID(),
        file,
        svgContent: svgText,
        dimensions,
        pngDataUrl: '',
        isConverting: true
      };
      
      setProcessedSvgs([initialSvg]);
      
      const conversionPromise = convertSvgToPng(svgText, dimensions, quality);
      
      toast.promise(conversionPromise, {
        loading: 'Converting SVG to PNG...',
        success: 'SVG has been converted to PNG successfully!',
        error: 'Failed to convert SVG. Please check if the SVG code is valid.',
      });

      const pngUrl = await conversionPromise;
      
      // Update with converted PNG
      setProcessedSvgs([{
        ...initialSvg,
        pngDataUrl: pngUrl,
        isConverting: false
      }]);
      
    } catch (error) {
      console.error('Conversion error:', error);
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, quality, resetState]);

  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const svgFiles = fileArray.filter(file => file.type.includes('svg'));
    
    if (svgFiles.length === 0) {
      toast.error('Please upload SVG files (.svg)');
      return;
    }

    // Handle files over the limit
    const filesToProcess = svgFiles.slice(0, UPLOAD_CONSTANTS.MAX_FILES);
    const ignoredCount = svgFiles.length - filesToProcess.length;

    setIsConverting(true);
    
    try {
      // Create initial SVGs with loading states
      const initialSvgs: ProcessedSvg[] = [];
      
      for (const file of filesToProcess) {
        const svgText = await file.text();
        const dimensions = extractSvgDimensions(svgText);
        
        initialSvgs.push({
          id: crypto.randomUUID(),
          file,
          svgContent: svgText,
          dimensions,
          pngDataUrl: '',
          isConverting: true
        });
      }
      
      setProcessedSvgs(initialSvgs);
      
      // Convert each SVG and update individually
      const conversionPromises = initialSvgs.map(async (svg, index) => {
        try {
          const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, quality);
          
          // Update just this SVG
          setProcessedSvgs(prev => 
            prev.map(item => 
              item.id === svg.id 
                ? { ...item, pngDataUrl: pngUrl, isConverting: false }
                : item
            )
          );
          
          return { success: true, index };
        } catch (error) {
          console.error(`Conversion error for file ${index}:`, error);
          return { success: false, index };
        }
      });
      
      toast.promise(Promise.all(conversionPromises), {
        loading: `Converting ${filesToProcess.length} SVG${filesToProcess.length > 1 ? 's' : ''} to PNG...`,
        success: `${filesToProcess.length} SVG${filesToProcess.length > 1 ? 's have' : ' has'} been converted to PNG successfully!`,
        error: 'Failed to convert one or more SVG files',
      });

      // Show ignored files toast after the promise toast starts
      if (ignoredCount > 0) {
        toast.info(`Max limit is ${UPLOAD_CONSTANTS.MAX_FILES}, ${ignoredCount} image${ignoredCount > 1 ? 's' : ''} ignored`,
                  {
                    duration: 6000,
                    }
                  );
      }
      
      await Promise.all(conversionPromises);
      
    } catch (error) {
      console.error('Conversion error:', error);
      resetState();
    } finally {
      setIsConverting(false);
    }
  }, [convertSvgToPng, quality, resetState]);

  const handleSvgTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSvgTextInput(e.target.value);
  }, []);

  const handleSvgTextSubmit = useCallback(async () => {
    if (!svgTextInput.trim()) return;
    
    // Basic SVG validation
    if (!svgTextInput.includes('<svg')) {
      toast.error('Please enter valid SVG XML code');
      return;
    }

    await processSvgContent(svgTextInput.trim());
  }, [svgTextInput, processSvgContent]);

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
      
      // Set all SVGs to converting state
      setProcessedSvgs(prev => prev.map(svg => ({ ...svg, isConverting: true })));
      
      try {
        // Convert each SVG individually
        const reconversionPromises = processedSvgs.map(async (svg) => {
          try {
            const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, newQuality);
            
            // Update just this SVG
            setProcessedSvgs(prev => 
              prev.map(item => 
                item.id === svg.id 
                  ? { ...item, pngDataUrl: pngUrl, isConverting: false }
                  : item
              )
            );
            
            return { success: true };
          } catch (error) {
            console.error('Re-conversion error:', error);
            return { success: false };
          }
        });

        toast.promise(Promise.all(reconversionPromises), {
          loading: 'Re-converting with new quality settings...',
          success: 'Images have been re-converted successfully!',
          error: 'Failed to re-convert with new quality settings',
        });

        await Promise.all(reconversionPromises);
      } catch (error) {
        console.error('Re-conversion error:', error);
      } finally {
        setIsConverting(false);
      }
    }
  }, [processedSvgs, convertSvgToPng, saveQualityPreference]);

  const handleCustomWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) || e.target.value === '') {
      setCustomWidth(e.target.value === '' ? 0 : value);
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
    
    // Only trigger conversion if the value has actually changed
    if (quality === 'custom' && processedSvgs.length > 0 && validatedWidth !== previousCustomWidth) {
      setPreviousCustomWidth(validatedWidth); // Update previous value
      
      setIsConverting(true);
      
      // Set all SVGs to converting state
      setProcessedSvgs(prev => prev.map(svg => ({ ...svg, isConverting: true })));
      
      try {
        // Convert each SVG individually
        const reconversionPromises = processedSvgs.map(async (svg) => {
          try {
            const pngUrl = await convertSvgToPng(svg.svgContent, svg.dimensions, 'custom');
            
            // Update just this SVG
            setProcessedSvgs(prev => 
              prev.map(item => 
                item.id === svg.id 
                  ? { ...item, pngDataUrl: pngUrl, isConverting: false }
                  : item
              )
            );
            
            return { success: true };
          } catch (error) {
            console.error('Re-conversion error:', error);
            return { success: false };
          }
        });

        toast.promise(Promise.all(reconversionPromises), {
          loading: 'Re-converting with new custom width...',
          success: 'Images have been re-converted successfully!',
          error: 'Failed to re-convert with new custom width',
        });

        await Promise.all(reconversionPromises);
      } catch (error) {
        console.error('Re-conversion error:', error);
      } finally {
        setIsConverting(false);
      }
    } else if (validatedWidth !== customWidth) {
      // Just update the previous value if only validation changed the value
      setPreviousCustomWidth(validatedWidth);
    }
  }, [customWidth, previousCustomWidth, quality, processedSvgs, convertSvgToPng, saveCustomWidthPreference]);

  // Always show all quality options now
  const getAvailableQualityOptions = useCallback(() => {
    return ['original', 'high', 'very-high', 'custom'] as QualityOption[];
  }, []);

  const shouldShowQualitySelector = useCallback(() => {
    return true; // Always show quality selector
  }, []);

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
