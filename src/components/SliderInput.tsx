import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  dynamicMax?: number;
  isLocked?: boolean;
  lockDirection?: 'increment' | 'decrement';
}

const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  dynamicMax,
  isLocked = false,
  lockDirection,
}: SliderInputProps) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const effectiveMax = dynamicMax !== undefined ? dynamicMax : max;

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const enforceValueLimits = (newValue: number): number => {
    if (isLocked) {
      if (lockDirection === 'increment') {
        return Math.min(value, Math.max(min, newValue));
      } else if (lockDirection === 'decrement') {
        return Math.max(value, Math.min(effectiveMax, newValue));
      }
    }
    return Math.min(Math.max(newValue, min), effectiveMax);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      const limitedValue = enforceValueLimits(numValue);
      if (limitedValue !== value) {
        onChange(limitedValue);
      }
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setInputValue(value.toString());
    } else {
      const limitedValue = enforceValueLimits(numValue);
      setInputValue(limitedValue.toString());
      onChange(limitedValue);
    }
  };

  const handleSliderChange = (values: number[]) => {
    const newValue = values[0];
    const limitedValue = enforceValueLimits(newValue);
    
    // Only update if the value is different and within limits
    if (limitedValue !== value) {
      onChange(limitedValue);
      setInputValue(limitedValue.toString());
    } else {
      // Force the slider to stay at the current value if it hits a limit
      setInputValue(value.toString());
    }
  };

  // Calculate input min/max based on lock direction
  const getInputLimits = () => {
    if (isLocked) {
      if (lockDirection === 'increment') {
        return { min, max: value };
      } else if (lockDirection === 'decrement') {
        return { min: value, max: effectiveMax };
      }
    }
    return { min, max: effectiveMax };
  };

  const inputLimits = getInputLimits();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg text-gray-700">{label}</label>
        <div className="bg-secondary px-4 py-2 rounded-lg flex items-center">
          {prefix && <span className="text-xl font-semibold text-primary">{prefix}</span>}
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={inputLimits.min}
            max={inputLimits.max}
            className="w-32 text-xl font-semibold text-primary bg-transparent border-none focus-visible:ring-0 p-0 text-right"
          />
          {suffix && <span className="text-xl font-semibold text-primary">{suffix}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        max={effectiveMax}
        min={min}
        step={step}
        className={`py-4 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}
        disabled={isLocked}
      />
    </div>
  );
};

export default SliderInput;