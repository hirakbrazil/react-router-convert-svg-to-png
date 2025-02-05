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

const Index = () => {
  useTheme();

  const {
    totalInvestment,
    setTotalInvestment,
    returnRate,
    setReturnRate,
    timePeriod,
    setTimePeriod,
    totalValue,
    currency,
    setCurrency,
    inflationEnabled,
    setInflationEnabled,
    inflationRate,
    setInflationRate,
  } = useCalculator();

  const handleReset = () => {
    setTotalInvestment(500000);
    setReturnRate(13);
    setTimePeriod(10);
    setInflationEnabled(false);
    setInflationRate(6);
    window.history.replaceState({}, '', window.location.pathname);
  };

  const totalProfit = totalValue - totalInvestment;

  return (
    <>
      <SEO
        title="Lumpsum Calculator - One-time Investment Calculator"
        description="Calculate your one-time investment returns easily with our free Lumpsum Calculator. Plan your investments effectively."
        canonicalUrl="https://djournal.in/"
        robots="max-image-preview:large"
        ogTitle="Lumpsum Calculator - One-time Investment Calculator"
        ogDescription="Calculate your one-time investment returns easily with our free Lumpsum Calculator. Plan your investments effectively."
        ogUrl="https://lumpsum-calculator.mutualfundjournal.in/"
        ogImage="https://lumpsum-calculator.mutualfundjournal.in/banner.jpg"
        ogType="website"
      />
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 lg:mr-[300px]">
          <AdSenseHorizontal />
          <CalculatorHeader currency={currency} onCurrencyChange={setCurrency} />

          <CalculatorForm
            totalInvestment={totalInvestment}
            setTotalInvestment={setTotalInvestment}
            returnRate={returnRate}
            setReturnRate={setReturnRate}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            currency={currency}
            inflationEnabled={inflationEnabled}
            setInflationEnabled={setInflationEnabled}
            inflationRate={inflationRate}
            setInflationRate={setInflationRate}
          />
          <ResultCard
            totalInvestment={totalInvestment}
            totalValue={totalValue}
            currency={currency}
          />
          <AdSenseResponsive />
          <ActionButtons
            onReset={handleReset}
            previousValues={{
              totalInvestment,
              returnRate,
              timePeriod,
              inflationEnabled,
              inflationRate,
            }}
            currentValues={{
              totalInvestment,
              returnRate,
              timePeriod,
              currency,
              inflationEnabled,
              inflationRate,
            }}
            onRestore={(values) => {
              setTotalInvestment(values.totalInvestment);
              setReturnRate(values.returnRate);
              setTimePeriod(values.timePeriod);
              setInflationEnabled(values.inflationEnabled || false);
              setInflationRate(values.inflationRate || 6);
            }}
          />
          <HomepageContent 
            currency={currency}
            totalInvestment={totalInvestment}
            timePeriod={timePeriod}
            totalValue={totalValue}
            totalProfit={totalProfit}
          />
          <Footer />
        </div>
        <DesktopSidebar />
      </div>
    </>
  );
};

export default Index;