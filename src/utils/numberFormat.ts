import { CurrencyType } from "@/components/CurrencySelector";

export const formatLargeNumber = (value: number, currency: CurrencyType): string => {
  const removeTrailingZero = (num: number, currency: CurrencyType): string => {
    // For INR, use 2 decimal places, else use 1 decimal place
    return currency === "INR" ? num.toFixed(2) : num.toFixed(1);
  };

  if (currency === "INR") {
    if (value >= 10000000) {
      const croreValue = value / 10000000;
      return `${removeTrailingZero(croreValue, currency)} Crore`;
    } else if (value >= 100000) {
      return `${removeTrailingZero(value / 100000, currency)} Lakh`;
    }
  } else {
    if (value >= 1000000000) {
      return `${removeTrailingZero(value / 1000000000, currency)}B`;
    } else if (value >= 1000000) {
      return `${removeTrailingZero(value / 1000000, currency)}M`;
    } else if (value >= 1000) {
      return `${removeTrailingZero(value / 1000, currency)}K`;
    }
  }
  return value.toLocaleString(currency === "INR" ? "en-IN" : undefined);
};

export const shouldFormatAsLargeNumber = (value: number, isMaxValue: boolean): boolean => {
  return isMaxValue && value >= 10000000;
};
