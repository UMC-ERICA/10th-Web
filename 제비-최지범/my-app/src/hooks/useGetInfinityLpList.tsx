import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps } from "../apis/lpAPI";

export default function useGetInfinityLpList(
  limit: number,
  search: string,
  order: "asc" | "desc",
) {
  return useInfiniteQuery({
    queryKey: ["lps", "infinite", search, order],
    queryFn: ({ pageParam = 0 }) =>
      getLps({
        cursor: pageParam,
        search: search,
        order: order,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
