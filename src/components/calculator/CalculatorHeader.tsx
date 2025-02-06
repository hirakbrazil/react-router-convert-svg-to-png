import React from "react";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";

interface CalculatorHeaderProps {
  currency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
}

const CalculatorHeader = ({ currency, onCurrencyChange }: CalculatorHeaderProps) => {
  const currentDomain = window.location.hostname;
  
  const getHighlightClass = (type: 'sip' | 'lumpsum' | 'swp') => {
    if (currentDomain.includes(type)) {
      return "bg-secondary rounded-full px-4 py-1 text-primary font-medium";
    }
    return "text-gray-600 hover:text-primary transition-colors";
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-6 mb-8">
        <a 
          href="https://sip-calculator.mutualfundjournal.in/" 
          className={getHighlightClass('sip')}
        >
          SIP
        </a>
        <a 
          href="https://lumpsum-calculator.mutualfundjournal.in/" 
          className={getHighlightClass('lumpsum')}
        >
          Lumpsum
        </a>
        <a 
          href="https://swp-calculator.mutualfundjournal.in/" 
          className={getHighlightClass('swp')}
        >
          SWP
        </a>
      </div>
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