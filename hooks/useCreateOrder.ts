import { useMutation } from "@tanstack/react-query";
import { Order, OrderResponse, CreateOrderOptions } from "@/types";
import tradingApi from "@/api/tradingApi";
import { useOrderHistoryStore } from "@/store/orderStore";
import { useLocalSearchParams } from "expo-router";

export function useCreateOrder(options?: CreateOrderOptions) {
  const { onSuccess, onError, instrumentData } = options || {};
  const addOrder = useOrderHistoryStore((state) => state.addOrder);
  const params = useLocalSearchParams<{
    name?: string;
    ticker?: string;
    last_price?: string;
  }>();

  const mutation = useMutation({
    mutationFn: async (orderData: Order): Promise<OrderResponse> => {
      return tradingApi.createOrder(orderData);
    },
    onSuccess: (data) => {
      addOrder(data, {
        instrumentName: instrumentData?.name || params?.name,
        ticker: instrumentData?.ticker || params?.ticker,
        price: instrumentData?.price || params?.last_price,
      });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error("Error creating order:", error);
      onError?.(error);
    },
  });

  return {
    createOrder: mutation.mutate,
    createOrderAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
