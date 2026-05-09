import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps, type SortType } from "../apis/lp";
import LpCard from "../components/LpCard";
import CardSkeleton from "../components/CardSkeleton";

export default function LpList() {
  const [sort, setSort] = useState<SortType>("desc");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam }) =>
      getLps({
        sort,
        cursor: pageParam,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 text-white">
        <p className="text-red-400">LP 목록을 불러오지 못했습니다.</p>
        <p className="text-sm text-gray-400">
          {error instanceof Error ? error.message : "알 수 없는 오류"}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md bg-pink-500 px-4 py-2 font-semibold text-white"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setSort("asc")}
          className={`rounded-md border px-4 py-2 text-sm ${
            sort === "asc" ? "bg-white text-black" : "border-white/20 text-white"
          }`}
        >
          오래된순
        </button>

        <button
          type="button"
          onClick={() => setSort("desc")}
          className={`rounded-md border px-4 py-2 text-sm ${
            sort === "desc" ? "bg-white text-black" : "border-white/20 text-white"
          }`}
        >
          최신순
        </button>
      </div>

      {lps.length === 0 && (
        <div className="flex min-h-[300px] items-center justify-center text-gray-400">
          아직 등록된 LP가 없습니다.
        </div>
      )}

      {lps.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {lps.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-10" />
    </section>
  );
}