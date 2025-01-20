import { WithdrawalFrequency } from "@/types/calculator";
import { format, addMonths } from "date-fns";
import { toast } from "@/hooks/use-toast";

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
    "Yearly": 1
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

export const detectLastPositiveMonth = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  timePeriod: number,
  withdrawalFrequency: WithdrawalFrequency,
  finalValue: number
) => {
  // Add 2-second delay
  setTimeout(() => {
    // Only proceed if final value is negative
  if (finalValue >= 0) return;

  console.log("Starting background check for last positive month...");
    
    // Convert time period to months
    const totalMonths = timePeriod * 12;
    
    let lastPositiveMonth = 0;
    let lastPositiveValue = 0;

    // Start from total months and decrease until we find a positive value
    for (let month = totalMonths - 1; month >= 1; month--) {
      const value = calculateMonthlyFinalValue(
        totalInvestment,
        monthlyWithdrawal,
        returnRate,
        month,
        withdrawalFrequency
      );

      console.log(`Checking month ${month}, value: ${value}`);

      if (value > 0) {
        lastPositiveMonth = month;
        lastPositiveValue = value;
        break;
      }
    }

    if (lastPositiveMonth > 0) {
      // Calculate the date when value becomes negative
      const futureDate = addMonths(new Date(), lastPositiveMonth);
      const formattedDate = format(futureDate, "MMM yyyy");

      console.log(`Found last positive month: ${formattedDate}, value: ${lastPositiveValue}`);

      toast({
        title: `Final Value ended by ${formattedDate}`,
        description: "After that time, you'll stop receiving withdrawals.",
        duration: 8000,
      });
    }
  }, 2000);
};
