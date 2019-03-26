import { isFibonacciNumber } from "./isFiboniacciNumber";

it("returns the next fibonacci number", () => {
  expect(isFibonacciNumber(1)).toEqual(true);
  expect(isFibonacciNumber(2)).toEqual(true);
  expect(isFibonacciNumber(3)).toEqual(true);
  expect(isFibonacciNumber(4)).toEqual(false);
  expect(isFibonacciNumber(5)).toEqual(true);
  expect(isFibonacciNumber(6)).toEqual(false);
  expect(isFibonacciNumber(123)).toEqual(false);
  expect(isFibonacciNumber(1)).toEqual(true);
});
