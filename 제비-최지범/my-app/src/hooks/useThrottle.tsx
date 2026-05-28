import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRun = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestRef = useRef(value);
  latestRef.current = value;

  useEffect(() => {
    const flush = () => {
      lastRun.current = Date.now();
      setThrottledValue(latestRef.current);
      timerRef.current = null;
    };

    const now = Date.now();
    const elapsed = lastRun.current === 0 ? interval : now - lastRun.current;

    if (elapsed >= interval) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      flush();
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(flush, interval - elapsed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, interval]);

  return throttledValue;
}
