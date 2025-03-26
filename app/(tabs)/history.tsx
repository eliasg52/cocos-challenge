import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  useOrderHistoryStore,
  EnhancedOrderResponse,
} from "@/store/orderStore";
import { getOrderStatusStyle } from "@/utils";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function OrdersHistoryScreen() {
  const orders = useOrderHistoryStore((state) => state.orders);
  const clearOrders = useOrderHistoryStore((state) => state.clearOrders);

  const [isClearing, setIsClearing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const accentColor = useThemeColor({}, "accent");
  const negativeColor = useThemeColor({}, "negative");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");

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

    // Simula una actualización después de un breve delay
    setTimeout(() => {
      // Aquí normalmente haríamos un refetch o actualización
      // Como no hay una función de refetch en el store, solo simulamos el proceso
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const style = getOrderStatusStyle(status);
    if (style === "statusFilled") return tintColor;
    if (style === "statusPending") return accentColor;
    if (style === "statusRejected") return negativeColor;
    return textColor;
  };

  const renderOrderItem = ({ item }: { item: EnhancedOrderResponse }) => (
    <ThemedCard style={styles.orderItem} elevated>
      <View style={styles.orderHeader}>
        <ThemedText type="defaultSemiBold" style={styles.orderId}>
          Order #{item.id}
        </ThemedText>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}20` }, // 20 hex for 12% opacity
          ]}
        >
          <ThemedText
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
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
          {item.price && (
            <ThemedText style={styles.instrumentPrice}>
              Price: {item.price}
            </ThemedText>
          )}
        </View>
      )}

      <View style={styles.orderDetails}>
        <ThemedText type="secondary" style={styles.orderDetail}>
          {item.timestamp
            ? item.timestamp.toLocaleString()
            : new Date().toLocaleString()}
        </ThemedText>
      </View>
    </ThemedCard>
  );

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
                  color={negativeColor}
                />
              }
            />
          </View>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
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
            size={48}
            color={textColor}
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
    fontSize: 14,
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 12,
  },
  orderDetail: {
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    margin: 16,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
  },
});
