import type { LP } from "../types/music";

import { useEffect, useState } from "react";
import type { PaginationDto } from "../types/common";
import useGetInfinityLpList from "../hooks/useGetInfinityLpList";
import { useInView } from "react-intersection-observer";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";

const LpList = () => {
  const [paginationDto, setPaginationDto] = useState<PaginationDto>({
    limit: 10,
    search: "",
    order: "asc",
  });

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetInfinityLpList(
    paginationDto.limit,
    paginationDto.search,
    paginationDto.order,
  );
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, isPending]);

  return (
    <div>
      <h1 className="text-2xl font-bold">LP 목록</h1>
      <input
        type="text"
        placeholder="검색"
        onChange={(e) =>
          setPaginationDto({ ...paginationDto, search: e.target.value })
        }
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setPaginationDto({ ...paginationDto, order: "desc" })}
        >
          최신순
        </button>
        <button
          onClick={() => setPaginationDto({ ...paginationDto, order: "asc" })}
        >
          오래된순
        </button>
      </div>
      {isFetching && <div>데이터를 불러오는중입니다...</div>}
      {isError && <div>데이터를 불러오는중 오류가 생겼습니다.</div>}
      {error && <div>오류: {error.message}</div>}
      {isPending && <div>데이터를 불러오는중입니다...</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 p-3">
        {data?.pages.map((page) =>
          page.data.data.map((lp: LP) => <Card key={lp.id} {...lp} />),
        )}
        {isFetching &&
          Array.from({ length: paginationDto.limit }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>

      <div ref={ref}>{inView && "-"}</div>
    </div>
  );
};
export default LpList;
