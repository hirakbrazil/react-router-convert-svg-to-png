
import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ImageComparisonSliderProps {
  svgContent: string;
  pngDataUrl: string;
  className?: string;
}

const ImageComparisonSlider = ({ svgContent, pngDataUrl, className }: ImageComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [updateSliderPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Container click to jump slider
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      updateSliderPosition(e.clientX);
    }
  }, [updateSliderPosition]);

  const svgDataUrl = React.useMemo(() => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }, [svgContent]);

  // Global mouse and touch events
  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handleGlobalTouchEnd = () => setIsDragging(false);
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      updateSliderPosition(touch.clientX);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [isDragging, updateSliderPosition]);

  return (
    <div className={cn("relative w-full h-96 overflow-hidden rounded-lg border", className)}>
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onClick={handleContainerClick}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* PNG Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={pngDataUrl}
            alt="PNG Version"
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
          <div className="absolute bottom-2 right-2 bg-secondary text-primary px-2 py-1 rounded text-sm font-medium pointer-events-none">
            PNG
          </div>
        </div>
        
        {/* SVG Image (Foreground with clip) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={svgDataUrl}
            alt="SVG Version"
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
          <div className="absolute bottom-2 left-2 bg-secondary text-primary px-2 py-1 rounded text-sm font-medium pointer-events-none">
            SVG
          </div>
        </div>
        
        {/* Slider Line with Extended Touch Area */}
        <div
          className="absolute top-0 bottom-0 cursor-col-resize z-10 touch-none flex items-center justify-center"
          style={{ 
            left: `calc(${sliderPosition}% - 12px)`, 
            width: '24px' // 24px wide touch area (12px on each side of the line)
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Visible slider line */}
          <div className="w-0.5 h-full bg-black dark:bg-white shadow-lg pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black dark:bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
