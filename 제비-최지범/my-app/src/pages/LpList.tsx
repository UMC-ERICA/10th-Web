import { useGetLpList } from "../hooks/useGetLpList";
import type { LP } from "../types/music";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PaginationDto } from "../types/common";

const LpList = () => {
  const nav = useNavigate();
  const [paginationDto, setPaginationDto] = useState<PaginationDto>({
    cursor: 0,
    limit: 10,
    search: "",
    order: "asc",
  });

  const { data, isPending, refetch, isFetching, isError, error } =
    useGetLpList(paginationDto);

  useEffect(() => {
    refetch();
  }, [paginationDto]);

  if (isFetching) return <div>데이터를 불러오는중입니다...</div>;
  if (isError)
    return (
      <div>
        데이터를 불러오는중 오류가 생겼습니다.
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  if (error)
    return (
      <div>
        오류: {error.message}
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  if (isPending) return <div>데이터를 불러오는중입니다...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">LP 목록</h1>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 p-3">
        {data?.data.data.map((lp: LP) => (
          <div
            key={lp.id}
            className="bg-gray-100  mb-2 rounded-lg shadow-md flex flex-col gap-2"
            onClick={() => {
              nav(`/lps/${lp.id}`);
            }}
          >
            <div className="w-full aspect-square relative">
              <img src={lp.thumbnail} className="h-full w-full object-cover" />
              <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-end backdrop-blur-md bg-black/50 bg-opacity-50">
                <h4 className="text-white text-xl font-bold">{lp.title}</h4>{" "}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[0.6rem] text-white">{lp.createdAt}</p>
                  <p className="text-sm text-white text-right">
                    {lp.likes.length} 좋아요
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-red-500 text-white p-4 w-10 h-10 flex items-center justify-center rounded-full text-2xl"
        onClick={() => nav("/lps/add")}
      >
        +
      </button>
    </div>
  );
};

export default LpList;
