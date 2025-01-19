import React, { useEffect } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";
import WithdrawalFrequencySelector from "./calculator/WithdrawalFrequencySelector";
import InfoTooltip from "./InfoTooltip";
import { format, addYears } from "date-fns";
import { Input } from "@/components/ui/input";

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
}: CalculatorFormProps) => {
  useEffect(() => {
    const minWithdrawal = Math.max(50, (0.001 / 100) * totalInvestment);
    if (monthlyWithdrawal < minWithdrawal) {
      setMonthlyWithdrawal(Math.round(minWithdrawal));
    } else if (monthlyWithdrawal > totalInvestment) {
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

  const getMinimumPercentage = () => {
  const minWithdrawal = Math.max(50, (0.001 / 100) * totalInvestment);
  if (totalInvestment > 0) {
    const percentage = (minWithdrawal / totalInvestment) * 100;

    // Remove unnecessary zeros for whole numbers
    return percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(3);
  }
  return "0.001"; // Default value for invalid totalInvestment
};

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const percentage = parseFloat(value);
    
    if (!isNaN(percentage)) {
      const calculatedWithdrawal = Math.round((percentage / 100) * totalInvestment);
      const minWithdrawal = Math.max(50, (0.001 / 100) * totalInvestment);
      
      // Only update if the calculated withdrawal is at least minWithdrawal
      if (calculatedWithdrawal >= minWithdrawal && percentage <= 100) {
        setMonthlyWithdrawal(calculatedWithdrawal);
      }
    }
  };

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
            min={Math.max(50, Math.round((0.001 / 100) * totalInvestment))}
            max={totalInvestment}
            step={50}
            currency={currency}
            formatValue={true}
            maxLength={12}
          />
          <div className="flex items-center gap-2 ml-1">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              value={withdrawalPercentage}
              onChange={handlePercentageChange}
              className="w-16 h-8 text-base bg-secondary px-1 py-1 text-center"
              maxLength={6}
            />
            <p className="text-base text-muted-foreground dark:text-[#c1cbd6]">
              % of Total investment
            </p>
          </div>
          <div className="flex justify-between px-2 mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getMinimumPercentage()}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              100%
            </span>
          </div>
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
    </div>
  );
};

export default CalculatorForm;
