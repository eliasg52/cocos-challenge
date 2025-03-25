import { OrderStatus } from "./models";

export type OrderConfirmationProps = {
  name?: string;
  ticker?: string;
  price?: string;
  orderId?: string;
  status?: OrderStatus;
  onCreateNewOrder?: () => void;
  onCancel?: () => void;
};

export type StatusStyleTypes =
  | "statusFilled"
  | "statusPending"
  | "statusRejected";
