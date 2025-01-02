import { useState, useEffect } from 'react';

interface LastPositiveValues {
  totalInvestment: number;
  monthlyWithdrawal: number;
  returnRate: number;
  timePeriod: number;
  finalValue: number;
}

export const useLastPositiveValues = (
  currentValues: Omit<LastPositiveValues, 'finalValue'> & { finalValue: number }
) => {
  const [lastPositiveValues, setLastPositiveValues] = useState<LastPositiveValues>(currentValues);
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    if (currentValues.finalValue >= 0) {
      setLastPositiveValues(currentValues);
      setIsDisconnected(false);
    } else {
      setIsDisconnected(true);
    }
  }, [currentValues]);

  return {
    lastPositiveValues,
    isDisconnected,
  };
};