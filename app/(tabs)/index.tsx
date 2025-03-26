import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useMemo } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCard } from "@/components/ThemedCard";
import SearchBar from "@/components/SearchBar";
import useSearchTicker from "@/hooks/useSearchTicker";
import { useInstruments } from "@/hooks/useInstruments";
import { Instrument } from "@/types";
import { calculateReturn, formatCurrency, getReturnType } from "@/utils";
import InstrumentsSkeleton from "@/components/skeletons/InstrumentsSkeleton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const router = useRouter();
  const {
    data: instrumentsData,
    isLoading,
    error: instrumentsError,
    refetch,
  } = useInstruments();
  const {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    error: searchError,
  } = useSearchTicker();

  const [refreshing, setRefreshing] = useState(false);

  const positiveColor = useThemeColor({}, "positive");
  const negativeColor = useThemeColor({}, "negative");
  const neutralColor = useThemeColor({}, "neutral");
  const tintColor = useThemeColor({}, "tint");

  // Filtrar instrumentos que no sean de tipo "MONEDA"
  const instruments = useMemo(() => {
    if (!instrumentsData) return [];
    return instrumentsData.filter((instrument) => instrument.type !== "MONEDA");
  }, [instrumentsData]);

  // Aplicar el mismo filtro a los resultados de búsqueda
  const filteredSearchResults = useMemo(() => {
    if (!searchResults) return [];
    return searchResults.filter((instrument) => instrument.type !== "MONEDA");
  }, [searchResults]);

  const displayData = searchQuery ? filteredSearchResults : instruments;
  const error = instrumentsError || (searchQuery ? searchError : null);

  const handleInstrumentPress = (instrument: Instrument) => {
    router.push({
      pathname: "order" as any,
      params: {
        id: instrument.id,
        name: instrument.name,
        ticker: instrument.ticker,
        last_price: instrument.last_price,
      },
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing instruments:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image
          source={require("@/assets/icons/androidIcon.png")}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.title}>
          Cocos Capital
        </ThemedText>
      </ThemedView>

      <SearchBar
        value={searchQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {error && (
        <ThemedView variant="bordered" style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            Error: {error.message}
          </ThemedText>
        </ThemedView>
      )}

      {isLoading && !searchQuery ? (
        <InstrumentsSkeleton />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={displayData}
          renderItem={({ item }) => (
            <ThemedCard
              interactive
              elevated
              style={styles.instrumentCard}
              onPress={() => handleInstrumentPress(item)}
            >
              <View style={styles.instrumentContent}>
                <View style={styles.instrumentInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.name}>
                    {item.name}
                  </ThemedText>
                  <ThemedText type="secondary" style={styles.ticker}>
                    {item.ticker}
                  </ThemedText>
                </View>
                <View style={styles.priceInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.price}>
                    {formatCurrency(item.last_price)}
                  </ThemedText>
                  <View style={styles.changeContainer}>
                    {item.last_price > item.close_price ? (
                      <Ionicons
                        name="trending-up"
                        size={14}
                        color={positiveColor}
                        style={styles.trendIcon}
                      />
                    ) : item.last_price < item.close_price ? (
                      <Ionicons
                        name="trending-down"
                        size={14}
                        color={negativeColor}
                        style={styles.trendIcon}
                      />
                    ) : (
                      <Ionicons
                        name="remove"
                        size={14}
                        color={neutralColor}
                        style={styles.trendIcon}
                      />
                    )}
                    <ThemedText
                      style={[
                        styles.change,
                        {
                          color:
                            getReturnType(item.last_price, item.close_price) ===
                            "positive"
                              ? positiveColor
                              : getReturnType(
                                  item.last_price,
                                  item.close_price
                                ) === "negative"
                              ? negativeColor
                              : neutralColor,
                        },
                      ]}
                    >
                      {calculateReturn(item.last_price, item.close_price)}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </ThemedCard>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText type="secondary" style={styles.emptyText}>
                {searchQuery
                  ? "No instruments found for your search"
                  : "No instruments available"}
              </ThemedText>
            </ThemedView>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[tintColor]}
              tintColor={tintColor}
              title="Refreshing instruments..."
              titleColor={tintColor}
            />
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingTop: 8,
    paddingBottom: 8,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: -10,
  },
  title: {
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  instrumentCard: {
    marginBottom: 12,
  },
  instrumentContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instrumentInfo: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
  ticker: {
    fontSize: 14,
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  price: {
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendIcon: {
    marginRight: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  errorContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
