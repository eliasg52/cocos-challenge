import { create } from "zustand";
import { OrderResponse } from "@/types";

export interface EnhancedOrderResponse extends OrderResponse {
  instrumentName?: string;
  ticker?: string;
  price?: string;
  timestamp?: Date;
}

interface OrderHistoryState {
  orders: EnhancedOrderResponse[];
  addOrder: (
    order: OrderResponse,
    metadata?: {
      instrumentName?: string;
      ticker?: string;
      price?: string;
    }
  ) => void;
  clearOrders: () => void;
}

export const useOrderHistoryStore = create<OrderHistoryState>((set) => ({
  orders: [],
  addOrder: (order, metadata) =>
    set((state) => ({
      orders: [
        {
          ...order,
          ...metadata,
          timestamp: new Date(),
        },
        ...state.orders,
      ],
    })),
  clearOrders: () => set({ orders: [] }),
}));
