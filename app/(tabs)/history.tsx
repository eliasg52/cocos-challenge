import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useOrderHistoryStore } from "@/store/orderStore";
import { formatCurrency } from "@/utils";
import { EnhancedOrderResponse } from "@/types";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedButton } from "@/components/ThemedButton";
import { useOrderStyles } from "@/hooks/useOrderStyles";

export default function OrdersHistoryScreen() {
  const orders = useOrderHistoryStore((state) => state.orders);
  const clearOrders = useOrderHistoryStore((state) => state.clearOrders);

  const [isClearing, setIsClearing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { getStatusColor, getSideColor, getSideText, tintColor, borderColor } =
    useOrderStyles();

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderOrderItem = ({ item }: { item: EnhancedOrderResponse }) => {
    const timestamp = item.timestamp
      ? item.timestamp
        ? item.timestamp
        : new Date(item.timestamp)
      : new Date();

    return (
      <ThemedCard style={styles.orderItem} elevated>
        <View style={styles.orderHeader}>
          <ThemedText type="defaultSemiBold" style={styles.orderId}>
            Order #{item.id}
          </ThemedText>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(item.status)}20` },
            ]}
          >
            <ThemedText
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status}
            </ThemedText>
          </View>
        </View>

        {item.instrumentName && (
          <View style={styles.instrumentInfo}>
            <ThemedText type="defaultSemiBold" style={styles.instrumentName}>
              {item.instrumentName}
            </ThemedText>
            {item.ticker && (
              <ThemedText type="secondary" style={styles.instrumentTicker}>
                {item.ticker}
              </ThemedText>
            )}

            <View style={styles.orderDetailRow}>
              {item.price && (
                <ThemedText style={styles.instrumentPrice}>
                  Price: {item.price}
                </ThemedText>
              )}

              {item.side && (
                <View
                  style={[
                    styles.sideBadge,
                    { backgroundColor: `${getSideColor(item.side)}20` },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.sideText,
                      { color: getSideColor(item.side) },
                    ]}
                  >
                    {item.side}
                  </ThemedText>
                </View>
              )}
            </View>

            <View style={styles.orderDetailsGrid}>
              {item.type && (
                <View style={styles.detailItem}>
                  <ThemedText type="secondary" style={styles.detailLabel}>
                    Type:
                  </ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {item.type}
                  </ThemedText>
                </View>
              )}

              {item.quantity && (
                <View style={styles.detailItem}>
                  <ThemedText type="secondary" style={styles.detailLabel}>
                    Quantity:
                  </ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {item.quantity}
                  </ThemedText>
                </View>
              )}

              {item.quantity && item.price && (
                <View style={styles.detailItem}>
                  <ThemedText type="secondary" style={styles.detailLabel}>
                    Total:
                  </ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {formatCurrency(
                      item.quantity *
                        parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
                    )}
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={[styles.orderDetails, { borderTopColor: borderColor }]}>
          <ThemedText type="secondary" style={styles.orderDetail}>
            {timestamp.toLocaleString()}
          </ThemedText>
        </View>
      </ThemedCard>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="heading" style={styles.title}>
        Orders History
      </ThemedText>

      {isClearing ? (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tintColor} />
          <ThemedText style={styles.loadingText}>
            Clearing order history...
          </ThemedText>
        </ThemedView>
      ) : orders.length > 0 ? (
        <>
          <View style={styles.headerContainer}>
            <ThemedButton
              title="Clear History"
              variant="outline"
              size="small"
              style={styles.clearButton}
              onPress={handleClearHistory}
              leftIcon={
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={getSideColor("SELL")}
                />
              }
            />
          </View>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[tintColor]}
                tintColor={tintColor}
                title="Refreshing orders..."
                titleColor={tintColor}
              />
            }
          />
        </>
      ) : (
        <ThemedCard elevated style={styles.emptyContainer}>
          <Ionicons
            name="receipt-outline"
            size={42}
            color={getSideText("SELL")}
            style={styles.emptyIcon}
          />
          <ThemedText type="subtitle" style={styles.emptyText}>
            No orders in your history yet
          </ThemedText>
          <ThemedText type="secondary" style={styles.emptySubtext}>
            Orders you place will appear here
          </ThemedText>
        </ThemedCard>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  title: {
    marginTop: 16,
    marginBottom: 0,
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  clearButton: {
    marginVertical: 8,
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
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sideBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  sideText: {
    fontSize: 11,
    fontWeight: "600",
  },
  instrumentInfo: {
    marginBottom: 12,
  },
  instrumentName: {
    marginBottom: 4,
  },
  instrumentTicker: {
    marginBottom: 4,
  },
  instrumentPrice: {
    marginBottom: 4,
    flex: 1,
  },
  orderDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderDetailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  detailItem: {
    width: "50%",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
  },
  orderDetails: {
    borderTopWidth: 1,
    paddingTop: 8,
  },
  orderDetail: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 0.9,
    margin: 16,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyIcon: {
    marginBottom: 12,
    opacity: 0.6,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
  },
});
