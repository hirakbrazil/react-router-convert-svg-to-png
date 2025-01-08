import { useState, useEffect } from "react";
import { WithdrawalFrequency } from "@/types/calculator";
import { CurrencyType } from "@/components/CurrencySelector";

export const useCalculator = () => {
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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("totalInvestment", totalInvestment.toString());
    localStorage.setItem("monthlyWithdrawal", monthlyWithdrawal.toString());
    localStorage.setItem("returnRate", returnRate.toString());
    localStorage.setItem("timePeriod", timePeriod.toString());
    localStorage.setItem("withdrawalFrequency", withdrawalFrequency);
    localStorage.setItem("selectedCurrency", currency);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod, withdrawalFrequency, currency]);

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

    const r = returnRate / (n * 100);
    const t = timePeriod;

    let result = Math.round(
      totalInvestment * Math.pow(1 + r, t * n) -
        (monthlyWithdrawal * (Math.pow(1 + r, t * n) - 1)) / r
    );

    return result;
  };

  // Calculate final value
  useEffect(() => {
    const result = calculateSWP();
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod, withdrawalFrequency]);

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
  };
};