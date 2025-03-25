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

// Dimensiones para el gráfico
const screenWidth = Dimensions.get("window").width;
const chartSize = 220; // Tamaño fijo para el gráfico

const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio }) => {
  // Filtrar entradas con valor de mercado > 0
  const portfolioWithValue = portfolio.filter(
    (item) => item.quantity * item.last_price > 0
  );

  // No mostrar nada si no hay datos
  if (portfolioWithValue.length === 0) {
    return null;
  }

  // Calcular valor total del portfolio
  const totalValue = portfolioWithValue.reduce(
    (sum, item) => sum + item.quantity * item.last_price,
    0
  );

  // Calcular ganancia total
  const totalProfit = portfolioWithValue.reduce((acc, item) => {
    const { profit } = calculatePortfolioItemDetails(item);
    return acc + profit;
  }, 0);

  // Definir colores para el gráfico
  const colors = [
    "#FF6384", // Rosa
    "#36A2EB", // Azul
    "#FFCE56", // Amarillo
    "#4BC0C0", // Verde agua
    "#9966FF", // Morado
    "#FF9F40", // Naranja
    "#5AD3D1", // Turquesa
    "#FFC154", // Ámbar
    "#A288E3", // Lavanda
    "#FF8A80", // Rojo claro
  ];

  // Preparar datos para el gráfico
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
      population: marketValue, // La librería usa "population" como valor numérico
      color: colors[index % colors.length],
      legendFontColor: "#333",
      legendFontSize: 12,
    };
  });

  // Configurar el gráfico
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.summaryContainer}>
        <ThemedText style={styles.subtitle}>
          Total Value: {formatCurrency(totalValue)}
        </ThemedText>
        <ThemedText
          style={[styles.subtitle, styles[getValueType(totalProfit)]]}
        >
          Total Profit: {formatCurrency(totalProfit)}
        </ThemedText>
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={chartSize}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute={false}
          hasLegend={false}
        />
      </View>

      {/* Leyenda personalizada con información completa */}
      <View style={styles.legendOuterContainer}>
        <ScrollView style={styles.legendContainer}>
          <View style={styles.legendList}>
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
    marginBottom: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
    color: "#666",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: chartSize,
    marginVertical: 10,
  },
  legendOuterContainer: {
    flex: 1,
    marginTop: 5,
  },
  legendContainer: {
    flex: 1,
    marginBottom: 60, // Espacio adicional al final para asegurar scroll completo
  },
  legendList: {},
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
    color: "green",
  },
  negative: {
    color: "red",
  },
  neutral: {
    color: "#888",
  },
});

export default PortfolioChart;
