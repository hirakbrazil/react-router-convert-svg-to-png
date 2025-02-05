import React from "react";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";

interface CalculatorHeaderProps {
  currency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
}

const CalculatorHeader = ({ currency, onCurrencyChange }: CalculatorHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Lumpsum Calculator
      </h1>
      <p className="mt-2 text-muted-foreground">
        Calculate your Lumpsum Investment Plan
      </p>
      <CurrencySelector value={currency} onChange={onCurrencyChange} />
    </div>
  );
};

export default CalculatorHeader;
