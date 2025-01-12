import React from "react";
import { CurrencyType } from "./CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";
import InfoTooltip from "./InfoTooltip";
import { format, addMonths, addYears } from "date-fns";

interface ResultCardProps {
  totalInvestment: number;
  monthlyWithdrawal: number;
  finalValue: number;
  currency: CurrencyType;
  withdrawalFrequency: WithdrawalFrequency;
  timePeriod: number;
  adjustForInflation: boolean;
  inflationRate: number;
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

const calculateTotalWithdrawal = (
  monthlyWithdrawal: number,
  frequency: WithdrawalFrequency,
  timePeriod: number,
  adjustForInflation: boolean,
  inflationRate: number
): number => {
  const withdrawalsPerYear = {
    "Monthly": 12,
    "Quarterly": 4,
    "Half-yearly": 2,
    "Yearly": 1
  };

  if (!adjustForInflation) {
    return monthlyWithdrawal * withdrawalsPerYear[frequency] * timePeriod;
  }

  let totalWithdrawal = 0;
  const periodsPerYear = withdrawalsPerYear[frequency];
  const totalPeriods = periodsPerYear * timePeriod;
  const inflationPerPeriod = (inflationRate / 100) / periodsPerYear;

  for (let i = 0; i < totalPeriods; i++) {
    const inflatedWithdrawal = monthlyWithdrawal * Math.pow(1 + inflationPerPeriod, i);
    totalWithdrawal += inflatedWithdrawal;
  }

  return totalWithdrawal;
};

const getFirstAndLastSWP = (
  monthlyWithdrawal: number,
  frequency: WithdrawalFrequency,
  adjustForInflation: boolean,
  inflationRate: number,
  timePeriod: number
) => {
  const firstSWP = monthlyWithdrawal;
  
  if (!adjustForInflation) {
    return { firstSWP, lastSWP: firstSWP };
  }

  const withdrawalsPerYear = {
    "Monthly": 12,
    "Quarterly": 4,
    "Half-yearly": 2,
    "Yearly": 1
  };

  const periodsPerYear = withdrawalsPerYear[frequency];
  const totalPeriods = periodsPerYear * timePeriod;
  const inflationPerPeriod = (inflationRate / 100) / periodsPerYear;
  const lastSWP = monthlyWithdrawal * Math.pow(1 + inflationPerPeriod, totalPeriods - 1);

  return { firstSWP, lastSWP };
};

const getNextWithdrawalDate = (frequency: WithdrawalFrequency) => {
  const today = new Date();
  switch (frequency) {
    case "Monthly":
      return addMonths(today, 1);
    case "Quarterly":
      return addMonths(today, 3);
    case "Half-yearly":
      return addMonths(today, 6);
    case "Yearly":
      return addYears(today, 1);
  }
};

const getLastWithdrawalDate = (frequency: WithdrawalFrequency, timePeriod: number) => {
  const today = new Date();
  switch (frequency) {
    case "Monthly":
      return addMonths(today, timePeriod * 12);
    case "Quarterly":
      return addMonths(today, timePeriod * 12);
    case "Half-yearly":
      return addMonths(today, timePeriod * 12);
    case "Yearly":
      return addYears(today, timePeriod);
  }
};

const ResultCard = ({
  totalInvestment,
  monthlyWithdrawal,
  finalValue,
  currency,
  withdrawalFrequency,
  timePeriod,
  adjustForInflation,
  inflationRate,
}: ResultCardProps) => {
  const totalWithdrawal = calculateTotalWithdrawal(
    monthlyWithdrawal,
    withdrawalFrequency,
    timePeriod,
    adjustForInflation,
    inflationRate
  );
  
  // Use 0 instead of negative values when calculating total profit
  const finalValueForProfit = finalValue < 0 ? 0 : finalValue;
  const totalProfit = finalValueForProfit + totalWithdrawal - totalInvestment;
  const displayProfit = totalProfit > 0 ? totalProfit : 0;

  // Calculate profit percentage
  const profitPercentage = (totalProfit / totalInvestment) * 100;
  const displayProfitPercentage = profitPercentage > 0 ? profitPercentage : 0;

  // Calculate total value generated (total withdrawal + final value)
  const totalValueGenerated = totalWithdrawal + (finalValue < 0 ? 0 : finalValue);

  const { firstSWP, lastSWP } = getFirstAndLastSWP(
    monthlyWithdrawal,
    withdrawalFrequency,
    adjustForInflation,
    inflationRate,
    timePeriod
  );

  const firstWithdrawalDate = getNextWithdrawalDate(withdrawalFrequency);
  const lastWithdrawalDate = getLastWithdrawalDate(withdrawalFrequency, timePeriod);

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Total Investment</span>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(totalInvestment, currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">First SWP</span>
          <span className="text-gray-600 dark:text-gray-400">
            ({format(firstWithdrawalDate, "MMM yyyy")})
          </span>
          <InfoTooltip content="The amount of your first scheduled withdrawal." />
        </div>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(firstSWP, currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">Last SWP</span>
          <span className="text-gray-600 dark:text-gray-400">
            ({format(lastWithdrawalDate, "MMM yyyy")})
          </span>
          <InfoTooltip content="The amount of your final scheduled withdrawal, adjusted for inflation if enabled." />
        </div>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(lastSWP, currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">
            Total
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Withdrawal
          </span>
          <InfoTooltip content="The total amount you will withdraw over the entire investment period. This is calculated based on your periodic withdrawal amount and frequency, adjusted for inflation if enabled." />
        </div>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(totalWithdrawal, currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">Final</span>
          <span className="text-gray-600 dark:text-gray-400">Value</span>
          <InfoTooltip content="The remaining balance in your investment after all periodic withdrawals and accounting for returns. This is what you'll have left in your portfolio at the end of the investment period." />
        </div>
        <span className={`text-xl font-semibold ${finalValue < 0 ? 'text-red-500 dark:text-red-400' : 'text-foreground'}`}>
          {formatCurrency(finalValue, currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">Total</span>
          <span className="text-gray-600 dark:text-gray-400">Value</span>
          <span className="text-gray-600 dark:text-gray-400">Generated</span>
          <InfoTooltip content="The total wealth generated by your investment, combining both what you withdrew and what remains. This represents the sum of all withdrawals plus the final portfolio value." />
        </div>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(totalValueGenerated, currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">Total</span>
          <span className="text-gray-600 dark:text-gray-400">Profit</span>
          <InfoTooltip content="The total returns earned on your investment, shown both as an absolute value and as a percentage of your total investment. This includes both the withdrawn amount and the final value, minus your total investment." />
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xl font-semibold ${totalProfit > 0 ? 'text-green-500 dark:text-green-400' : 'text-foreground'}`}>
            {formatCurrency(displayProfit, currency)}
          </span>
          <span className={`text-base font-medium ${totalProfit > 0 ? 'text-green-500 dark:text-green-400' : 'text-foreground'}`}>
            ({displayProfitPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;