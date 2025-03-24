import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PortfolioWithName } from "@/types";
import { useEnhancedPortfolio } from "@/hooks/useEnhancedPortfolio";

export default function PortfolioScreen() {
  const { data: portfolio = [], isLoading, error } = useEnhancedPortfolio();

  const getPortfolioItemDetails = (item: PortfolioWithName) => {
    const totalValue = item.quantity * item.last_price;
    const totalCost = item.quantity * item.avg_cost_price;
    const profit = totalValue - totalCost;
    const profitPercentage = (profit / totalCost) * 100;

    return {
      totalValue,
      profit,
      profitPercentage,
    };
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedText style={styles.errorText}>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Portfolio</ThemedText>
      <ThemedView style={styles.summary}>
        <View>
          <ThemedText style={styles.summaryLabel}>Total Value</ThemedText>
          <ThemedText style={styles.summaryValue}>
            $
            {portfolio
              .reduce((acc, item) => acc + item.quantity * item.last_price, 0)
              .toFixed(2)}
          </ThemedText>
        </View>
        <View>
          <ThemedText style={styles.summaryLabel}>Total Profit</ThemedText>
          <ThemedText
            style={[
              styles.summaryValue,
              portfolio.reduce(
                (acc, item) =>
                  acc +
                  item.quantity * item.last_price -
                  item.quantity * item.avg_cost_price,
                0
              ) > 0
                ? styles.positive
                : styles.negative,
            ]}
          >
            $
            {portfolio
              .reduce(
                (acc, item) =>
                  acc +
                  item.quantity * item.last_price -
                  item.quantity * item.avg_cost_price,
                0
              )
              .toFixed(2)}
          </ThemedText>
        </View>
      </ThemedView>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={portfolio}
        renderItem={({ item }) => {
          const { totalValue, profit, profitPercentage } =
            getPortfolioItemDetails(item);

          return (
            <ThemedView style={styles.portfolioItem}>
              <View style={styles.portfolioInfo}>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
                <ThemedText style={styles.ticker}>{item.ticker}</ThemedText>
                <ThemedText style={styles.quantity}>
                  {item.quantity} shares
                </ThemedText>
              </View>
              <View style={styles.portfolioValue}>
                <ThemedText style={styles.totalValue}>
                  ${totalValue.toFixed(2)}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.profit,
                    profit > 0 ? styles.positive : styles.negative,
                  ]}
                >
                  ${profit.toFixed(2)} ({profitPercentage.toFixed(2)}%)
                </ThemedText>
              </View>
            </ThemedView>
          );
        }}
        keyExtractor={(item) =>
          item.unique_id ||
          `${item.instrument_id}-${item.quantity}-${Math.random()}`
        }
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No portfolio items</ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 80,
  },
  portfolioItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  portfolioInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  ticker: {
    fontSize: 14,
    color: "#666",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
  portfolioValue: {
    alignItems: "flex-end",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  profit: {
    fontSize: 14,
    fontWeight: "500",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  summary: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
