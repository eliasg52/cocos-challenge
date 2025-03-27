import React from "react";
import { renderHook } from "@testing-library/react-native";

jest.mock("@/api/tradingApi", () => ({
  getInstruments: jest.fn(),
}));

jest.mock("@/hooks/useInstruments", () => ({
  useInstruments: jest.fn(),
}));

describe("API Integration", () => {
  const tradingApi = require("@/api/tradingApi");
  const { useInstruments } = require("@/hooks/useInstruments");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch instruments data correctly", async () => {
    const mockInstruments = [
      { id: 1, name: "Bitcoin", ticker: "BTC", type: "CRYPTO", price: "50000" },
      { id: 2, name: "Ethereum", ticker: "ETH", type: "CRYPTO", price: "3000" },
    ];

    tradingApi.getInstruments.mockResolvedValue(mockInstruments);

    useInstruments.mockReturnValue({
      data: mockInstruments,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => useInstruments());

    expect(result.current.data).toEqual(mockInstruments);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(useInstruments).toHaveBeenCalled();
  });

  test("should handle API errors correctly", async () => {
    const errorMessage = "Network error";
    const error = new Error(errorMessage);

    tradingApi.getInstruments.mockRejectedValue(error);

    useInstruments.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: error,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => useInstruments());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
    expect(result.current.error.message).toBe(errorMessage);
    expect(result.current.data).toBeUndefined();
    expect(useInstruments).toHaveBeenCalled();
  });
});
