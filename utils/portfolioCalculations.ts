import { PortfolioWithName } from "@/types";

export const calculatePortfolioItemDetails = (item: PortfolioWithName) => {
  const totalValue = item.quantity * item.last_price;
  const totalCost = item.quantity * item.avg_cost_price;
  const profit = totalValue - totalCost;
  const profitPercentage = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  return {
    totalValue,
    totalCost,
    profit,
    profitPercentage,
  };
};

export const calculateTotalPortfolioValue = (
  portfolio: PortfolioWithName[]
): number => {
  return portfolio.reduce(
    (acc, item) => acc + item.quantity * item.last_price,
    0
  );
};

export const calculateTotalPortfolioProfit = (
  portfolio: PortfolioWithName[]
): number => {
  return portfolio.reduce((acc, item) => {
    const { profit } = calculatePortfolioItemDetails(item);
    return acc + profit;
  }, 0);
};

export const getValueType = (
  value: number
): "positive" | "negative" | "neutral" => {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
};
