import { CurrencyType } from "../CurrencySelector";

export const formatNumberByCurrency = (value: number, currency: CurrencyType): string => {
  if (currency === "INR") {
    return value.toLocaleString('en-IN');
  }
  return value.toLocaleString();
};

export const getCurrencySymbol = (currency?: CurrencyType): string => {
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
  return currency ? symbols[currency] : "";
};