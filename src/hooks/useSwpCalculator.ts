import { useState, useEffect } from 'react';
import { CurrencyType } from '@/components/CurrencySelector';

export const useSwpCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(5000);
  const [withdrawalPercentage, setWithdrawalPercentage] = useState(1);
  const [returnRate, setReturnRate] = useState(13);
  const [timePeriod, setTimePeriod] = useState(10);
  const [finalValue, setFinalValue] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    return (savedCurrency as CurrencyType) || "INR";
  });

  // Calculate maximum monthly withdrawal
  const maxMonthlyWithdrawal = Math.floor(totalInvestment / 12);

  // Update percentage when monthly withdrawal changes
  useEffect(() => {
    const newPercentage = (monthlyWithdrawal * 100) / totalInvestment;
    setWithdrawalPercentage(Number(newPercentage.toFixed(1)));
  }, [monthlyWithdrawal, totalInvestment]);

  // Update monthly withdrawal when percentage changes
  useEffect(() => {
    const newMonthlyWithdrawal = Math.floor((totalInvestment * withdrawalPercentage) / 100);
    setMonthlyWithdrawal(Math.min(newMonthlyWithdrawal, maxMonthlyWithdrawal));
  }, [withdrawalPercentage, totalInvestment, maxMonthlyWithdrawal]);

  // Save currency selection to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  const calculateSWP = () => {
    const n = 12;
    const r = returnRate / (n * 100);
    const t = timePeriod;

    let result = Math.round(
      (totalInvestment * Math.pow((1 + returnRate / 100), t)) -
      (monthlyWithdrawal * (Math.pow((1 + (Math.pow((1 + returnRate / 100), (1 / n)) - 1)), (t * n)) - 1) /
        (Math.pow((1 + returnRate / 100), (1 / n)) - 1))
    );

    return Math.max(0, result);
  };

  useEffect(() => {
    const result = calculateSWP();
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod]);

  return {
    totalInvestment,
    setTotalInvestment,
    monthlyWithdrawal,
    setMonthlyWithdrawal,
    withdrawalPercentage,
    setWithdrawalPercentage,
    returnRate,
    setReturnRate,
    timePeriod,
    setTimePeriod,
    finalValue,
    currency,
    setCurrency,
    maxMonthlyWithdrawal
  };
};