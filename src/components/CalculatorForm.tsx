import React, { useEffect } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";
import WithdrawalFrequencySelector from "./calculator/WithdrawalFrequencySelector";
import InfoTooltip from "./InfoTooltip";
import { format, addYears } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CalculatorFormProps {
  totalInvestment: number;
  setTotalInvestment: (value: number) => void;
  monthlyWithdrawal: number;
  setMonthlyWithdrawal: (value: number) => void;
  returnRate: number;
  setReturnRate: (value: number) => void;
  timePeriod: number;
  setTimePeriod: (value: number) => void;
  withdrawalPercentage: number;
  currency: CurrencyType;
  withdrawalFrequency: WithdrawalFrequency;
  setWithdrawalFrequency: (frequency: WithdrawalFrequency) => void;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (value: boolean) => void;
  adjustForInflation: boolean;
  setAdjustForInflation: (value: boolean) => void;
  inflationRate: number;
  setInflationRate: (value: number) => void;
}

const CalculatorForm = ({
  totalInvestment,
  setTotalInvestment,
  monthlyWithdrawal,
  setMonthlyWithdrawal,
  returnRate,
  setReturnRate,
  timePeriod,
  setTimePeriod,
  withdrawalPercentage,
  currency,
  withdrawalFrequency,
  setWithdrawalFrequency,
  showAdvancedOptions,
  setShowAdvancedOptions,
  adjustForInflation,
  setAdjustForInflation,
  inflationRate,
  setInflationRate,
}: CalculatorFormProps) => {
  useEffect(() => {
    if (monthlyWithdrawal > totalInvestment) {
      setMonthlyWithdrawal(totalInvestment);
    }
  }, [totalInvestment, monthlyWithdrawal, setMonthlyWithdrawal]);

  const getWithdrawalLabel = () => {
    switch (withdrawalFrequency) {
      case "Monthly":
        return "Withdrawal per month";
      case "Quarterly":
        return "Withdrawal per quarter";
      case "Half-yearly":
        return "Withdrawal per half-year";
      case "Yearly":
        return "Withdrawal per year";
      default:
        return "Withdrawal per month";
    }
  };

  const getFutureDate = (years: number) => {
    const futureDate = addYears(new Date(), years);
    return format(futureDate, "MMMM, yyyy");
  };

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("showAdvancedOptions", JSON.stringify(showAdvancedOptions));
    localStorage.setItem("adjustForInflation", JSON.stringify(adjustForInflation));
    localStorage.setItem("inflationRate", JSON.stringify(inflationRate));
  }, [showAdvancedOptions, adjustForInflation, inflationRate]);

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg p-6 space-y-6">
      <SliderInput
        label="Total investment"
        value={totalInvestment}
        onChange={setTotalInvestment}
        min={1000}
        max={500000000}
        step={1000}
        currency={currency}
        formatValue={true}
        maxLength={12}
      />

      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <WithdrawalFrequencySelector
            withdrawalFrequency={withdrawalFrequency}
            setWithdrawalFrequency={setWithdrawalFrequency}
          />
        </div>

        <div className="space-y-1">
          <SliderInput
            label={getWithdrawalLabel()}
            value={monthlyWithdrawal}
            onChange={setMonthlyWithdrawal}
            min={50}
            max={totalInvestment}
            step={50}
            currency={currency}
            formatValue={true}
            maxLength={12}
          />
          <p className="text-base text-muted-foreground ml-1 dark:text-[#c1cbd6]">
            {withdrawalPercentage}% of Total investment
          </p>
        </div>
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
                <InfoTooltip content="The expected annual return rate on your investment. This is the percentage by which your investment is expected to grow each year before withdrawals." />
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
              <InfoTooltip content="The total duration for which you plan to keep your investment and make periodic withdrawals. This is measured in years." />
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

      <div className="space-y-4 pt-2 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="advanced-options" className="text-lg text-gray-700 dark:text-[#c1cbd6]">
              Advanced options
            </Label>
            <InfoTooltip content="Enable advanced options like inflation adjustment for more detailed calculations." />
          </div>
          <Switch
            id="advanced-options"
            checked={showAdvancedOptions}
            onCheckedChange={setShowAdvancedOptions}
          />
        </div>

        {showAdvancedOptions && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="adjust-inflation" className="text-lg text-gray-700 dark:text-[#c1cbd6]">
                  Adjust for Inflation
                </Label>
                <InfoTooltip content="Enable this to adjust withdrawal amounts for inflation over time." />
              </div>
              <Switch
                id="adjust-inflation"
                checked={adjustForInflation}
                onCheckedChange={setAdjustForInflation}
              />
            </div>

            {adjustForInflation && (
              <SliderInput
                label={
                  <div className="flex items-center gap-x-1">
                    <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">Inflation rate</span>
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
    </div>
  );
};

export default CalculatorForm;