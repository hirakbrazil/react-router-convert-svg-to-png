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
import HomepageContent from "@/components/HomepageContent";

interface PreviousValues {
  monthlyInvestment: number;
  returnRate: number;
  timePeriod: number;
  sipFrequency: string;
  advancedOptionsEnabled?: boolean;
  stepUpEnabled?: boolean;
  stepUpFrequency?: string;
  stepUpPercentage?: number;
  initialInvestmentEnabled?: boolean;
  initialInvestmentAmount?: number;
}

interface CurrentValues extends PreviousValues {
  currency: string;
}

const Index = () => {
  useTheme();

  const {
    monthlyInvestment,
    setMonthlyInvestment,
    returnRate,
    setReturnRate,
    timePeriod,
    setTimePeriod,
    sipFrequency,
    setSipFrequency,
    totalValue,
    totalInvestment,
    currency,
    setCurrency,
    advancedOptionsEnabled,
    setAdvancedOptionsEnabled,
    stepUpEnabled,
    setStepUpEnabled,
    stepUpFrequency,
    setStepUpFrequency,
    stepUpPercentage,
    setStepUpPercentage,
    initialInvestmentEnabled,
    setInitialInvestmentEnabled,
    initialInvestmentAmount,
    setInitialInvestmentAmount,
    inflationEnabled,
    setInflationEnabled,
    inflationRate,
    setInflationRate,
  } = useCalculator();

  const handleReset = () => {
    setMonthlyInvestment(30000);
    setReturnRate(13);
    setTimePeriod(10);
    setSipFrequency("Monthly");
    setAdvancedOptionsEnabled(false);
    setStepUpEnabled(false);
    setStepUpFrequency("Yearly");
    setStepUpPercentage(10);
    setInitialInvestmentEnabled(false);
    setInitialInvestmentAmount(500000);
    setInflationEnabled(false);
    setInflationRate(6);
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <>
      <SEO
        title="SIP Calculator - Systematic Investment Plan Calculator"
        description="Calculate your Systematic Investment Plan (SIP) easily with our free calculator. Plan your investments effectively."
        canonicalUrl="https://sip-calculator.mutualfundjournal.in/"
        robots="max-image-preview:large"
        ogTitle="SIP Calculator - Systematic Investment Plan Calculator"
        ogDescription="Calculate your Systematic Investment Plan (SIP) easily with our free calculator. Plan your investments effectively."
        ogUrl="https://sip-calculator.mutualfundjournal.in/"
        ogImage="https://sip-calculator.mutualfundjournal.in/banner.jpg"
        ogType="website"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <CalculatorHeader currency={currency} onCurrencyChange={setCurrency} />

          <CalculatorForm
            monthlyInvestment={monthlyInvestment}
            setMonthlyInvestment={setMonthlyInvestment}
            returnRate={returnRate}
            setReturnRate={setReturnRate}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            currency={currency}
            sipFrequency={sipFrequency}
            setSipFrequency={setSipFrequency}
            advancedOptionsEnabled={advancedOptionsEnabled}
            setAdvancedOptionsEnabled={setAdvancedOptionsEnabled}
            stepUpEnabled={stepUpEnabled}
            setStepUpEnabled={setStepUpEnabled}
            stepUpFrequency={stepUpFrequency}
            setStepUpFrequency={setStepUpFrequency}
            stepUpPercentage={stepUpPercentage}
            setStepUpPercentage={setStepUpPercentage}
            initialInvestmentEnabled={initialInvestmentEnabled}
            setInitialInvestmentEnabled={setInitialInvestmentEnabled}
            initialInvestmentAmount={initialInvestmentAmount}
            setInitialInvestmentAmount={setInitialInvestmentAmount}
            inflationEnabled={inflationEnabled}
            setInflationEnabled={setInflationEnabled}
            inflationRate={inflationRate}
            setInflationRate={setInflationRate}
          />
          <ResultCard
            totalInvestment={totalInvestment}
            monthlyInvestment={monthlyInvestment}
            totalValue={totalValue}
            currency={currency}
            sipFrequency={sipFrequency}
            timePeriod={timePeriod}
            stepUpEnabled={stepUpEnabled && advancedOptionsEnabled}
            stepUpPercentage={stepUpPercentage}
            stepUpFrequency={stepUpFrequency}
          />
          <AdSenseResponsive />
          <ActionButtons
            onReset={handleReset}
            previousValues={{
              monthlyInvestment,
              returnRate,
              timePeriod,
              sipFrequency,
              advancedOptionsEnabled,
              stepUpEnabled,
              stepUpFrequency,
              stepUpPercentage,
              initialInvestmentEnabled,
              initialInvestmentAmount,
            }}
            currentValues={{
              monthlyInvestment,
              returnRate,
              timePeriod,
              sipFrequency,
              currency,
              advancedOptionsEnabled,
              stepUpEnabled,
              stepUpFrequency,
              stepUpPercentage,
              initialInvestmentEnabled,
              initialInvestmentAmount,
            }}
            onRestore={(values) => {
              setMonthlyInvestment(values.monthlyInvestment);
              setReturnRate(values.returnRate);
              setTimePeriod(values.timePeriod);
              setSipFrequency(values.sipFrequency);
              setAdvancedOptionsEnabled(values.advancedOptionsEnabled || false);
              setStepUpEnabled(values.stepUpEnabled || false);
              setStepUpFrequency(values.stepUpFrequency || "Yearly");
              setStepUpPercentage(values.stepUpPercentage || 10);
              setInitialInvestmentEnabled(values.initialInvestmentEnabled || false);
              setInitialInvestmentAmount(values.initialInvestmentAmount || 500000);
            }}
          />
          <HomepageContent 
            currency={currency}
            totalInvestment={totalInvestment}
            monthlyInvestment={monthlyInvestment}
            timePeriod={timePeriod}
            sipFrequency={sipFrequency}
            totalValue={totalValue}
          />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default Index;
