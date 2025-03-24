import { useQuery } from "@tanstack/react-query";
import tradingApi from "@/api/tradingApi";
import { Instrument } from "@/types";

export const useInstruments = () => {
  return useQuery<Instrument[]>({
    queryKey: ["instruments"],
    queryFn: tradingApi.getInstruments,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};
