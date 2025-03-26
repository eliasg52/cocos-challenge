import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import OrderInfo from "@/components/OrderInfo";
import { useOrderForm } from "@/hooks/useOrderForm";
import { formatCurrency } from "@/utils";
import OrderConfirmation from "@/components/OrderConfirmation";
import { OrderStatus } from "@/types";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function CreateOrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    ticker: string;
    last_price: string;
  }>();

  const { name, ticker, last_price } = params;

  const primaryColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const backgroundColor = useThemeColor({}, "background");
  const inputColor = useThemeColor({}, "input");
  const inputBorderColor = useThemeColor({}, "inputBorder");
  const errorColor = useThemeColor({}, "negative");
  const positiveColor = useThemeColor({}, "positive");

  const {
    // form state
    side,
    orderType,
    quantity,
    price,
    investmentAmount,
    calculatedShares,
    calculatedInvestment,
    errors,
    inputMode,

    // form actions
    setSide,
    setOrderType,
    setPrice,
    handleQuantityChange,
    handleInvestmentAmountChange,
    setInputMode,

    // submission state and actions
    isSubmitting,
    isSuccess,
    isError,
    error,
    response,
    handleSubmit,
    resetForm,
  } = useOrderForm(params);

  const handleCancel = () => {
    router.back();
  };

  const getInputContainerStyle = (fieldName: string) => {
    return [
      styles.textInputContainer,
      {
        backgroundColor: inputColor,
        borderColor: errors[fieldName] ? errorColor : inputBorderColor,
      },
    ];
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
        <Ionicons name="close" size={24} color={secondaryTextColor} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {isSuccess && response ? (
          <OrderConfirmation
            name={name as string}
            ticker={ticker as string}
            price={formatCurrency(Number(last_price))}
            orderId={response.id.toString()}
            status={response.status as OrderStatus}
            onCreateNewOrder={resetForm}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <ThemedCard style={styles.card} elevated={Platform.OS === "ios"}>
              <ThemedText type="subheading" style={styles.instrumentName}>
                {name}
              </ThemedText>
              <ThemedText type="secondary" style={styles.ticker}>
                {ticker}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.price}>
                Last Price: {formatCurrency(Number(last_price))}
              </ThemedText>
            </ThemedCard>

            <ThemedCard
              style={styles.formCard}
              elevated={Platform.OS === "ios"}
            >
              <View style={styles.segmentContainer}>
                <ThemedText type="subtitle" style={styles.label}>
                  Side
                </ThemedText>
                <View
                  style={[
                    styles.segmentControl,
                    { backgroundColor: inputColor },
                    Platform.OS === "android" && styles.segmentControlAndroid,
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      side === "BUY" && [
                        styles.segmentButtonActive,
                        { backgroundColor: backgroundColor },
                        Platform.OS === "android" &&
                          styles.segmentButtonActiveAndroid,
                      ],
                    ]}
                    onPress={() => setSide("BUY")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        {
                          color:
                            side === "BUY" ? primaryColor : secondaryTextColor,
                        },
                      ]}
                    >
                      Buy
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      side === "SELL" && [
                        styles.segmentButtonActive,
                        { backgroundColor: backgroundColor },
                        Platform.OS === "android" &&
                          styles.segmentButtonActiveAndroid,
                      ],
                    ]}
                    onPress={() => setSide("SELL")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        {
                          color:
                            side === "SELL" ? primaryColor : secondaryTextColor,
                        },
                      ]}
                    >
                      Sell
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.segmentContainer}>
                <ThemedText type="subtitle" style={styles.label}>
                  Order Type
                </ThemedText>
                <View
                  style={[
                    styles.segmentControl,
                    { backgroundColor: inputColor },
                    Platform.OS === "android" && styles.segmentControlAndroid,
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      orderType === "MARKET" && [
                        styles.segmentButtonActive,
                        { backgroundColor: backgroundColor },
                        Platform.OS === "android" &&
                          styles.segmentButtonActiveAndroid,
                      ],
                    ]}
                    onPress={() => setOrderType("MARKET")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        {
                          color:
                            orderType === "MARKET"
                              ? primaryColor
                              : secondaryTextColor,
                        },
                      ]}
                    >
                      Market
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      orderType === "LIMIT" && [
                        styles.segmentButtonActive,
                        { backgroundColor: backgroundColor },
                        Platform.OS === "android" &&
                          styles.segmentButtonActiveAndroid,
                      ],
                    ]}
                    onPress={() => setOrderType("LIMIT")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        {
                          color:
                            orderType === "LIMIT"
                              ? primaryColor
                              : secondaryTextColor,
                        },
                      ]}
                    >
                      Limit
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.segmentContainer}>
                <ThemedText type="subtitle" style={styles.label}>
                  Input Mode
                </ThemedText>
                <View
                  style={[
                    styles.segmentControl,
                    { backgroundColor: inputColor },
                    Platform.OS === "android" && styles.segmentControlAndroid,
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      inputMode === "quantity" && [
                        styles.segmentButtonActive,
                        { backgroundColor: backgroundColor },
                        Platform.OS === "android" &&
                          styles.segmentButtonActiveAndroid,
                      ],
                    ]}
                    onPress={() => setInputMode("quantity")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        {
                          color:
                            inputMode === "quantity"
                              ? primaryColor
                              : secondaryTextColor,
                        },
                      ]}
                    >
                      By Shares
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      inputMode === "investment" && [
                        styles.segmentButtonActive,
                        { backgroundColor: backgroundColor },
                        Platform.OS === "android" &&
                          styles.segmentButtonActiveAndroid,
                      ],
                    ]}
                    onPress={() => setInputMode("investment")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        {
                          color:
                            inputMode === "investment"
                              ? primaryColor
                              : secondaryTextColor,
                        },
                      ]}
                    >
                      By Amount
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputHeaderContainer}>
                  <ThemedText type="subtitle" style={styles.label}>
                    Quantity (Shares)
                  </ThemedText>
                  {inputMode === "investment" && (
                    <ThemedText type="secondary" style={styles.calculatedLabel}>
                      (Calculated)
                    </ThemedText>
                  )}
                </View>
                <View style={getInputContainerStyle("quantity")}>
                  <TextInput
                    style={[
                      styles.textInput,
                      { color: textColor },
                      inputMode === "investment" && styles.disabledInput,
                    ]}
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    placeholder="Enter quantity"
                    placeholderTextColor={secondaryTextColor}
                    keyboardType="numeric"
                    editable={inputMode === "quantity"}
                  />
                </View>
                {errors.quantity ? (
                  <ThemedText
                    style={[styles.errorText, styles.validationError]}
                  >
                    {errors.quantity}
                  </ThemedText>
                ) : quantity ? (
                  <ThemedText type="secondary" style={styles.calculatedText}>
                    Total investment:{" "}
                    {formatCurrency(Number(quantity) * Number(last_price))}
                  </ThemedText>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputHeaderContainer}>
                  <ThemedText type="subtitle" style={styles.label}>
                    Investment Amount ($)
                  </ThemedText>
                  {inputMode === "quantity" && (
                    <ThemedText type="secondary" style={styles.calculatedLabel}>
                      (Calculated)
                    </ThemedText>
                  )}
                </View>
                <View style={getInputContainerStyle("investmentAmount")}>
                  <TextInput
                    style={[
                      styles.textInput,
                      { color: textColor },
                      inputMode === "quantity" && styles.disabledInput,
                    ]}
                    value={investmentAmount}
                    onChangeText={handleInvestmentAmountChange}
                    placeholder="Enter amount to invest"
                    placeholderTextColor={secondaryTextColor}
                    keyboardType="numeric"
                    editable={inputMode === "investment"}
                  />
                </View>
                {inputMode === "investment" && investmentAmount ? (
                  <View style={styles.liveUpdateContainer}>
                    <ThemedText type="secondary" style={styles.calculatedText}>
                      Will buy approximately{" "}
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: positiveColor }}
                      >
                        {calculatedShares}
                      </ThemedText>{" "}
                      shares
                    </ThemedText>
                    {calculatedShares > 0 && (
                      <ThemedText
                        type="secondary"
                        style={styles.calculatedText}
                      >
                        Price per share: {formatCurrency(Number(last_price))}
                      </ThemedText>
                    )}
                  </View>
                ) : null}
              </View>

              {orderType === "LIMIT" && (
                <View style={styles.inputContainer}>
                  <ThemedText type="subtitle" style={styles.label}>
                    Limit Price ($)
                  </ThemedText>
                  <View style={getInputContainerStyle("price")}>
                    <TextInput
                      style={[styles.textInput, { color: textColor }]}
                      value={price}
                      onChangeText={setPrice}
                      placeholder="Enter limit price"
                      placeholderTextColor={secondaryTextColor}
                      keyboardType="numeric"
                    />
                  </View>
                  {errors.price ? (
                    <ThemedText
                      style={[styles.errorText, styles.validationError]}
                    >
                      {errors.price}
                    </ThemedText>
                  ) : null}
                </View>
              )}

              {isError && (
                <ThemedView style={styles.errorContainer} variant="bordered">
                  <ThemedText style={styles.errorText}>
                    {error?.message || "An error occurred"}
                  </ThemedText>
                </ThemedView>
              )}

              <ThemedCard style={styles.summaryContainer} elevated>
                <View style={styles.summaryContent}>
                  <ThemedText type="subtitle">Order Summary</ThemedText>
                  <View style={styles.summaryItem}>
                    <ThemedText type="secondary">Action:</ThemedText>
                    <ThemedText
                      style={{
                        color: side === "BUY" ? positiveColor : errorColor,
                        fontWeight: "600",
                      }}
                    >
                      {side === "BUY" ? "Buy" : "Sell"}
                    </ThemedText>
                  </View>
                  <View style={styles.summaryItem}>
                    <ThemedText type="secondary">Order Type:</ThemedText>
                    <ThemedText>
                      {orderType === "MARKET" ? "Market" : "Limit"}
                    </ThemedText>
                  </View>
                  {orderType === "LIMIT" && price && (
                    <View style={styles.summaryItem}>
                      <ThemedText type="secondary">Limit Price:</ThemedText>
                      <ThemedText>{formatCurrency(Number(price))}</ThemedText>
                    </View>
                  )}
                  {quantity && (
                    <View style={styles.summaryItem}>
                      <ThemedText type="secondary">Quantity:</ThemedText>
                      <ThemedText>{quantity} shares</ThemedText>
                    </View>
                  )}
                  {quantity && (
                    <View style={styles.summaryItem}>
                      <ThemedText type="secondary">Total Value:</ThemedText>
                      <ThemedText type="defaultSemiBold">
                        {formatCurrency(
                          Number(quantity) *
                            Number(orderType === "LIMIT" ? price : last_price)
                        )}
                      </ThemedText>
                    </View>
                  )}
                </View>
              </ThemedCard>

              <View style={styles.buttonContainer}>
                <ThemedButton
                  title="Submit Order"
                  variant="primary"
                  style={[
                    styles.button,
                    Platform.OS === "android" && styles.androidButton,
                  ]}
                  isLoading={isSubmitting}
                  disabled={
                    isSubmitting || Object.keys(errors).length > 0 || !quantity
                  }
                  onPress={handleSubmit}
                />

                <ThemedButton
                  title="Cancel"
                  variant="outline"
                  style={[
                    styles.cancelButton,
                    Platform.OS === "android" && styles.androidCancelButton,
                  ]}
                  onPress={handleCancel}
                />
              </View>
            </ThemedCard>

            <OrderInfo />
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingTop: 50,
  },
  closeButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  card: {
    margin: 16,
  },
  instrumentName: {
    marginBottom: 4,
  },
  ticker: {
    marginBottom: 8,
  },
  price: {
    marginTop: 4,
  },
  formCard: {
    margin: 16,
    marginBottom: 20,
  },
  segmentContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  calculatedLabel: {
    marginLeft: 8,
    fontStyle: "italic",
  },
  inputHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  segmentControl: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
  },
  segmentControlAndroid: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonActive: {
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  segmentButtonActiveAndroid: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  segmentButtonText: {
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 16,
  },
  textInputContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  textInput: {
    fontSize: 16,
    height: 48,
  },
  disabledInput: {
    opacity: 0.6,
  },
  calculatedText: {
    marginTop: 4,
  },
  liveUpdateContainer: {
    marginTop: 4,
  },
  summaryContainer: {
    marginTop: 16,
    padding: 0,
    marginBottom: 16,
  },
  summaryContent: {
    padding: 16,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12,
  },
  button: {
    width: "100%",
  },
  androidButton: {
    borderRadius: 8,
    backgroundColor: "#66BB6A",
  },
  cancelButton: {
    width: "100%",
  },
  androidCancelButton: {
    borderRadius: 8,
    borderColor: "#757575",
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    textAlign: "center",
  },
  validationError: {
    textAlign: "left",
    marginTop: 4,
  },
});
