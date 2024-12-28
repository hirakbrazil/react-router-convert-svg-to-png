import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import InputField from "./InputField";
import { SliderInputProps } from "./types";
import { formatNumberByCurrency, getMaxLength } from "./utils";

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
  currency,
  formatValue = false,
}: SliderInputProps) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const effectiveMax = dynamicMax !== undefined ? dynamicMax : max;
  const maxLength = getMaxLength(label);

  useEffect(() => {
    if (formatValue && currency) {
      setInputValue(formatNumberByCurrency(value, currency));
    } else {
      setInputValue(value.toString());
    }
  }, [value, currency, formatValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    setInputValue(rawValue);
    
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      if (isLocked) {
        if (lockDirection === 'increment' && numValue > value) return;
        if (lockDirection === 'decrement' && numValue < value) return;
      }
      
      if (numValue >= min && numValue <= effectiveMax) {
        onChange(numValue);
      }
    }
  };

  const handleInputBlur = () => {
    const rawValue = inputValue.replace(/,/g, '');
    const numValue = parseFloat(rawValue);
    if (isNaN(numValue)) {
      if (formatValue && currency) {
        setInputValue(formatNumberByCurrency(value, currency));
      } else {
        setInputValue(value.toString());
      }
    } else {
      let clampedValue = numValue;
      
      if (isLocked) {
        if (lockDirection === 'increment') {
          clampedValue = Math.min(value, Math.max(min, numValue));
        } else if (lockDirection === 'decrement') {
          clampedValue = Math.max(value, Math.min(effectiveMax, numValue));
        }
      } else {
        clampedValue = Math.min(Math.max(numValue, min), effectiveMax);
      }
      
      if (formatValue && currency) {
        setInputValue(formatNumberByCurrency(clampedValue, currency));
      } else {
        setInputValue(clampedValue.toString());
      }
      onChange(clampedValue);
    }
  };

  const handleSliderChange = (values: number[]) => {
    const newValue = values[0];
    if (isLocked) {
      if (lockDirection === 'increment' && newValue > value) return;
      if (lockDirection === 'decrement' && newValue < value) return;
    }
    onChange(newValue);
    if (formatValue && currency) {
      setInputValue(formatNumberByCurrency(newValue, currency));
    } else {
      setInputValue(newValue.toString());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg text-gray-700">{label}</label>
        <InputField
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
          min={min}
          max={effectiveMax}
          maxLength={maxLength}
          currency={currency}
          prefix={prefix}
          suffix={suffix}
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        max={effectiveMax}
        min={min}
        step={step}
        className={`py-4 ${isLocked ? 'opacity-50' : ''}`}
      />
    </div>
  );
};

export default SliderInput;