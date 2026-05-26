import { useEffect, useRef, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createLpComment,
  deleteLpComment,
  getLpComments,
  type CommentOrder,
  updateLpComment,
} from "../apis/lp";
import CommentSkeleton from "./CommentSkeleton";

type LpCommentsProps = {
  lpId: string;
};

export default function LpComments({ lpId }: LpCommentsProps) {
  const queryClient = useQueryClient();

  const currentUserId = Number(localStorage.getItem("userId"));

  const [order, setOrder] = useState<CommentOrder>("desc");
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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

  const createCommentMutation = useMutation({
    mutationFn: createLpComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId],
      });
      setCommentInput("");
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateLpComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId],
      });
      setEditingCommentId(null);
      setEditInput("");
      setOpenMenuId(null);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteLpComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId],
      });
      setOpenMenuId(null);
    },
  });

  const handleCreateComment = () => {
    const content = commentInput.trim();

    if (!content) return;

    createCommentMutation.mutate({
      lpId,
      content,
    });
  };

  const handleStartEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditInput(content);
    setOpenMenuId(null);
  };

  const handleUpdateComment = (commentId: number) => {
    const content = editInput.trim();

    if (!content) return;

    updateCommentMutation.mutate({
      lpId,
      commentId,
      content,
    });
  };

  const handleDeleteComment = (commentId: number) => {
    const isConfirmed = confirm("댓글을 삭제하시겠습니까?");

    if (!isConfirmed) return;

    deleteCommentMutation.mutate({
      lpId,
      commentId,
    });
  };

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
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCreateComment();
            }
          }}
          placeholder="댓글을 입력해주세요."
          className="flex-1 rounded-md bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={handleCreateComment}
          disabled={createCommentMutation.isPending}
          className="rounded-md bg-pink-500 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {createCommentMutation.isPending ? "작성 중" : "작성"}
        </button>
      </div>

      <p className="text-sm text-gray-400">댓글은 1자 이상 입력해주세요.</p>

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
            <div key={comment.id} className="relative rounded-lg bg-zinc-800 p-4">
              <div className="mb-2 flex items-start justify-between">
                <p className="text-sm font-semibold text-pink-300">
                  {comment.author?.name || "익명"}
                </p>

                {currentUserId === comment.author?.id && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenuId((prev) =>
                        prev === comment.id ? null : comment.id
                      )
                    }
                    className="rounded px-2 py-1 text-xl leading-none text-gray-400 hover:bg-zinc-700 hover:text-white"
                  >
                    ⋯
                  </button>
                )}
              </div>

              {openMenuId === comment.id && (
                <div className="absolute right-4 top-12 z-10 flex gap-2 rounded-md bg-zinc-900 p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() =>
                      handleStartEdit(comment.id, comment.content)
                    }
                    className="rounded-md bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600"
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="rounded-md bg-red-500 px-3 py-1 text-sm hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              )}

              {editingCommentId === comment.id ? (
                <div className="flex gap-2">
                  <input
                    value={editInput}
                    onChange={(event) => setEditInput(event.target.value)}
                    className="flex-1 rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                  />

                  <button
                    type="button"
                    onClick={() => handleUpdateComment(comment.id)}
                    disabled={updateCommentMutation.isPending}
                    className="rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold disabled:bg-gray-500"
                  >
                    완료
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditInput("");
                    }}
                    className="rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold hover:bg-zinc-600"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-200">{comment.content}</p>
              )}

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