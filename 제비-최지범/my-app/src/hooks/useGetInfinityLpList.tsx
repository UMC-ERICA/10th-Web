import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps } from "../apis/lpAPI";

export default function useGetInfinityLpList(
  search: string,
  order: "asc" | "desc",
) {
  const trimmedSearch = search.trim();
  const isWhitespaceOnly = search.length > 0 && trimmedSearch.length === 0;

  return useInfiniteQuery({
    enabled: !isWhitespaceOnly,
    queryKey: ["lps", "infinite", trimmedSearch, order],
    queryFn: ({ pageParam = 0 }) =>
      getLps({
        cursor: pageParam,
        search: trimmedSearch,
        order: order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
}
