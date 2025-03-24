import { useState, useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import tradingApi from "@/api/tradingApi";
import { Instrument, UseSearchTickerResult } from "@/types";

export const useSearchTicker = (): UseSearchTickerResult => {
  // Separamos el estado del input (inmediato) del estado de la consulta (con debounce)
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const queryClient = useQueryClient();

  // Efecto para aplicar el debounce
  useEffect(() => {
    // Si el input está vacío, limpiamos la consulta inmediatamente
    if (!inputValue) {
      setDebouncedQuery("");
      return;
    }

    // Aplicamos el debounce
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 300);

    // Limpiamos el timer si el input cambia antes de que se complete el debounce
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Use React Query for search results
  const {
    data: searchResults = [],
    isLoading: isSearching,
    error,
  } = useQuery<Instrument[], Error>({
    queryKey: ["tickerSearch", debouncedQuery],
    queryFn: () => tradingApi.searchInstrument(debouncedQuery),
    enabled: debouncedQuery.length > 0, // Only search when there's a query
    staleTime: 1000 * 60, // Results remain fresh for 1 minute
    gcTime: 1000 * 60 * 5, // Garbage collection time
    retry: 1, // Only retry once on failure
  });

  // Función para manejar cambios en el input - esto se ejecuta inmediatamente
  const handleSearch = useCallback((query: string) => {
    setInputValue(query.toUpperCase());
  }, []);

  // Prefetch initial instruments to improve UX
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["instruments"],
      queryFn: tradingApi.getInstruments,
    });
  }, [queryClient]);

  return {
    searchQuery: inputValue, // Devolvemos el valor del input para mostrar en el UI
    searchResults: searchResults || [],
    isSearching,
    handleSearch,
    error,
  };
};

export default useSearchTicker;
