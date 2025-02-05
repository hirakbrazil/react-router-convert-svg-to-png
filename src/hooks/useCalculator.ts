import { useState, useEffect } from "react";
import { CurrencyType } from "@/components/CurrencySelector";

export const useCalculator = () => {
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    const savedTotalInvestment = localStorage.getItem("totalInvestment");
    const savedReturnRate = localStorage.getItem("returnRate");
    const savedTimePeriod = localStorage.getItem("timePeriod");
    const savedCurrency = localStorage.getItem("selectedCurrency") as CurrencyType;
    const savedInflationEnabled = localStorage.getItem("inflationEnabled");
    const savedInflationRate = localStorage.getItem("inflationRate");

    const values = {
      totalInvestment: Number(params.get("ti")) || Number(savedTotalInvestment) || 500000,
      returnRate: Number(params.get("rr")) || Number(savedReturnRate) || 13,
      timePeriod: Number(params.get("tp")) || Number(savedTimePeriod) || 10,
      currency: (params.get("cs") as CurrencyType) || savedCurrency || "INR",
      inflationEnabled: params.get("inf") === "true" || (savedInflationEnabled ? JSON.parse(savedInflationEnabled) : false),
      inflationRate: Number(params.get("ir")) || Number(savedInflationRate) || 6,
    };

    // Clean up URL if there are parameters
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    return values;
  };

  const initialValues = getInitialValues();

  const [totalInvestment, setTotalInvestment] = useState(initialValues.totalInvestment);
  const [returnRate, setReturnRate] = useState(initialValues.returnRate);
  const [timePeriod, setTimePeriod] = useState(initialValues.timePeriod);
  const [totalValue, setTotalValue] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>(initialValues.currency);
  const [inflationEnabled, setInflationEnabled] = useState(initialValues.inflationEnabled);
  const [inflationRate, setInflationRate] = useState(initialValues.inflationRate);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("totalInvestment", totalInvestment.toString());
    localStorage.setItem("returnRate", returnRate.toString());
    localStorage.setItem("timePeriod", timePeriod.toString());
    localStorage.setItem("selectedCurrency", currency);
    localStorage.setItem("inflationEnabled", JSON.stringify(inflationEnabled));
    localStorage.setItem("inflationRate", inflationRate.toString());
  }, [totalInvestment, returnRate, timePeriod, currency, inflationEnabled, inflationRate]);

  const calculateLumpsum = () => {
    // Calculate without inflation first
    const r = returnRate / 100;
    const t = timePeriod;
    
    // Calculate future value using compound interest formula: A = P(1 + r)^t
    let futureValue = totalInvestment * Math.pow(1 + r, t);

    // Apply inflation adjustment if enabled
    if (inflationEnabled) {
      const inflationAdjustedProfit = (futureValue - totalInvestment) / Math.pow(1 + inflationRate / 100, timePeriod);
      futureValue = totalInvestment + inflationAdjustedProfit;
    }

    setTotalValue(Math.round(futureValue));
  };

  // Calculate values whenever relevant inputs change
  useEffect(() => {
    calculateLumpsum();
  }, [
    totalInvestment,
    returnRate,
    timePeriod,
    inflationEnabled,
    inflationRate
  ]);

  return {
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
  };
};

export default useCalculator;