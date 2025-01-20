import { WithdrawalFrequency } from "@/types/calculator";
import { format, addMonths } from "date-fns";

const calculateMonthlyFinalValue = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  months: number,
  withdrawalFrequency: WithdrawalFrequency
) => {
  console.log(`Calculating for ${months} months with withdrawal ${monthlyWithdrawal}`);
  
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
  const t = months / 12; // Convert months to years for the calculation

  const result = Math.round(
    totalInvestment * Math.pow(1 + returnRate / 100, t) -
      (monthlyWithdrawal *
        (Math.pow(1 + Math.pow(1 + returnRate / 100, 1 / n) - 1, t * n) - 1)) /
        (Math.pow(1 + returnRate / 100, 1 / n) - 1)
  );

  return result;
};

export const findLastPositiveMonth = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  timePeriod: number,
  withdrawalFrequency: WithdrawalFrequency
): { month: string; finalValue: number } | null => {
  console.log("Starting to find last positive month");
  
  const totalMonths = timePeriod * 12;
  let lastPositiveMonth = null;
  let lastPositiveValue = 0;

  for (let months = totalMonths; months >= 1; months--) {
    const value = calculateMonthlyFinalValue(
      totalInvestment,
      monthlyWithdrawal,
      returnRate,
      months,
      withdrawalFrequency
    );

    console.log(`Month ${months}: Final value = ${value}`);

    if (value > 0) {
      const date = addMonths(new Date(), months);
      lastPositiveMonth = format(date, "MMM yyyy");
      lastPositiveValue = value;
      console.log(`Found last positive month: ${lastPositiveMonth} with value ${lastPositiveValue}`);
      break;
    }
  }

  if (lastPositiveMonth) {
    return {
      month: lastPositiveMonth,
      finalValue: lastPositiveValue
    };
  }

  return null;
};