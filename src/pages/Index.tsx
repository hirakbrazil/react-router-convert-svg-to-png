import React, { useRef } from "react";
import ResultCard from "@/components/ResultCard";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CalculatorForm from "@/components/CalculatorForm";
import useTheme from "@/hooks/useTheme";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ActionButtons from "@/components/ActionButtons";
import { useCalculator } from "@/hooks/useCalculator";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";

const Index = () => {
  useTheme();

  const {
    totalInvestment,
    setTotalInvestment,
    monthlyWithdrawal,
    setMonthlyWithdrawal,
    returnRate,
    setReturnRate,
    timePeriod,
    setTimePeriod,
    withdrawalFrequency,
    setWithdrawalFrequency,
    finalValue,
    withdrawalPercentage,
    currency,
    setCurrency,
  } = useCalculator();

  // Store previous values for undo functionality
  const previousValuesRef = useRef({
    totalInvestment,
    monthlyWithdrawal,
    returnRate,
    timePeriod,
    withdrawalFrequency,
  });

  const handleReset = () => {
    previousValuesRef.current = {
      totalInvestment,
      monthlyWithdrawal,
      returnRate,
      timePeriod,
      withdrawalFrequency,
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
    setWithdrawalFrequency(values.withdrawalFrequency);

    localStorage.setItem("totalInvestment", values.totalInvestment.toString());
    localStorage.setItem("monthlyWithdrawal", values.monthlyWithdrawal.toString());
    localStorage.setItem("returnRate", values.returnRate.toString());
    localStorage.setItem("timePeriod", values.timePeriod.toString());
    localStorage.setItem("withdrawalFrequency", values.withdrawalFrequency);
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
          <CalculatorHeader currency={currency} onCurrencyChange={setCurrency} />

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
            monthlyWithdrawal={monthlyWithdrawal}
            finalValue={finalValue}
            currency={currency}
            withdrawalFrequency={withdrawalFrequency}
            timePeriod={timePeriod}
          />

          <ActionButtons
            onReset={handleReset}
            previousValues={previousValuesRef.current}
            currentValues={{
              totalInvestment,
              monthlyWithdrawal,
              returnRate,
              timePeriod,
              withdrawalFrequency,
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