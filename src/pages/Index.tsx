import React, { useState, useEffect } from "react";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";

const Index = () => {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
  const [returnRate, setReturnRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(5);
  const [finalValue, setFinalValue] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>("INR");

  // Calculate maximum monthly withdrawal (total investment / 12)
  const maxMonthlyWithdrawal = Math.floor(totalInvestment / 12);

  // Ensure monthly withdrawal doesn't exceed the maximum
  useEffect(() => {
    if (monthlyWithdrawal > maxMonthlyWithdrawal) {
      setMonthlyWithdrawal(maxMonthlyWithdrawal);
    }
  }, [totalInvestment, maxMonthlyWithdrawal]);

  const calculateSWP = () => {
    const n = 12; // 12 months in a year
    const r = returnRate / (n * 100); // Monthly return rate
    const t = timePeriod; // Number of years

    // Future Value Calculation using the compound interest formula with monthly withdrawals
    let result = Math.round(
      (totalInvestment * Math.pow((1 + returnRate / 100), t)) -
      (monthlyWithdrawal * (Math.pow((1 + (Math.pow((1 + returnRate / 100), (1 / n)) - 1)), (t * n)) - 1) /
        (Math.pow((1 + returnRate / 100), (1 / n)) - 1))
    );

    return Math.max(0, result);
  };

  useEffect(() => {
    const result = calculateSWP();
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod]);

  // Handle value changes with locking logic
  const handleTotalInvestmentChange = (value: number) => {
    if (finalValue === 0 && value < totalInvestment) return;
    setTotalInvestment(value);
  };

  const handleMonthlyWithdrawalChange = (value: number) => {
    if (finalValue === 0 && value > monthlyWithdrawal) return;
    setMonthlyWithdrawal(value);
  };

  const handleReturnRateChange = (value: number) => {
    if (finalValue === 0 && value < returnRate) return;
    setReturnRate(value);
  };

  const handleTimePeriodChange = (value: number) => {
    if (finalValue === 0 && value > timePeriod) return;
    setTimePeriod(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            SWP Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Calculate your Systematic Withdrawal Plan
          </p>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <SliderInput
            label="Total investment"
            value={totalInvestment}
            onChange={handleTotalInvestmentChange}
            min={1000}
            max={500000000}
            step={1000}
            prefix="₹"
            isLocked={finalValue === 0}
            lockDirection="decrement"
          />

          <SliderInput
            label="Withdrawal per month"
            value={monthlyWithdrawal}
            onChange={handleMonthlyWithdrawalChange}
            min={100}
            max={1000000}
            step={100}
            prefix="₹"
            dynamicMax={maxMonthlyWithdrawal}
            isLocked={finalValue === 0}
            lockDirection="increment"
          />

          <SliderInput
            label="Expected return rate (p.a)"
            value={returnRate}
            onChange={handleReturnRateChange}
            min={1}
            max={50}
            step={0.1}
            suffix="%"
            isLocked={finalValue === 0}
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
            isLocked={finalValue === 0}
            lockDirection="increment"
          />
        </div>

        <ResultCard
          totalInvestment={totalInvestment}
          totalWithdrawal={monthlyWithdrawal * timePeriod * 12}
          finalValue={finalValue}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default Index;