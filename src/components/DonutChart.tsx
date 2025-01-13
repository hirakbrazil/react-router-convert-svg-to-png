import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { CurrencyType } from "./CurrencySelector";

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
    { name: "Total Investment", value: totalInvestment },
    { name: "Total Withdrawal", value: totalWithdrawal },
  ];

  const COLORS = ["#9b87f5", "#10B981"];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-card p-2 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm font-semibold text-foreground">
            {formatCurrency(payload[0].value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
};

export default DonutChart;