import React from "react";
import { Input } from "@/components/ui/input";
import { getCurrencySymbol } from "./utils";
import { CurrencyType } from "../CurrencySelector";

interface InputFieldProps {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  min: number;
  max: number;
  maxLength: number;
  currency?: CurrencyType;
  prefix?: string;
  suffix?: string;
}

const InputField = ({
  inputValue,
  handleInputChange,
  handleInputBlur,
  min,
  max,
  maxLength,
  currency,
  prefix,
  suffix
}: InputFieldProps) => {
  return (
    <div className="bg-secondary px-4 py-2 rounded-lg inline-flex items-center gap-0">
      {currency ? (
        <span className="text-xl font-semibold text-primary shrink-0">{getCurrencySymbol(currency)}</span>
      ) : (
        prefix && <span className="text-xl font-semibold text-primary shrink-0">{prefix}</span>
      )}
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9,]*"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min={min}
        max={max}
        maxLength={maxLength}
        className="text-xl font-semibold text-primary bg-transparent border-none focus-visible:ring-0 p-0 text-right"
        style={{
          width: `${Math.max(60, inputValue.length * 12)}px`,
          minWidth: '60px',
          maxWidth: '200px'
        }}
      />
      {suffix && <span className="text-xl font-semibold text-primary shrink-0 ml-1">{suffix}</span>}
    </div>
  );
};

export default InputField;