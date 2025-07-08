
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowRight, Image as ImageIcon, Loader2 } from 'lucide-react';
import ImageComparisonSlider from './ImageComparisonSlider';
import { formatFileSize } from '@/lib/formatFileSize';

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

interface SvgItemProps {
  processedSvg: ProcessedSvg;
  targetDimensions: SvgDimensions;
  onDownload: (processedSvg: ProcessedSvg) => void;
  isConverting: boolean;
}

const SvgItem = ({ processedSvg, targetDimensions, onDownload, isConverting }: SvgItemProps) => {
  const svgDataUrl = React.useMemo(() => {
    const blob = new Blob([processedSvg.svgContent], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }, [processedSvg.svgContent]);

  // Calculate PNG file size from data URL
  const pngFileSize = React.useMemo(() => {
    if (!processedSvg.pngDataUrl || processedSvg.pngDataUrl.length === 0) {
      return 0;
    }
    
    // Check if it's a valid data URL
    if (!processedSvg.pngDataUrl.startsWith('data:')) {
      return 0;
    }
    
    // Split by comma to get base64 part
    const parts = processedSvg.pngDataUrl.split(',');
    if (parts.length !== 2) {
      return 0;
    }
    
    const base64Data = parts[1];
    if (!base64Data || base64Data.length === 0) {
      return 0;
    }
    
    // Calculate size from base64 (each base64 char represents 6 bits, padding considered)
    const padding = (base64Data.match(/=/g) || []).length;
    const sizeInBytes = (base64Data.length * 3 / 4) - padding;
    
    return Math.max(0, sizeInBytes);
  }, [processedSvg.pngDataUrl]);

  return (
    <div className="space-y-4">
      {/* File Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{processedSvg.file.name}</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  Original: {Math.round(processedSvg.dimensions.width)} × {Math.round(processedSvg.dimensions.height)}px
                  <span className="ml-2 flex items-center gap-1">
                    <ArrowRight className="inline h-4 w-4 text-muted-foreground" />
                    PNG: {targetDimensions.width} × {targetDimensions.height}px
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      <div className="space-y-4">
        {processedSvg.isConverting ? (
          // Show blurred SVG preview while converting
          <div className="relative w-full h-96 overflow-hidden rounded-lg border">
            <img
              src={svgDataUrl}
              alt="SVG Preview"
              className="w-full h-full object-contain blur-sm"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm font-medium">Converting to PNG...</span>
              </div>
            </div>
          </div>
        ) : (
          // Show comparison slider when conversion is done
          <ImageComparisonSlider
            svgContent={processedSvg.svgContent}
            pngDataUrl={processedSvg.pngDataUrl}
            svgFileSize={processedSvg.file.size}
            pngFileSize={pngFileSize}
          />
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => onDownload(processedSvg)}
          disabled={isConverting || processedSvg.isConverting}
          className="gap-2"
        >
          {processedSvg.isConverting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download PNG
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SvgItem;
