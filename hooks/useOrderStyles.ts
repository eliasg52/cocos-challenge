import { useThemeColor } from "@/hooks/useThemeColor";

export function useOrderStyles() {
  const accentColor = useThemeColor({}, "accent");
  const negativeColor = useThemeColor({}, "negative");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const positiveColor = useThemeColor({}, "positive");
  const borderColor = useThemeColor({}, "border");

  const getOrderStatusStyle = (status: string) => {
    status = status?.toUpperCase();
    switch (status) {
      case "FILLED":
        return "statusFilled";
      case "PENDING":
        return "statusPending";
      case "REJECTED":
        return "statusRejected";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    const style = getOrderStatusStyle(status);
    if (style === "statusFilled") return positiveColor;
    if (style === "statusPending") return accentColor;
    if (style === "statusRejected") return negativeColor;
    return textColor;
  };

  const getSideColor = (side?: string) => {
    if (side === "BUY") return positiveColor;
    if (side === "SELL") return negativeColor;
    return textColor;
  };

  const getSideText = (side?: string) => {
    if (side === "BUY") return "Buy";
    if (side === "SELL") return "Sell";
    return side || "";
  };

  const getStatusText = (status: string) => {
    status = status?.toUpperCase() || "";
    switch (status) {
      case "FILLED":
        return "Filled";
      case "PENDING":
        return "Pending";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  return {
    getOrderStatusStyle,
    getStatusColor,
    getSideColor,
    getSideText,
    getStatusText,
    positiveColor,
    negativeColor,
    accentColor,
    tintColor,
    textColor,
    borderColor,
  };
}
