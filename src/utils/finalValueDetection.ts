import { WithdrawalFrequency } from "@/types/calculator";
import { format, addMonths } from "date-fns";
import { toast, useToast } from "@/hooks/use-toast";

let toastTimeout: NodeJS.Timeout | null = null;
let isToastShown = false;
let activeToastId: string | null = null; // Store the current toast ID

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
  const t = monthsPeriod / 12;

  return Math.round(
    totalInvestment * Math.pow(1 + returnRate / 100, t) -
      (monthlyWithdrawal *
        (Math.pow(1 + Math.pow(1 + returnRate / 100, 1 / n) - 1, t * n) - 1)) /
        (Math.pow(1 + returnRate / 100, 1 / n) - 1)
  );
};

const getTimeString = (
  totalPeriod: number,
  withdrawalFrequency: WithdrawalFrequency
): string => {
  switch (withdrawalFrequency) {
    case "Quarterly": {
      const years = Math.floor(totalPeriod / 12);
      const quarters = Math.floor((totalPeriod % 12) / 3);
      return `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
        quarters > 0 ? ` ${quarters} quarter${quarters > 1 ? "s" : ""}` : ""
      }`.trim();
    }
    case "Half-yearly": {
      const years = Math.floor(totalPeriod / 12);
      const halfYears = Math.floor((totalPeriod % 12) / 6);
      return `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
        halfYears > 0 ? ` ${halfYears} half-year${halfYears > 1 ? "s" : ""}` : ""
      }`.trim();
    }
    case "Yearly": {
      const years = Math.floor(totalPeriod / 12);
      return `${years} year${years > 1 ? "s" : ""}`;
    }
    default: {
      const years = Math.floor(totalPeriod / 12);
      const months = totalPeriod % 12;
      return `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
        months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""
      }`.trim();
    }
  }
};

const getPeriodStep = (withdrawalFrequency: WithdrawalFrequency): number => {
  switch (withdrawalFrequency) {
    case "Quarterly":
      return 3;
    case "Half-yearly":
      return 6;
    case "Yearly":
      return 12;
    default:
      return 1;
  }
};

export const detectLastPositiveMonth = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  timePeriod: number,
  withdrawalFrequency: WithdrawalFrequency,
  finalValue: number
) => {
  const { dismiss } = useToast(); // Use dismiss to manage toast notifications

  // Dismiss the toast if finalValue becomes positive
  if (finalValue >= 0) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }
    if (activeToastId) {
      dismiss(activeToastId); // Dismiss the active toast
      activeToastId = null;
    }
    isToastShown = false;
    return;
  }

  // Reset any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
    isToastShown = false;
  }

  // Delay showing the toast by 2 seconds
  toastTimeout = setTimeout(() => {
    const totalMonths = timePeriod * 12;
    const periodStep = getPeriodStep(withdrawalFrequency);

    let lastPositiveMonth = 0;
    let lastPositiveValue = 0;

    // Calculate the last positive month
    for (let month = totalMonths - periodStep; month >= 1; month -= periodStep) {
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

    // Show the toast if a positive month is found and no toast is shown
    if (lastPositiveMonth > 0 && !isToastShown) {
      const futureDate = addMonths(new Date(), lastPositiveMonth);
      const formattedDate = format(futureDate, "MMMM, yyyy");
      const timeString = getTimeString(lastPositiveMonth, withdrawalFrequency);

      const { id } = toast({
        title: `Final Value ended by ${formattedDate}`,
        description: `After that ${timeString}, you'll stop receiving withdrawals.`,
        duration: 10000,
      });

      activeToastId = id; // Store the toast ID
      isToastShown = true;
    }
  }, 2000);
};
