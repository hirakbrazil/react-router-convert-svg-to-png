import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Link, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CurrencyType } from "./CurrencySelector";
import { SIPFrequency } from "@/types/calculator";
import { StepUpFrequency } from "./calculator/StepUpSIPSettings";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monthlyInvestment: number;
  returnRate: number;
  timePeriod: number;
  currency: CurrencyType;
  sipFrequency: SIPFrequency;
  advancedOptionsEnabled?: boolean;
  stepUpEnabled?: boolean;
  stepUpFrequency?: StepUpFrequency;
  stepUpPercentage?: number;
  initialInvestmentEnabled?: boolean;
  initialInvestmentAmount?: number;
  inflationEnabled?: boolean;
  inflationRate?: number;
}

const ShareDialog = ({
  open,
  onOpenChange,
  monthlyInvestment,
  returnRate,
  timePeriod,
  currency,
  sipFrequency,
  advancedOptionsEnabled,
  stepUpEnabled,
  stepUpFrequency,
  stepUpPercentage,
  initialInvestmentEnabled,
  initialInvestmentAmount,
  inflationEnabled,
  inflationRate,
}: ShareDialogProps) => {
  const baseUrl = "https://sip-calculator.mutualfundjournal.in/";

  const generateShareableLink = (includeParams: boolean = true) => {
    if (!includeParams) return baseUrl;
    
    const params = new URLSearchParams({
      mi: monthlyInvestment.toString(),
      cs: currency,
      rr: returnRate.toString(),
      tp: timePeriod.toString(),
      sf: sipFrequency,
    });

    if (advancedOptionsEnabled) {
      params.append("ao", "true");
      if (stepUpEnabled) {
        params.append("su", "true");
        params.append("suf", stepUpFrequency || "Yearly");
        params.append("sup", stepUpPercentage?.toString() || "10");
      }
      if (initialInvestmentEnabled) {
        params.append("iie", "true");
        params.append("iia", initialInvestmentAmount?.toString() || "500000");
      }
      if (inflationEnabled) {
        params.append("inf", "true");
        params.append("ir", inflationRate?.toString() || "6");
      }
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SIP Calculator",
          text: "SIP Calculator - Systematic Investment Plan Calculator",
          url: generateShareableLink(true),
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateShareableLink(false));
    toast({
      title: "Link copied to clipboard",
      duration: 5000,
    });
  };

  const handleShareCalculation = () => {
    navigator.clipboard.writeText(generateShareableLink(true));
    toast({
      title: "Link copied to clipboard",
      description: "Share this link to show your current calculation",
      duration: 7000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-11/12 rounded-xl">
        <DialogHeader>
          <DialogTitle>Sharing is caring 🥰</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {navigator.share && (
            <Button onClick={handleShare} className="w-full" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          )}
          <Button onClick={handleCopyLink} className="w-full" variant="outline">
            <Link className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button onClick={handleShareCalculation} className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            Share Current Calculation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;