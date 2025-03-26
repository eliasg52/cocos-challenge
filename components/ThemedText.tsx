import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "heading"
    | "subheading"
    | "defaultSemiBold"
    | "subtitle"
    | "caption"
    | "link"
    | "secondary";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const secondaryColor = useThemeColor({}, "secondaryText");

  let textColor = color;

  // Adjust color based on type
  if (type === "secondary") {
    textColor = secondaryColor;
  } else if (type === "link") {
    textColor = useThemeColor({}, "tint");
  }

  return (
    <Text
      style={[
        { color: textColor },
        type === "default" ? styles.default : undefined,
        type === "heading" ? styles.heading : undefined,
        type === "title" ? styles.title : undefined,
        type === "subheading" ? styles.subheading : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "link" ? styles.link : undefined,
        type === "secondary" ? styles.secondary : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "System",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "System",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 38,
    letterSpacing: -0.5,
    fontFamily: "System",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    letterSpacing: -0.3,
    fontFamily: "System",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "System",
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "System",
  },
  secondary: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "System",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    textDecorationLine: "none",
    fontFamily: "System",
  },
});
