const memoizedIsFibonacciNumber = () => {
  const fib: { [key: string]: boolean } = {};

  return (number: number) => {
    if (fib[number]) return true;
    const calculated = 5 * number ** 2 + 4;
    const isFib = Number.isInteger(Math.sqrt(calculated)) || Number.isInteger(Math.sqrt(calculated - 8));
    fib[number] = isFib;
    return isFib;
  };
};

export const isFibonacciNumber = memoizedIsFibonacciNumber();
