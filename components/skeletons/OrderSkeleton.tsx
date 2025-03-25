import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type OrderSkeletonProps = {
  name?: string;
  ticker?: string;
  price?: string;
  orderId?: string;
  status?: "PENDING" | "FILLED" | "REJECTED";
  onCreateNewOrder?: () => void;
  onCancel?: () => void;
};

/**
 * Un skeleton mejorado para la pantalla de órdenes pendientes
 */
const OrderSkeleton = ({
  name = "Capex S.A.",
  ticker = "CAPX",
  price = "$ 53,68",
  orderId = "213395",
  status = "PENDING",
  onCreateNewOrder,
  onCancel,
}: OrderSkeletonProps) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Determinar el color del estado según el status
  const getStatusColor = () => {
    switch (status) {
      case "FILLED":
        return "#4CAF50"; // Verde
      case "PENDING":
        return "#FF9800"; // Naranja
      case "REJECTED":
        return "#F44336"; // Rojo
      default:
        return "#FF9800";
    }
  };

  const handleCreateNewOrder = () => {
    if (onCreateNewOrder) {
      onCreateNewOrder();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Botón X para cerrar en la esquina superior derecha sin fondo */}
      <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      {/* Layout mejorado para evitar espacio vacío */}
      <View style={styles.contentContainer}>
        {/* Información del instrumento */}
        <View style={styles.instrumentInfoContainer}>
          <ThemedText style={styles.name}>{name}</ThemedText>
          <ThemedText style={styles.ticker}>{ticker}</ThemedText>
          <ThemedText style={styles.price}>Last Price: {price}</ThemedText>
        </View>

        {/* Información de la orden */}
        <View style={styles.orderContainer}>
          <ThemedText style={styles.orderId}>ID: {orderId}</ThemedText>
          <ThemedText style={[styles.orderStatus, { color: getStatusColor() }]}>
            Status: {status}
          </ThemedText>

          {/* Botón para crear nueva orden con tamaño más pequeño */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateNewOrder}
          >
            <ThemedText style={styles.buttonText}>Create New Order</ThemedText>
          </TouchableOpacity>

          {/* Botón para cancelar y cerrar el modal */}
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 0, // Elimina el padding inferior
  },
  closeButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Para asegurar que esté sobre otros elementos
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  instrumentInfoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ticker: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
  orderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20, // Añade margen inferior al contenedor
  },
  orderId: {
    fontSize: 18,
    marginBottom: 12,
  },
  orderStatus: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 30,
    color: "#FF3B30", // Rojo por defecto para REJECTED
  },
  createButton: {
    backgroundColor: "#3B82F6", // Azul
    paddingVertical: 12, // Padding más pequeño
    paddingHorizontal: 24, // Padding más pequeño
    borderRadius: 8,
    alignItems: "center",
    width: "80%", // Ancho reducido
    marginBottom: 12, // Espacio para el botón de cancelar
  },
  buttonText: {
    color: "white",
    fontSize: 16, // Tamaño de texto más pequeño
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5", // Gris claro
    paddingVertical: 12, // Padding más pequeño
    paddingHorizontal: 24, // Padding más pequeño
    borderRadius: 8,
    alignItems: "center",
    width: "80%", // Ancho reducido
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16, // Tamaño de texto más pequeño
    fontWeight: "500",
  },
});

export default OrderSkeleton;
