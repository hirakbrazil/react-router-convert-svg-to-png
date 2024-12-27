import React from "react";
import { CurrencyType } from "./CurrencySelector";

interface ResultCardProps {
  totalInvestment: number;
  totalWithdrawal: number;
  finalValue: number;
  currency: CurrencyType;
}

const formatCurrency = (value: number, currency: CurrencyType): string => {
  if (currency === "INR") {
    // Convert to Indian format (lakhs and crores)
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  } else if (currency === "USD") {
    // Convert to US format
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  } else {
    // Convert to EUR format
    const formatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  }
};

const ResultCard = ({
  totalInvestment,
  totalWithdrawal,
  finalValue,
  currency,
}: ResultCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total investment</span>
        <span className="text-xl font-semibold">
          {formatCurrency(totalInvestment, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total withdrawal</span>
        <span className="text-xl font-semibold">
          {formatCurrency(totalWithdrawal, currency)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Final value</span>
        <span className="text-xl font-semibold">
          {formatCurrency(finalValue, currency)}
        </span>
      </div>
    </div>
  );
};

export default ResultCard;