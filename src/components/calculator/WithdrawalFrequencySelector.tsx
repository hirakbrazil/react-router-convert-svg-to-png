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
      <label className="text-lg text-gray-700 dark:text-[#c1cbd6]">
        Withdrawal frequency
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#030c21]">
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