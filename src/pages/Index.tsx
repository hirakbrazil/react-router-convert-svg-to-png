import React from "react";
import SliderInput from "@/components/slider/SliderInput";
import ResultCard from "@/components/ResultCard";
import CurrencySelector from "@/components/CurrencySelector";
import WithdrawalInput from "@/components/WithdrawalInput";
import { useSwpCalculator } from "@/hooks/useSwpCalculator";

const Index = () => {
  const {
    totalInvestment,
    setTotalInvestment,
    monthlyWithdrawal,
    setMonthlyWithdrawal,
    withdrawalPercentage,
    setWithdrawalPercentage,
    returnRate,
    setReturnRate,
    timePeriod,
    setTimePeriod,
    finalValue,
    currency,
    setCurrency,
    maxMonthlyWithdrawal
  } = useSwpCalculator();

  const handleTotalInvestmentChange = (value: number) => {
    if (finalValue === 0 && value < totalInvestment) return;
    setTotalInvestment(value);
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
            currency={currency}
            formatValue={true}
            isLocked={finalValue === 0}
            lockDirection="decrement"
            maxLength={12}
          />

          <WithdrawalInput
            label="Withdrawal per month"
            value={monthlyWithdrawal}
            percentage={withdrawalPercentage}
            onChange={setMonthlyWithdrawal}
            onPercentageChange={setWithdrawalPercentage}
            min={100}
            max={maxMonthlyWithdrawal}
            currency={currency}
            isLocked={finalValue === 0}
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
            maxLength={2}
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
            maxLength={2}
          />
        </div>

        <ResultCard
          totalInvestment={totalInvestment}
          totalWithdrawal={monthlyWithdrawal * timePeriod * 12}
          finalValue={finalValue}
          currency={currency}
        />

        <footer className="text-center text-sm text-gray-600 pb-4">
          Made with ❤️ by{" "}
          <a 
            href="https://mutualfundjournal.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Mutual Fund Journal
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;