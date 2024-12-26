import React, { useState, useEffect } from "react";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";

const Index = () => {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
  const [returnRate, setReturnRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(5);
  const [finalValue, setFinalValue] = useState(0);

  const calculateSWP = () => {
    let currentValue = totalInvestment;
    const monthlyRate = returnRate / 12 / 100;
    const totalMonths = timePeriod * 12;
    
    for (let i = 0; i < totalMonths; i++) {
      // First calculate returns on beginning balance
      currentValue = currentValue * (1 + monthlyRate);
      // Then subtract monthly withdrawal
      if (currentValue >= monthlyWithdrawal) {
        currentValue -= monthlyWithdrawal;
      } else {
        currentValue = 0;
        break;
      }
    }

    return Math.max(0, Math.round(currentValue));
  };

  useEffect(() => {
    const result = calculateSWP();
    setFinalValue(result);
  }, [totalInvestment, monthlyWithdrawal, returnRate, timePeriod]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            SWP Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Calculate your Systematic Withdrawal Plan
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <SliderInput
            label="Total investment"
            value={totalInvestment}
            onChange={setTotalInvestment}
            min={100000}
            max={10000000}
            step={10000}
            prefix="₹"
          />

          <SliderInput
            label="Withdrawal per month"
            value={monthlyWithdrawal}
            onChange={setMonthlyWithdrawal}
            min={1000}
            max={100000}
            step={1000}
            prefix="₹"
          />

          <SliderInput
            label="Expected return rate (p.a)"
            value={returnRate}
            onChange={setReturnRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
          />

          <SliderInput
            label="Time period"
            value={timePeriod}
            onChange={setTimePeriod}
            min={1}
            max={30}
            step={1}
            suffix=" Yr"
          />
        </div>

        <ResultCard
          totalInvestment={totalInvestment}
          totalWithdrawal={monthlyWithdrawal * timePeriod * 12}
          finalValue={finalValue}
        />
      </div>
    </div>
  );
};

export default Index;