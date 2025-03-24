import { Instrument, Portfolio } from "@/types";

const BASE_URL = "https://dummy-api-topaz.vercel.app";
const INSTRUMENTS_URL = `${BASE_URL}/instruments`;
const PORTFOLIO_URL = `${BASE_URL}/portfolio`;
const SEARCH_URL = `${BASE_URL}/search?query=`;

const tradingApi = {
  getInstruments: async (): Promise<Instrument[]> => {
    try {
      const response = await fetch(INSTRUMENTS_URL);
      return response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getPortfolio: async (): Promise<Portfolio[]> => {
    try {
      const response = await fetch(PORTFOLIO_URL);
      return response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  searchInstrument: async (query: string): Promise<Instrument[]> => {
    try {
      const response = await fetch(`${SEARCH_URL}${query}`);
      return response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default tradingApi;
