import { useInfiniteQuery } from "@tanstack/react-query";

import { getComments } from "../apis/lpAPI";
import type { PaginationDto } from "../types/common";
export default function useGetInfinityCommentList(
  lpId: number,
  paginationDto: PaginationDto,
) {
  return useInfiniteQuery({
    queryKey: ["comments", "infinite", lpId, paginationDto.order],
    queryFn: ({ pageParam = 0 }) =>
      getComments(lpId, {
        cursor: pageParam,
        limit: paginationDto.limit,
        order: paginationDto.order,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
