import { useMutation } from "@tanstack/react-query";
import { Order, OrderResponse } from "@/types";
import tradingApi from "@/api/tradingApi";

interface CreateOrderOptions {
  onSuccess?: (data: OrderResponse) => void;
  onError?: (error: Error) => void;
}

export function useCreateOrder(options?: CreateOrderOptions) {
  const { onSuccess, onError } = options || {};

  const mutation = useMutation({
    mutationFn: async (orderData: Order): Promise<OrderResponse> => {
      return tradingApi.createOrder(orderData);
    },
    onSuccess: (data) => {
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
