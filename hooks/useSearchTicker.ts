import { useState, useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import tradingApi from "@/api/tradingApi";
import { Instrument, UseSearchTickerResult } from "@/types";
import { useFilteredInstruments } from "./useFilteredInstruments";

export const useSearchTicker = (): UseSearchTickerResult => {
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!inputValue) {
      setDebouncedQuery("");
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data: searchResultsRaw = [],
    isLoading: isSearching,
    error,
  } = useQuery<Instrument[], Error>({
    queryKey: ["tickerSearch", debouncedQuery],
    queryFn: () => tradingApi.searchInstrument(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });

  const searchResults = useFilteredInstruments(searchResultsRaw);

  const handleSearch = useCallback((query: string) => {
    setInputValue(query.toUpperCase());
  }, []);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["instruments"],
      queryFn: tradingApi.getInstruments,
    });
  }, [queryClient]);

  return {
    searchQuery: inputValue,
    searchResults,
    isSearching,
    handleSearch,
    error,
  };
};

export default useSearchTicker;
