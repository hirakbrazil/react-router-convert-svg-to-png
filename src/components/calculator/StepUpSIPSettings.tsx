import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import SliderInput from "@/components/slider/SliderInput";
import InfoTooltip from "@/components/InfoTooltip";

export type StepUpFrequency = "Monthly" | "Quarterly" | "Half-yearly" | "Yearly";

interface StepUpSIPSettingsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  frequency: StepUpFrequency;
  onFrequencyChange: (frequency: StepUpFrequency) => void;
  percentage: number;
  onPercentageChange: (percentage: number) => void;
  isAdvancedOptionsEnabled: boolean;
}

const StepUpSIPSettings = ({
  enabled,
  onEnabledChange,
  frequency,
  onFrequencyChange,
  percentage,
  onPercentageChange,
  isAdvancedOptionsEnabled,
}: StepUpSIPSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">Step Up SIP</span>
          <InfoTooltip content="Automatically increase your SIP amount by a fixed percentage at regular intervals to keep up with your growing income and inflation." />
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
            label={
              <Select value={frequency} onValueChange={(value) => onFrequencyChange(value as StepUpFrequency)}>
                <SelectTrigger className="w-[180px] focus:ring-0 focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#030c21] border-border">
                  <SelectItem value="Monthly">Monthly Step Up</SelectItem>
                  <SelectItem value="Quarterly">Quarterly Step Up</SelectItem>
                  <SelectItem value="Half-yearly">Half-yearly Step Up</SelectItem>
                  <SelectItem value="Yearly">Yearly Step Up</SelectItem>
                </SelectContent>
              </Select>
            }
            value={percentage}
            onChange={onPercentageChange}
            min={1}
            max={100}
            step={0.1}
            suffix="%"
            maxLength={4}
          />
        </div>
      )}
    </div>
  );
};

export default StepUpSIPSettings;
