import { View, type ViewProps, StyleSheet, Platform } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: "default" | "card" | "bordered";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = "default",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant === "card" ? "card" : "background"
  );
  const borderColor = useThemeColor({}, "border");

  return (
    <View
      style={[
        { backgroundColor },
        variant === "bordered" && styles.bordered,
        variant === "bordered" && { borderColor },
        variant === "card" && styles.card,
        variant === "card" && Platform.OS === "android" && styles.cardAndroid,
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  bordered: {
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    borderRadius: 12,
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : {}),
  },
  cardAndroid: {
    elevation: 2,
    borderWidth: 0,
  },
});
