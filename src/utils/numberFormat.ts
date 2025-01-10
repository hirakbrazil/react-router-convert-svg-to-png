import { CurrencyType } from "@/components/CurrencySelector";

export const formatLargeNumber = (value: number, currency: CurrencyType): string => {
  const removeTrailingZero = (num: number): string => {
    // Remove trailing zero if the number is a whole number
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  };

  if (currency === "INR") {
    if (value >= 10000000) {
      const croreValue = value / 10000000;
      return `${removeTrailingZero(croreValue)} Crore`;
    } else if (value >= 100000) {
      return `${removeTrailingZero(value / 100000)} Lakh`;
    }
  } else {
    if (value >= 1000000000) {
      return `${removeTrailingZero(value / 1000000000)}B`;
    } else if (value >= 1000000) {
      return `${removeTrailingZero(value / 1000000)}M`;
    } else if (value >= 1000) {
      return `${removeTrailingZero(value / 1000)}K`;
    }
  }
  return value.toLocaleString(currency === "INR" ? "en-IN" : undefined);
};

export const shouldFormatAsLargeNumber = (value: number, isMaxValue: boolean): boolean => {
  return isMaxValue && value >= 10000000;
};
