import { renderHook, act } from "@testing-library/react-native";
import { useOrderHistoryStore } from "@/store/orderStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderResponse, OrderStatus } from "@/types";

describe("Order History Store", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const { result } = renderHook(() => useOrderHistoryStore());
    act(() => {
      result.current.clearOrders();
    });
  });

  test("should add a new order correctly", () => {
    const { result } = renderHook(() => useOrderHistoryStore());

    const newOrder: OrderResponse = {
      id: "123",
      status: "PENDING" as OrderStatus,
    };

    const orderMetadata = {
      instrumentName: "Bitcoin",
      ticker: "BTC",
      price: "50000",
      quantity: 1,
      side: "BUY",
    };

    act(() => {
      result.current.addOrder(newOrder, orderMetadata);
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0]).toEqual(
      expect.objectContaining({
        ...newOrder,
        ...orderMetadata,
      })
    );

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  test("should clear orders correctly", () => {
    const { result } = renderHook(() => useOrderHistoryStore());

    act(() => {
      result.current.addOrder(
        {
          id: "123",
          status: "PENDING" as OrderStatus,
        },
        {
          instrumentName: "Bitcoin",
          ticker: "BTC",
          price: "50000",
          quantity: 1,
          side: "BUY",
        }
      );
    });

    expect(result.current.orders).toHaveLength(1);

    act(() => {
      result.current.clearOrders();
    });

    expect(result.current.orders).toHaveLength(0);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(3);
  });

  test("should calculate order total value correctly", () => {
    const { result } = renderHook(() => useOrderHistoryStore());

    act(() => {
      result.current.addOrder(
        {
          id: "123",
          status: "PENDING" as OrderStatus,
        },
        {
          instrumentName: "Bitcoin",
          ticker: "BTC",
          price: "50000",
          quantity: 2,
          side: "BUY",
        }
      );
    });

    const order = result.current.orders[0];
    const totalValue =
      order.quantity && order.price
        ? order.quantity * parseFloat(order.price.replace(/[^0-9.-]+/g, ""))
        : 0;

    expect(totalValue).toBe(100000);
  });
});
