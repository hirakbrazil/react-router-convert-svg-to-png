import { WithdrawalFrequency } from "@/types/calculator";
import { format, addMonths } from "date-fns";
import { toast } from "@/hooks/use-toast";

let toastTimeout: NodeJS.Timeout | null = null; // Track the timeout
let isToastShown = false; // Track if a toast has been shown

const calculateFinalValue = (
  totalInvestment: number,
  withdrawalAmount: number,
  returnRate: number,
  periods: number, // total periods based on selected frequency
  frequency: WithdrawalFrequency
): number => {
  const periodsPerYear = {
    "Monthly": 12,
    "Quarterly": 4,
    "Half-yearly": 2,
    "Yearly": 1,
  };

  const n = periodsPerYear[frequency]; // Determine number of withdrawals per year
  const r = returnRate / (n * 100); // Periodic rate of return (adjusted based on frequency)
  const t = periods / n; // Time in years for the given number of periods

  // Monthly calculation (or equivalent for other frequencies)
  return Math.round(
    totalInvestment * Math.pow(1 + returnRate / 100, t) -
      (withdrawalAmount *
        (Math.pow(1 + Math.pow(1 + returnRate / 100, 1 / n) - 1, t * n) - 1)) /
        (Math.pow(1 + returnRate / 100, 1 / n) - 1)
  );
};

export const detectLastPositivePeriod = (
  totalInvestment: number,
  withdrawalAmount: number,
  returnRate: number,
  timePeriod: number, // Time period in years
  frequency: WithdrawalFrequency, // User selected frequency
  finalValue: number // Current final value
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
    // Adjust total periods based on frequency
    let totalPeriods: number;

    if (frequency === "Monthly") {
      totalPeriods = timePeriod * 12; // Convert time period in years to months
    } else if (frequency === "Quarterly") {
      totalPeriods = timePeriod * 4; // Convert time period in years to quarters
    } else if (frequency === "Half-yearly") {
      totalPeriods = timePeriod * 2; // Convert time period in years to half-years
    } else {
      totalPeriods = timePeriod; // For Yearly, total periods are the same as years
    }

    let lastPositivePeriod = 0;
    let lastPositiveValue = 0;

    for (let period = totalPeriods - 1; period >= 1; period--) {
      const value = calculateFinalValue(
        totalInvestment,
        withdrawalAmount,
        returnRate,
        period,
        frequency
      );

      if (value > 0) {
        lastPositivePeriod = period;
        lastPositiveValue = value;
        break;
      }
    }

    if (lastPositivePeriod > 0 && !isToastShown) {
      // Calculate years, quarters, half-years, or months based on frequency
      let timeString = '';
      const years = Math.floor(lastPositivePeriod / 12);
      const months = lastPositivePeriod % 12;
      const quarters = Math.floor(lastPositivePeriod / 3);
      const halfYears = Math.floor(lastPositivePeriod / 6);

      if (frequency === "Yearly") {
        // For Yearly, show in years
        timeString = `${years} year${years > 1 ? "s" : ""}`;
      } else if (frequency === "Quarterly") {
        // For Quarterly, show in years and quarters
        const remainderMonths = lastPositivePeriod % 12;
        const additionalQuarter = Math.ceil(remainderMonths / 3); 
        timeString = `${years > 0 ? `${years} year${years > 1 ? "s" : ""} ` : ""}${additionalQuarter} quarter${additionalQuarter > 1 ? "s" : ""}`;
      } else if (frequency === "Half-yearly") {
        // For Half-yearly, show in years and half-years
        const remainderMonths = lastPositivePeriod % 12;
        const additionalHalfYear = Math.ceil(remainderMonths / 6); 
        timeString = `${years > 0 ? `${years} year${years > 1 ? "s" : ""} ` : ""}${additionalHalfYear} half-year${additionalHalfYear > 1 ? "s" : ""}`;
      } else {
        // For Monthly, show in years and months
        timeString = `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
          months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""
        }`.trim();
      }

      // Format the future date based on the final period
      const futureDate = addMonths(new Date(), lastPositivePeriod);
      const formattedDate = format(futureDate, "MMMM, yyyy");

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
