import React, { useEffect } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";
import WithdrawalFrequencySelector from "./calculator/WithdrawalFrequencySelector";
import InfoTooltip from "./InfoTooltip";
import { format, addYears } from "date-fns";
import AdvancedOptions from "./calculator/AdvancedOptions";

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
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="totalInvestment" className="text-sm font-medium text-gray-700">
          Total Investment ({currency})
        </label>
        <input
          type="number"
          id="totalInvestment"
          className="w-full mt-1 p-3 border border-gray-300 rounded-md"
          value={totalInvestment}
          onChange={(e) => setTotalInvestment(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="monthlyWithdrawal" className="text-sm font-medium text-gray-700">
          Monthly Withdrawal ({currency})
        </label>
        <SliderInput
          value={monthlyWithdrawal}
          min={1000}
          max={totalInvestment}
          onChange={setMonthlyWithdrawal}
          formatCurrency={(value: number) => formatCurrency(value, currency)}
        />
      </div>

      <div>
        <label htmlFor="returnRate" className="text-sm font-medium text-gray-700">
          Expected Return Rate (%)
        </label>
        <SliderInput
          value={returnRate}
          min={0}
          max={20}
          onChange={setReturnRate}
          formatCurrency={(value: number) => `${value}%`}
        />
      </div>

      <div>
        <label htmlFor="timePeriod" className="text-sm font-medium text-gray-700">
          Investment Time Period (Years)
        </label>
        <SliderInput
          value={timePeriod}
          min={1}
          max={50}
          onChange={setTimePeriod}
          formatCurrency={(value: number) => `${value} years`}
        />
      </div>

      <div>
        <WithdrawalFrequencySelector
          value={withdrawalFrequency}
          onChange={setWithdrawalFrequency}
        />
      </div>

      <AdvancedOptions
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        adjustForInflation={adjustForInflation}
        setAdjustForInflation={setAdjustForInflation}
        inflationRate={inflationRate}
        setInflationRate={setInflationRate}
      />
    </form>
  );
};

export default CalculatorForm;
