import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

// Habilitar LayoutAnimation en Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const OrderInfo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <ThemedView
      style={[styles.container, expanded && styles.expandedContainer]}
    >
      <TouchableOpacity
        style={[styles.header, expanded && styles.expandedHeader]}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Order Information</ThemedText>
          <Ionicons
            name={expanded ? "chevron-up" : "information-circle"}
            size={expanded ? 22 : 24}
            color="#007AFF"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Order Types:</ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText style={styles.bold}>MARKET:</ThemedText> Orders executed
            immediately at the current market price.
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText style={styles.bold}>LIMIT:</ThemedText> Orders executed
            only at the specified price or better.
          </ThemedText>

          <ThemedText style={styles.sectionTitle}>Order Status:</ThemedText>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, styles.statusFilledDot]} />
            <ThemedText style={styles.text}>
              <ThemedText style={styles.bold}>FILLED:</ThemedText> Order has
              been executed. All MARKET orders are executed immediately.
            </ThemedText>
          </View>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, styles.statusPendingDot]} />
            <ThemedText style={styles.text}>
              <ThemedText style={styles.bold}>PENDING:</ThemedText> LIMIT orders
              waiting to be executed at the specified price.
            </ThemedText>
          </View>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, styles.statusRejectedDot]} />
            <ThemedText style={styles.text}>
              <ThemedText style={styles.bold}>REJECTED:</ThemedText> Order has
              been rejected due to insufficient funds or other reasons.
            </ThemedText>
          </View>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 0,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    overflow: "hidden",
    marginBottom: 16,
  },
  expandedContainer: {
    marginBottom: 32,
  },
  header: {
    padding: 16,
    borderBottomWidth: 0,
    borderBottomColor: "#E5E5EA",
  },
  expandedHeader: {
    borderBottomWidth: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#1C1C1E",
  },
  text: {
    fontSize: 14,
    color: "#3A3A3C",
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "600",
    color: "#1C1C1E",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusFilledDot: {
    backgroundColor: "#34C759", // Green
  },
  statusPendingDot: {
    backgroundColor: "#FF9500", // Orange
  },
  statusRejectedDot: {
    backgroundColor: "#FF3B30", // Red
  },
});

export default OrderInfo;
