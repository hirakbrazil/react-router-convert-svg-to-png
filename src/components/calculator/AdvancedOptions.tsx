import React from "react";
import { Switch } from "@/components/ui/switch";
import SliderInput from "@/components/slider/SliderInput";
import InfoTooltip from "@/components/InfoTooltip";

interface AdvancedOptionsProps {
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (value: boolean) => void;
  adjustForInflation: boolean;
  setAdjustForInflation: (value: boolean) => void;
  inflationRate: number;
  setInflationRate: (value: number) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  showAdvancedOptions,
  setShowAdvancedOptions,
  adjustForInflation,
  setAdjustForInflation,
  inflationRate,
  setInflationRate,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
            Advanced options
          </span>
          <InfoTooltip content="Enable advanced options to access additional settings like inflation adjustment." />
        </div>
        <Switch
          checked={showAdvancedOptions}
          onCheckedChange={(checked) => {
            setShowAdvancedOptions(checked);
            if (!checked) {
              setAdjustForInflation(false);
            }
          }}
        />
      </div>

      {showAdvancedOptions && (
        <div className="space-y-4 pl-4 border-l-2 border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1">
              <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
                Adjust for Inflation
              </span>
              <InfoTooltip content="Enable this option to adjust withdrawal amounts for inflation over time." />
            </div>
            <Switch
              checked={adjustForInflation}
              onCheckedChange={setAdjustForInflation}
            />
          </div>

          {adjustForInflation && (
            <SliderInput
              label={
                <div className="flex items-center gap-x-1">
                  <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
                    Inflation rate
                  </span>
                  <InfoTooltip content="The expected annual inflation rate used to adjust withdrawal amounts over time." />
                </div>
              }
              value={inflationRate}
              onChange={setInflationRate}
              min={0.1}
              max={30}
              step={0.1}
              suffix="%"
              maxLength={4}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;