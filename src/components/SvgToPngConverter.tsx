
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, RefreshCcw, Image as ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useSvgToPng } from '@/hooks/useSvgToPng';
import { cn } from '@/lib/utils';
import ImageComparisonSlider from './ImageComparisonSlider';

const SvgToPngConverter = () => {
  const {
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
    getTargetDimensions,
    getAvailableQualityOptions,
    shouldShowQualitySelector,
  } = useSvgToPng();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getQualityLabel = (qualityOption: string) => {
    switch (qualityOption) {
      case 'original':
        return 'Original';
      case 'high':
        return 'High (4000px)';
      case 'very-high':
        return 'Very High (6000px)';
      default:
        return qualityOption;
    }
  };

  const targetDimensions = svgDimensions ? getTargetDimensions(svgDimensions, quality) : null;
  const availableOptions = getAvailableQualityOptions();

  return (
    <div className="space-y-6">
      {!svgFile ? (
        <Card>
          <CardContent className="p-6">
            <div
              className={cn(
                "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200",
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              )}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".svg"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isConverting}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isDragging ? "Drop SVG file here" : "Upload SVG File"}
                  </h3>
                  <p className="text-muted-foreground">
                    Drag and drop an SVG file here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports .svg files only
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* File Info and Quality Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{svgFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Original: {svgDimensions?.width} × {svgDimensions?.height}px
                      {targetDimensions && (
                        <span className="ml-2">
                          → PNG: {targetDimensions.width} × {targetDimensions.height}px
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                {shouldShowQualitySelector() && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="quality-select">Choose output quality:</Label>
                      <Select
                        value={quality}
                        onValueChange={handleQualityChange}
                        disabled={isConverting}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {getQualityLabel(option)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image Comparison */}
          {pngDataUrl && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Preview Comparison</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag the slider to compare SVG vs PNG
                    </p>
                  </div>
                  
                  <ImageComparisonSlider
                    svgContent={svgContent}
                    pngDataUrl={pngDataUrl}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button
              onClick={downloadPng}
              disabled={!pngDataUrl || isConverting}
              className="w-full sm:w-auto gap-2"
              size="lg"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </Button>
            
            <Button
              onClick={resetState}
              variant="outline"
              className="w-full sm:w-auto gap-2"
              size="lg"
            >
              <RefreshCcw className="w-5 h-5" />
              Convert Another
            </Button>
          </div>

          {isConverting && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Converting SVG to PNG...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SvgToPngConverter;
