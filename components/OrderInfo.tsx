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
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedCard } from "./ThemedCard";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const OrderInfo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const positiveColor = useThemeColor({}, "positive");
  const accentColor = useThemeColor({}, "accent");
  const negativeColor = useThemeColor({}, "negative");

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <ThemedCard
      style={[styles.container, expanded && styles.expandedContainer]}
      elevated
    >
      <TouchableOpacity
        style={[
          styles.header,
          expanded && styles.expandedHeader,
          { borderBottomColor: borderColor },
        ]}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Order Information</ThemedText>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={tintColor}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Order Types:</ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">MARKET:</ThemedText> Orders
            executed immediately at the current market price.
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">LIMIT:</ThemedText> Orders
            executed only at the specified price or better.
          </ThemedText>

          <ThemedText style={styles.sectionTitle}>Order Status:</ThemedText>
          <View style={styles.statusRow}>
            <View
              style={[styles.statusDot, { backgroundColor: positiveColor }]}
            />
            <ThemedText style={styles.text}>
              <ThemedText type="defaultSemiBold">FILLED:</ThemedText> Order has
              been executed. All MARKET orders are executed immediately.
            </ThemedText>
          </View>
          <View style={styles.statusRow}>
            <View
              style={[styles.statusDot, { backgroundColor: accentColor }]}
            />
            <ThemedText style={styles.text}>
              <ThemedText type="defaultSemiBold">PENDING:</ThemedText> LIMIT
              orders waiting to be executed at the specified price.
            </ThemedText>
          </View>
          <View style={styles.statusRow}>
            <View
              style={[styles.statusDot, { backgroundColor: negativeColor }]}
            />
            <ThemedText style={styles.text}>
              <ThemedText type="defaultSemiBold">REJECTED:</ThemedText> Order
              has been rejected due to insufficient funds or other reasons.
            </ThemedText>
          </View>
        </View>
      )}
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 0,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  expandedContainer: {
    marginBottom: 32,
  },
  header: {
    padding: 16,
    borderBottomWidth: 0,
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
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
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
});

export default OrderInfo;
