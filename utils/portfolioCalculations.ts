import { PortfolioWithName } from "@/types";

/**
 * Calcula detalles financieros de un elemento del portfolio (valor total, ganancia y porcentaje)
 * @param item - Elemento del portfolio
 * @returns Objeto con valor total, ganancia y porcentaje de ganancia
 */
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

/**
 * Calcula el valor total de todo el portfolio
 * @param portfolio - Lista de elementos del portfolio
 * @returns Valor total del portfolio
 */
export const calculateTotalPortfolioValue = (
  portfolio: PortfolioWithName[]
): number => {
  return portfolio.reduce(
    (acc, item) => acc + item.quantity * item.last_price,
    0
  );
};

/**
 * Calcula la ganancia total del portfolio
 * @param portfolio - Lista de elementos del portfolio
 * @returns Ganancia total del portfolio
 */
export const calculateTotalPortfolioProfit = (
  portfolio: PortfolioWithName[]
): number => {
  return portfolio.reduce((acc, item) => {
    const { profit } = calculatePortfolioItemDetails(item);
    return acc + profit;
  }, 0);
};

/**
 * Determina si un valor es positivo, negativo o neutro
 * @param value - Valor a evaluar
 * @returns 'positive' | 'negative' | 'neutral'
 */
export const getValueType = (
  value: number
): "positive" | "negative" | "neutral" => {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
};
