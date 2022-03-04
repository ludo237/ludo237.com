import { useMemo } from "react";

/**
 * Merge and unified Tailwindcss classes
 * @param func
 */
export const createMemoClass = (func: (props: any) => string) => {
  return function useMemoClass (args?: any) {
    const dependencies = typeof args === "object" && args !== null
      ? Object.keys(args)
        .filter((key) => key !== "theme")
        .map((key) => args[key])
      : [];

    return useMemo(() => func(args), dependencies);
  };
};

/**
 * Simulate a delayed callback. Thanks to https://stackoverflow.com/a/53384583
 * @param delay
 * @param callback
 */
export const delay = async (delay: number = 1000, callback: Function) => {
  const delayPromise = (milliseconds: number | undefined) => new Promise(response => setTimeout(response, milliseconds));
  await delayPromise(delay);

  callback();
};
