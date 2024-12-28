import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CurrencyType = "INR" | "USD" | "EUR" | "JPY" | "GBP" | "CNY" | "AUD" | "CAD" | "CHF" | "HKD" | "SGD";

interface CurrencySelectorProps {
  value: CurrencyType;
  onChange: (value: CurrencyType) => void;
}

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center justify-center mt-2 mb-6">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[100px] px-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="INR">INR</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
          <SelectItem value="JPY">JPY</SelectItem>
          <SelectItem value="GBP">GBP</SelectItem>
          <SelectItem value="CNY">CNY</SelectItem>
          <SelectItem value="AUD">AUD</SelectItem>
          <SelectItem value="CAD">CAD</SelectItem>
          <SelectItem value="CHF">CHF</SelectItem>
          <SelectItem value="HKD">HKD</SelectItem>
          <SelectItem value="SGD">SGD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;