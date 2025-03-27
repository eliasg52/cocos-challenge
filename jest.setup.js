import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0]?.includes("componentWillReceiveProps") ||
    args[0]?.includes("componentWillMount") ||
    args[0]?.includes("DatePickerIOS") ||
    args[0]?.includes("React does not recognize the")
  ) {
    return;
  }
  originalWarn(...args);
};

global.fetch = jest.fn();

jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true, null]),
  loadAsync: jest.fn(() => Promise.resolve()),
}));
