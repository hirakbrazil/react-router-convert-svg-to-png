import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumberByCurrency } from "@/components/slider/utils";
import { CurrencyType } from "@/components/CurrencySelector";
import { WithdrawalFrequency } from "@/types/calculator";
import { findLastPositiveMonth } from "@/utils/finalValueCalculator";
import { useToast } from "@/hooks/use-toast";
import DonutChart from "./DonutChart";

interface ResultCardProps {
  totalInvestment: number;
  monthlyWithdrawal: number;
  finalValue: number;
  currency: CurrencyType;
  withdrawalFrequency: WithdrawalFrequency;
  timePeriod: number;
}

const ResultCard = ({
  totalInvestment,
  monthlyWithdrawal,
  finalValue,
  currency,
  withdrawalFrequency,
  timePeriod,
}: ResultCardProps) => {
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only proceed if finalValue is negative
    if (finalValue < 0) {
      console.log("Final value is negative, setting up check timeout");
      
      // Set new timeout for 2 seconds
      timeoutRef.current = setTimeout(() => {
        console.log("Starting background calculation after delay");
        
        const result = findLastPositiveMonth(
          totalInvestment,
          monthlyWithdrawal,
          13, // Using default return rate
          timePeriod,
          withdrawalFrequency
        );

        if (result) {
          console.log(`Showing toast for last positive month: ${result.month}`);
          
          toast({
            title: `Final Value ended by ${result.month}`,
            description: "After that time, you'll stop receiving withdrawals.",
            duration: 8000,
          });
        }
      }, 2000);
    }

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [finalValue, totalInvestment, monthlyWithdrawal, timePeriod, withdrawalFrequency, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart
          totalInvestment={totalInvestment}
          monthlyWithdrawal={monthlyWithdrawal}
          finalValue={finalValue}
          currency={currency}
          withdrawalFrequency={withdrawalFrequency}
        />
        <div>
          <p>Total Investment: {formatNumberByCurrency(totalInvestment, currency)}</p>
          <p>Monthly Withdrawal: {formatNumberByCurrency(monthlyWithdrawal, currency)}</p>
          <p>Final Value: {formatNumberByCurrency(finalValue, currency)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
