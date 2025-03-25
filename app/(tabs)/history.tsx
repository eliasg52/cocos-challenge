import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  useOrderHistoryStore,
  EnhancedOrderResponse,
} from "@/store/orderStore";
import { getOrderStatusStyle } from "@/utils";
import { useState } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatusStyleTypes } from "@/types";

export default function OrdersHistoryScreen() {
  const orders = useOrderHistoryStore((state) => state.orders);
  const clearOrders = useOrderHistoryStore((state) => state.clearOrders);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearHistory = () => {
    Alert.alert(
      "Clear Order History",
      "Are you sure you want to clear your order history? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: () => {
            setIsClearing(true);

            setTimeout(() => {
              clearOrders();
              setIsClearing(false);
            }, 500);
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderOrderItem = ({ item }: { item: EnhancedOrderResponse }) => (
    <ThemedView style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <ThemedText style={styles.orderId}>Order #{item.id}</ThemedText>
        <View
          style={[
            styles.statusBadge,
            styles[getOrderStatusStyle(item.status) as StatusStyleTypes],
          ]}
        >
          <ThemedText style={styles.statusText}>{item.status}</ThemedText>
        </View>
      </View>

      {item.instrumentName && (
        <View style={styles.instrumentInfo}>
          <ThemedText style={styles.instrumentName}>
            {item.instrumentName}
          </ThemedText>
          {item.ticker && (
            <ThemedText style={styles.instrumentTicker}>
              {item.ticker}
            </ThemedText>
          )}
          {item.price && (
            <ThemedText style={styles.instrumentPrice}>
              Price: {item.price}
            </ThemedText>
          )}
        </View>
      )}

      <View style={styles.orderDetails}>
        <ThemedText style={styles.orderDetail}>
          {item.timestamp
            ? item.timestamp.toLocaleString()
            : new Date().toLocaleString()}
        </ThemedText>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Orders History</ThemedText>

      {isClearing ? (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>
            Clearing order history...
          </ThemedText>
        </ThemedView>
      ) : orders.length > 0 ? (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearHistory}
            >
              <ThemedText style={styles.clearButtonText}>
                Clear History
              </ThemedText>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>
            No orders in your history yet
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Orders you place will appear here
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  orderItem: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusFilled: {
    backgroundColor: "rgba(0, 150, 0, 0.1)",
  },
  statusPending: {
    backgroundColor: "rgba(255, 165, 0, 0.1)",
  },
  statusRejected: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  instrumentInfo: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  instrumentName: {
    fontSize: 14,
    fontWeight: "600",
  },
  instrumentTicker: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  instrumentPrice: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  orderDetails: {
    marginTop: 8,
  },
  orderDetail: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  sampleButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sampleButtonText: {
    color: "white",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
