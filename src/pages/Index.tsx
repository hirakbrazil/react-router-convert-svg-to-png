import React, { useState, useEffect } from "react";
import ResultCard from "@/components/ResultCard";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CalculatorForm from "@/components/CalculatorForm";

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

  // Calculate withdrawal percentage whenever total investment or monthly withdrawal changes
  useEffect(() => {
    const percentage = (monthlyWithdrawal / totalInvestment) * 100;
    setWithdrawalPercentage(Number(percentage.toFixed(3)));
  }, [totalInvestment, monthlyWithdrawal]);

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

    return result;
  };

  useEffect(() => {
    const result = calculateSWP();
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

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            SWP Calculator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Calculate your Systematic Withdrawal Plan
          </p>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <CalculatorForm
          totalInvestment={totalInvestment}
          setTotalInvestment={setTotalInvestment}
          monthlyWithdrawal={monthlyWithdrawal}
          setMonthlyWithdrawal={setMonthlyWithdrawal}
          returnRate={returnRate}
          setReturnRate={setReturnRate}
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          withdrawalPercentage={withdrawalPercentage}
          currency={currency}
        />

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

        <div className="flex justify-center">
          <ThemeSwitcher />
        </div>

        <footer className="text-center text-sm text-muted-foreground pb-4">
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