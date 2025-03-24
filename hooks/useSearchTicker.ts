import { useState, useCallback } from "react";
import tradingApi from "@/api/tradingApi";
import { Instrument, UseSearchTickerResult } from "@/types";

export const useSearchTicker = (): UseSearchTickerResult => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Instrument[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debounceSearch = useCallback(() => {
    let timer: NodeJS.Timeout;

    return (query: string) => {
      const uppercaseQuery = query.toUpperCase();
      setSearchQuery(uppercaseQuery);
      clearTimeout(timer);

      if (!uppercaseQuery) {
        setIsSearching(false);
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      timer = setTimeout(async () => {
        try {
          const results = await tradingApi.searchInstrument(uppercaseQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    };
  }, []);

  const handleSearch = debounceSearch();

  return {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
  };
};

export default useSearchTicker;
