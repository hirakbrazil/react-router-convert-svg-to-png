import { CurrencyType } from "@/components/CurrencySelector";

export interface SliderInputProps {
  label: string | JSX.Element;
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
  maxLength?: number;
}