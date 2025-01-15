import React from "react";
import ResultCard from "@/components/ResultCard";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CalculatorForm from "@/components/CalculatorForm";
import useTheme from "@/hooks/useTheme";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ActionButtons from "@/components/ActionButtons";
import { useCalculator } from "@/hooks/useCalculator";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import AdSenseHorizontal from "@/components/AdSenseHorizontal";
import AdSenseResponsive from "@/components/AdSenseResponsive";
import DesktopSidebar from "@/components/DesktopSidebar";

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
    showAdvancedOptions,
    setShowAdvancedOptions,
    adjustForInflation,
    setAdjustForInflation,
    inflationRate,
    setInflationRate,
  } = useCalculator();

  const handleReset = () => {
    setTotalInvestment(500000);
    setMonthlyWithdrawal(5000);
    setReturnRate(13);
    setTimePeriod(10);
    setWithdrawalFrequency("Monthly");
    setShowAdvancedOptions(false);
    setAdjustForInflation(false);
    setInflationRate(6);
    window.history.replaceState({}, '', window.location.pathname);
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
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
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
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            adjustForInflation={adjustForInflation}
            setAdjustForInflation={setAdjustForInflation}
            inflationRate={inflationRate}
            setInflationRate={setInflationRate}
          />
          <ResultCard
            totalInvestment={totalInvestment}
            monthlyWithdrawal={monthlyWithdrawal}
            finalValue={finalValue}
            currency={currency}
            withdrawalFrequency={withdrawalFrequency}
            timePeriod={timePeriod}
            adjustForInflation={adjustForInflation}
            inflationRate={inflationRate}
          />
          <AdSenseResponsive />
          <ActionButtons
            onReset={handleReset}
            previousValues={{
              totalInvestment,
              monthlyWithdrawal,
              returnRate,
              timePeriod,
              withdrawalFrequency,
              showAdvancedOptions,
              adjustForInflation,
              inflationRate,
            }}
            currentValues={{
              totalInvestment,
              monthlyWithdrawal,
              returnRate,
              timePeriod,
              withdrawalFrequency,
              currency,
              showAdvancedOptions,
              adjustForInflation,
              inflationRate,
            }}
            onRestore={(values) => {
              setTotalInvestment(values.totalInvestment);
              setMonthlyWithdrawal(values.monthlyWithdrawal);
              setReturnRate(values.returnRate);
              setTimePeriod(values.timePeriod);
              setWithdrawalFrequency(values.withdrawalFrequency);
              setShowAdvancedOptions(values.showAdvancedOptions);
              setAdjustForInflation(values.adjustForInflation);
              setInflationRate(values.inflationRate);
            }}
          />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default Index;