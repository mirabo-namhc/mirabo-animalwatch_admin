import { useEffect, useCallback } from 'react';

export interface IUseDebounce {
  effect: () => void;
  dependencies: Array<any>;
  delay: number;
}

export default function useDebounce(effect: () => void, dependencies: Array<any>, delay: number) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
