import { useEffect, useState } from "react";

type UseCustomFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useCustomFetch<T>(url: string): UseCustomFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      setError("요청 URL이 없습니다.");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("데이터를 불러오지 못했습니다.");
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "데이터를 불러오는 중 문제가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useCustomFetch;