import { useState, useEffect } from "react";
import { SIPFrequency } from "@/types/calculator";
import { CurrencyType } from "@/components/CurrencySelector";

export const useCalculator = () => {
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    const savedMonthlyInvestment = localStorage.getItem("monthlyInvestment");
    const savedReturnRate = localStorage.getItem("returnRate");
    const savedTimePeriod = localStorage.getItem("timePeriod");
    const savedSipFrequency = localStorage.getItem("sipFrequency") as SIPFrequency;
    const savedCurrency = localStorage.getItem("selectedCurrency") as CurrencyType;

    return {
      monthlyInvestment: Number(params.get("mi")) || Number(savedMonthlyInvestment) || 30000,
      returnRate: Number(params.get("rr")) || Number(savedReturnRate) || 13,
      timePeriod: Number(params.get("tp")) || Number(savedTimePeriod) || 10,
      sipFrequency: (params.get("sf") as SIPFrequency) || savedSipFrequency || "Monthly",
      currency: (params.get("cs") as CurrencyType) || savedCurrency || "INR"
    };
  };

  const initialValues = getInitialValues();

  const [monthlyInvestment, setMonthlyInvestment] = useState(initialValues.monthlyInvestment);
  const [returnRate, setReturnRate] = useState(initialValues.returnRate);
  const [timePeriod, setTimePeriod] = useState(initialValues.timePeriod);
  const [sipFrequency, setSipFrequency] = useState<SIPFrequency>(initialValues.sipFrequency);
  const [totalValue, setTotalValue] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>(initialValues.currency);

  // Clear URL parameters when values change
  useEffect(() => {
    const hasUrlParams = window.location.search !== "";
    if (hasUrlParams) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [monthlyInvestment, returnRate, timePeriod, sipFrequency, currency]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("monthlyInvestment", monthlyInvestment.toString());
    localStorage.setItem("returnRate", returnRate.toString());
    localStorage.setItem("timePeriod", timePeriod.toString());
    localStorage.setItem("sipFrequency", sipFrequency);
    localStorage.setItem("selectedCurrency", currency);
  }, [monthlyInvestment, returnRate, timePeriod, sipFrequency, currency]);

  const calculateSIP = () => {
    const paymentsPerYear = {
      "Daily": 365,
      "Weekly": 52,
      "Monthly": 12,
      "Quarterly": 4,
      "Half-yearly": 2,
      "Yearly": 1
    };

    const n = paymentsPerYear[sipFrequency];
    const r = returnRate / (n * 100); // Convert percentage to decimal and divide by frequency
    const t = timePeriod * n; // Total number of payments

    // Calculate total investment
    const investment = monthlyInvestment * t;
    setTotalInvestment(investment);

    // SIP Future Value formula: P * ((1 + r)^t - 1) / r * (1 + r)
    const futureValue = monthlyInvestment * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    setTotalValue(Math.round(futureValue));
  };

  // Calculate values
  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, returnRate, timePeriod, sipFrequency]);

  return {
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
  };
};