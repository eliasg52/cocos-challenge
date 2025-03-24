/**
 * Calcula el porcentaje de retorno entre el último precio y el precio de cierre
 * @param lastPrice - Último precio del instrumento
 * @param closePrice - Precio de cierre del instrumento
 * @returns Porcentaje de retorno formateado con 2 decimales
 */
export const calculateReturn = (
  lastPrice: number,
  closePrice: number
): string => {
  if (!closePrice || closePrice === 0) return "0.00%";

  const returnPercentage = ((lastPrice - closePrice) / closePrice) * 100;
  return `${returnPercentage.toFixed(2)}%`;
};

/**
 * Formatea un valor monetario con el símbolo de moneda
 * @param value - Valor monetario a formatear
 * @param currency - Código de moneda (default ARS - pesos argentinos)
 * @returns Valor formateado como string
 */
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

/**
 * Determina si un retorno es positivo, negativo o neutro
 * @param lastPrice - Último precio del instrumento
 * @param closePrice - Precio de cierre del instrumento
 * @returns 'positive' | 'negative' | 'neutral'
 */
export const getReturnType = (
  lastPrice: number,
  closePrice: number
): "positive" | "negative" | "neutral" => {
  if (lastPrice > closePrice) return "positive";
  if (lastPrice < closePrice) return "negative";
  return "neutral";
};
