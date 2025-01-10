import { CurrencyType } from "@/components/CurrencySelector";

export const formatLargeNumber = (value: number, currency: CurrencyType): string => {
  if (currency === "INR") {
    if (value >= 10000000) {
      const croreValue = value / 10000000;
      return `${croreValue.toFixed(croreValue < 100 ? 1 : 0)} Crore`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(0)} Lakh`;
    }
  } else {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
  }
  return value.toLocaleString(currency === "INR" ? "en-IN" : undefined);
};

export const shouldFormatAsLargeNumber = (value: number, isMaxValue: boolean): boolean => {
  return isMaxValue && value >= 10000000;
};