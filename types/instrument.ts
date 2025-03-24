export type Instrument = {
  id: number;
  ticker: string;
  name: string;
  type: string;
  last_price: number;
  close_price: number;
};

export type Portfolio = {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
};

export type PortfolioWithName = Portfolio & {
  name: string;
  unique_id?: string;
};

export type Order = {
  instrument_id: number;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: number;
  price?: number;
};

export type OrderResponse = {
  id: string;
  status: "PENDING" | "REJECTED" | "FILLED";
};
