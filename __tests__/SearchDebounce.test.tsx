import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { View, TextInput, Text } from "react-native";

const SearchComponent = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  return (
    <View>
      <TextInput
        testID="search-input"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
      />
      <Text testID="search-term">{searchTerm}</Text>
    </View>
  );
};

describe("Search with Debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should debounce search input correctly", async () => {
    const mockSearchFn = jest.fn();
    const { getByTestId } = render(<SearchComponent onSearch={mockSearchFn} />);
    const searchInput = getByTestId("search-input");

    fireEvent.changeText(searchInput, "a");
    expect(getByTestId("search-term").props.children).toBe("a");
    expect(mockSearchFn).not.toHaveBeenCalled();

    fireEvent.changeText(searchInput, "ap");
    expect(getByTestId("search-term").props.children).toBe("ap");
    expect(mockSearchFn).not.toHaveBeenCalled();

    fireEvent.changeText(searchInput, "app");
    expect(getByTestId("search-term").props.children).toBe("app");

    jest.advanceTimersByTime(100);
    expect(mockSearchFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(mockSearchFn).toHaveBeenCalledTimes(1);
    expect(mockSearchFn).toHaveBeenCalledWith("app");
  });

  test("should cancel previous search if new input provided", async () => {
    const mockSearchFn = jest.fn();
    const { getByTestId } = render(<SearchComponent onSearch={mockSearchFn} />);
    const searchInput = getByTestId("search-input");

    fireEvent.changeText(searchInput, "initial");
    jest.advanceTimersByTime(200);
    fireEvent.changeText(searchInput, "updated");
    jest.advanceTimersByTime(200);
    expect(mockSearchFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(mockSearchFn).toHaveBeenCalledTimes(1);
    expect(mockSearchFn).toHaveBeenCalledWith("updated");
    expect(mockSearchFn).not.toHaveBeenCalledWith("initial");
  });
});
