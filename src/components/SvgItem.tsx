
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowRight, Image as ImageIcon } from 'lucide-react';
import ImageComparisonSlider from './ImageComparisonSlider';

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

interface SvgItemProps {
  processedSvg: ProcessedSvg;
  targetDimensions: SvgDimensions;
  onDownload: (processedSvg: ProcessedSvg) => void;
  isConverting: boolean;
}

const SvgItem = ({ processedSvg, targetDimensions, onDownload, isConverting }: SvgItemProps) => {
  return (
    <div className="space-y-4">
      {/* File Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{processedSvg.file.name}</p>
              <p className="text-sm text-muted-foreground">
                Original: {Math.round(processedSvg.dimensions.width)} × {Math.round(processedSvg.dimensions.height)}px
                <span className="ml-2 flex items-center gap-1">
                  <ArrowRight className="inline h-4 w-4 text-muted-foreground" />
                  PNG: {targetDimensions.width} × {targetDimensions.height}px
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Comparison */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <h3 className="text-lg font-semibold">Preview</h3>
          <p className="text-sm text-muted-foreground">
            Drag the slider to compare SVG vs PNG
          </p>
        </div>
        
        <ImageComparisonSlider
          svgContent={processedSvg.svgContent}
          pngDataUrl={processedSvg.pngDataUrl}
        />
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => onDownload(processedSvg)}
          disabled={isConverting}
          className="gap-2"
          size="lg"
        >
          <Download className="w-5 h-5" />
          Download PNG
        </Button>
      </div>
    </div>
  );
};

export default SvgItem;
