import { OrderResponse } from "./models";

export type EnhancedOrderResponse = OrderResponse & {
  instrumentName?: string;
  ticker?: string;
  price?: string;
  timestamp?: Date | string;
  quantity?: number;
  type?: string;
  side?: string;
};

export type OrderHistoryState = {
  orders: EnhancedOrderResponse[];
  addOrder: (
    order: OrderResponse,
    metadata?: {
      instrumentName?: string;
      ticker?: string;
      price?: string;
      quantity?: number;
      type?: string;
      side?: string;
    }
  ) => void;
  clearOrders: () => void;
};
