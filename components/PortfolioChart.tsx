import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { PortfolioWithName } from "@/types";
import {
  formatCurrency,
  calculatePortfolioItemDetails,
  getValueType,
} from "@/utils";

interface PortfolioChartProps {
  portfolio: PortfolioWithName[];
}

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth;

const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio }) => {
  const portfolioWithValue = portfolio.filter(
    (item) => item.quantity * item.last_price > 0
  );

  if (portfolioWithValue.length === 0) {
    return null;
  }

  const totalValue = portfolioWithValue.reduce(
    (sum, item) => sum + item.quantity * item.last_price,
    0
  );

  const totalProfit = portfolioWithValue.reduce((acc, item) => {
    const { profit } = calculatePortfolioItemDetails(item);
    return acc + profit;
  }, 0);

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#5AD3D1",
    "#FFC154",
    "#A288E3",
    "#FF8A80",
  ];

  const chartData = portfolioWithValue.map((item, index) => {
    const {
      totalValue: marketValue,
      profit,
      profitPercentage,
    } = calculatePortfolioItemDetails(item);
    const percentage = ((marketValue / totalValue) * 100).toFixed(1);

    return {
      name: item.ticker,
      ticker: item.ticker,
      quantity: item.quantity,
      percentage: percentage,
      marketValue: marketValue,
      profit: profit,
      profitPercentage: profitPercentage,
      population: marketValue,
      color: colors[index % colors.length],
      legendFontColor: "#333",
      legendFontSize: 12,
    };
  });

  const chartConfig = {
    backgroundGradientFrom: "#F2F2F7",
    backgroundGradientTo: "#F2F2F7",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.summaryContainer}>
        <ThemedText style={styles.totalValueTitle}>Total Value:</ThemedText>
        <ThemedText style={styles.totalValueAmount}>
          {formatCurrency(totalValue)}
        </ThemedText>

        <ThemedText style={styles.totalProfitTitle}>Total Profit:</ThemedText>
        <ThemedText
          style={[styles.totalProfitAmount, styles[getValueType(totalProfit)]]}
        >
          {formatCurrency(totalProfit)}
        </ThemedText>
      </View>

      <View style={styles.chartWrapper}>
        <PieChart
          data={chartData}
          width={chartWidth}
          height={270}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="30"
          absolute={false}
          hasLegend={true}
        />
      </View>

      {/* Leyenda personalizada con información completa */}
      <View style={styles.legendOuterContainer}>
        <ScrollView style={styles.legendContainer}>
          <View>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={styles.legendHeader}>
                  <View
                    style={[
                      styles.colorIndicator,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <ThemedText style={styles.legendTicker}>
                    {item.ticker}
                  </ThemedText>
                  <ThemedText style={styles.legendPercentage}>
                    {item.percentage}%
                  </ThemedText>
                </View>

                <View style={styles.legendDetails}>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>
                      Quantity:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {item.quantity} shares
                    </ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>
                      Market Value:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {formatCurrency(item.marketValue)}
                    </ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>
                      Profit/Loss:
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.detailValue,
                        item.profit > 0
                          ? styles.positive
                          : item.profit < 0
                          ? styles.negative
                          : styles.neutral,
                      ]}
                    >
                      {formatCurrency(item.profit)}
                    </ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Return:</ThemedText>
                    <ThemedText
                      style={[
                        styles.detailValue,
                        item.profitPercentage > 0
                          ? styles.positive
                          : item.profitPercentage < 0
                          ? styles.negative
                          : styles.neutral,
                      ]}
                    >
                      {item.profitPercentage.toFixed(2)}%
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
  summaryContainer: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalValueTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
    color: "#666",
    fontWeight: "500",
  },
  totalValueAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  totalProfitTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
    color: "#666",
    fontWeight: "500",
  },
  totalProfitAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    marginVertical: 20,
    marginHorizontal: 20,
    width: "100%",
  },
  legendOuterContainer: {
    flex: 1,
    marginTop: 10,
  },
  legendContainer: {
    flex: 1,
    marginBottom: 50,
  },
  legendItem: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  legendHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendTicker: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  legendPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  legendDetails: {
    marginTop: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  positive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  negative: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
  neutral: {
    color: "#888",
    fontWeight: "500",
  },
});

export default PortfolioChart;
