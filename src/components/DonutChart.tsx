import React, { useState, useEffect } from "react";
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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveIndex(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm font-semibold text-foreground">
            {formatCurrency(payload[0].value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={120}
            cy={120}
            innerRadius={56}
            outerRadius={84}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            stroke="transparent" // Set stroke to transparent to hide the border
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                stroke="transparent" // Set stroke to transparent for each cell
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
