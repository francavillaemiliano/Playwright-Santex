import { useState } from 'react';

export const useStateWithStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : initialValue;
    } catch (error) {
      console.error('Error parsing stored data:', error);
      return initialValue;
    }
  });

  const setStateWithStorage = (newValue: T) => {
    try {
      setState(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return [state, setStateWithStorage];
};
