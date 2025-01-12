import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WithdrawalFrequency } from "@/types/calculator";
import { CurrencyType } from "./CurrencySelector";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: {
    totalInvestment: number;
    monthlyWithdrawal: number;
    returnRate: number;
    timePeriod: number;
    withdrawalFrequency: WithdrawalFrequency;
    currency: CurrencyType;
    showAdvancedOptions: boolean;
    adjustForInflation: boolean;
    inflationRate: number;
  };
}

const ShareDialog = ({ open, onOpenChange, values }: ShareDialogProps) => {
  const generateShareableLink = () => {
    const params = new URLSearchParams();
    params.set("ti", values.totalInvestment.toString());
    
    switch (values.withdrawalFrequency) {
      case "Monthly":
        params.set("mw", values.monthlyWithdrawal.toString());
        break;
      case "Quarterly":
        params.set("qw", values.monthlyWithdrawal.toString());
        break;
      case "Half-yearly":
        params.set("hyw", values.monthlyWithdrawal.toString());
        break;
      case "Yearly":
        params.set("yw", values.monthlyWithdrawal.toString());
        break;
    }
    
    params.set("rr", values.returnRate.toString());
    params.set("tp", values.timePeriod.toString());
    params.set("cs", values.currency);

    if (values.showAdvancedOptions) {
      params.set("ao", "1");
      if (values.adjustForInflation) {
        params.set("ai", "1");
        params.set("ir", values.inflationRate.toString());
      }
    }

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateShareableLink());
      console.log("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Calculator Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg break-all">
            {generateShareableLink()}
          </div>
          <button
            onClick={handleCopy}
            className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/90"
          >
            Copy Link
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;