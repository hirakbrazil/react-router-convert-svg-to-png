import { CurrencyType } from "../CurrencySelector";

export interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  dynamicMax?: number;
  isLocked?: boolean;
  lockDirection?: 'increment' | 'decrement';
  currency?: CurrencyType;
  formatValue?: boolean;
}