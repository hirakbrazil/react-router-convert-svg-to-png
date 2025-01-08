import React from "react";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface InfoTooltipProps {
  content: string;
}

const InfoTooltip = ({ content }: InfoTooltipProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Info className="h-4 w-4 inline-block ml-1 cursor-help text-muted-foreground hover:text-foreground transition-colors" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-3 text-sm">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};

export default InfoTooltip;