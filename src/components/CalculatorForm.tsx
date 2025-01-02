import React, { useEffect, useState } from "react";
import SliderInput from "@/components/slider/SliderInput";
import { CalculatorFormProps } from "./calculator/types";
import { calculateFinalValue, getExhaustionDate } from "./calculator/utils";
import { toast } from "@/hooks/use-toast";

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
    // Only check exhaustion when decreasing time period
    if (newValue < timePeriod || !isTimeperiodLocked) {
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
    } else {
      setTimePeriod(newValue);
    }
  };

  const handleReturnRateChange = (newValue: number) => {
    // Only check exhaustion when decreasing return rate
    if (newValue < returnRate || !isReturnRateLocked) {
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
    } else {
      setReturnRate(newValue);
    }
  };

  const handleWithdrawalChange = (newValue: number) => {
    // Only check exhaustion when increasing withdrawal
    if (newValue > monthlyWithdrawal || !isWithdrawalLocked) {
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
    } else {
      setMonthlyWithdrawal(newValue);
    }
  };

  const handleInvestmentChange = (newValue: number) => {
    // Only check exhaustion when decreasing investment
    if (newValue < totalInvestment || !isInvestmentLocked) {
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
    } else {
      setTotalInvestment(newValue);
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