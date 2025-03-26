export type OrderFormParams = {
  id?: string;
  name?: string;
  ticker?: string;
  last_price?: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: { [key: string]: string };
};

export type InputMode = "quantity" | "investment";
