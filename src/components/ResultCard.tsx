import React from "react";
import { CurrencyType } from "./CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";

interface ResultCardProps {
  totalInvestment: number;
  monthlyWithdrawal: number;
  finalValue: number;
  currency: CurrencyType;
  withdrawalFrequency: WithdrawalFrequency;
  timePeriod: number;
}

const formatCurrency = (value: number, currency: CurrencyType): string => {
  const currencyFormats: { [key in CurrencyType]: { locale: string, currency: string } } = {
    INR: { locale: "en-IN", currency: "INR" },
    USD: { locale: "en-US", currency: "USD" },
    EUR: { locale: "de-DE", currency: "EUR" },
    JPY: { locale: "ja-JP", currency: "JPY" },
    GBP: { locale: "en-GB", currency: "GBP" },
    CNY: { locale: "zh-CN", currency: "CNY" },
    AUD: { locale: "en-AU", currency: "AUD" },
    CAD: { locale: "en-CA", currency: "CAD" },
    CHF: { locale: "de-CH", currency: "CHF" },
    HKD: { locale: "zh-HK", currency: "HKD" },
    SGD: { locale: "en-SG", currency: "SGD" }
  };

  const format = currencyFormats[currency];
  const formatter = new Intl.NumberFormat(format.locale, {
    style: "currency",
    currency: format.currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
};

const calculateTotalWithdrawal = (monthlyWithdrawal: number, frequency: WithdrawalFrequency, timePeriod: number): number => {
  const withdrawalsPerYear = {
    "Monthly": 12,
    "Quarterly": 4,
    "Half-yearly": 2,
    "Yearly": 1
  };

  return monthlyWithdrawal * withdrawalsPerYear[frequency] * timePeriod;
};

const ResultCard = ({
  totalInvestment,
  monthlyWithdrawal,
  finalValue,
  currency,
  withdrawalFrequency,
  timePeriod,
}: ResultCardProps) => {
  const totalWithdrawal = calculateTotalWithdrawal(monthlyWithdrawal, withdrawalFrequency, timePeriod);
  
  // Use 0 instead of negative values when calculating total profit
  const finalValueForProfit = finalValue < 0 ? 0 : finalValue;
  const totalProfit = finalValueForProfit + totalWithdrawal - totalInvestment;
  const displayProfit = totalProfit > 0 ? totalProfit : 0;

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Total investment</span>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(totalInvestment, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Total withdrawal</span>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(totalWithdrawal, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Final value</span>
        <span className={`text-xl font-semibold ${finalValue < 0 ? 'text-red-500 dark:text-red-400' : 'text-foreground'}`}>
          {formatCurrency(finalValue, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Total profit</span>
        <span className={`text-xl font-semibold ${totalProfit > 0 ? 'text-green-500 dark:text-green-400' : 'text-foreground'}`}>
          {formatCurrency(displayProfit, currency)}
        </span>
      </div>
    </div>
  );
};

export default ResultCard;