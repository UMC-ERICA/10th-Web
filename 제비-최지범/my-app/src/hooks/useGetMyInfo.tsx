import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";

export function useGetMyInfo(enabled: boolean) {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled,
    select: (res) => res.data,
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
}
