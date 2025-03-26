/**
 * Paleta de colores basada en Cocos Capital y aplicaciones financieras modernas como Coinbase y Binance.
 * Los colores están definidos para modo claro y oscuro, manteniendo una estética profesional y moderna.
 */

// Colores principales
const primaryColor = "#37AB90"; // Verde Cocos
const secondaryColor = "#0ABAB5"; // Turquesa Cocos
const accentColor = "#FFB21E"; // Naranja para acentos y CTA

export const Colors = {
  light: {
    text: "#121212",
    secondaryText: "#687076",
    background: "#FFFFFF",
    card: "#F9F9F9",
    border: "#E7E7E7",
    tint: primaryColor,
    accent: accentColor,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryColor,
    positive: "#37AB90", // Verde para valores positivos
    negative: "#FF5252", // Rojo para valores negativos
    neutral: "#687076", // Neutro para valores sin cambio
    input: "#F5F5F5", // Color de fondo para inputs
    inputBorder: "#E7E7E7", // Borde para inputs
  },
  dark: {
    text: "#FFFFFF",
    secondaryText: "#9BA1A6",
    background: "#121212",
    card: "#1E1E1E",
    border: "#2A2A2A",
    tint: primaryColor,
    accent: accentColor,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryColor,
    positive: "#37AB90", // Verde para valores positivos
    negative: "#FF5252", // Rojo para valores negativos
    neutral: "#9BA1A6", // Neutro para valores sin cambio
    input: "#1E1E1E", // Color de fondo para inputs
    inputBorder: "#2A2A2A", // Borde para inputs
  },
};
