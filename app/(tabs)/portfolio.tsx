import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCard } from "@/components/ThemedCard";
import { useEnhancedPortfolio } from "@/hooks/useEnhancedPortfolio";
import PortfolioChart from "@/components/PortfolioChart";
import { PortfolioWithName } from "@/types";
import PortfolioSkeleton from "@/components/skeletons/PortfolioSkeleton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function PortfolioScreen() {
  const {
    data: portfolioData = [],
    isLoading: isDataLoading,
    error,
    refetch,
  } = useEnhancedPortfolio();
  const [portfolio, setPortfolio] = useState<PortfolioWithName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    if (isDataLoading) return;

    // retraso artificial de 1 segundo para ver el skeleton
    const timer = setTimeout(() => {
      setPortfolio(portfolioData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [portfolioData, isDataLoading]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing portfolio:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedCard elevated style={styles.errorCard}>
          <ThemedText style={styles.errorText}>
            Error: {error.message}
          </ThemedText>
        </ThemedCard>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[tintColor]}
            tintColor={tintColor}
            title="Refreshing portfolio..."
            titleColor={tintColor}
          />
        }
      >
        <ThemedText type="heading" style={styles.title}>
          Portfolio
        </ThemedText>

        {portfolio.length > 0 ? (
          <ThemedCard elevated style={styles.chartCard}>
            <PortfolioChart portfolio={portfolio} />
          </ThemedCard>
        ) : (
          <ThemedCard elevated style={styles.emptyCard}>
            <ThemedText type="secondary" style={styles.emptyText}>
              No portfolio items available yet. Start investing to see your
              portfolio here.
            </ThemedText>
          </ThemedCard>
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
    padding: 10,
    paddingBottom: 30,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  chartCard: {
    padding: 0,
    overflow: "hidden",
  },
  emptyCard: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    minHeight: 200,
  },
  emptyText: {
    textAlign: "center",
  },
  errorCard: {
    padding: 24,
    maxWidth: 400,
    width: "100%",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
