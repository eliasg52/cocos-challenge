import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useCreateOrder } from "./useCreateOrder";
import { prepareOrderData } from "@/utils";

interface OrderFormParams {
  id?: string;
  name?: string;
  ticker?: string;
  last_price?: string;
}

export function useOrderForm(params: OrderFormParams) {
  const { id, last_price } = params;

  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>(last_price || "");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

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

  useEffect(() => {
    if (investmentAmount && last_price) {
      const calculatedQuantity = Math.floor(
        Number(investmentAmount) / Number(last_price)
      );
      setQuantity(calculatedQuantity.toString());
    }
  }, [investmentAmount, last_price]);

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

  const resetForm = () => {
    setSide("BUY");
    setOrderType("MARKET");
    setQuantity("");
    setPrice(last_price || "");
    setInvestmentAmount("");
    resetOrderState();
  };

  const handleInvestmentAmountChange = (text: string) => {
    setInvestmentAmount(text);
  };

  const handleQuantityChange = (text: string) => {
    setQuantity(text);
    setInvestmentAmount("");
  };

  return {
    side,
    orderType,
    quantity,
    price,
    investmentAmount,

    setSide,
    setOrderType,
    setPrice,
    handleQuantityChange,
    handleInvestmentAmountChange,

    isSubmitting,
    isSuccess,
    isError,
    error,
    response,
    handleSubmit,
    resetForm,
  };
}
