import { useMemo } from "react";
import { Instrument } from "@/types";

export function useFilteredInstruments(instruments: Instrument[] | undefined) {
  return useMemo(() => {
    if (!instruments) return [];
    return instruments.filter((instrument) => instrument.type !== "MONEDA");
  }, [instruments]);
}
