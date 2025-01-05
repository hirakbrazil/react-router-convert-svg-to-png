import React, { useEffect, useState } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { toast } from "@/hooks/use-toast";
import { addMonths, format } from "date-fns";

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
  const [lastPositiveFinalValue, setLastPositiveFinalValue] = useState<number | null>(null);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const calculateFinalValue = (investment: number, withdrawal: number, rate: number, time: number) => {
    const n = 12; // 12 months in a year
    const r = rate / (n * 100); // Monthly return rate

    return Math.round(
      (investment * Math.pow((1 + rate / 100), time)) -
      (withdrawal * (Math.pow((1 + (Math.pow((1 + rate / 100), (1 / n)) - 1)), (time * n)) - 1) /
        (Math.pow((1 + rate / 100), (1 / n)) - 1))
    );
  };

  const calculateExhaustionDate = (
    investment: number,
    withdrawal: number,
    rate: number,
    maxMonths: number = 600 // 50 years
  ): Date | null => {
    let currentValue = investment;
    let monthlyRate = rate / 12 / 100;
    let currentDate = new Date();

    for (let month = 1; month <= maxMonths; month++) {
      currentValue = currentValue * (1 + monthlyRate) - withdrawal;
      
      if (currentValue <= 0) {
        return addMonths(currentDate, month - 1);
      }
    }
    return null;
  };

  useEffect(() => {
    if (monthlyWithdrawal > totalInvestment) {
      setMonthlyWithdrawal(totalInvestment);
    }
  }, [totalInvestment, monthlyWithdrawal, setMonthlyWithdrawal]);

  useEffect(() => {
    const newFinalValue = calculateFinalValue(totalInvestment, monthlyWithdrawal, returnRate, timePeriod);

    if (newFinalValue > 0) {
      setLastPositiveFinalValue(newFinalValue);
      setIsDisconnected(false);
    } else if (lastPositiveFinalValue !== null && !isDisconnected) {
      setIsDisconnected(true);
      const exhaustionDate = calculateExhaustionDate(totalInvestment, monthlyWithdrawal, returnRate);
      
      if (exhaustionDate) {
        const formattedDate = format(exhaustionDate, 'MMMM, yyyy');
        toast({
          title: "Fund Exhaustion Alert",
          description: `Fund exhausted by ${formattedDate}`,
          duration: 5000,
        });
      }
    }
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod]);

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
          min={50}
          max={totalInvestment}
          step={50}
          currency={currency}
          formatValue={true}
          maxLength={12}
        />
        <p className="text-base text-muted-foreground ml-1 dark:text-[#c1cbd6]">{withdrawalPercentage}% of Total investment</p>
      </div>

      <SliderInput
        label="Expected return rate (p.a)"
        value={returnRate}
        onChange={setReturnRate}
        min={1}
        max={50}
        step={0.1}
        suffix="%"
        maxLength={4}
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