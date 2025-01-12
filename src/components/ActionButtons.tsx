import React from "react";
import { Button } from "@/components/ui/button";
import { WithdrawalFrequency } from "@/types/calculator";
import { CurrencyType } from "./CurrencySelector";
import { Share2 } from "lucide-react";
import ShareDialog from "./ShareDialog";

interface Values {
  totalInvestment: number;
  monthlyWithdrawal: number;
  returnRate: number;
  timePeriod: number;
  withdrawalFrequency: WithdrawalFrequency;
  showAdvancedOptions: boolean;
  adjustForInflation: boolean;
  inflationRate: number;
}

interface CurrentValues extends Values {
  currency: CurrencyType;
}

interface ActionButtonsProps {
  onReset: () => void;
  previousValues: Values;
  currentValues: CurrentValues;
  onRestore: (values: Values) => void;
}

const ActionButtons = ({
  onReset,
  previousValues,
  currentValues,
  onRestore,
}: ActionButtonsProps) => {
  const [showShareDialog, setShowShareDialog] = React.useState(false);

  const handleShare = () => {
    setShowShareDialog(true);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
      <Button variant="outline" onClick={() => onRestore(previousValues)}>
        Undo
      </Button>
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        values={currentValues}
      />
    </div>
  );
};

export default ActionButtons;