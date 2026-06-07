import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";

export default function LpDetail() {
  const { lpid } = useParams();

  const {
    data: lp,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(lpid as string),
    enabled: !!lpid,
    staleTime: 1000 * 60,
  });

  if (isPending) {
    return (
      <div className="flex min-h-[500px] items-center justify-center text-white">
        불러오는 중...
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <div className="space-y-4 text-center text-white">
        <p>상세 정보를 불러오지 못했습니다.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md bg-pink-500 px-4 py-2"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl rounded-2xl bg-zinc-900 p-8 text-white shadow-xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="mb-2 text-sm text-gray-400">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>

          <h1 className="text-4xl font-extrabold">{lp.title}</h1>
        </div>

        <div className="flex gap-3 text-xl">
          <button type="button">✏️</button>
          <button type="button">🗑️</button>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl">
        {lp.thumbnail && (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="mx-auto max-h-[500px] w-full object-cover"
          />
        )}
      </div>

      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold"
        >
          ♥ 좋아요 {lp.likes ?? 0}
        </button>
      </div>

      <article className="leading-8 text-gray-200">
        {lp.content || "내용이 없습니다."}
      </article>
    </section>
  );
}