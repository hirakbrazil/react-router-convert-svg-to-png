import React from 'react';
import { Input } from "@/components/ui/input";
import { CurrencyType } from "./CurrencySelector";
import { formatNumberByCurrency, getCurrencySymbol } from "./slider/utils";

interface WithdrawalInputProps {
  label: string;
  value: number;
  percentage: number;
  onChange: (value: number) => void;
  onPercentageChange: (value: number) => void;
  min: number;
  max: number;
  currency: CurrencyType;
  isLocked?: boolean;
}

const WithdrawalInput = ({
  label,
  value,
  percentage,
  onChange,
  onPercentageChange,
  min,
  max,
  currency,
  isLocked
}: WithdrawalInputProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue);
    
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      if (isLocked && numValue > value) return;
      onChange(numValue);
    }
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue);
    
    if (!isNaN(numValue) && numValue >= 0.1 && numValue <= 100) {
      if (isLocked && numValue > percentage) return;
      onPercentageChange(numValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          <div className="bg-secondary px-4 py-2 rounded-lg flex items-center gap-0 w-fit">
            <span className="text-xl font-semibold text-primary shrink-0">
              {getCurrencySymbol(currency)}
            </span>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              value={formatNumberByCurrency(value, currency)}
              onChange={handleAmountChange}
              min={min}
              max={max}
              maxLength={10}
              className="text-xl font-semibold text-primary bg-transparent border-none focus-visible:ring-0 p-0 text-right"
              style={{
                width: `${Math.max(60, value.toString().length * 12)}px`,
                minWidth: '60px',
                maxWidth: '300px'
              }}
            />
          </div>
          <span className="text-gray-500">or</span>
          <div className="bg-secondary px-4 py-2 rounded-lg flex items-center gap-0 w-fit">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9.]*"
              value={percentage.toString()}
              onChange={handlePercentageChange}
              min={0.1}
              max={100}
              maxLength={2}
              className="text-xl font-semibold text-primary bg-transparent border-none focus-visible:ring-0 p-0 text-right"
              style={{
                width: `${Math.max(30, percentage.toString().length * 12)}px`,
                minWidth: '30px',
                maxWidth: '60px'
              }}
            />
            <span className="text-xl font-semibold text-primary shrink-0 ml-1">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalInput;