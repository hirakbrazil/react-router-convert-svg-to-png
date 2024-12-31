import React, { useState, useEffect } from "react";
import SliderInput from "@/components/slider/SliderInput";
import ResultCard from "@/components/ResultCard";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sun, Moon, Monitor } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = 'light' | 'dark' | 'system';

const Index = () => {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(5000);
  const [returnRate, setReturnRate] = useState(13);
  const [timePeriod, setTimePeriod] = useState(10);
  const [finalValue, setFinalValue] = useState(0);
  const [withdrawalPercentage, setWithdrawalPercentage] = useState(1);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  });
  const [currency, setCurrency] = useState<CurrencyType>(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    return (savedCurrency as CurrencyType) || "INR";
  });

  // Save currency selection to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  // Save and apply theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Calculate minimum monthly withdrawal (0.1% of total investment)
  const minMonthlyWithdrawal = Math.max(100, Math.round(totalInvestment * 0.001));

  // Calculate maximum monthly withdrawal (total investment / 12)
  const maxMonthlyWithdrawal = Math.floor(totalInvestment / 12);

  // Calculate withdrawal percentage whenever total investment or monthly withdrawal changes
  useEffect(() => {
    const percentage = (monthlyWithdrawal / totalInvestment) * 100;
    // Format to handle small decimals properly (up to 3 decimal places)
    setWithdrawalPercentage(Number(percentage.toFixed(3)));
  }, [totalInvestment, monthlyWithdrawal]);

  // Ensure monthly withdrawal stays within bounds when total investment changes
  useEffect(() => {
    if (monthlyWithdrawal < minMonthlyWithdrawal) {
      setMonthlyWithdrawal(minMonthlyWithdrawal);
    } else if (monthlyWithdrawal > maxMonthlyWithdrawal) {
      setMonthlyWithdrawal(maxMonthlyWithdrawal);
    }
  }, [totalInvestment, minMonthlyWithdrawal, maxMonthlyWithdrawal]);

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

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
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

        <div className="bg-card rounded-xl shadow-lg p-6 space-y-6">
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
            isLocked={finalValue === 0}
            lockDirection="decrement"
          />

          <div className="space-y-1">
            <SliderInput
              label="Withdrawal per month"
              value={monthlyWithdrawal}
              onChange={setMonthlyWithdrawal}
              min={minMonthlyWithdrawal}
              max={1000000}
              step={100}
              currency={currency}
              formatValue={true}
              dynamicMax={maxMonthlyWithdrawal}
              maxLength={10}
              isLocked={finalValue === 0}
              lockDirection="increment"
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
            isLocked={finalValue === 0}
            lockDirection="decrement"
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
            isLocked={finalValue === 0}
            lockDirection="decrement"
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

        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="h-4 w-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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