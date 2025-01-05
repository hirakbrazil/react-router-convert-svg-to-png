import React from "react";
import { CurrencyType } from "./CurrencySelector";

interface ResultCardProps {
  totalInvestment: number;
  totalWithdrawal: number;
  finalValue: number;
  currency: CurrencyType;
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
    SGD: { locale: "en-SG", currency: "SGD" },
  };

  const format = currencyFormats[currency];
  const formatter = new Intl.NumberFormat(format.locale, {
    style: "currency",
    currency: format.currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
};

const ResultCard = ({
  totalInvestment,
  totalWithdrawal,
  finalValue,
  currency,
}: ResultCardProps) => {
  // Ensure final value and total profit are non-negative
  const adjustedFinalValue = Math.max(0, finalValue);
  const totalProfit = Math.max(0, adjustedFinalValue + totalWithdrawal - totalInvestment);

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
          {formatCurrency(adjustedFinalValue, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Total profit</span>
        <span className={`text-xl font-semibold ${totalProfit > 0 ? 'text-green-500 dark:text-green-400' : 'text-foreground'}`}>
          {formatCurrency(totalProfit, currency)}
        </span>
      </div>
    </div>
  );
};

export default ResultCard;
