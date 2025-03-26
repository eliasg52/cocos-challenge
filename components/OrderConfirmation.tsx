import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedButton } from "@/components/ThemedButton";
import { OrderConfirmationProps, OrderStatus } from "@/types";
import { useThemeColor } from "@/hooks/useThemeColor";

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

  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");
  const positiveColor = useThemeColor({}, "positive");
  const negativeColor = useThemeColor({}, "negative");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  const getStatusColor = () => {
    switch (status as OrderStatus) {
      case "FILLED":
        return positiveColor;
      case "PENDING":
        return accentColor;
      case "REJECTED":
        return negativeColor;
      default:
        return accentColor;
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
      <View style={styles.contentContainer}>
        <ThemedCard style={styles.card} elevated>
          <ThemedText type="subheading" style={styles.name}>
            {name}
          </ThemedText>
          <ThemedText type="secondary" style={styles.ticker}>
            {ticker}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.price}>
            Last Price: {price}
          </ThemedText>
        </ThemedCard>

        <ThemedCard style={styles.orderContainer} elevated>
          <View style={styles.orderHeader}>
            <ThemedText type="subtitle">Order Information</ThemedText>
          </View>

          <View style={styles.orderInfo}>
            <ThemedText style={styles.orderId}>ID: {orderId}</ThemedText>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: `${getStatusColor()}20` },
              ]}
            >
              <ThemedText
                style={[styles.orderStatus, { color: getStatusColor() }]}
              >
                {status}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="subtitle" style={styles.successMessage}>
            Order placed successfully!
          </ThemedText>

          <View style={styles.buttonsContainer}>
            <ThemedButton
              title="Create New Order"
              variant="primary"
              style={styles.button}
              onPress={handleCreateNewOrder}
            />

            <ThemedButton
              title="View Order History"
              variant="secondary"
              style={styles.button}
              onPress={handleViewHistory}
            />

            <ThemedButton
              title="Close"
              variant="outline"
              style={styles.button}
              onPress={handleCancel}
            />
          </View>
        </ThemedCard>
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
    paddingTop: 40,
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
    marginBottom: 16,
  },
  name: {
    marginBottom: 8,
  },
  ticker: {
    marginBottom: 12,
  },
  price: {
    marginTop: 4,
  },
  orderContainer: {
    marginBottom: 20,
  },
  orderHeader: {
    marginBottom: 16,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  orderId: {
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  successMessage: {
    marginBottom: 24,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    width: "100%",
  },
});

export default OrderConfirmation;
