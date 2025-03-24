import { useQuery } from "@tanstack/react-query";
import { useInstruments } from "./useInstruments";
import { usePortfolio } from "./usePortfolio";
import { PortfolioWithName } from "@/types";

export const useEnhancedPortfolio = () => {
  const instruments = useInstruments();
  const portfolio = usePortfolio();

  return useQuery<PortfolioWithName[], Error>({
    queryKey: ["enhancedPortfolio"],
    queryFn: async () => {
      // Only perform the query if both data sources are available
      if (!instruments.data || !portfolio.data) {
        return [];
      }

      // Combine portfolio with instrument names
      return portfolio.data.map((item, index) => {
        const instrument = instruments.data.find(
          (instr) => instr.id === item.instrument_id
        );
        return {
          ...item,
          name: instrument?.name || "Unknown",
          unique_id: `${item.instrument_id}-${item.quantity}-${index}`,
        };
      });
    },
    // Only run this query when both source queries are successful
    enabled: instruments.isSuccess && portfolio.isSuccess,
    // Use the shortest stale time of either source query
    staleTime: Math.min(
      ...[instruments.status, portfolio.status].map(
        (status) => (status === "success" ? 1000 * 60 * 5 : 0) // 5 minutes
      )
    ),
    // Return error from either source query
    ...((instruments.error || portfolio.error) && {
      error: instruments.error || portfolio.error,
    }),
    // Consider loading if either source query is loading
    ...((instruments.isLoading || portfolio.isLoading) && {
      status: "loading",
    }),
  });
};
