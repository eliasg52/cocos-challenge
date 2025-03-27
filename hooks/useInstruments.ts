import { useQuery } from "@tanstack/react-query";
import { Instrument } from "@/types";
import tradingApi from "@/api/tradingApi";

export const useInstruments = () => {
  return useQuery<Instrument[]>({
    queryKey: ["instruments"],
    queryFn: tradingApi.getInstruments,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};
