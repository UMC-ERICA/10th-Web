import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps, type SortType } from "../apis/lp";
import LpCard from "../components/LpCard";
import CardSkeleton from "../components/CardSkeleton";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";

const RECENT_KEY = "lp_recent_searches";

export default function LpList() {
  const [sort, setSort] = useState<SortType>("desc");
  const [search, setSearch] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchAreaRef = useRef<HTMLDivElement | null>(null);

  const debouncedQuery = useDebounce(search, 300);
  const throttledIntersecting = useThrottle(isIntersecting, 1000);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    setRecentSearches((prev) => {
      const next = [
        debouncedQuery.trim(),
        ...prev.filter((s) => s !== debouncedQuery.trim()),
      ].slice(0, 10);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!searchAreaRef.current?.contains(e.target as Node)) {
        setShowRecent(false);
        setShowTagMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const removeRecent = (term: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((s) => s !== term);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_KEY);
  };

  const applyRecent = (term: string) => {
    setSearch(term);
    setShowRecent(false);
  };

  const isEnabled = debouncedQuery === "" || debouncedQuery.trim().length > 0;

  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lps", sort, debouncedQuery],
      queryFn: ({ pageParam }) =>
        getLps({ sort, cursor: pageParam, search: debouncedQuery.trim() || undefined }),
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
      enabled: isEnabled,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    });

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [!!data]);

  useEffect(() => {
    if (throttledIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [throttledIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2 text-white">
        <p className="text-red-400">
          {error instanceof Error ? error.message : "LP 목록을 불러오지 못했습니다."}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded bg-pink-500 px-4 py-2 text-sm text-white"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const gridCls = "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4";
  const sortBtnCls = (active: boolean) =>
    `rounded border px-4 py-1.5 text-sm ${active ? "bg-white text-black" : "border-white/20 text-white"}`;

  return (
    <section>
      <div ref={searchAreaRef} className="relative mb-6">
        <div className="flex">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowRecent(true)}
              placeholder="검색어를 입력하세요"
              className="w-full rounded-l border border-white/20 bg-zinc-900 py-2 pl-9 pr-4 text-white placeholder-gray-500 outline-none focus:border-pink-500"
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTagMenu((v) => !v)}
              className="flex h-full items-center gap-1 rounded-r border border-l-0 border-white/20 bg-zinc-900 px-4 text-sm text-white"
            >
              태그 ▾
            </button>
            {showTagMenu && (
              <div className="absolute right-0 top-full z-20 mt-1 w-24 rounded border border-white/20 bg-zinc-900 py-1 text-sm">
                <button className="block w-full px-3 py-1.5 text-left text-white hover:bg-white/10">제목</button>
                <button className="block w-full px-3 py-1.5 text-left text-white hover:bg-white/10">태그</button>
              </div>
            )}
          </div>
        </div>

        {showRecent && (
          <div className="absolute left-0 right-0 top-full z-10 rounded-b border border-t-0 border-white/20 bg-zinc-900 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-300">최근 검색어</span>
              {recentSearches.length > 0 && (
                <button type="button" onClick={clearAllRecent} className="text-xs text-gray-400 hover:text-white">
                  모두 지우기
                </button>
              )}
            </div>
            {recentSearches.length === 0 ? (
              <p className="text-xs text-gray-500">최근 검색어가 없습니다.</p>
            ) : (
              <ul>
                {recentSearches.map((term) => (
                  <li key={term} className="flex items-center gap-2 py-1">
                    <button type="button" onClick={() => removeRecent(term)} className="text-gray-400 hover:text-white" aria-label="삭제">
                      ×
                    </button>
                    <button type="button" onClick={() => applyRecent(term)} className="text-sm text-white hover:text-pink-400">
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => setSort("asc")} className={sortBtnCls(sort === "asc")}>오래된순</button>
        <button type="button" onClick={() => setSort("desc")} className={sortBtnCls(sort === "desc")}>최신순</button>
      </div>

      {lps.length === 0 ? (
        <p className="py-20 text-center text-gray-400">
          {debouncedQuery.trim() ? `"${debouncedQuery.trim()}" 검색 결과가 없습니다.` : "아직 LP가 없습니다."}
        </p>
      ) : (
        <div className={gridCls}>
          {lps.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        </div>
      )}

      {isFetchingNextPage && (
        <div className={`mt-2 ${gridCls}`}>
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      <div ref={observerRef} className="h-10" />
    </section>
  );
}
