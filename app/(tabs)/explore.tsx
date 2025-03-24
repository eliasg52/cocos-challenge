import { StyleSheet, Platform, FlatList, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import tradingApi from "@/api/tradingApi";

export default function TabTwoScreen() {
  interface Portfolio {
    instrument_id: number;
    ticker: string;
    quantity: number;
    last_price: number;
    close_price: number;
    avg_cost_price: number;
  }

  interface Instrument {
    id: number;
    ticker: string;
    name: string;
    type: string;
    last_price: number;
    close_price: number;
  }

  interface PortfolioWithName extends Portfolio {
    name: string;
  }

  const [portfolio, setPortfolio] = useState<PortfolioWithName[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    // Fetch both portfolio and instruments data
    const fetchData = async () => {
      const portfolioData = await tradingApi.getPortfolio();
      const instrumentsData = await tradingApi.getInstruments();

      setInstruments(instrumentsData);

      // Combine portfolio data with instrument names
      const portfolioWithNames = portfolioData.map((item: Portfolio) => {
        const instrument = instrumentsData.find(
          (instr: Instrument) => instr.id === item.instrument_id
        );
        return {
          ...item,
          name: instrument ? instrument.name : item.ticker,
        };
      });

      setPortfolio(portfolioWithNames);
    };

    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Portfolio</ThemedText>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={portfolio}
        renderItem={({ item }) => (
          <ThemedView style={styles.portfolio}>
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
        keyExtractor={(item, index) =>
          `${item.instrument_id}-${item.ticker}-${item.quantity}-${index}`
        }
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
    paddingBottom: 80, // Espacio adicional al final de la lista
  },
  portfolio: {
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
