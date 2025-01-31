import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import SliderInput from "@/components/slider/SliderInput";
import InfoTooltip from "@/components/InfoTooltip";
import { CurrencyType } from "@/components/CurrencySelector";

interface InitialInvestmentSettingsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  amount: number;
  onAmountChange: (amount: number) => void;
  isAdvancedOptionsEnabled: boolean;
  currency: CurrencyType;
  isStepUpDropdownOpen?: boolean;
}

const InitialInvestmentSettings = ({
  enabled,
  onEnabledChange,
  amount,
  onAmountChange,
  isAdvancedOptionsEnabled,
  currency,
  isStepUpDropdownOpen = false,
}: InitialInvestmentSettingsProps) => {
  const [isClickable, setIsClickable] = useState(true);

  useEffect(() => {
    if (!isStepUpDropdownOpen) {
      // Add 500ms delay before enabling click functionality
      const timer = setTimeout(() => {
        setIsClickable(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsClickable(false);
    }
  }, [isStepUpDropdownOpen]);

  const handleLabelClick = () => {
    if (isAdvancedOptionsEnabled && !isStepUpDropdownOpen && isClickable) {
      onEnabledChange(!enabled);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <span 
            className={`text-lg text-gray-700 dark:text-[#c1cbd6] ${(!isStepUpDropdownOpen && isClickable) ? 'cursor-pointer' : ''}`}
            onClick={handleLabelClick}
          >
            Initial investment
          </span>
          <InfoTooltip content="A one-time lump sum investment made before starting your regular SIP investments. This amount will be invested at the beginning of your investment period." />
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onEnabledChange}
          disabled={!isAdvancedOptionsEnabled}
        />
      </div>

      {enabled && isAdvancedOptionsEnabled && (
        <div className="space-y-4">
          <SliderInput
            label="Lumpsum amount"
            value={amount}
            onChange={onAmountChange}
            min={100}
            max={50000000}
            step={100}
            currency={currency}
            formatValue={true}
            maxLength={12}
          />
        </div>
      )}
    </div>
  );
};

export default InitialInvestmentSettings;