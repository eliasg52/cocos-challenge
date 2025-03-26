import React from "react";
import { View, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SearchBarProps } from "@/types";
import { useThemeColor } from "@/hooks/useThemeColor";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSearch,
  isSearching,
}) => {
  const inputBgColor = useThemeColor({}, "input");
  const borderColor = useThemeColor({}, "inputBorder");
  const textColor = useThemeColor({}, "text");
  const placeholderColor = useThemeColor({}, "secondaryText");
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: inputBgColor,
            borderColor: borderColor,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={iconColor}
          style={styles.searchIcon}
        />

        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search tickers..."
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onSearch}
          autoCapitalize="characters"
        />

        {isSearching && (
          <ActivityIndicator
            size="small"
            color={iconColor}
            style={styles.searchLoader}
          />
        )}

        {value && !isSearching && (
          <Ionicons
            name="close-circle"
            size={20}
            color={iconColor}
            style={styles.clearIcon}
            onPress={() => onSearch("")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchLoader: {
    marginLeft: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
});

export default SearchBar;
