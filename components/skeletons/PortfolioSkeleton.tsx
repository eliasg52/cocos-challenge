import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";

const PieChartSkeleton = () => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const cardBackgroundColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const backgroundColor = isDark ? "#2c2c2c" : "#ececec";
  const foregroundColor = isDark ? "#3d3d3d" : "#dddddd";

  return (
    <ThemedView style={styles.chartSkeletonContainer}>
      <View
        style={[
          styles.summaryContainer,
          { backgroundColor: cardBackgroundColor, borderColor },
        ]}
      >
        <ContentLoader
          speed={2}
          width={300}
          height={60}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          viewBox="0 0 300 60"
        >
          <Rect x="30" y="0" rx="4" ry="4" width="240" height="25" />
          <Rect x="30" y="35" rx="4" ry="4" width="240" height="25" />
        </ContentLoader>
      </View>

      <View style={styles.chartWrapper}>
        <View style={styles.pieChartSkeletonContainer}>
          <View style={[styles.pieCircle, { borderColor }]} />

          <View style={styles.legendSkeletonContainer}>
            <ContentLoader
              speed={1.8}
              width={150}
              height={220}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
            >
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <React.Fragment key={i}>
                    <Circle
                      cx="10"
                      cy={20 + i * 20}
                      r="6"
                      fill={backgroundColor}
                    />
                    <Rect
                      x="25"
                      y={13 + i * 20}
                      rx="3"
                      ry="3"
                      width="40"
                      height="14"
                    />
                    <Rect
                      x="100"
                      y={13 + i * 20}
                      rx="3"
                      ry="3"
                      width="35"
                      height="14"
                    />
                  </React.Fragment>
                ))}
            </ContentLoader>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

const PortfolioItemSkeleton = ({ index }: { index: number }) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const cardBackgroundColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const backgroundColor = isDark ? "#2c2c2c" : "#ececec";
  const foregroundColor = isDark ? "#3d3d3d" : "#dddddd";

  return (
    <ThemedView
      style={[styles.legendItem, { backgroundColor: cardBackgroundColor }]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.tickerContainer}>
          <View
            style={[
              styles.colorIndicator,
              { backgroundColor: backgroundColor },
            ]}
          />
          <ContentLoader
            speed={1.8}
            width={100}
            height={35}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="5" rx="4" ry="4" width="90" height="25" />
          </ContentLoader>
        </View>

        <ContentLoader
          speed={1.8}
          width={80}
          height={35}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        >
          <Rect x="10" y="5" rx="3" ry="3" width="70" height="25" />
        </ContentLoader>
      </View>

      <View style={[styles.cardDivider, { backgroundColor: borderColor }]} />

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <ContentLoader
            speed={1.8}
            width={80}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="80" height="15" />
          </ContentLoader>

          <ContentLoader
            speed={1.8}
            width={120}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="120" height="15" />
          </ContentLoader>
        </View>

        <View style={styles.detailRow}>
          <ContentLoader
            speed={1.8}
            width={100}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="100" height="15" />
          </ContentLoader>

          <ContentLoader
            speed={1.8}
            width={120}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="120" height="15" />
          </ContentLoader>
        </View>

        <View style={styles.detailRow}>
          <ContentLoader
            speed={1.8}
            width={90}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="90" height="15" />
          </ContentLoader>

          <ContentLoader
            speed={1.8}
            width={120}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="120" height="15" />
          </ContentLoader>
        </View>

        <View style={styles.detailRow}>
          <ContentLoader
            speed={1.8}
            width={70}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="70" height="15" />
          </ContentLoader>

          <ContentLoader
            speed={1.8}
            width={100}
            height={20}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            <Rect x="0" y="2" rx="3" ry="3" width="100" height="15" />
          </ContentLoader>
        </View>
      </View>
    </ThemedView>
  );
};

const PortfolioItemsSkeletonList = ({ count = 4 }) => {
  return (
    <View style={styles.legendOuterContainer}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <PortfolioItemSkeleton key={index} index={index} />
        ))}
    </View>
  );
};

const PortfolioSkeleton = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <ThemedText style={styles.title}>Portfolio</ThemedText>
        <PieChartSkeleton />
        <PortfolioItemsSkeletonList />
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
  chartSkeletonContainer: {
    padding: 16,
  },
  summaryContainer: {
    borderRadius: 10,
    padding: 12,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  chartWrapper: {
    height: 220,
    alignItems: "center",
  },
  pieChartSkeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  pieCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  legendSkeletonContainer: {
    flex: 1,
    marginLeft: 20,
  },
  legendOuterContainer: {
    padding: 16,
  },
  legendItem: {
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  tickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  cardDivider: {
    height: 1,
    width: "100%",
  },
  cardBody: {
    padding: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
});

export { PortfolioSkeleton };
export default PortfolioSkeleton;
