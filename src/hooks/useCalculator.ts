import { useState, useEffect } from "react";
import { WithdrawalFrequency } from "@/types/calculator";
import { CurrencyType } from "@/components/CurrencySelector";

export const useCalculator = () => {
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    const savedTotalInvestment = localStorage.getItem("totalInvestment");
    const savedReturnRate = localStorage.getItem("returnRate");
    const savedTimePeriod = localStorage.getItem("timePeriod");
    const savedWithdrawalFrequency = localStorage.getItem("withdrawalFrequency") as WithdrawalFrequency;
    const savedCurrency = localStorage.getItem("selectedCurrency") as CurrencyType;
    const savedShowAdvancedOptions = localStorage.getItem("showAdvancedOptions") === "true";
    const savedAdjustForInflation = localStorage.getItem("adjustForInflation") === "true";
    const savedInflationRate = localStorage.getItem("inflationRate");

    // Determine withdrawal frequency and amount from URL parameters
    let initialWithdrawalFrequency: WithdrawalFrequency = "Monthly";
    let initialWithdrawalAmount = 0;

    if (params.has("mw")) {
      initialWithdrawalFrequency = "Monthly";
      initialWithdrawalAmount = Number(params.get("mw"));
    } else if (params.has("qw")) {
      initialWithdrawalFrequency = "Quarterly";
      initialWithdrawalAmount = Number(params.get("qw"));
    } else if (params.has("hyw")) {
      initialWithdrawalFrequency = "Half-yearly";
      initialWithdrawalAmount = Number(params.get("hyw"));
    } else if (params.has("yw")) {
      initialWithdrawalFrequency = "Yearly";
      initialWithdrawalAmount = Number(params.get("yw"));
    }

    return {
      totalInvestment: Number(params.get("ti")) || Number(savedTotalInvestment) || 500000,
      monthlyWithdrawal: initialWithdrawalAmount || Number(localStorage.getItem("monthlyWithdrawal")) || 5000,
      returnRate: Number(params.get("rr")) || Number(savedReturnRate) || 13,
      timePeriod: Number(params.get("tp")) || Number(savedTimePeriod) || 10,
      withdrawalFrequency: params.has("mw") || params.has("qw") || params.has("hyw") || params.has("yw") 
        ? initialWithdrawalFrequency 
        : savedWithdrawalFrequency || "Monthly",
      currency: (params.get("cs") as CurrencyType) || savedCurrency || "INR",
      showAdvancedOptions: savedShowAdvancedOptions || false,
      adjustForInflation: savedAdjustForInflation || false,
      inflationRate: Number(savedInflationRate) || 6,
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
  const [currency, setCurrency] = useState<CurrencyType>(initialValues.currency);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(initialValues.showAdvancedOptions);
  const [adjustForInflation, setAdjustForInflation] = useState(initialValues.adjustForInflation);
  const [inflationRate, setInflationRate] = useState(initialValues.inflationRate);

  // Clear URL parameters when values change
  useEffect(() => {
    const hasUrlParams = window.location.search !== "";
    if (hasUrlParams) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod, withdrawalFrequency, currency]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("totalInvestment", totalInvestment.toString());
    localStorage.setItem("monthlyWithdrawal", monthlyWithdrawal.toString());
    localStorage.setItem("returnRate", returnRate.toString());
    localStorage.setItem("timePeriod", timePeriod.toString());
    localStorage.setItem("withdrawalFrequency", withdrawalFrequency);
    localStorage.setItem("selectedCurrency", currency);
    localStorage.setItem("showAdvancedOptions", showAdvancedOptions.toString());
    localStorage.setItem("adjustForInflation", adjustForInflation.toString());
    localStorage.setItem("inflationRate", inflationRate.toString());
  }, [
    totalInvestment,
    monthlyWithdrawal,
    returnRate,
    timePeriod,
    withdrawalFrequency,
    currency,
    showAdvancedOptions,
    adjustForInflation,
    inflationRate,
  ]);

  // Calculate withdrawal percentage
  useEffect(() => {
    const percentage = (monthlyWithdrawal / totalInvestment) * 100;
    setWithdrawalPercentage(Number(percentage.toFixed(3)));
  }, [totalInvestment, monthlyWithdrawal]);

  const calculateSWP = () => {
    let n;
    switch (withdrawalFrequency) {
      case "Quarterly":
        n = 4;
        break;
      case "Half-yearly":
        n = 2;
        break;
      case "Yearly":
        n = 1;
        break;
      default:
        n = 12;
    }

    if (!adjustForInflation) {
      const r = returnRate / (n * 100);
      return Math.round(
        totalInvestment * Math.pow(1 + returnRate / 100, timePeriod) -
          (monthlyWithdrawal *
            (Math.pow(1 + Math.pow(1 + returnRate / 100, 1 / n) - 1, timePeriod * n) - 1)) /
            (Math.pow(1 + returnRate / 100, 1 / n) - 1)
      );
    }

    // With inflation adjustment
    let currentCapital = totalInvestment;
    let currentWithdrawal = monthlyWithdrawal;

    for (let year = 0; year < timePeriod; year++) {
      const yearlyInterest = currentCapital * (returnRate / 100);
      const yearlyWithdrawal = currentWithdrawal * n;
      currentCapital = currentCapital + yearlyInterest - yearlyWithdrawal;
      currentWithdrawal *= (1 + inflationRate / 100);
    }

    return Math.round(currentCapital);
  };

  // Calculate final value
  useEffect(() => {
    const result = calculateSWP();
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod, withdrawalFrequency, adjustForInflation, inflationRate]);

  return {
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
  };
};
