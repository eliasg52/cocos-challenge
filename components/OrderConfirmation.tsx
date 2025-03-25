import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { OrderConfirmationProps, OrderStatus } from "@/types";

const OrderConfirmation = ({
  name,
  ticker,
  price,
  orderId,
  status,
  onCreateNewOrder,
  onCancel,
}: OrderConfirmationProps) => {
  const router = useRouter();

  const getStatusColor = () => {
    switch (status as OrderStatus) {
      case "FILLED":
        return "#4CAF50";
      case "PENDING":
        return "#FF9800";
      case "REJECTED":
        return "#F44336";
      default:
        return "#FF9800";
    }
  };

  const handleCreateNewOrder = () => {
    if (onCreateNewOrder) {
      onCreateNewOrder();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleViewHistory = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }

    setTimeout(() => {
      router.replace("/(tabs)/history");
    }, 100);
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.instrumentInfoContainer}>
          <ThemedText style={styles.name}>{name}</ThemedText>
          <ThemedText style={styles.ticker}>{ticker}</ThemedText>
          <ThemedText style={styles.price}>Last Price: {price}</ThemedText>
        </View>
        <View style={styles.orderContainer}>
          <ThemedText style={styles.orderId}>ID: {orderId}</ThemedText>
          <ThemedText style={[styles.orderStatus, { color: getStatusColor() }]}>
            Status: {status}
          </ThemedText>

          <ThemedText style={styles.successMessage}>
            Order placed successfully!
          </ThemedText>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateNewOrder}
          >
            <ThemedText style={styles.buttonText}>Create New Order</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={handleViewHistory}
          >
            <ThemedText style={styles.historyButtonText}>
              View Order History
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <ThemedText style={styles.cancelButtonText}>Close</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 0,
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
  instrumentInfoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ticker: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
  orderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  orderId: {
    fontSize: 18,
    marginBottom: 12,
  },
  orderStatus: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 16,
    color: "#FF3B30",
  },
  successMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34C759",
    marginBottom: 24,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  historyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginBottom: 12,
  },
  historyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default OrderConfirmation;
