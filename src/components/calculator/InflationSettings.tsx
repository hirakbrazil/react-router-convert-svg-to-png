import React from "react";
import { Switch } from "@/components/ui/switch";
import SliderInput from "@/components/slider/SliderInput";
import InfoTooltip from "@/components/InfoTooltip";

interface InflationSettingsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  rate: number;
  onRateChange: (rate: number) => void;
  isAdvancedOptionsEnabled: boolean;
  returnRate: number;
}

const InflationSettings = ({
  enabled,
  onEnabledChange,
  rate,
  onRateChange,
  isAdvancedOptionsEnabled,
  returnRate,
}: InflationSettingsProps) => {
  const maxInflationRate = Number((Math.max(returnRate - 0.1, 0.1)).toFixed(1));

  React.useEffect(() => {
    if (rate > maxInflationRate) {
      onRateChange(maxInflationRate);
    }
  }, [returnRate, rate, maxInflationRate, onRateChange]);

  const formatRate = (value: number) => {
    return Number(value.toFixed(1));
  };

  const handleRateChange = (newRate: number) => {
    onRateChange(formatRate(newRate));
  };

  const handleLabelClick = () => {
    if (isAdvancedOptionsEnabled) {
      onEnabledChange(!enabled);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <span 
            className="text-lg text-gray-700 dark:text-[#c1cbd6] cursor-pointer"
            onClick={handleLabelClick}
          >
            Adjust for inflation
          </span>
          <InfoTooltip content="Enable this to see your returns adjusted for inflation, giving you a more realistic view of your investment's purchasing power over time." />
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
            label="Inflation rate"
            value={formatRate(rate)}
            onChange={handleRateChange}
            min={0.1}
            max={maxInflationRate}
            step={0.1}
            suffix="%"
            maxLength={5}
          />
        </div>
      )}
    </div>
  );
};

export default InflationSettings;
