export const nextFibonacciNumber = (number: number) => {
  const phi = 1.61803398875;
  const n = Math.round(Math.log(number * Math.sqrt(5) + 0.5) / Math.log(phi));
  return calculateNthFibonacci(n + 1);
};

const memoizeCalculateNthFibonacci = () => {
  const fib: { [key: string]: number } = {};

  const calcFib = (n: number) => {
    if (n in fib) return fib[n];
    const value: number = n === 0 || n === 1 ? n : calcFib(n - 1) + calcFib(n - 2);
    fib[n] = value;
    return value;
  };

  return calcFib;
};

const calculateNthFibonacci = memoizeCalculateNthFibonacci();
