import { Order } from "@/types";

/**
 * Valida la información de una orden antes de enviarla
 * @param order - Datos de la orden a validar
 * @returns Objeto con el resultado de la validación
 */
export const validateOrder = (
  order: Partial<Order>
): { isValid: boolean; errorMessage?: string } => {
  if (!order.instrument_id) {
    return { isValid: false, errorMessage: "Instrumento no seleccionado" };
  }

  if (!order.quantity || order.quantity <= 0) {
    return { isValid: false, errorMessage: "Cantidad debe ser mayor a 0" };
  }

  if (order.type === "LIMIT" && (!order.price || order.price <= 0)) {
    return { isValid: false, errorMessage: "Precio límite debe ser mayor a 0" };
  }

  return { isValid: true };
};

/**
 * Calcula la cantidad de acciones basado en un monto y precio
 * @param amount - Monto a invertir
 * @param price - Precio por acción
 * @returns Cantidad de acciones (redondeado hacia abajo)
 */
export const calculateQuantityFromAmount = (
  amount: number,
  price: number
): number => {
  if (!amount || !price || price <= 0) return 0;
  return Math.floor(amount / price);
};

/**
 * Calcula el monto total de una orden
 * @param quantity - Cantidad de acciones
 * @param price - Precio por acción
 * @returns Monto total de la orden
 */
export const calculateOrderAmount = (
  quantity: number,
  price: number
): number => {
  if (!quantity || !price) return 0;
  return quantity * price;
};

/**
 * Obtiene el estilo según el estado de la orden
 * @param status - Estado de la orden (FILLED, PENDING, REJECTED)
 * @returns Nombre del estilo correspondiente al estado
 */
export const getOrderStatusStyle = (
  status: "FILLED" | "PENDING" | "REJECTED" | string
): "statusFilled" | "statusPending" | "statusRejected" => {
  if (status === "FILLED") return "statusFilled";
  if (status === "PENDING") return "statusPending";
  return "statusRejected";
};

/**
 * Prepara los datos de la orden para enviarla al servidor
 * @param orderData - Datos parciales de la orden
 * @returns Objeto con los datos completos y formateados de la orden
 */
export const prepareOrderData = (orderData: {
  instrument_id: string | number;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: string | number;
  price?: string | number;
}): Order => {
  return {
    instrument_id: Number(orderData.instrument_id),
    side: orderData.side,
    type: orderData.type,
    quantity: Number(orderData.quantity),
    ...(orderData.type === "LIMIT" && {
      price: Number(orderData.price),
    }),
  };
};
