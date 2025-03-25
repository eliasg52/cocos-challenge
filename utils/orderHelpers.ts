import { Order } from "@/types";

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

export const calculateQuantityFromAmount = (
  amount: number,
  price: number
): number => {
  if (!amount || !price || price <= 0) return 0;
  return Math.floor(amount / price);
};

export const calculateOrderAmount = (
  quantity: number,
  price: number
): number => {
  if (!quantity || !price) return 0;
  return quantity * price;
};

export const getOrderStatusStyle = (
  status: "FILLED" | "PENDING" | "REJECTED" | string
): "statusFilled" | "statusPending" | "statusRejected" => {
  if (status === "FILLED") return "statusFilled";
  if (status === "PENDING") return "statusPending";
  return "statusRejected";
};

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
