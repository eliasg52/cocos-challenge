export const calculateReturn = (
  lastPrice: number,
  closePrice: number
): string => {
  if (!closePrice || closePrice === 0) return "0.00%";

  const returnPercentage = ((lastPrice - closePrice) / closePrice) * 100;
  return `${returnPercentage.toFixed(2)}%`;
};

export const formatCurrency = (
  value: number,
  currency: string = "ARS"
): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};

export const getReturnType = (
  lastPrice: number,
  closePrice: number
): "positive" | "negative" | "neutral" => {
  if (lastPrice > closePrice) return "positive";
  if (lastPrice < closePrice) return "negative";
  return "neutral";
};
