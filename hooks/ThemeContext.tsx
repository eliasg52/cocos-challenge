import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  colorScheme: "light" | "dark";
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  isThemeLoaded: boolean;
}

const THEME_STORAGE_KEY = "cocos_theme";

let initialTheme: ThemeType = "system";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceColorScheme = useDeviceColorScheme() || "light";
  const [theme, setThemeState] = useState<ThemeType>(initialTheme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const colorScheme = useMemo<"light" | "dark">(() => {
    return theme === "system"
      ? (deviceColorScheme as "light" | "dark")
      : (theme as "light" | "dark");
  }, [theme, deviceColorScheme]);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        }

        setIsThemeLoaded(true);
      } catch (error) {
        console.error("Error loading saved theme", error);
        setIsThemeLoaded(true);
      }
    };

    loadSavedTheme();
  }, []);

  const setTheme = useCallback(async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Error saving theme", error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme === "system") {
      setTheme(deviceColorScheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  }, [deviceColorScheme, theme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, colorScheme, setTheme, toggleTheme, isThemeLoaded }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
