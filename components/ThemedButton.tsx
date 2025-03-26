import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
  Platform,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function ThemedButton({
  title,
  variant = "primary",
  size = "medium",
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  disabled,
  ...rest
}: ThemedButtonProps) {
  const primaryColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");

  let bgColor;
  let txtColor;
  let borderColor;

  switch (variant) {
    case "primary":
      bgColor = primaryColor;
      txtColor = "#FFFFFF";
      borderColor = Platform.OS === "android" ? "transparent" : primaryColor;
      break;
    case "secondary":
      bgColor = accentColor;
      txtColor = "#FFFFFF";
      borderColor = Platform.OS === "android" ? "transparent" : accentColor;
      break;
    case "outline":
      bgColor = "transparent";
      txtColor = primaryColor;
      borderColor = primaryColor;
      break;
    case "text":
      bgColor = "transparent";
      txtColor = primaryColor;
      borderColor = "transparent";
      break;
  }

  let buttonStyle;
  let textStyle;

  switch (size) {
    case "small":
      buttonStyle = styles.buttonSmall;
      textStyle = styles.textSmall;
      break;
    case "medium":
      buttonStyle = styles.buttonMedium;
      textStyle = styles.textMedium;
      break;
    case "large":
      buttonStyle = styles.buttonLarge;
      textStyle = styles.textLarge;
      break;
  }

  const opacityStyle = disabled ? { opacity: 0.6 } : {};
  const isOutlineAndroid = Platform.OS === "android" && variant === "outline";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        { backgroundColor: bgColor, borderColor },
        variant !== "text" &&
          (Platform.OS === "ios"
            ? styles.withShadowIOS
            : styles.withShadowAndroid),
        isOutlineAndroid && styles.outlineAndroid,
        opacityStyle,
        style,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color={txtColor} />
        ) : (
          <>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Text style={[textStyle, { color: txtColor }]}>{title}</Text>
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  withShadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  withShadowAndroid: {
    elevation: 3,
  },
  outlineAndroid: {
    elevation: 0,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  textSmall: {
    fontSize: 14,
    fontWeight: "600",
  },
  textMedium: {
    fontSize: 16,
    fontWeight: "600",
  },
  textLarge: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
