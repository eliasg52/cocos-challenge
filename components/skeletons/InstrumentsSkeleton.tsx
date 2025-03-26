import { View, StyleSheet, ScrollView } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";

const InstrumentItemSkeleton = () => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const cardBackgroundColor = useThemeColor({}, "card");
  const backgroundColor = isDark ? "#2c2c2c" : "#ececec";
  const foregroundColor = isDark ? "#3d3d3d" : "#dddddd";

  return (
    <ThemedView
      style={[styles.instrumentItem, { backgroundColor: cardBackgroundColor }]}
    >
      <View style={styles.instrumentHeader}>
        <View style={styles.instrumentLogoName}>
          <View>
            <ContentLoader
              speed={1.8}
              width={150}
              height={45}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
            >
              <Rect x="0" y="5" rx="4" ry="4" width="130" height="20" />
              <Rect x="0" y="30" rx="3" ry="3" width="80" height="15" />
            </ContentLoader>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <ContentLoader
            speed={1.8}
            width={100}
            height={45}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="5" rx="4" ry="4" width="80" height="20" />
            <Rect x="20" y="30" rx="3" ry="3" width="60" height="15" />
          </ContentLoader>
        </View>
      </View>
    </ThemedView>
  );
};

const InstrumentsSkeletonList = ({ count = 10 }) => {
  return (
    <View style={styles.instrumentsListContainer}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <InstrumentItemSkeleton key={index} />
        ))}
    </View>
  );
};

const InstrumentsSkeleton = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <InstrumentsSkeletonList />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  searchBarContainer: {
    margin: 16,
    height: 40,
  },
  instrumentsListContainer: {
    padding: 16,
  },
  instrumentItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  instrumentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instrumentLogoName: {
    flexDirection: "row",
    alignItems: "center",
  },

  priceContainer: {
    alignItems: "flex-end",
  },
});

export { InstrumentsSkeleton, InstrumentItemSkeleton };
export default InstrumentsSkeleton;
