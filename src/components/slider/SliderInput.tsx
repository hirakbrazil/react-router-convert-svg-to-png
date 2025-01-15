import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { SliderInputProps } from "./types";
import { formatNumberByCurrency, getCurrencySymbol } from "./utils";
import { formatLargeNumber, shouldFormatAsLargeNumber } from "@/utils/numberFormat";

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
  maxLength,
}: SliderInputProps) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const effectiveMax = dynamicMax !== undefined ? dynamicMax : max;

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

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
      let clampedValue = Math.min(Math.max(numValue, min), effectiveMax);

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
    onChange(newValue);
    if (formatValue && currency) {
      setInputValue(formatNumberByCurrency(newValue, currency));
    } else {
      setInputValue(newValue.toString());
    }
  };

  const getInputWidth = () => {
    if (isMobile) {
      const baseWidth = Math.max(60, inputValue.length * 12);
      return {
        width: `${baseWidth}px`,
        minWidth: '60px',
        maxWidth: '300px',
      };
    } else {
      const baseWidth = Math.max(80, inputValue.length * 14);
      return {
        width: `${baseWidth}px`,
        minWidth: '80px',
        maxWidth: '200px',
      };
    }
  };

  const formatMinMaxValue = (value: number, isMax: boolean) => {
    if (currency && shouldFormatAsLargeNumber(value, isMax)) {
      return `${getCurrencySymbol(currency)}${formatLargeNumber(value, currency)}`;
    }
    return currency 
      ? `${getCurrencySymbol(currency)}${formatNumberByCurrency(value, currency)}`
      : `${value}${suffix}`;
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {typeof label === 'string' ? (
            <label className="text-lg text-gray-700 dark:text-[#c1cbd6]">{label}</label>
          ) : (
            label
          )}
        </div>
        <div 
          className="bg-secondary px-4 py-2 rounded-lg flex items-center gap-0 w-fit cursor-text" 
          onClick={handleContainerClick}
        >
          {currency ? (
            <span className="text-xl md:text-2xl font-semibold text-primary shrink-0 select-none">{getCurrencySymbol(currency)}</span>
          ) : (
            prefix && <span className="text-xl md:text-2xl font-semibold text-primary shrink-0 select-none">{prefix}</span>
          )}
          <Input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9,]*"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={min}
            max={effectiveMax}
            maxLength={maxLength}
            className="text-xl md:text-2xl font-semibold text-primary bg-transparent border-none focus-visible:ring-0 p-0 text-right"
            style={getInputWidth()}
          />
          {suffix && <span className="text-xl md:text-2xl font-semibold text-primary shrink-0 ml-1 select-none">{suffix}</span>}
        </div>
      </div>
      <div className="space-y-2">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          max={effectiveMax}
          min={min}
          step={step}
          className="py-4"
        />
        <div className="flex justify-between px-2">
          <span className="text-base text-gray-500 dark:text-gray-400">
            {formatMinMaxValue(min, false)}
          </span>
          <span className="text-base text-gray-500 dark:text-gray-400">
            {formatMinMaxValue(effectiveMax, true)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SliderInput;