import { useState } from 'react';

export function useStateWithStorage<Type>(
  key: string,
  initialValue: Type[]
): [Type[], (value: Type[]) => void] {
  const [state, setState] = useState<Type[]>(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  const setStateWithStorage = (newValue: Type[]) => {
    setState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [state, setStateWithStorage];
}
