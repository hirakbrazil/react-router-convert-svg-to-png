import React, { useState, useEffect } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { SIPFrequency } from "@/types/calculator";
import SIPFrequencySelector from "./calculator/SIPFrequencySelector";
import InfoTooltip from "./InfoTooltip";
import { format, addYears } from "date-fns";
import { Switch } from "@/components/ui/switch";
import StepUpSIPSettings, { StepUpFrequency } from "./calculator/StepUpSIPSettings";
import InitialInvestmentSettings from "./calculator/InitialInvestmentSettings";
import InflationSettings from "./calculator/InflationSettings";

interface CalculatorFormProps {
  monthlyInvestment: number;
  setMonthlyInvestment: (value: number) => void;
  returnRate: number;
  setReturnRate: (value: number) => void;
  timePeriod: number;
  setTimePeriod: (value: number) => void;
  currency: CurrencyType;
  sipFrequency: SIPFrequency;
  setSipFrequency: (frequency: SIPFrequency) => void;
  advancedOptionsEnabled: boolean;
  setAdvancedOptionsEnabled: (enabled: boolean) => void;
  stepUpEnabled: boolean;
  setStepUpEnabled: (enabled: boolean) => void;
  stepUpFrequency: StepUpFrequency;
  setStepUpFrequency: (frequency: StepUpFrequency) => void;
  stepUpPercentage: number;
  setStepUpPercentage: (percentage: number) => void;
  initialInvestmentEnabled: boolean;
  setInitialInvestmentEnabled: (enabled: boolean) => void;
  initialInvestmentAmount: number;
  setInitialInvestmentAmount: (amount: number) => void;
  inflationEnabled: boolean;
  setInflationEnabled: (enabled: boolean) => void;
  inflationRate: number;
  setInflationRate: (rate: number) => void;
}

const CalculatorForm = ({
  monthlyInvestment,
  setMonthlyInvestment,
  returnRate,
  setReturnRate,
  timePeriod,
  setTimePeriod,
  currency,
  sipFrequency,
  setSipFrequency,
  advancedOptionsEnabled,
  setAdvancedOptionsEnabled,
  stepUpEnabled,
  setStepUpEnabled,
  stepUpFrequency,
  setStepUpFrequency,
  stepUpPercentage,
  setStepUpPercentage,
  initialInvestmentEnabled,
  setInitialInvestmentEnabled,
  initialInvestmentAmount,
  setInitialInvestmentAmount,
  inflationEnabled,
  setInflationEnabled,
  inflationRate,
  setInflationRate,
}: CalculatorFormProps) => {
  const getInvestmentLabel = () => {
    switch (sipFrequency) {
      case "Daily":
        return "Daily investment";
      case "Weekly":
        return "Weekly investment";
      case "Monthly":
        return "Monthly investment";
      case "Quarterly":
        return "Quarterly investment";
      case "Half-yearly":
        return "Half-yearly investment";
      case "Yearly":
        return "Yearly investment";
      default:
        return "Monthly investment";
    }
  };

  const getFutureDate = (years: number) => {
    const futureDate = addYears(new Date(), years);
    return format(futureDate, "MMMM, yyyy");
  };

  return (
    <div className="border border-border bg-card dark:bg-card rounded-xl p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <SIPFrequencySelector
            sipFrequency={sipFrequency}
            setSIPFrequency={setSipFrequency}
          />
        </div>

        <SliderInput
          label={getInvestmentLabel()}
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={50}
          max={50000000}
          step={50}
          currency={currency}
          formatValue={true}
          maxLength={12}
        />
      </div>

      <div className="space-y-4">
        <SliderInput
          label={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-1">
                <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
                  Expected return
                </span>
                <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
                  rate
                </span>
                <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
                  (p.a)
                </span>
                <InfoTooltip content="The expected annual return rate on your investment. This is the percentage by which your investment is expected to grow each year." />
              </div>
            </div>
          }
          value={returnRate}
          onChange={setReturnRate}
          min={1}
          max={50}
          step={0.1}
          suffix="%"
          maxLength={4}
        />
      </div>

      <div className="space-y-4">
        <SliderInput
          label={
            <div className="flex items-center gap-x-1">
              <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">Time period</span>
              <InfoTooltip content="The total duration for which you plan to invest through SIP. This is measured in years." />
            </div>
          }
          value={timePeriod}
          onChange={setTimePeriod}
          min={1}
          max={50}
          step={1}
          suffix=" Yr"
          maxLength={2}
        />
        <p className="text-base text-muted-foreground ml-1 dark:text-[#c1cbd6]">
          {getFutureDate(timePeriod)}
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">Advanced options</span>
            <InfoTooltip content="Enable additional settings to customize your SIP investment strategy." />
          </div>
          <Switch
            checked={advancedOptionsEnabled}
            onCheckedChange={setAdvancedOptionsEnabled}
          />
        </div>

        {advancedOptionsEnabled && (
          <div className="pl-4 space-y-6">
            <StepUpSIPSettings
              enabled={stepUpEnabled}
              onEnabledChange={setStepUpEnabled}
              frequency={stepUpFrequency}
              onFrequencyChange={setStepUpFrequency}
              percentage={stepUpPercentage}
              onPercentageChange={setStepUpPercentage}
              isAdvancedOptionsEnabled={advancedOptionsEnabled}
            />
            <InitialInvestmentSettings
              enabled={initialInvestmentEnabled}
              onEnabledChange={setInitialInvestmentEnabled}
              amount={initialInvestmentAmount}
              onAmountChange={setInitialInvestmentAmount}
              isAdvancedOptionsEnabled={advancedOptionsEnabled}
              currency={currency}
            />
            <InflationSettings
              enabled={inflationEnabled}
              onEnabledChange={setInflationEnabled}
              rate={inflationRate}
              onRateChange={setInflationRate}
              isAdvancedOptionsEnabled={advancedOptionsEnabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorForm;