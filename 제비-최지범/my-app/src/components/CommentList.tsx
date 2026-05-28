import { useParams } from "react-router-dom";
import useGetInfinityCommentList from "../hooks/useGetInfinityCommentList";
import type { PaginationDto } from "../types/common";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CommentSkeleton from "./CommentSkeleton";
import Comment from "./Comment";
import usePostComment from "../hooks/mutations/usePostComment";
import type { ResponseMyInfoDto } from "../types/auth";
import { useOutletContext } from "react-router-dom";

import useDeleteComment from "../hooks/mutations/useDeleteComment";
import useUpdateComment from "../hooks/mutations/useUpdateComment";

const CommentList = ({ setOpenCommentList }) => {
  const [content, setContent] = useState("");
  const { lpId } = useParams();
  const [paginationDto, setPaginationDto] = useState<PaginationDto>({
    limit: 4,
    order: "asc",
  });

  const { myInfo } = useOutletContext<{ myInfo: ResponseMyInfoDto["data"] }>();
  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetInfinityCommentList(Number(lpId), paginationDto);

  const { mutate: createCommentMutation } = usePostComment();

  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, isPending, paginationDto]);

  const { mutate: deleteCommentMutation } = useDeleteComment();
  const { mutate: updateCommentMutation } = useUpdateComment();

  const deleteComment = (commentId: number) => {
    deleteCommentMutation({ lpId: Number(lpId), commentId });
  };
  const updateComment = (commentId: number, content: string) => {
    updateCommentMutation({ lpId: Number(lpId), commentId, content });
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[90%] bg-gray-100 rounded-lg p-4 shadow-md">
      <h4 className="text-2xl font-bold">댓글</h4>{" "}
      <button
        className="absolute top-4 right-4 text-sm text-gray-500 hover:text-gray-700"
        onClick={() => setOpenCommentList(false)}
      >
        닫기
      </button>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPaginationDto({ ...paginationDto, order: "asc" })}
          className={
            paginationDto.order === "asc"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800"
          }
        >
          최신순
        </button>
        <button
          onClick={() => setPaginationDto({ ...paginationDto, order: "desc" })}
          className={
            paginationDto.order === "desc"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800"
          }
        >
          오래된순
        </button>
      </div>
      <div className="h-[80%] overflow-y-auto">
        {isFetching && <div>댓글을 불러오는중입니다...</div>}
        {isPending && <div>댓글을 불러오는중입니다...</div>}
        {isError && <div>댓글을 불러오는중 오류가 생겼습니다.</div>}
        {error && <div>오류: {error.message}</div>}
        {data?.pages.map((page) =>
          page.data.data.map((comment) => (
            <Comment
              key={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              author={comment.author}
              isMyComment={comment.author.id === myInfo?.id}
              deleteComment={deleteComment}
              updateComment={updateComment}
              id={comment.id}
            />
          )),
        )}
        {isFetching &&
          Array.from({ length: paginationDto.limit }).map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
        <div className="h-10 flex items-center justify-center" ref={ref}>
          {inView && "-"}
        </div>
      </div>
      <div className="flex gap-2 h-10 items-center border-t border-gray-300 pt-4">
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className="w-full p-1 border border-gray-300 rounded-md"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button
          className="bg-black text-white h-full px-2 w-20 text-sm rounded-md"
          onClick={() => {
            createCommentMutation({ lpId: Number(lpId), content: content });
            setContent("");
          }}
        >
          작성
        </button>
      </div>
    </div>
  );
};

export default CommentList;
