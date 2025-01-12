import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomCalendar = (props: any) => {
  return (
    <CalendarComponent
      {...props}
      components={{
        ChevronLeft,
        ChevronRight,
      }}
    />
  );
};

export default CustomCalendar;