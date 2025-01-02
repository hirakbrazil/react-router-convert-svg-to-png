export const calculateExhaustionDate = (timePeriod: number): { month: string; year: number } => {
  const currentDate = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const exhaustionDate = new Date(currentDate);
  const years = Math.floor(timePeriod);
  const monthsToAdd = Math.round((timePeriod - years) * 12);
  
  exhaustionDate.setFullYear(currentDate.getFullYear() + years);
  exhaustionDate.setMonth(currentDate.getMonth() + monthsToAdd);
  
  return {
    month: months[exhaustionDate.getMonth()],
    year: exhaustionDate.getFullYear()
  };
};