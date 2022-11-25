import { useEffect, useState } from "react";

const parseLocalStorageValue = <T>(key: string, initialValue: T): T => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }

  return initialValue;
};

export const useLocalStorageState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() =>
    parseLocalStorageValue(key, initialValue)
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
