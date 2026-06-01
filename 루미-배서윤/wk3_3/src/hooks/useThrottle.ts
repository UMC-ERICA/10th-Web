import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastUpdated.current);

    if (remaining <= 0) {
      // 인터벌이 지났으면 즉시 반영
      lastUpdated.current = now;
      setThrottledValue(value);
      console.log("스로틀 실행됨: 이벤트 처리");
    } else {
      // 남은 시간 후 반영 (마지막 값 보장)
      console.log(`스로틀 대기 중: ${remaining}ms 후 처리`);
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
        console.log("스로틀 실행됨: 이벤트 처리");
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}
