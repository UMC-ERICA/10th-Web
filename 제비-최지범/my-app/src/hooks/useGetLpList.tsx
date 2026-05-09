import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../types/common";
import { fetchLpDetail, getLps } from "../apis/lpAPI";

export function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
  return useQuery({
    queryKey: ["lps", order],
    queryFn: () => {
      return getLps({ cursor, limit, search, order });
    },
    staleTime: 30_000, // 30초 동안은 fresh로 간주(불필요한 네트워크 감소)
    gcTime: 5 * 60 * 1000, // 5분 후 사용되지 않는 캐시 정리(메모리 관리)
    retry: 1, // 실패 시 재시도 횟수(기본 3에서 낮추기 등)
  });
}

export function useGetLpDetail(id: number) {
  return useQuery({
    queryKey: ["lp", id],
    queryFn: () => {
      return fetchLpDetail(id);
    },
    staleTime: 30_000, // 30초 동안은 fresh로 간주(불필요한 네트워크 감소)
    gcTime: 5 * 60 * 1000, // 5분 후 사용되지 않는 캐시 정리(메모리 관리)
    retry: 1, // 실패 시 재시도 횟수(기본 3에서 낮추기 등)
  });
}
