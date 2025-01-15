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
  const [isTooltipLocked, setIsTooltipLocked] = useState<boolean>(false);
  
  const interactionPositionRef = useRef<{ x: number; y: number } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const data = [
    { name: "Total Withdrawal", value: totalWithdrawal },
    { name: "Total Investment", value: totalInvestment },
  ];

  const COLORS = [
    "#10B981",
    isDarkMode ? "#062b1f" : "#e6f5ef",
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

    const handleOutsideInteraction = (e: Event) => {
      if (!chartRef.current?.contains(e.target as Node)) {
        setIsTooltipLocked(false);
        setActiveIndex(null);
        interactionPositionRef.current = null;
      }
    };

    document.addEventListener('mousedown', handleOutsideInteraction);
    document.addEventListener('click', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousedown', handleOutsideInteraction);
      document.removeEventListener('click', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
    };
  }, []);

  useEffect(() => {
    if ((activeIndex !== null || isTooltipLocked) && interactionPositionRef.current) {
      const chartElement = document.querySelector('.recharts-wrapper');
      if (chartElement) {
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: interactionPositionRef.current.x,
          clientY: interactionPositionRef.current.y,
          bubbles: true
        });
        chartElement.dispatchEvent(mouseEvent);
      }
    }
  }, [totalInvestment, totalWithdrawal, activeIndex, isTooltipLocked]);

  const handleTouchStart = (event: React.TouchEvent, index: number) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent, index: number) => {
    event.preventDefault();
    
    if (touchStartRef.current) {
      const touch = event.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
      
      // If the touch movement is small enough, consider it a tap
      if (deltaX < 10 && deltaY < 10) {
        if (isTooltipLocked && activeIndex === index) {
          setIsTooltipLocked(false);
          setActiveIndex(null);
        } else {
          setIsTooltipLocked(true);
          setActiveIndex(index);
          interactionPositionRef.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    }
    
    touchStartRef.current = null;
  };

  const handleClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isTooltipLocked && activeIndex === index) {
      setIsTooltipLocked(false);
      setActiveIndex(null);
    } else {
      setIsTooltipLocked(true);
      setActiveIndex(index);
      interactionPositionRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handleHover = (event: React.MouseEvent, index: number) => {
    if (!isTooltipLocked) {
      setActiveIndex(index);
      interactionPositionRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handleHoverExit = () => {
    if (!isTooltipLocked) {
      setActiveIndex(null);
      interactionPositionRef.current = null;
    }
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
      <div 
        ref={chartRef}
        className="flex justify-center items-center"
      >
        <PieChart 
          width={260} 
          height={260}
          onClick={(e) => e.stopPropagation()}
        >
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
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
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
            active={activeIndex !== null || isTooltipLocked}
          />
        </PieChart>
      </div>
      <div className="flex justify-center gap-6">
        {data.map((entry, index) => (
          <div 
            key={entry.name} 
            className="flex items-center gap-2"
          >
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
