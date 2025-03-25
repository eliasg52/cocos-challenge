import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import OrderInfo from "@/components/OrderInfo";
import { useOrderForm } from "@/hooks/useOrderForm";
import { formatCurrency } from "@/utils";
import OrderConfirmation from "@/components/OrderConfirmation";
import { OrderStatus } from "@/types";

export default function CreateOrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    ticker: string;
    last_price: string;
  }>();

  const { name, ticker, last_price } = params;

  const {
    // form state
    side,
    orderType,
    quantity,
    price,
    investmentAmount,

    // form actions
    setSide,
    setOrderType,
    setPrice,
    handleQuantityChange,
    handleInvestmentAmountChange,

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
        <Text style={styles.closeButtonText}>✕</Text>
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
            <ThemedView style={styles.card}>
              <ThemedText style={styles.instrumentName}>{name}</ThemedText>
              <ThemedText style={styles.ticker}>{ticker}</ThemedText>
              <ThemedText style={styles.price}>
                Last Price: {formatCurrency(Number(last_price))}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.formCard}>
              <View style={styles.segmentContainer}>
                <ThemedText style={styles.label}>Side</ThemedText>
                <View style={styles.segmentControl}>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      side === "BUY" && styles.segmentButtonActive,
                    ]}
                    onPress={() => setSide("BUY")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        side === "BUY" && styles.segmentButtonTextActive,
                      ]}
                    >
                      Buy
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      side === "SELL" && styles.segmentButtonActive,
                    ]}
                    onPress={() => setSide("SELL")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        side === "SELL" && styles.segmentButtonTextActive,
                      ]}
                    >
                      Sell
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.segmentContainer}>
                <ThemedText style={styles.label}>Order Type</ThemedText>
                <View style={styles.segmentControl}>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      orderType === "MARKET" && styles.segmentButtonActive,
                    ]}
                    onPress={() => setOrderType("MARKET")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        orderType === "MARKET" &&
                          styles.segmentButtonTextActive,
                      ]}
                    >
                      Market
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      orderType === "LIMIT" && styles.segmentButtonActive,
                    ]}
                    onPress={() => setOrderType("LIMIT")}
                  >
                    <ThemedText
                      style={[
                        styles.segmentButtonText,
                        orderType === "LIMIT" && styles.segmentButtonTextActive,
                      ]}
                    >
                      Limit
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Quantity (Shares)</ThemedText>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    placeholder="Enter quantity"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>
                  Investment Amount ($)
                </ThemedText>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={investmentAmount}
                    onChangeText={handleInvestmentAmountChange}
                    placeholder="Enter amount to invest"
                    keyboardType="numeric"
                  />
                </View>
                {investmentAmount && (
                  <ThemedText style={styles.calculatedText}>
                    Will buy approximately{" "}
                    {Math.floor(Number(investmentAmount) / Number(last_price))}{" "}
                    shares
                  </ThemedText>
                )}
              </View>

              {orderType === "LIMIT" && (
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Limit Price ($)</ThemedText>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={styles.textInput}
                      value={price}
                      onChangeText={setPrice}
                      placeholder="Enter limit price"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              )}

              {isError && (
                <ThemedView style={styles.errorContainer}>
                  <ThemedText style={styles.errorText}>
                    {error?.message || "An error occurred"}
                  </ThemedText>
                </ThemedView>
              )}

              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ThemedText style={styles.buttonText}>
                    Submit Order
                  </ThemedText>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <OrderInfo />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  closeButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
  },
  instrumentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ticker: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  formCard: {
    margin: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
  },
  segmentContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#4A4A4A",
  },
  segmentControl: {
    flexDirection: "row",
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
    overflow: "hidden",
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  segmentButtonText: {
    color: "#8E8E93",
    fontWeight: "500",
  },
  segmentButtonTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 16,
  },
  textInputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  textInput: {
    fontSize: 16,
    height: 40,
    color: "#000",
  },
  calculatedText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 8,
  },
  buttonDisabled: {
    backgroundColor: "#B5B5B5",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  responseCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
  },
  responseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  responseId: {
    fontSize: 16,
    marginBottom: 8,
  },
  responseStatus: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24,
  },
  statusFilled: {
    color: "#34C759",
  },
  statusPending: {
    color: "#FF9500",
  },
  statusRejected: {
    color: "#FF3B30",
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffeeee",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "500",
    fontSize: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
  },
});
