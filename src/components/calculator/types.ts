import { CurrencyType } from "../CurrencySelector";

export interface CalculatorFormProps {
  totalInvestment: number;
  setTotalInvestment: (value: number) => void;
  monthlyWithdrawal: number;
  setMonthlyWithdrawal: (value: number) => void;
  returnRate: number;
  setReturnRate: (value: number) => void;
  timePeriod: number;
  setTimePeriod: (value: number) => void;
  withdrawalPercentage: number;
  currency: CurrencyType;
  finalValue: number;
}