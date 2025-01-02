export const calculateFinalValue = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  timePeriod: number
): number => {
  const n = 12;
  const r = returnRate / (n * 100);
  const t = timePeriod;

  return Math.round(
    (totalInvestment * Math.pow((1 + returnRate / 100), t)) -
    (monthlyWithdrawal * (Math.pow((1 + (Math.pow((1 + returnRate / 100), (1 / n)) - 1)), (t * n)) - 1) /
      (Math.pow((1 + returnRate / 100), (1 / n)) - 1))
  );
};

export const getExhaustionDate = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  returnRate: number,
  currentTimePeriod: number
): { month: string; year: number } | null => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentDate = new Date();
  const startYear = currentDate.getFullYear();
  
  for (let month = 0; month < 12; month++) {
    const timePeriod = currentTimePeriod + month / 12;
    const value = calculateFinalValue(totalInvestment, monthlyWithdrawal, returnRate, timePeriod);
    
    if (value <= 0) {
      const exhaustionDate = new Date(startYear + Math.floor(timePeriod), month, 1);
      return {
        month: months[exhaustionDate.getMonth()],
        year: exhaustionDate.getFullYear()
      };
    }
  }
  
  return null;
};