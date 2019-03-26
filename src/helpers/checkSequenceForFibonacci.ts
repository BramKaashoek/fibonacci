import { isFibonacciNumber } from "./isFiboniacciNumber";
import { nextFibonacciNumber } from "./nextFibonacciNumber";

export const checkSequenceForFibonaci = (sequence: number[]) => {
  const minLength = 5;

  const fibSequences = sequence.map((value, startIndex) => {
    if (startIndex + minLength > sequence.length) return [-1, 0];
    if (value === 0 || !isFibonacciNumber(value)) return [-1, 0];

    let i;
    let length = 1;
    for (i = 0; i + startIndex < sequence.length; i++) {
      if (i === 0 && value === 1 && sequence[startIndex + 1] === 1) {
        length += 1;
      } else if (sequence[startIndex + i + 1] === nextFibonacciNumber(sequence[startIndex + i])) {
        length += 1;
      } else {
        break;
      }
    }

    if (length >= minLength) return [startIndex, length];
    return [-1, 0];
  });
  const sequenceIndex = fibSequences.findIndex(e => e[0] !== -1);
  return sequenceIndex > -1 ? fibSequences[sequenceIndex] : [-1, 0];
};
