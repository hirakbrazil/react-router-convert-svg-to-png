import { CurrencyType } from "../CurrencySelector";

export const formatNumberByCurrency = (value: number, currency: CurrencyType): string => {
  if (currency === "INR") {
    return value.toLocaleString('en-IN');
  }
  return value.toLocaleString();
};

export const getMaxLength = (label: string): number => {
  if (label.includes("Expected return rate")) return 2;
  if (label.includes("Time period")) return 2;
  return 12; // For monetary inputs
};

export const getCurrencySymbol = (currency?: CurrencyType): string => {
  if (!currency) return "";
  const symbols: { [key in CurrencyType]: string } = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    JPY: "¥",
    GBP: "£",
    CNY: "¥",
    AUD: "$",
    CAD: "$",
    CHF: "Fr",
    HKD: "$",
    SGD: "$"
  };
  return symbols[currency];
};