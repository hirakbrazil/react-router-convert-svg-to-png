import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CurrencyType } from "./CurrencySelector";

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
  currency?: CurrencyType;
  formatValue?: boolean;
}

const formatNumberByCurrency = (value: number, currency: CurrencyType): string => {
  if (currency === "INR") {
    return value.toLocaleString('en-IN');
  }
  return value.toLocaleString();
};

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

  const getCurrencySymbol = (currency?: CurrencyType): string => {
    if (!currency) return prefix;
    const symbols: { [key in CurrencyType]: string } = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      JPY: "¥",
      GBP: "£",
      CNY: "¥",
      AUD: "$",
      CAD: "$",
      CHF: "Fr",
      HKD: "$",
      SGD: "$"
    };
    return symbols[currency];
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg text-gray-700">{label}</label>
        <div className="bg-secondary px-4 py-2 rounded-lg flex items-center">
          {currency ? (
            <span className="text-xl font-semibold text-primary">{getCurrencySymbol(currency)}</span>
          ) : (
            prefix && <span className="text-xl font-semibold text-primary">{prefix}</span>
          )}
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9,]*"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={min}
            max={effectiveMax}
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
        className={`py-4 ${isLocked ? 'opacity-50' : ''}`}
      />
    </div>
  );
};

export default SliderInput;