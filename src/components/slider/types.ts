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
  dynamicMin?: number;
  isLocked?: boolean;
  lockDirection?: 'increment' | 'decrement';
  currency?: CurrencyType;
  formatValue?: boolean;
  maxLength?: number;
}