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
}: SliderInputProps) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const effectiveMax = dynamicMax !== undefined ? dynamicMax : max;

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= effectiveMax) {
      onChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setInputValue(value.toString());
    } else {
      const clampedValue = Math.min(Math.max(numValue, min), effectiveMax);
      setInputValue(clampedValue.toString());
      onChange(clampedValue);
    }
  };

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
            className="w-32 text-xl font-semibold text-primary bg-transparent border-none focus-visible:ring-0 p-0 text-right"
          />
          {suffix && <span className="text-xl font-semibold text-primary">{suffix}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => {
          onChange(values[0]);
          setInputValue(values[0].toString());
        }}
        max={effectiveMax}
        min={min}
        step={step}
        className="py-4"
      />
    </div>
  );
};

export default SliderInput;