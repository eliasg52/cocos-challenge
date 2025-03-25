import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import ContentLoader, { Rect } from "react-content-loader/native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SearchBar from "@/components/SearchBar";
import useSearchTicker from "@/hooks/useSearchTicker";
import { useInstruments } from "@/hooks/useInstruments";
import { Instrument } from "@/types";
import { calculateReturn, formatCurrency, getReturnType } from "@/utils";
import { Colors } from "@/constants/Colors";

// Interfaz para los items del skeleton
interface SkeletonItem {
  id: number;
  nameWidth: number;
  tickerWidth: number;
  priceWidth: number;
}

// Función para generar un arreglo con variaciones sutiles de dimensiones
const generateSkeletonItems = (count = 10): SkeletonItem[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      id: i,
      // Variar ligeramente los anchos para que no se vean iguales
      nameWidth: 160 + Math.floor(Math.random() * 40),
      tickerWidth: 80 + Math.floor(Math.random() * 30),
      priceWidth: 70 + Math.floor(Math.random() * 20),
    }));
};

// Componente de skeleton para cada instrumento en la lista
const InstrumentSkeleton = ({ item }: { item: SkeletonItem }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Colores adaptados al tema
  const backgroundColor = isDark ? "#2c2c2c" : "#f0f0f0";
  const foregroundColor = isDark ? "#3d3d3d" : "#e0e0e0";

  return (
    <ThemedView style={styles.instrument}>
      <View style={styles.instrumentInfo}>
        <ContentLoader
          speed={1.5}
          width={200}
          height={45}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          viewBox="0 0 200 45"
        >
          {/* Nombre del instrumento */}
          <Rect x="0" y="0" rx="4" ry="4" width={item.nameWidth} height="20" />
          {/* Ticker */}
          <Rect
            x="0"
            y="28"
            rx="3"
            ry="3"
            width={item.tickerWidth}
            height="14"
          />
        </ContentLoader>
      </View>
      <View style={styles.priceInfo}>
        <ContentLoader
          speed={1.5}
          width={90}
          height={45}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          viewBox="0 0 90 45"
        >
          {/* Precio */}
          <Rect
            x="10"
            y="0"
            rx="4"
            ry="4"
            width={item.priceWidth}
            height="20"
          />
          {/* Cambio */}
          <Rect x="30" y="28" rx="3" ry="3" width="60" height="14" />
        </ContentLoader>
      </View>
    </ThemedView>
  );
};

// Componente para mostrar múltiples skeletons de instrumentos
const InstrumentsSkeletonList = ({ count = 10 }) => {
  // Generar items de skeleton con variaciones sutiles
  const skeletonItems = generateSkeletonItems(count);

  return (
    <View style={{ width: "100%" }}>
      {skeletonItems.map((item) => (
        <InstrumentSkeleton key={item.id} item={item} />
      ))}
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
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

  // Calcular el número aproximado de elementos visibles en la pantalla
  // para mostrar un número adecuado de skeletons (aproximadamente 8-12 elementos)
  const skeletonCount = 8;

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

  // Modificamos esta parte para mostrar el skeleton con título y búsqueda
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

      {/* Si está cargando y no hay búsqueda, mostramos skeletons */}
      {isLoading && !searchQuery ? (
        <InstrumentsSkeletonList count={skeletonCount} />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={displayData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleInstrumentPress(item)}>
              <ThemedView style={styles.instrument}>
                <View style={styles.instrumentInfo}>
                  <ThemedText style={styles.name}>{item.name}</ThemedText>
                  <ThemedText style={styles.ticker}>{item.ticker}</ThemedText>
                </View>
                <View style={styles.priceInfo}>
                  <ThemedText style={styles.price}>
                    {formatCurrency(item.last_price)}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.change,
                      styles[getReturnType(item.last_price, item.close_price)],
                    ]}
                  >
                    {calculateReturn(item.last_price, item.close_price)}
                  </ThemedText>
                </View>
              </ThemedView>
            </TouchableOpacity>
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
      )}
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
  neutral: {
    color: "#888",
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
