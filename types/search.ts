import { Instrument } from "./models";

export type SearchBarProps = {
  value: string;
  onSearch: (query: string) => void;
  isSearching: boolean;
};

export type UseSearchTickerResult = {
  searchQuery: string;
  searchResults: Instrument[];
  isSearching: boolean;
  handleSearch: (query: string) => void;
  error?: Error | null;
};
