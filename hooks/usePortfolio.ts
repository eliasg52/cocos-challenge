import { useQuery } from "@tanstack/react-query";
import tradingApi from "@/api/tradingApi";
import { Portfolio } from "@/types";

export const usePortfolio = () => {
  return useQuery<Portfolio[]>({
    queryKey: ["portfolio"],
    queryFn: tradingApi.getPortfolio,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};
