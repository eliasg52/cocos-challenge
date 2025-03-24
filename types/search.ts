import { Instrument } from "./instrument";

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
};
