export const normalizeSearchQuery = (query: string): string => {
  return query.trim().toUpperCase();
};

export const debounce = (func: any, delay: number): any => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const filterInstrumentsByQuery = (
  instruments: any[],
  query: string
): any[] => {
  if (!query.trim()) return instruments;

  const normalizedQuery = normalizeSearchQuery(query);

  return instruments.filter(
    (instrument) =>
      instrument.ticker.includes(normalizedQuery) ||
      instrument.name.toUpperCase().includes(normalizedQuery)
  );
};
