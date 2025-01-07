import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SliderInput from "@/components/slider/SliderInput";
import { CurrencyType } from "@/components/CurrencySelector";
import { WithdrawalFrequency, withdrawalFrequencies } from "@/types/calculator";
import { useToast } from "@/components/ui/use-toast";

interface CalculatorFormProps {
  totalInvestment: number;
  setTotalInvestment: (value: number) => void;
  monthlyWithdrawal: number;
  setMonthlyWithdrawal: (value: number) => void;
  returnRate: number;
  setReturnRate: (value: number) => void;
  timePeriod: number;
  setTimePeriod: (value: number) => void;
  withdrawalPercentage: number;
  currency: CurrencyType;
  withdrawalFrequency: WithdrawalFrequency;
  setWithdrawalFrequency: (frequency: WithdrawalFrequency) => void;
}

const CalculatorForm = ({
  totalInvestment,
  setTotalInvestment,
  monthlyWithdrawal,
  setMonthlyWithdrawal,
  returnRate,
  setReturnRate,
  timePeriod,
  setTimePeriod,
  withdrawalPercentage,
  currency,
  withdrawalFrequency,
  setWithdrawalFrequency,
}: CalculatorFormProps) => {
  const { toast } = useToast();

  // Effect to update monthly withdrawal when total investment changes
  useEffect(() => {
    if (monthlyWithdrawal > totalInvestment) {
      setMonthlyWithdrawal(totalInvestment);
    }
  }, [totalInvestment, monthlyWithdrawal, setMonthlyWithdrawal]);

  const getWithdrawalLabel = () => {
    switch (withdrawalFrequency) {
      case "Weekly":
        return "Withdrawal per week";
      case "Monthly":
        return "Withdrawal per month";
      case "Quarterly":
        return "Withdrawal per quarter";
      case "Half-yearly":
        return "Withdrawal per half-year";
      case "Yearly":
        return "Withdrawal per year";
      default:
        return "Withdrawal per month";
    }
  };

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg p-6 space-y-6">
      <SliderInput
        label="Total investment"
        value={totalInvestment}
        onChange={setTotalInvestment}
        min={1000}
        max={500000000}
        step={1000}
        currency={currency}
        formatValue={true}
        maxLength={12}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg text-gray-700 dark:text-[#c1cbd6]">Withdrawal frequency</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {withdrawalFrequency} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-[#030c21]">
              {withdrawalFrequencies.map((frequency) => (
                <DropdownMenuItem
                  key={frequency}
                  onClick={() => {
                    setWithdrawalFrequency(frequency);
                    toast({
                      title: "Withdrawal frequency updated",
                      description: `Changed to ${frequency.toLowerCase()}`,
                    });
                  }}
                >
                  {frequency}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1">
          <SliderInput
            label={getWithdrawalLabel()}
            value={monthlyWithdrawal}
            onChange={setMonthlyWithdrawal}
            min={50}
            max={totalInvestment}
            step={50}
            currency={currency}
            formatValue={true}
            maxLength={12}
          />
          <p className="text-base text-muted-foreground ml-1 dark:text-[#c1cbd6]">{withdrawalPercentage}% of Total investment</p>
        </div>
      </div>

      <SliderInput
        label="Expected return rate (p.a)"
        value={returnRate}
        onChange={setReturnRate}
        min={1}
        max={50}
        step={0.1}
        suffix="%"
        maxLength={4}
      />

      <SliderInput
        label="Time period"
        value={timePeriod}
        onChange={setTimePeriod}
        min={1}
        max={50}
        step={1}
        suffix=" Yr"
        maxLength={2}
      />
    </div>
  );
};

export default CalculatorForm;