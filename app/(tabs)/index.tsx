import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SearchBar from "@/components/SearchBar";
import useSearchTicker from "@/hooks/useSearchTicker";
import { useInstruments } from "@/hooks/useInstruments";

export default function HomeScreen() {
  const {
    data: instruments,
    isLoading,
    error: instrumentsError,
  } = useInstruments();
  const {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    error: searchError,
  } = useSearchTicker();

  const displayData = searchQuery ? searchResults : instruments;
  const error = instrumentsError || (searchQuery ? searchError : null);

  if (isLoading && !searchQuery) {
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

      {error && (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            Error: {error.message}
          </ThemedText>
        </ThemedView>
      )}

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
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  errorContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffeeee",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
});
