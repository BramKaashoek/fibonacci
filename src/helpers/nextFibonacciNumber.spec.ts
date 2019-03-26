import { nextFibonacciNumber } from "./nextFibonacciNumber";

it("returns the next fibonacci number", () => {
  expect(nextFibonacciNumber(2)).toEqual(3);
  expect(nextFibonacciNumber(3)).toEqual(5);
  expect(nextFibonacciNumber(1)).toEqual(2);
  expect(nextFibonacciNumber(5)).toEqual(8);
  expect(nextFibonacciNumber(8)).toEqual(13);
  expect(nextFibonacciNumber(13)).toEqual(21);
  expect(nextFibonacciNumber(21)).toEqual(34);
  expect(nextFibonacciNumber(34)).toEqual(55);
  expect(nextFibonacciNumber(55)).toEqual(89);
});
