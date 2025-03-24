import { StyleSheet, Platform, FlatList } from "react-native";

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
      <ThemedText>Home</ThemedText>
      <FlatList
        data={instruments}
        renderItem={({ item }) => <ThemedText>{item.name}</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
