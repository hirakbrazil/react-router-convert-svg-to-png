import { WithdrawalFrequency } from "@/types/calculator";
import { toast } from "@/hooks/use-toast";

let toastTimeout: NodeJS.Timeout | null = null; // Track the timeout
let isToastShown = false; // Track if a toast has been shown

const calculateMonthlyFinalValue = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  monthsPeriod: number,
  withdrawalFrequency: WithdrawalFrequency
): number => {
  const withdrawalsPerYear = {
    "Monthly": 12,
    "Quarterly": 4,
    "Half-yearly": 2,
    "Yearly": 1,
  };

  const n = withdrawalsPerYear[withdrawalFrequency];
  const r = returnRate / (n * 100);

  // Adjust `t` based on withdrawal frequency
  let t: number;
  if (withdrawalFrequency === "Monthly") {
    t = monthsPeriod / 12; // Time in years for Monthly
  } else if (withdrawalFrequency === "Quarterly") {
    t = monthsPeriod / 3; // Time in quarters for Quarterly
  } else if (withdrawalFrequency === "Half-yearly") {
    t = monthsPeriod / 6; // Time in half-years for Half-Yearly
  } else if (withdrawalFrequency === "Yearly") {
    t = monthsPeriod / 12; // Time in years for Yearly
  }

  return Math.round(
    totalInvestment * Math.pow(1 + returnRate / 100, t) -
      (monthlyWithdrawal *
        (Math.pow(1 + Math.pow(1 + returnRate / 100, 1 / n) - 1, t * n) - 1)) /
        (Math.pow(1 + returnRate / 100, 1 / n) - 1)
  );
};

export const detectLastPositiveMonth = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  timePeriod: number,
  withdrawalFrequency: WithdrawalFrequency,
  finalValue: number
) => {
  // If the final value is positive, clear the toast and do nothing
  if (finalValue >= 0) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }
    isToastShown = false;
    return;
  }

  // Cancel any pending toast if values change again
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
    isToastShown = false;
  }

  // Set a new timeout for the toast
  toastTimeout = setTimeout(() => {
    const totalMonths = timePeriod * 12;
    let lastPositiveMonth = 0;
    let lastPositiveValue = 0;

    for (let month = totalMonths - 1; month >= 1; month--) {
      const value = calculateMonthlyFinalValue(
        totalInvestment,
        monthlyWithdrawal,
        returnRate,
        month,
        withdrawalFrequency
      );

      if (value > 0) {
        lastPositiveMonth = month;
        lastPositiveValue = value;
        break;
      }
    }

    if (lastPositiveMonth > 0 && !isToastShown) {
      // Calculate the formatted date
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + lastPositiveMonth);
      const formattedDate = futureDate.toLocaleString("en-US", { month: "long", year: "numeric" });

      // Calculate years, quarters, or half-years based on withdrawal frequency
      const withdrawalsPerYear = {
        "Monthly": 12,
        "Quarterly": 4,
        "Half-yearly": 2,
        "Yearly": 1,
      };

      const monthsPerPeriod = withdrawalsPerYear[withdrawalFrequency];
      const periods = lastPositiveMonth / monthsPerPeriod; // Number of full periods
      const years = Math.floor(periods / 4);
      const quarters = periods % 4;

      // Create time string based on withdrawal frequency
      let timeString = "";
      if (withdrawalFrequency === "Monthly") {
        const years = Math.floor(lastPositiveMonth / 12);
        const months = lastPositiveMonth % 12;
        timeString = `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
          months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""
        }`.trim();
      } else if (withdrawalFrequency === "Quarterly") {
        timeString = `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
          quarters > 0 ? ` ${quarters} quarter${quarters > 1 ? "s" : ""}` : ""
        }`.trim();
      } else if (withdrawalFrequency === "Half-yearly") {
        timeString = `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
          quarters > 0 ? ` ${quarters * 2} half-year${quarters > 1 ? "s" : ""}` : ""
        }`.trim();
      } else if (withdrawalFrequency === "Yearly") {
        timeString = `${years} year${years > 1 ? "s" : ""}`;
      }

      // Show the toast with formatted date in the title and time string in the description
      toast({
        title: `Final Value ended by ${formattedDate}`,
        description: `After that ${timeString}, you'll stop receiving withdrawals.`,
        duration: 9000,
      });

      isToastShown = true;
    }
  }, 2000);
};
