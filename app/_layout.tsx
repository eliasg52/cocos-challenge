import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  useColorScheme as useSystemColorScheme,
} from "react-native";

import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemeProvider, useTheme } from "@/hooks/ThemeContext";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const SPLASH_LIGHT_COLOR = "#FFFFFF";
const SPLASH_DARK_COLOR = "#121212";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      onLayoutRootView();
    }
  }, [loaded, onLayoutRootView]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent onLayout={onLayoutRootView} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent({ onLayout }: { onLayout: () => void }) {
  const { isThemeLoaded } = useTheme();
  const systemColorScheme = useSystemColorScheme() || "light";

  if (!isThemeLoaded) {
    const backgroundColor =
      systemColorScheme === "dark" ? SPLASH_DARK_COLOR : SPLASH_LIGHT_COLOR;

    const tintColor = Colors[systemColorScheme].tint;

    return (
      <View
        style={[styles.loadingContainer, { backgroundColor }]}
        onLayout={onLayout}
      >
        <ActivityIndicator size="large" color={tintColor} />
      </View>
    );
  }

  return <SafeAreaAwareLayout onLayout={onLayout} />;
}

function SafeAreaAwareLayout({ onLayout }: { onLayout: () => void }) {
  const insets = useSafeAreaInsets();
  const queryClient = new QueryClient();
  const { colorScheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemedView
        style={{ flex: 1, paddingTop: insets.top }}
        onLayout={onLayout}
      >
        <NavigationThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="order"
              options={{
                headerShown: false,
                title: "Orders",
                presentation: "modal",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </NavigationThemeProvider>
      </ThemedView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
