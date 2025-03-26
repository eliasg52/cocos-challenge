import { useState, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import { useCreateOrder } from "./useCreateOrder";
import { prepareOrderData } from "@/utils";
import { OrderFormParams, ValidationResult, InputMode } from "@/types";

export function useOrderForm(params: OrderFormParams) {
  const { id, last_price } = params;

  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>(last_price || "");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

  const [inputMode, setInputMode] = useState<InputMode>("quantity");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    quantity: false,
    price: false,
    investmentAmount: false,
  });

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

  const calculatedShares = useMemo(() => {
    if (
      !investmentAmount ||
      !last_price ||
      isNaN(Number(investmentAmount)) ||
      isNaN(Number(last_price))
    ) {
      return 0;
    }
    return Math.floor(Number(investmentAmount) / Number(last_price));
  }, [investmentAmount, last_price]);

  const calculatedInvestment = useMemo(() => {
    if (
      !quantity ||
      !last_price ||
      isNaN(Number(quantity)) ||
      isNaN(Number(last_price))
    ) {
      return 0;
    }
    return Number(quantity) * Number(last_price);
  }, [quantity, last_price]);

  useEffect(() => {
    if (
      inputMode === "investment" &&
      investmentAmount &&
      last_price &&
      !isNaN(Number(investmentAmount))
    ) {
      const newQty = Math.floor(Number(investmentAmount) / Number(last_price));
      if (newQty >= 0) {
        setQuantity(newQty.toString());
        setTouched((prev) => ({ ...prev, quantity: true }));
      }
    }
  }, [investmentAmount, last_price, inputMode]);

  useEffect(() => {
    if (
      inputMode === "quantity" &&
      quantity &&
      last_price &&
      !isNaN(Number(quantity))
    ) {
      const newInvestment = Number(quantity) * Number(last_price);
      if (newInvestment >= 0) {
        setInvestmentAmount(newInvestment.toFixed(2));
        setTouched((prev) => ({ ...prev, investmentAmount: true }));
      }
    }
  }, [quantity, last_price, inputMode]);

  const validateForm = (): ValidationResult => {
    const newErrors: { [key: string]: string } = {};

    if (!quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(Number(quantity))) {
      newErrors.quantity = "Quantity must be a number";
    } else if (Number(quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    } else if (!Number.isInteger(Number(quantity))) {
      newErrors.quantity = "Quantity must be a whole number";
    }

    if (orderType === "LIMIT") {
      if (!price) {
        newErrors.price = "Limit price is required";
      } else if (isNaN(Number(price))) {
        newErrors.price = "Price must be a number";
      } else if (Number(price) <= 0) {
        newErrors.price = "Price must be greater than 0";
      }
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  useEffect(() => {
    if (touched.quantity || touched.price || touched.investmentAmount) {
      validateForm();
    }
  }, [quantity, price, investmentAmount, orderType, touched]);

  const handleSubmit = () => {
    setTouched({
      quantity: true,
      price: true,
      investmentAmount: true,
    });

    const { isValid, errors } = validateForm();

    if (!id) {
      Alert.alert("Error", "Instrument ID is missing");
      return;
    }

    if (!isValid) {
      const errorMessage = Object.values(errors).join("\n");
      Alert.alert("Validation Error", errorMessage);
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
    setInputMode("quantity");
    setErrors({});
    setTouched({
      quantity: false,
      price: false,
      investmentAmount: false,
    });
    resetOrderState();
  };

  const handleInvestmentAmountChange = (text: string) => {
    setInputMode("investment");
    setInvestmentAmount(text);
    setTouched((prev) => ({ ...prev, investmentAmount: true }));
  };

  const handleQuantityChange = (text: string) => {
    setInputMode("quantity");
    setQuantity(text);
    setTouched((prev) => ({ ...prev, quantity: true }));
  };

  const handlePriceChange = (text: string) => {
    setPrice(text);
    setTouched((prev) => ({ ...prev, price: true }));
  };

  const setInputModeExplicitly = (mode: InputMode) => {
    setInputMode(mode);
  };

  return {
    side,
    orderType,
    quantity,
    price,
    investmentAmount,
    calculatedShares,
    calculatedInvestment,
    errors,
    inputMode,

    setSide,
    setOrderType,
    setPrice: handlePriceChange,
    handleQuantityChange,
    handleInvestmentAmountChange,
    setInputMode: setInputModeExplicitly,

    isSubmitting,
    isSuccess,
    isError,
    error,
    response,
    handleSubmit,
    resetForm,
  };
}
