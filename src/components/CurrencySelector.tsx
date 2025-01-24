import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export type CurrencyType =
  | "INR"
  | "USD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "CNY"
  | "AUD"
  | "CAD"
  | "CHF"
  | "HKD"
  | "SGD";

interface CurrencySelectorProps {
  value: CurrencyType;
  onChange: (value: CurrencyType) => void;
}

const getCurrencySymbol = (currency: CurrencyType): string => {
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
    SGD: "$",
  };
  return symbols[currency];
};

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  const handleCurrencyChange = (newCurrency: CurrencyType) => {
    onChange(newCurrency); // Call the parent's onChange handler
    toast({
      title: "Currency Changed",
      description: `Switched to ${newCurrency} ${getCurrencySymbol(newCurrency)}`,
      duration: 5000,
    });
  };

  return (
    <div className="flex items-center justify-center mt-5 mb-6">
      <Select value={value} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-[80px] focus:ring-0 focus:ring-offset-0">
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
