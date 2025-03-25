import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEnhancedPortfolio } from "@/hooks/useEnhancedPortfolio";
import PortfolioChart from "@/components/PortfolioChart";
import { PortfolioWithName } from "@/types";
import PortfolioSkeleton from "@/components/skeletons/PortfolioSkeleton";

const screenWidth = Dimensions.get("window").width;

export default function PortfolioScreen() {
  const {
    data: portfolioData = [],
    isLoading: isDataLoading,
    error,
  } = useEnhancedPortfolio();
  const [portfolio, setPortfolio] = useState<PortfolioWithName[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDataLoading) return;

    // retraso artificial de 1 segundo para ver el skeleton
    const timer = setTimeout(() => {
      setPortfolio(portfolioData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [portfolioData, isDataLoading]);

  if (isLoading) {
    return <PortfolioSkeleton />;
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
