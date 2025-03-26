import { useMutation } from "@tanstack/react-query";
import { Order, OrderResponse, CreateOrderOptions } from "@/types";
import tradingApi from "@/api/tradingApi";
import { useOrderHistoryStore } from "@/store/orderStore";
import { useLocalSearchParams } from "expo-router";
import { formatCurrency } from "@/utils";

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
    onSuccess: (data, variables) => {
      addOrder(data, {
        instrumentName: instrumentData?.name || params?.name,
        ticker: instrumentData?.ticker || params?.ticker,
        price: params?.last_price
          ? formatCurrency(Number(params.last_price))
          : instrumentData?.price,
        quantity: variables.quantity,
        type: variables.type,
        side: variables.side,
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
