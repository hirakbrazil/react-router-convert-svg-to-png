import { Button } from "@/components/ui/button";
import { RefreshCw, Share2, Undo } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import ShareDialog from "./ShareDialog";

interface ActionButtonsProps {
  onReset: () => void;
  previousValues: {
    totalInvestment: number;
    monthlyWithdrawal: number;
    returnRate: number;
    timePeriod: number;
  };
  currentValues: {
    totalInvestment: number;
    monthlyWithdrawal: number;
    returnRate: number;
    timePeriod: number;
  };
  onRestore: (values: {
    totalInvestment: number;
    monthlyWithdrawal: number;
    returnRate: number;
    timePeriod: number;
  }) => void;
}

const ActionButtons = ({
  onReset,
  previousValues,
  currentValues,
  onRestore,
}: ActionButtonsProps) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleReset = () => {
    // Store current values before reset
    const valuesToRestore = { ...currentValues };
    
    // Perform reset
    onReset();
    
    toast({
      title: "Reset Complete",
      description: "All values reset to default",
      duration: 7000,
      action: (
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            onRestore(valuesToRestore);
            toast({
              title: "Values Restored",
              description: "Previous values have been restored",
              duration: 5000,
            });
          }}
        >
          <Undo className="h-4 w-4" />
          Undo
        </Button>
      ),
    });
  };

  return (
    <div className="flex justify-center gap-4">
      <Button onClick={handleReset} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reset
      </Button>
      <Button
        onClick={() => setIsShareDialogOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        {...currentValues}
      />
    </div>
  );
};

export default ActionButtons;
