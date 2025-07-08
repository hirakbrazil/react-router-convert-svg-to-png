
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, RefreshCcw, ImageIcon, Download, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useSvgToPng } from '@/hooks/useSvgToPng';
import { cn } from '@/lib/utils';
import SvgItem from './SvgItem';

const SvgToPngConverter = () => {
  const {
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
  } = useSvgToPng();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const handleDownloadAll = () => {
    processedSvgs.forEach((processedSvg) => {
      if (processedSvg.pngDataUrl && !processedSvg.isConverting) {
        downloadPng(processedSvg);
      }
    });
  };

  const getQualityLabel = (qualityOption: string) => {
    switch (qualityOption) {
      case 'original':
        return 'Original';
      case 'high':
        return 'High (4000px)';
      case 'very-high':
        return 'Very High (6000px)';
      case 'custom':
        return 'Custom Size';
      default:
        return qualityOption;
    }
  };

  const availableOptions = getAvailableQualityOptions();
  const allImagesConverted = processedSvgs.length > 0 && processedSvgs.every(svg => !svg.isConverting && svg.pngDataUrl);
  const showDownloadAll = processedSvgs.length > 1;

  return (
    <div className="space-y-6">
      {processedSvgs.length === 0 ? (
        <div className="space-y-6">
          {/* File Upload - moved to top */}
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
              multiple
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
                  {isDragging ? "Drop SVG files here" : "Upload or Drop Files"}
                </h3>
                <p className="text-muted-foreground opacity-75">
                  Max 10 images at once
                </p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          {/* SVG Text Input - moved below upload */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label htmlFor="svg-text">Paste SVG Code</Label>
                <Textarea
                  id="svg-text"
                  placeholder="Paste your SVG XML code here..."
                  value={svgTextInput}
                  onChange={handleSvgTextChange}
                  className="min-h-[120px] font-mono text-sm"
                  disabled={isConverting}
                />
                <Button
                  onClick={handleSvgTextSubmit}
                  disabled={!svgTextInput.trim() || isConverting}
                  className="w-full"
                >
                  Convert SVG Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quality Settings - Centered on larger screens */}
          {shouldShowQualitySelector() && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Quality settings - centered on larger screens */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="quality-select">Output quality:</Label>
                        <Select
                          value={quality}
                          onValueChange={handleQualityChange}
                          disabled={isConverting}
                        >
                          <SelectTrigger className="w-full sm:w-[180px]">
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
                      
                      {quality === 'custom' && (
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="custom-width">Custom width (px):</Label>
                          <Input
                            id="custom-width"
                            type="number"
                            value={customWidth === 0 ? '' : customWidth}
                            onChange={handleCustomWidthChange}
                            onBlur={handleCustomWidthBlur}
                            className="w-[120px]"
                            min="10"
                            max="10000"
                            disabled={isConverting}
                          />
                        </div>
                      )}
                    </div>

                    {/* Action buttons row - Centered on larger screens */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                      {/* Download All button */}
                      {showDownloadAll && (
                        <Button
                          onClick={handleDownloadAll}
                          disabled={!allImagesConverted || isConverting}
                          className="gap-2"
                          size="lg"
                        >
                          {isConverting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Download className="w-5 h-5" />
                          )}
                          Download All
                        </Button>
                      )}

                      {/* Convert Another button */}
                      <Button
                        onClick={resetState}
                        variant="outline"
                        className="gap-2"
                        size="lg"
                        disabled={isConverting}
                      >
                        <RefreshCcw className="w-5 h-5" />
                        Convert Another
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview header - only show once at the top */}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Preview</h3>
            <p className="text-sm text-muted-foreground">
              Drag the slider to compare SVG vs PNG
            </p>
          </div>

          {/* SVG Items */}
          {processedSvgs.map((processedSvg, index) => (
            <div key={processedSvg.id}>
              <SvgItem
                processedSvg={processedSvg}
                targetDimensions={getTargetDimensions(processedSvg.dimensions, quality)}
                onDownload={downloadPng}
                isConverting={isConverting}
              />
              
              {/* Separator between items (except after last item) */}
              {index < processedSvgs.length - 1 && (
                <div className="my-8">
                  <Separator />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SvgToPngConverter;
