import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getLpComments,
  type CommentOrder,
} from "../apis/lp";
import CommentSkeleton from "./CommentSkeleton";

type LpCommentsProps = {
  lpId: string;
};

export default function LpComments({ lpId }: LpCommentsProps) {
  const [order, setOrder] = useState<CommentOrder>("desc");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam }) =>
      getLpComments({
        lpId,
        order,
        cursor: pageParam,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

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

  if (isError) {
    return (
      <section className="mt-10 space-y-4 text-white">
        <p className="text-red-400">댓글을 불러오지 못했습니다.</p>
        <p className="text-sm text-gray-400">
          {error instanceof Error ? error.message : "알 수 없는 오류"}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md bg-pink-500 px-4 py-2 font-semibold"
        >
          다시 시도
        </button>
      </section>
    );
  }

  return (
    <section className="mt-10 space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">댓글</h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOrder("asc")}
            className={`rounded-md border px-3 py-2 text-sm ${
              order === "asc"
                ? "bg-white text-black"
                : "border-white/20 text-white"
            }`}
          >
            오래된순
          </button>

          <button
            type="button"
            onClick={() => setOrder("desc")}
            className={`rounded-md border px-3 py-2 text-sm ${
              order === "desc"
                ? "bg-white text-black"
                : "border-white/20 text-white"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          placeholder="댓글을 입력해주세요."
          className="flex-1 rounded-md bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-gray-400"
        />
        <button
          type="button"
          className="rounded-md bg-pink-500 px-4 py-2 font-semibold"
        >
          작성
        </button>
      </div>

      <p className="text-sm text-gray-400">
        댓글은 1자 이상 입력해주세요.
      </p>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && comments.length === 0 && (
        <p className="text-gray-400">아직 댓글이 없습니다.</p>
      )}

      {!isLoading && comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg bg-zinc-800 p-4">
              <p className="mb-2 text-sm font-semibold text-pink-300">
                {comment.author?.name || "익명"}
              </p>
              <p className="text-sm text-gray-200">{comment.content}</p>
              <p className="mt-2 text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-10" />
    </section>
  );
}