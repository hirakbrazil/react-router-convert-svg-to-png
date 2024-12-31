import React, { useState, useEffect } from "react";
import SliderInput from "@/components/slider/SliderInput";
import ResultCard from "@/components/ResultCard";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(5000);
  const [returnRate, setReturnRate] = useState(13);
  const [timePeriod, setTimePeriod] = useState(10);
  const [finalValue, setFinalValue] = useState(0);
  const [withdrawalPercentage, setWithdrawalPercentage] = useState(1);
  const [currency, setCurrency] = useState<CurrencyType>(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    return (savedCurrency as CurrencyType) || "INR";
  });

  // Save currency selection to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  // Calculate minimum monthly withdrawal (0.1% of total investment)
  const minMonthlyWithdrawal = Math.max(100, Math.round(totalInvestment * 0.001));

  // Calculate maximum monthly withdrawal based on when final value would reach zero
  const calculateMaxWithdrawal = () => {
    let left = minMonthlyWithdrawal;
    let right = Math.floor(totalInvestment / 12);
    
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      const testValue = calculateFinalValue(totalInvestment, mid, returnRate, timePeriod);
      
      if (testValue > 0) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }
    
    return left;
  };

  // Calculate maximum time period based on when final value would reach zero
  const calculateMaxTimePeriod = () => {
    let left = 1;
    let right = 50;
    
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      const testValue = calculateFinalValue(totalInvestment, monthlyWithdrawal, returnRate, mid);
      
      if (testValue > 0) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }
    
    return left;
  };

  // Calculate maximum return rate that would keep final value above zero
  const calculateMinReturnRate = () => {
    let left = 1;
    let right = returnRate;
    
    while (left < right) {
      const mid = (left + right + 1) / 2;
      const testValue = calculateFinalValue(totalInvestment, monthlyWithdrawal, mid, timePeriod);
      
      if (testValue > 0) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }
    
    return left;
  };

  // Calculate withdrawal percentage whenever total investment or monthly withdrawal changes
  useEffect(() => {
    const percentage = (monthlyWithdrawal / totalInvestment) * 100;
    setWithdrawalPercentage(Number(percentage.toFixed(3)));
  }, [totalInvestment, monthlyWithdrawal]);

  const calculateFinalValue = (principal: number, withdrawal: number, rate: number, years: number) => {
    const n = 12; // 12 months in a year
    const r = rate / (n * 100); // Monthly return rate
    const t = years; // Number of years

    return Math.round(
      (principal * Math.pow((1 + rate / 100), t)) -
      (withdrawal * (Math.pow((1 + (Math.pow((1 + rate / 100), (1 / n)) - 1)), (t * n)) - 1) /
        (Math.pow((1 + rate / 100), (1 / n)) - 1))
    );
  };

  useEffect(() => {
    const result = calculateFinalValue(totalInvestment, monthlyWithdrawal, returnRate, timePeriod);
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod]);

  const handleReset = () => {
    setTotalInvestment(500000);
    setMonthlyWithdrawal(5000);
    setReturnRate(13);
    setTimePeriod(10);
    
    toast({
      title: "Reset Complete",
      description: "All values reset to default",
      duration: 5000,
    });
  };

  // Calculate dynamic constraints
  const maxWithdrawal = calculateMaxWithdrawal();
  const maxTime = calculateMaxTimePeriod();
  const minRate = calculateMinReturnRate();

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
              min={minMonthlyWithdrawal}
              max={1000000}
              dynamicMax={maxWithdrawal}
              step={100}
              currency={currency}
              formatValue={true}
              isLocked={finalValue <= 0}
              lockDirection="increment"
              maxLength={10}
            />
            <p className="text-base text-gray-600 ml-1">{withdrawalPercentage}% of Total investment</p>
          </div>

          <SliderInput
            label="Expected return rate (p.a)"
            value={returnRate}
            onChange={setReturnRate}
            min={1}
            max={50}
            dynamicMin={minRate}
            step={0.1}
            suffix="%"
            isLocked={finalValue <= 0}
            lockDirection="decrement"
            maxLength={2}
          />

          <SliderInput
            label="Time period"
            value={timePeriod}
            onChange={setTimePeriod}
            min={1}
            max={50}
            dynamicMax={maxTime}
            step={1}
            suffix=" Yr"
            isLocked={finalValue <= 0}
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

        <div className="flex justify-center">
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        </div>

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
