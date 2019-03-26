import { checkSequenceForFibonaci } from "./checkSequenceForFibonacci";

it("detects a full length fibonacci sequence", () => {
  const sequence = [2, 3, 5, 8, 13, 21, 34, 55, 89];
  expect(checkSequenceForFibonaci(sequence)).toEqual([0, 9]);
});

it("detects a fibonacci sequence which starts at the second index", () => {
  const sequence = [123, 3, 5, 8, 13, 21, 34, 55, 89];
  expect(checkSequenceForFibonaci(sequence)).toEqual([1, 8]);
});

it("detects a fibonacci sequence at the end", () => {
  const sequence = [123, 123, 123, 123, 13, 21, 34, 55, 89];
  expect(checkSequenceForFibonaci(sequence)).toEqual([4, 5]);
});

it("detects a fibonacci sequence starting with 2 ones", () => {
  const sequence = [1, 1, 2, 3, 5, 13, 34, 55, 89];
  expect(checkSequenceForFibonaci(sequence)).toEqual([0, 5]);
});

it("correctly determines the start location of the sequence", () => {
  const sequence = [1, 1, 1, 2, 3, 5, 13, 34, 55];
  expect(checkSequenceForFibonaci(sequence)).toEqual([1, 5]);
});

it("correctly determines the start location of the sequence", () => {
  const sequence = [5, 1, 6, 123, 5, 1, 2, 3, 4];
  expect(checkSequenceForFibonaci(sequence)).toEqual([-1, 0]);
});
