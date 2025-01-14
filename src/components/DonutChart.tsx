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
  const chartRef = useRef<HTMLDivElement | null>(null);

  const data = [
    { name: "Total Withdrawal", value: totalWithdrawal },
    { name: "Total Investment", value: totalInvestment },
  ];

  // Use CSS variables to handle dark mode colors
  const isDarkMode = document.documentElement.classList.contains('dark');
  const COLORS = [
    "#10B981", // Primary color for Total Withdrawal
    isDarkMode ? "#062b1f" : "#e6f5ef", // Dark/Light version for Total Investment
  ];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background dark:bg-card p-2 rounded-lg shadow-lg border border-border">
          <p className="text-base font-medium text-foreground">{payload[0].name}</p>
          <p className="text-base font-semibold text-foreground">
            {formatCurrency(payload[0].value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Handle clicks outside the chart to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chartRef.current && !chartRef.current.contains(event.target as Node)) {
        setActiveIndex(null); // Close the tooltip when clicking outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-4" ref={chartRef}>
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
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
          />
        </PieChart>
      </div>
      <div className="flex justify-center gap-6">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <Circle
              size={12}
              fill={COLORS[index]}
              className="text-transparent"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
