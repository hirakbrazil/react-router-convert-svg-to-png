import { useState, useEffect } from "react";
import { SIPFrequency } from "@/types/calculator";
import { CurrencyType } from "@/components/CurrencySelector";
import { StepUpFrequency } from "@/components/calculator/StepUpSIPSettings";

export const useCalculator = () => {
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    const savedMonthlyInvestment = localStorage.getItem("monthlyInvestment");
    const savedReturnRate = localStorage.getItem("returnRate");
    const savedTimePeriod = localStorage.getItem("timePeriod");
    const savedSipFrequency = localStorage.getItem("sipFrequency") as SIPFrequency;
    const savedCurrency = localStorage.getItem("selectedCurrency") as CurrencyType;
    const savedStepUpEnabled = localStorage.getItem("stepUpEnabled");
    const savedStepUpFrequency = localStorage.getItem("stepUpFrequency") as StepUpFrequency;
    const savedStepUpPercentage = localStorage.getItem("stepUpPercentage");
    const savedInitialInvestmentEnabled = localStorage.getItem("initialInvestmentEnabled");
    const savedInitialInvestmentAmount = localStorage.getItem("initialInvestmentAmount");
    const savedInflationEnabled = localStorage.getItem("inflationEnabled");
    const savedInflationRate = localStorage.getItem("inflationRate");

    const values = {
      monthlyInvestment: Number(params.get("mi")) || Number(savedMonthlyInvestment) || 30000,
      returnRate: Number(params.get("rr")) || Number(savedReturnRate) || 13,
      timePeriod: Number(params.get("tp")) || Number(savedTimePeriod) || 10,
      sipFrequency: (params.get("sf") as SIPFrequency) || savedSipFrequency || "Monthly",
      currency: (params.get("cs") as CurrencyType) || savedCurrency || "INR",
      stepUpEnabled: params.get("su") === "true" || (savedStepUpEnabled ? JSON.parse(savedStepUpEnabled) : false),
      stepUpFrequency: (params.get("suf") as StepUpFrequency) || savedStepUpFrequency || "Yearly",
      stepUpPercentage: Number(params.get("sup")) || Number(savedStepUpPercentage) || 10,
      initialInvestmentEnabled: params.get("iie") === "true" || (savedInitialInvestmentEnabled ? JSON.parse(savedInitialInvestmentEnabled) : false),
      initialInvestmentAmount: Number(params.get("iia")) || Number(savedInitialInvestmentAmount) || 500000,
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

  const [monthlyInvestment, setMonthlyInvestment] = useState(initialValues.monthlyInvestment);
  const [returnRate, setReturnRate] = useState(initialValues.returnRate);
  const [timePeriod, setTimePeriod] = useState(initialValues.timePeriod);
  const [sipFrequency, setSipFrequency] = useState<SIPFrequency>(initialValues.sipFrequency);
  const [totalValue, setTotalValue] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>(initialValues.currency);
  const [stepUpEnabled, setStepUpEnabled] = useState(initialValues.stepUpEnabled);
  const [stepUpFrequency, setStepUpFrequency] = useState<StepUpFrequency>(initialValues.stepUpFrequency);
  const [stepUpPercentage, setStepUpPercentage] = useState(initialValues.stepUpPercentage);
  const [initialInvestmentEnabled, setInitialInvestmentEnabled] = useState(initialValues.initialInvestmentEnabled);
  const [initialInvestmentAmount, setInitialInvestmentAmount] = useState(initialValues.initialInvestmentAmount);
  const [inflationEnabled, setInflationEnabled] = useState(initialValues.inflationEnabled);
  const [inflationRate, setInflationRate] = useState(initialValues.inflationRate);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("monthlyInvestment", monthlyInvestment.toString());
    localStorage.setItem("returnRate", returnRate.toString());
    localStorage.setItem("timePeriod", timePeriod.toString());
    localStorage.setItem("sipFrequency", sipFrequency);
    localStorage.setItem("selectedCurrency", currency);
    localStorage.setItem("stepUpEnabled", JSON.stringify(stepUpEnabled));
    localStorage.setItem("stepUpFrequency", stepUpFrequency);
    localStorage.setItem("stepUpPercentage", stepUpPercentage.toString());
    localStorage.setItem("initialInvestmentEnabled", JSON.stringify(initialInvestmentEnabled));
    localStorage.setItem("initialInvestmentAmount", initialInvestmentAmount.toString());
    localStorage.setItem("inflationEnabled", JSON.stringify(inflationEnabled));
    localStorage.setItem("inflationRate", inflationRate.toString());
  }, [monthlyInvestment, returnRate, timePeriod, sipFrequency, currency, stepUpEnabled, stepUpFrequency, stepUpPercentage, initialInvestmentEnabled, initialInvestmentAmount, inflationEnabled, inflationRate]);

  const calculateRealReturnRate = (nominalReturn: number, inflation: number): number => {
    return ((1 + nominalReturn / 100) / (1 + inflation / 100) - 1) * 100;
  };

  const calculateSIP = () => {
    const paymentsPerYear = {
      "Daily": 365,
      "Weekly": 52,
      "Monthly": 12,
      "Quarterly": 4,
      "Half-yearly": 2,
      "Yearly": 1
    };

    const stepUpPeriodsPerYear = {
      "Monthly": 12,
      "Quarterly": 4,
      "Half-yearly": 2,
      "Yearly": 1
    };

    const n = paymentsPerYear[sipFrequency];
    // Calculate without inflation first
    const r = returnRate / (n * 100); // Convert percentage to decimal and divide by frequency
    const t = timePeriod * n; // Total number of payments

    let totalInvestmentAmount = initialInvestmentEnabled ? initialInvestmentAmount : 0;
    let futureValue = 0;

    // Calculate initial investment with matching frequency compounding
    if (initialInvestmentEnabled) {
      const periodsPerYear = paymentsPerYear[sipFrequency];
      const periodRate = returnRate / (100 * periodsPerYear); // Rate per period
      const totalPeriods = timePeriod * periodsPerYear; // Total periods
      futureValue = initialInvestmentAmount * Math.pow(1 + periodRate, totalPeriods);
    }

    if (!stepUpEnabled) {
      // Regular SIP calculation without step-up
      totalInvestmentAmount += monthlyInvestment * t;
      futureValue += monthlyInvestment * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    } else {
      // Step-up SIP calculation
      const stepUpsPerYear = stepUpPeriodsPerYear[stepUpFrequency];
      const paymentsPerStepUp = n / stepUpsPerYear;
      const totalStepUps = timePeriod * stepUpsPerYear;
      
      let currentInvestment = monthlyInvestment;
      let remainingPayments = t;
      let currentPeriodPayments = 0;

      for (let i = 0; i < totalStepUps; i++) {
        const paymentsInThisPeriod = Math.min(paymentsPerStepUp, remainingPayments);
        
        const periodFV = currentInvestment * 
          ((Math.pow(1 + r, remainingPayments) - Math.pow(1 + r, remainingPayments - paymentsInThisPeriod)) / r) * (1 + r);
        
        futureValue += periodFV;
        totalInvestmentAmount += currentInvestment * paymentsInThisPeriod;
        
        remainingPayments -= paymentsInThisPeriod;
        
        if (remainingPayments > 0) {
          currentInvestment *= (1 + stepUpPercentage / 100);
        }
      }
    }

    // Calculate total profit before inflation adjustment
    const totalProfit = futureValue - totalInvestmentAmount;

    // Apply inflation adjustment to total profit if enabled
    if (inflationEnabled) {
      const inflationAdjustedProfit = totalProfit / Math.pow(1 + inflationRate / 100, timePeriod);
      futureValue = totalInvestmentAmount + inflationAdjustedProfit;
    }

    setTotalInvestment(Math.round(totalInvestmentAmount));
    setTotalValue(Math.round(futureValue));
  };

  // Calculate values whenever relevant inputs change
  useEffect(() => {
    calculateSIP();
  }, [
    monthlyInvestment,
    returnRate,
    timePeriod,
    sipFrequency,
    stepUpEnabled,
    stepUpFrequency,
    stepUpPercentage,
    initialInvestmentEnabled,
    initialInvestmentAmount,
    inflationEnabled,
    inflationRate
  ]);

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
  };
};

export default useCalculator;
