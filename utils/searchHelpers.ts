/**
 * Normaliza y prepara una consulta de búsqueda para su uso
 * @param query - La consulta original ingresada por el usuario
 * @returns Consulta normalizada en mayúsculas y sin espacios extras
 */
export const normalizeSearchQuery = (query: string): string => {
  return query.trim().toUpperCase();
};

/**
 * Aplica debounce a una función para evitar múltiples llamadas en un período corto de tiempo
 * @param func - La función a la que aplicar debounce
 * @param delay - El tiempo de retraso en ms
 * @returns Una versión con debounce de la función
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Filtra instrumentos localmente por ticker o nombre
 * Útil para búsquedas rápidas cuando ya tenemos los datos cargados
 * @param instruments - Lista de instrumentos a filtrar
 * @param query - Consulta de búsqueda (ticker o nombre)
 * @returns Instrumentos filtrados que coinciden con la consulta
 */
export const filterInstrumentsByQuery = <
  T extends { ticker: string; name: string }
>(
  instruments: T[],
  query: string
): T[] => {
  if (!query.trim()) return instruments;

  const normalizedQuery = normalizeSearchQuery(query);

  return instruments.filter(
    (instrument) =>
      instrument.ticker.includes(normalizedQuery) ||
      instrument.name.toUpperCase().includes(normalizedQuery)
  );
};
