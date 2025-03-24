import { StyleSheet, Platform, FlatList, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import tradingApi from "@/api/tradingApi";

export default function HomeScreen() {
  interface Instrument {
    id: number;
    ticker: string;
    name: string;
    type: string;
    last_price: number;
    close_price: number;
  }

  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    tradingApi.getInstruments().then(setInstruments);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Trading</ThemedText>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={instruments}
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
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
