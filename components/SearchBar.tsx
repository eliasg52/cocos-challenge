import React from "react";
import { View, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { SearchBarProps } from "@/types";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSearch,
  isSearching,
}) => {
  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tickers..."
          placeholderTextColor="#888"
          value={value}
          onChangeText={onSearch}
          autoCapitalize="characters"
        />
        {isSearching && (
          <ActivityIndicator size="small" style={styles.searchLoader} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  searchLoader: {
    position: "absolute",
    right: 32,
  },
});

export default SearchBar;
