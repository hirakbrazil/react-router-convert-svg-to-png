import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { CurrencyType } from "./CurrencySelector";
import { Circle } from "lucide-react";

interface DonutChartProps {
  totalInvestment: number;
  totalWithdrawal: number;
  currency: CurrencyType;
  formatCurrency: (value: number, currency: CurrencyType) => string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  totalInvestment,
  totalWithdrawal,
  currency,
  formatCurrency,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );
  
  // Create a ref to store the current mouse position
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

  const data = [
    { name: "Total Withdrawal", value: totalWithdrawal },
    { name: "Total Investment", value: totalInvestment },
  ];

  const COLORS = [
    "#10B981", // Primary color for Total Withdrawal
    isDarkMode ? "#062b1f" : "#e6f5ef", // Dark/Light version for Total Investment
  ];

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(() => handleThemeChange());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleOutsideInteraction = () => {
      setActiveIndex(null);
      mousePositionRef.current = null;
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'wheel'];
    events.forEach((event) => {
      document.addEventListener(event, handleOutsideInteraction);
    });

    return () => {
      observer.disconnect();
      events.forEach((event) => {
        document.removeEventListener(event, handleOutsideInteraction);
      });
    };
  }, []);

  // Effect to handle data updates while tooltip is active
  useEffect(() => {
    if (activeIndex !== null && mousePositionRef.current) {
      // Find and trigger the tooltip update by simulating a mouse event
      const chartElement = document.querySelector('.recharts-wrapper');
      if (chartElement) {
        const event = new MouseEvent('mousemove', {
          clientX: mousePositionRef.current.x,
          clientY: mousePositionRef.current.y,
          bubbles: true
        });
        chartElement.dispatchEvent(event);
      }
    }
  }, [totalInvestment, totalWithdrawal, activeIndex]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    // Store the current mouse position when entering a pie segment
    const event = _ as React.MouseEvent;
    mousePositionRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    mousePositionRef.current = null;
  };

  const renderTooltipContent = (props: any) => {
    const { payload } = props;
    if (payload && payload.length > 0) {
      const data = payload[0];
      return (
        <div
          className="bg-background dark:bg-card p-3 rounded-lg shadow-lg border border-border"
          style={{
            backgroundColor: isDarkMode ? "#030c21" : "#fff",
            border: `1px solid ${isDarkMode ? "#122040" : "#e2e8f0"}`,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: data.payload.fill }}
            />
            <p className="text-base font-medium text-foreground">
              {data.name}
            </p>
          </div>
          <p className="text-base font-semibold text-foreground pl-5">
            {formatCurrency(data.value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <PieChart width={260} height={260}>
          <Pie
            data={data}
            cx={125}
            cy={130}
            innerRadius={75}
            outerRadius={115}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            stroke="transparent"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                stroke="transparent"
                style={{ outline: "none" }}
              />
            ))}
          </Pie>
          <Tooltip
            content={renderTooltipContent}
            wrapperStyle={{ outline: "none" }}
          />
        </PieChart>
      </div>
      <div className="flex justify-center gap-6">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <Circle
              size={16}
              fill={COLORS[index]}
              className="text-transparent"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
