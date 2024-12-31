import React from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";

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
}: CalculatorFormProps) => {
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

      <div className="space-y-1">
        <SliderInput
          label="Withdrawal per month"
          value={monthlyWithdrawal}
          onChange={setMonthlyWithdrawal}
          min={100}
          max={1000000}
          step={100}
          currency={currency}
          formatValue={true}
          maxLength={10}
        />
        <p className="text-base text-muted-foreground ml-1">{withdrawalPercentage}% of Total investment</p>
      </div>

      <SliderInput
        label="Expected return rate (p.a)"
        value={returnRate}
        onChange={setReturnRate}
        min={1}
        max={50}
        step={0.1}
        suffix="%"
        maxLength={2}
      />

      <SliderInput
        label="Time period"
        value={timePeriod}
        onChange={setTimePeriod}
        min={1}
        max={50}
        step={1}
        suffix=" Yr"
        maxLength={2}
      />
    </div>
  );
};

export default CalculatorForm;