import {
  StyleSheet,
  ViewProps,
  TouchableOpacity,
  Platform,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedCardProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  elevated?: boolean;
  interactive?: boolean;
  onPress?: () => void;
};

export function ThemedCard({
  style,
  lightColor,
  darkColor,
  elevated = false,
  interactive = false,
  onPress,
  children,
  ...otherProps
}: ThemedCardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "card"
  );
  const borderColor = useThemeColor({}, "border");

  const cardContent = (
    <ThemedView
      style={[
        styles.card,
        elevated && styles.elevated,
        elevated &&
          Platform.OS === "android" && [
            styles.elevatedAndroid,
            { backgroundColor },
          ],
        { borderColor },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </ThemedView>
  );

  if (interactive && onPress) {
    return (
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  elevatedAndroid: {
    elevation: 4,
    borderWidth: 0,
  },
});
