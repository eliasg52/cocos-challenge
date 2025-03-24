import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Order } from "@/types";
import { useCreateOrder } from "./useCreateOrder";
import { validateOrder, prepareOrderData } from "@/utils";

interface OrderFormParams {
  id?: string;
  name?: string;
  ticker?: string;
  last_price?: string;
}

export function useOrderForm(params: OrderFormParams) {
  const { id, last_price } = params;

  // Form state
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>(last_price || "");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

  // Order submission hook
  const {
    createOrder,
    isLoading: isSubmitting,
    isSuccess,
    data: response,
    isError,
    error,
    reset: resetOrderState,
  } = useCreateOrder({
    onError: (err) => {
      Alert.alert("Error", err.message || "Failed to submit order");
    },
  });

  // Calculate quantity based on investment amount
  useEffect(() => {
    if (investmentAmount && last_price) {
      const calculatedQuantity = Math.floor(
        Number(investmentAmount) / Number(last_price)
      );
      setQuantity(calculatedQuantity.toString());
    }
  }, [investmentAmount, last_price]);

  // Handle form submission
  const handleSubmit = () => {
    if (!id || !quantity || (orderType === "LIMIT" && !price)) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const orderData = prepareOrderData({
      instrument_id: id,
      side,
      type: orderType,
      quantity,
      price: orderType === "LIMIT" ? price : undefined,
    });

    createOrder(orderData);
  };

  // Reset form to initial state
  const resetForm = () => {
    setSide("BUY");
    setOrderType("MARKET");
    setQuantity("");
    setPrice(last_price || "");
    setInvestmentAmount("");
    resetOrderState();
  };

  // Handle investment amount change
  const handleInvestmentAmountChange = (text: string) => {
    setInvestmentAmount(text);
  };

  // Handle quantity change
  const handleQuantityChange = (text: string) => {
    setQuantity(text);
    setInvestmentAmount("");
  };

  return {
    // Form state
    side,
    orderType,
    quantity,
    price,
    investmentAmount,

    // Form actions
    setSide,
    setOrderType,
    setPrice,
    handleQuantityChange,
    handleInvestmentAmountChange,

    // Submission state and actions
    isSubmitting,
    isSuccess,
    isError,
    error,
    response,
    handleSubmit,
    resetForm,
  };
}
