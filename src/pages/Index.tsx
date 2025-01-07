import React, { useState, useEffect, useRef } from "react";
import ResultCard from "@/components/ResultCard";
import CurrencySelector, { CurrencyType } from "@/components/CurrencySelector";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CalculatorForm from "@/components/CalculatorForm";
import useTheme from "@/hooks/useTheme";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ActionButtons from "@/components/ActionButtons";
import { WithdrawalFrequency } from "@/types/calculator";

const Index = () => {
  useTheme();

  // Parse URL parameters on initial load
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    const savedTotalInvestment = localStorage.getItem("totalInvestment");
    const savedMonthlyWithdrawal = localStorage.getItem("monthlyWithdrawal");
    const savedReturnRate = localStorage.getItem("returnRate");
    const savedTimePeriod = localStorage.getItem("timePeriod");
    const savedWithdrawalFrequency = localStorage.getItem("withdrawalFrequency") as WithdrawalFrequency;

    return {
      totalInvestment: Number(params.get("ti")) || Number(savedTotalInvestment) || 500000,
      monthlyWithdrawal: Number(params.get("mw")) || Number(savedMonthlyWithdrawal) || 5000,
      returnRate: Number(params.get("rr")) || Number(savedReturnRate) || 13,
      timePeriod: Number(params.get("tp")) || Number(savedTimePeriod) || 10,
      withdrawalFrequency: savedWithdrawalFrequency || "Monthly",
    };
  };

  const initialValues = getInitialValues();

  const [totalInvestment, setTotalInvestment] = useState(initialValues.totalInvestment);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(initialValues.monthlyWithdrawal);
  const [returnRate, setReturnRate] = useState(initialValues.returnRate);
  const [timePeriod, setTimePeriod] = useState(initialValues.timePeriod);
  const [withdrawalFrequency, setWithdrawalFrequency] = useState<WithdrawalFrequency>(initialValues.withdrawalFrequency);

  const [finalValue, setFinalValue] = useState(0);
  const [withdrawalPercentage, setWithdrawalPercentage] = useState(1);
  const [currency, setCurrency] = useState<CurrencyType>(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    return (savedCurrency as CurrencyType) || "INR";
  });

  // Store previous values for undo functionality
  const previousValuesRef = useRef({
    totalInvestment,
    monthlyWithdrawal,
    returnRate,
    timePeriod,
  });

  // Save withdrawal frequency to localStorage
  useEffect(() => {
    localStorage.setItem("withdrawalFrequency", withdrawalFrequency);
  }, [withdrawalFrequency]);

  // Save inputs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("totalInvestment", totalInvestment.toString());
    localStorage.setItem("monthlyWithdrawal", monthlyWithdrawal.toString());
    localStorage.setItem("returnRate", returnRate.toString());
    localStorage.setItem("timePeriod", timePeriod.toString());
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod]);

  // Save currency selection to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  // Calculate withdrawal percentage
  useEffect(() => {
    const percentage = (monthlyWithdrawal / totalInvestment) * 100;
    setWithdrawalPercentage(Number(percentage.toFixed(3)));
  }, [totalInvestment, monthlyWithdrawal]);

  const calculateSWP = () => {
  let n; // Compounding frequency per year
  let w; // Withdrawal frequency per year

  // Determine compounding and withdrawal frequency
  switch (withdrawalFrequency) {
    case "Weekly":
      n = 52; // Weekly compounding
      w = 52; // Weekly withdrawals
      break;
    case "Quarterly":
      n = 4; // Quarterly compounding
      w = 4; // Quarterly withdrawals
      break;
    case "Half-yearly":
      n = 2; // Half-yearly compounding
      w = 2; // Half-yearly withdrawals
      break;
    case "Yearly":
      n = 1; // Yearly compounding
      w = 1; // Yearly withdrawals
      break;
    default:
      n = 12; // Default to monthly compounding
      w = 12; // Monthly withdrawals
  }

  const r = returnRate / (n * 100); // Rate per compounding period
  const t = timePeriod; // Total time in years

  // Adjust withdrawal amount for the selected frequency
  const withdrawalPerPeriod = monthlyWithdrawal * (12 / w);

  // Future value with compounding
  const futureValue = totalInvestment * Math.pow(1 + r, t * n);

  // Withdrawal effect calculation using present value of withdrawals
  const withdrawalEffect = 
    withdrawalPerPeriod * ((Math.pow(1 + r, t * n) - 1) / r) * (1 / Math.pow(1 + r, 1));

  // Final value after considering withdrawals
  const result = Math.round(futureValue - withdrawalEffect);

  return result;
};
  
  useEffect(() => {
    const result = calculateSWP();
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod, withdrawalFrequency]);

  const handleReset = () => {
    previousValuesRef.current = {
      totalInvestment,
      monthlyWithdrawal,
      returnRate,
      timePeriod,
    };

    setTotalInvestment(500000);
    setMonthlyWithdrawal(5000);
    setReturnRate(13);
    setTimePeriod(10);
    setWithdrawalFrequency("Monthly");

    localStorage.removeItem("totalInvestment");
    localStorage.removeItem("monthlyWithdrawal");
    localStorage.removeItem("returnRate");
    localStorage.removeItem("timePeriod");
    localStorage.removeItem("withdrawalFrequency");
  };

  const handleRestore = (values: typeof previousValuesRef.current) => {
    setTotalInvestment(values.totalInvestment);
    setMonthlyWithdrawal(values.monthlyWithdrawal);
    setReturnRate(values.returnRate);
    setTimePeriod(values.timePeriod);

    localStorage.setItem("totalInvestment", values.totalInvestment.toString());
    localStorage.setItem("monthlyWithdrawal", values.monthlyWithdrawal.toString());
    localStorage.setItem("returnRate", values.returnRate.toString());
    localStorage.setItem("timePeriod", values.timePeriod.toString());
  };

  return (
    <>
      <SEO
        title="SWP Calculator - Systematic Withdrawal Plan Calculator"
        description="Calculate your Systematic Withdrawal Plan (SWP) easily with our free calculator. Plan your investment withdrawals effectively."
        canonicalUrl="https://swp-calculator.mutualfundjournal.in/"
        robots="max-image-preview:large"
        ogTitle="SWP Calculator - Systematic Withdrawal Plan Calculator"
        ogDescription="Calculate your Systematic Withdrawal Plan (SWP) easily with our free calculator. Plan your investment withdrawals effectively."
        ogUrl="https://swp-calculator.mutualfundjournal.in/"
        ogImage="https://swp-calculator.mutualfundjournal.in/banner.jpg"
        ogType="website"
      />
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
            withdrawalFrequency={withdrawalFrequency}
            setWithdrawalFrequency={setWithdrawalFrequency}
          />

          <ResultCard
            totalInvestment={totalInvestment}
            totalWithdrawal={monthlyWithdrawal * timePeriod * 12}
            finalValue={finalValue}
            currency={currency}
          />

          <ActionButtons
            onReset={handleReset}
            previousValues={previousValuesRef.current}
            currentValues={{
              totalInvestment,
              monthlyWithdrawal,
              returnRate,
              timePeriod,
            }}
            onRestore={handleRestore}
          />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
