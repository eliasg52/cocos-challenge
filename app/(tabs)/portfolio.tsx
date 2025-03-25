import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEnhancedPortfolio } from "@/hooks/useEnhancedPortfolio";
import PortfolioChart from "@/components/PortfolioChart";

export default function PortfolioScreen() {
  const { data: portfolio = [], isLoading, error } = useEnhancedPortfolio();

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <ThemedText style={styles.title}>Portfolio</ThemedText>

        {portfolio.length > 0 ? (
          <PortfolioChart portfolio={portfolio} />
        ) : (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No portfolio items</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
