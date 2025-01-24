import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WithdrawalFrequency, withdrawalFrequencies } from "@/types/calculator";
import { useToast } from "@/components/ui/use-toast";
import InfoTooltip from "../InfoTooltip";

interface WithdrawalFrequencySelectorProps {
  withdrawalFrequency: WithdrawalFrequency;
  setWithdrawalFrequency: (frequency: WithdrawalFrequency) => void;
}

const WithdrawalFrequencySelector = ({
  withdrawalFrequency,
  setWithdrawalFrequency,
}: WithdrawalFrequencySelectorProps) => {
  const { toast } = useToast();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
            Withdrawal
          </span>
          <span className="text-lg text-gray-700 dark:text-[#c1cbd6]">
          frequency
          </span>
          <InfoTooltip content="If you want to receive withdrawals every month, like a salary or pension, select Monthly. Quarterly means receiving withdrawals once every 3 months. Half-yearly means receiving 2 withdrawals per year, or one every 6 months. Yearly/Annually means receiving 1 withdrawal per year." />
        </div>
</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-[#030c21]">
            {withdrawalFrequency} <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-[#030c21] border-border">
          {withdrawalFrequencies.map((frequency) => (
            <DropdownMenuItem
              key={frequency}
              onClick={() => {
                setWithdrawalFrequency(frequency);
                toast({
                  title: "Withdrawal frequency updated",
                  description: `Changed to ${frequency}`,
                  duration: 5000,
                });
              }}
            >
              {frequency}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WithdrawalFrequencySelector;
