import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EnhancedOrderResponse, OrderHistoryState } from "@/types";

const customStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await AsyncStorage.getItem(name);
    return value;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

const migrate = (persistedState: any, version: number): OrderHistoryState => {
  if (version === 0) {
    return {
      ...persistedState,
      orders: persistedState.orders.map((order: EnhancedOrderResponse) => ({
        ...order,
        quantity: order.quantity || 0,
        type: order.type || "MARKET",
        side: order.side || "BUY",
        timestamp: order.timestamp
          ? new Date(order.timestamp).toISOString()
          : new Date().toISOString(),
      })),
    };
  }
  return persistedState as OrderHistoryState;
};

export const useOrderHistoryStore = create<OrderHistoryState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "order-history-storage",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({ orders: state.orders }),
      version: 1,
      migrate,
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Error al cargar los datos persistidos:", error);
          } else {
            if (state && state.orders) {
              state.orders = state.orders.map((order) => ({
                ...order,
                timestamp: order.timestamp
                  ? new Date(order.timestamp)
                  : new Date(),
              }));
            }
          }
        };
      },
    }
  )
);
