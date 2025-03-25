import React from "react";
import { View, StyleSheet, ScrollView, useColorScheme } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const PieChartSkeleton = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundColor = isDark ? "#2c2c2c" : "#ececec";
  const foregroundColor = isDark ? "#3d3d3d" : "#dddddd";

  return (
    <ThemedView style={styles.chartSkeletonContainer}>
      <View style={styles.summaryContainer}>
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
          <View style={styles.pieCircle} />

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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundColor = isDark ? "#2c2c2c" : "#ececec";
  const foregroundColor = isDark ? "#3d3d3d" : "#dddddd";

  return (
    <ThemedView style={styles.legendItem}>
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

      <View style={styles.cardDivider} />

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
  // Estilos para los skeletons
  chartSkeletonContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
  },
  summaryContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 0,
  },
  legendItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#ebebeb",
    marginVertical: 10,
  },
  cardBody: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  legendOuterContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  pieChartSkeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  pieCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#e9e9e9",
    position: "relative",
    overflow: "hidden",
  },
  legendSkeletonContainer: {
    marginLeft: 10,
  },
});

export { PortfolioSkeleton, PieChartSkeleton, PortfolioItemSkeleton };
export default PortfolioSkeleton;
