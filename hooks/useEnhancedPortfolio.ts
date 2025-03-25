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
      if (!instruments.data || !portfolio.data) {
        return [];
      }

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

    enabled: instruments.isSuccess && portfolio.isSuccess,

    staleTime: Math.min(
      ...[instruments.status, portfolio.status].map(
        (status) => (status === "success" ? 1000 * 60 * 5 : 0) // 5 minutes
      )
    ),

    ...((instruments.error || portfolio.error) && {
      error: instruments.error || portfolio.error,
    }),

    ...((instruments.isLoading || portfolio.isLoading) && {
      status: "loading",
    }),
  });
};
