import React from "react";

interface ResultCardProps {
  totalInvestment: number;
  totalWithdrawal: number;
  finalValue: number;
}

const ResultCard = ({
  totalInvestment,
  totalWithdrawal,
  finalValue,
}: ResultCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total investment</span>
        <span className="text-xl font-semibold">
          ₹{totalInvestment.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total withdrawal</span>
        <span className="text-xl font-semibold">
          ₹{totalWithdrawal.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Final value</span>
        <span className="text-xl font-semibold">₹{finalValue.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ResultCard;