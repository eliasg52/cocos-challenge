import {
  StyleSheet,
  Platform,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import tradingApi from "@/api/tradingApi";
import SearchBar from "@/components/SearchBar";
import useSearchTicker from "@/hooks/useSearchTicker";
import { Instrument } from "@/types";

export default function HomeScreen() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { searchQuery, searchResults, isSearching, handleSearch } =
    useSearchTicker();

  useEffect(() => {
    tradingApi.getInstruments().then((data) => {
      setInstruments(data);
      setIsLoading(false);
    });
  }, []);

  const displayData = searchQuery ? searchResults : instruments;

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Trading</ThemedText>
      <SearchBar
        value={searchQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
      />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={displayData}
        renderItem={({ item }) => (
          <ThemedView style={styles.instrument}>
            <View style={styles.instrumentInfo}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.ticker}>{item.ticker}</ThemedText>
            </View>
            <View style={styles.priceInfo}>
              <ThemedText style={styles.price}>{item.last_price}</ThemedText>
              <ThemedText
                style={[
                  styles.change,
                  item.last_price - item.close_price > 0
                    ? styles.positive
                    : styles.negative,
                ]}
              >
                {(
                  ((item.last_price - item.close_price) / item.close_price) *
                  100
                ).toFixed(2)}
                %
              </ThemedText>
            </View>
          </ThemedView>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              {searchQuery
                ? "No instruments found for your search"
                : "No instruments available"}
            </ThemedText>
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
  instrument: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instrumentInfo: {
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
  priceInfo: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: "500",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
