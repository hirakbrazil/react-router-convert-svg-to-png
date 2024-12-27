import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export type CurrencyType = "INR" | "USD" | "EUR";

interface CurrencySelectorProps {
  value: CurrencyType;
  onChange: (value: CurrencyType) => void;
}

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center justify-center mt-2 mb-6">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="INR">INR</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;