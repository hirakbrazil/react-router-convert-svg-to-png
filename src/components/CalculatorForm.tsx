import React, { useEffect, useState } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { toast } from "@/hooks/use-toast";

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
  finalValue: number;
}

const calculateFinalValue = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  timePeriod: number
): number => {
  const n = 12;
  const r = returnRate / (n * 100);
  const t = timePeriod;

  return Math.round(
    (totalInvestment * Math.pow((1 + returnRate / 100), t)) -
    (monthlyWithdrawal * (Math.pow((1 + (Math.pow((1 + returnRate / 100), (1 / n)) - 1)), (t * n)) - 1) /
      (Math.pow((1 + returnRate / 100), (1 / n)) - 1))
  );
};

const getExhaustionDate = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  currentTimePeriod: number
): { month: string; year: number } | null => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentDate = new Date();
  const startYear = currentDate.getFullYear();
  
  for (let month = 0; month < 12; month++) {
    const timePeriod = currentTimePeriod + month / 12;
    const value = calculateFinalValue(totalInvestment, monthlyWithdrawal, returnRate, timePeriod);
    
    if (value <= 0) {
      const exhaustionDate = new Date(startYear + Math.floor(timePeriod), month, 1);
      return {
        month: months[exhaustionDate.getMonth()],
        year: exhaustionDate.getFullYear()
      };
    }
  }
  
  return null;
};

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
  finalValue,
}: CalculatorFormProps) => {
  const [isTimeperiodLocked, setIsTimeperiodLocked] = useState(false);
  const [isReturnRateLocked, setIsReturnRateLocked] = useState(false);
  const [isWithdrawalLocked, setIsWithdrawalLocked] = useState(false);
  const [isInvestmentLocked, setIsInvestmentLocked] = useState(false);

  const checkAndNotifyExhaustion = (
    newTotalInvestment: number,
    newMonthlyWithdrawal: number,
    newReturnRate: number,
    newTimePeriod: number,
    currentValue: number
  ) => {
    const nextValue = calculateFinalValue(
      newTotalInvestment,
      newMonthlyWithdrawal,
      newReturnRate,
      newTimePeriod
    );

    if (currentValue > 0 && nextValue <= 0) {
      const exhaustionDate = getExhaustionDate(
        newTotalInvestment,
        newMonthlyWithdrawal,
        newReturnRate,
        newTimePeriod - 1
      );

      if (exhaustionDate) {
        toast({
          title: "Funds Exhausted",
          description: `Funds will be exhausted by ${exhaustionDate.month}, ${exhaustionDate.year}`,
          duration: 5000,
        });
      }
      return true;
    }
    return false;
  };

  const handleTimePeriodChange = (newValue: number) => {
    const willExhaust = checkAndNotifyExhaustion(
      totalInvestment,
      monthlyWithdrawal,
      returnRate,
      newValue,
      finalValue
    );

    if (!willExhaust) {
      setTimePeriod(newValue);
    } else {
      setIsTimeperiodLocked(true);
    }
  };

  const handleReturnRateChange = (newValue: number) => {
    const willExhaust = checkAndNotifyExhaustion(
      totalInvestment,
      monthlyWithdrawal,
      newValue,
      timePeriod,
      finalValue
    );

    if (!willExhaust) {
      setReturnRate(newValue);
    } else {
      setIsReturnRateLocked(true);
    }
  };

  const handleWithdrawalChange = (newValue: number) => {
    const willExhaust = checkAndNotifyExhaustion(
      totalInvestment,
      newValue,
      returnRate,
      timePeriod,
      finalValue
    );

    if (!willExhaust) {
      setMonthlyWithdrawal(newValue);
    } else {
      setIsWithdrawalLocked(true);
    }
  };

  const handleInvestmentChange = (newValue: number) => {
    const willExhaust = checkAndNotifyExhaustion(
      newValue,
      monthlyWithdrawal,
      returnRate,
      timePeriod,
      finalValue
    );

    if (!willExhaust) {
      setTotalInvestment(newValue);
    } else {
      setIsInvestmentLocked(true);
    }
  };

  useEffect(() => {
    if (monthlyWithdrawal > totalInvestment) {
      setMonthlyWithdrawal(totalInvestment);
    }
  }, [totalInvestment, monthlyWithdrawal, setMonthlyWithdrawal]);

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg p-6 space-y-6">
      <SliderInput
        label="Total investment"
        value={totalInvestment}
        onChange={handleInvestmentChange}
        min={1000}
        max={500000000}
        step={1000}
        currency={currency}
        formatValue={true}
        isLocked={isInvestmentLocked}
        lockDirection="decrement"
      />

      <div className="space-y-1">
        <SliderInput
          label="Withdrawal per month"
          value={monthlyWithdrawal}
          onChange={handleWithdrawalChange}
          min={100}
          max={totalInvestment}
          step={100}
          currency={currency}
          formatValue={true}
          isLocked={isWithdrawalLocked}
          lockDirection="increment"
        />
        <p className="text-base text-muted-foreground ml-1 dark:text-[#c1cbd6]">{withdrawalPercentage}% of Total investment</p>
      </div>

      <SliderInput
        label="Expected return rate (p.a)"
        value={returnRate}
        onChange={handleReturnRateChange}
        min={1}
        max={50}
        step={0.1}
        suffix="%"
        maxLength={4}
        isLocked={isReturnRateLocked}
        lockDirection="decrement"
      />

      <SliderInput
        label="Time period"
        value={timePeriod}
        onChange={handleTimePeriodChange}
        min={1}
        max={50}
        step={1}
        suffix=" Yr"
        isLocked={isTimeperiodLocked}
        lockDirection="increment"
      />
    </div>
  );
};

export default CalculatorForm;