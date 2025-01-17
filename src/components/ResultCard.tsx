import React from "react";
import { CurrencyType } from "./CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";
import InfoTooltip from "./InfoTooltip";
import DonutChart from "./DonutChart";
import { format, addMonths, addQuarters, addYears } from "date-fns";

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

  const n = withdrawalsPerYear[frequency];
  let total = 0;

  if (adjustForInflation) {
    for (let year = 0; year < timePeriod; year++) {
      const inflationFactor = Math.pow(1 + inflationRate / 100, year);
      const adjustedWithdrawal = monthlyWithdrawal * inflationFactor;
      total += adjustedWithdrawal * n;
    }
  } else {
    total = monthlyWithdrawal * n * timePeriod;
  }

  return Math.round(total);
};

const calculateLastSWP = (
  monthlyWithdrawal: number,
  timePeriod: number,
  inflationRate: number
): number => {
  const inflationFactor = Math.pow(1 + inflationRate / 100, timePeriod - 1);
  return Math.round(monthlyWithdrawal * inflationFactor);
};

const getFirstWithdrawalDate = (frequency: WithdrawalFrequency): Date => {
  const currentDate = new Date();
  
  switch (frequency) {
    case "Monthly":
      return addMonths(currentDate, 1);
    case "Quarterly":
      return addQuarters(currentDate, 1);
    case "Half-yearly":
      return addMonths(currentDate, 6);
    case "Yearly":
      return addYears(currentDate, 1);
    default:
      return addMonths(currentDate, 1);
  }
};

const getLastWithdrawalDate = (frequency: WithdrawalFrequency, timePeriod: number): Date => {
  const firstDate = getFirstWithdrawalDate(frequency);
  const totalIntervals = {
    "Monthly": 12 * timePeriod - 1,
    "Quarterly": 4 * timePeriod - 1,
    "Half-yearly": 2 * timePeriod - 1,
    "Yearly": timePeriod - 1
  }[frequency];

  switch (frequency) {
    case "Monthly":
      return addMonths(firstDate, totalIntervals);
    case "Quarterly":
      return addQuarters(firstDate, totalIntervals);
    case "Half-yearly":
      return addMonths(firstDate, totalIntervals * 6);
    case "Yearly":
      return addYears(firstDate, totalIntervals);
    default:
      return addMonths(firstDate, totalIntervals); // Default to monthly
  }
};

const getWithdrawalDate = (frequency: WithdrawalFrequency, timePeriod: number, isFirst: boolean): string => {
  const date = isFirst ? getFirstWithdrawalDate(frequency) : getLastWithdrawalDate(frequency, timePeriod);
  return format(date, "MMM yyyy");
};

const getFrequencyText = (frequency: WithdrawalFrequency): string => {
  switch (frequency) {
    case "Monthly":
      return "Monthly";
    case "Quarterly":
      return "Quarterly";
    case "Half-yearly":
      return "Half-yearly";
    case "Yearly":
      return "Yearly";
    default:
      return "Monthly";
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
  
  const lastSWP = adjustForInflation
    ? calculateLastSWP(monthlyWithdrawal, timePeriod, inflationRate)
    : monthlyWithdrawal;

  const finalWithdrawalAmount = adjustForInflation
    ? Math.round(monthlyWithdrawal * Math.pow(1 + inflationRate / 100, timePeriod))
    : monthlyWithdrawal;

  // Apply inflation to final value if adjustForInflation is true
  const adjustedFinalValue = adjustForInflation
    ? Math.round(finalValue / Math.pow(1 + inflationRate / 100, timePeriod))
    : finalValue;

  const finalValueForProfit = adjustedFinalValue < 0 ? 0 : adjustedFinalValue;
  const totalProfit = finalValueForProfit + totalWithdrawal - totalInvestment;
  const displayProfit = totalProfit > 0 ? totalProfit : 0;
  const profitPercentage = (totalProfit / totalInvestment) * 100;
  const displayProfitPercentage = profitPercentage > 0 ? profitPercentage : 0;
  const totalValueGenerated = totalWithdrawal + (adjustedFinalValue < 0 ? 0 : adjustedFinalValue);

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Total Investment</span>
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(totalInvestment, currency)}
        </span>
      </div>

      {adjustForInflation && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center gap-x-1">
              <span className="text-gray-600 dark:text-gray-400">First SWP</span>
              <span className="text-gray-600 dark:text-gray-400">
                ({getWithdrawalDate(withdrawalFrequency, timePeriod, true)})
              </span>
              <InfoTooltip content="The initial withdrawal amount at the start of your investment period." />
            </div>
            <span className="text-xl font-semibold text-foreground">
              {formatCurrency(monthlyWithdrawal, currency)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center gap-x-1">
              <span className="text-gray-600 dark:text-gray-400">Last SWP</span>
              <span className="text-gray-600 dark:text-gray-400">
                ({getWithdrawalDate(withdrawalFrequency, timePeriod, false)})
              </span>
              <InfoTooltip content="The final withdrawal amount adjusted for inflation at the end of your investment period." />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-semibold text-foreground">
                {formatCurrency(lastSWP, currency)}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {getFrequencyText(withdrawalFrequency)} expense after {timePeriod} years is {formatCurrency(finalWithdrawalAmount, currency)}
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-gray-600 dark:text-gray-400">
            Total
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Withdrawal
          </span>
          <InfoTooltip content="The total amount you will withdraw over the entire investment period. This is calculated based on your periodic withdrawal amount and frequency." />
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
          <InfoTooltip content="The estimated returns on your investment, shown both as an absolute value and as a percentage of your total investment. This includes both the withdrawn amount and the final value, minus your total investment." />
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

      <DonutChart
        totalInvestment={totalInvestment}
        totalWithdrawal={totalWithdrawal}
        currency={currency}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default ResultCard;