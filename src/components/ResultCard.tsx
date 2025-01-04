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

const ResultCard = ({
  totalInvestment,
  totalWithdrawal,
  finalValue: rawFinalValue,
  currency,
}: ResultCardProps) => {
  // Ensure final value doesn't go below 0
  const finalValue = Math.max(0, rawFinalValue);

  // Calculate monthly withdrawal
  const monthlyWithdrawal = totalWithdrawal / (12 * 1); // 1 year for monthly calculation

  // Calculate the actual total withdrawal based on investment and final value
  let actualTotalWithdrawal = totalWithdrawal;
  
  // If final value is 0, it means funds are exhausted
  if (finalValue === 0) {
    // Calculate how many months of withdrawal are possible based on total investment
    const possibleMonths = Math.floor(totalInvestment / monthlyWithdrawal);
    actualTotalWithdrawal = possibleMonths * monthlyWithdrawal;
  }

  // Calculate total profit using the adjusted values
  const totalProfit = finalValue + actualTotalWithdrawal - totalInvestment;
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
          {formatCurrency(actualTotalWithdrawal, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Final value</span>
        <span className={`text-xl font-semibold ${finalValue === 0 ? 'text-red-500 dark:text-red-400' : 'text-foreground'}`}>
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