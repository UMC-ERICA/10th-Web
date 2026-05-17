import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import type { ResponseMyInfoDto } from "../types/auth";
import { useGetLpDetail } from "../hooks/useGetLpList";
import { useEffect, useState } from "react";

import CommentList from "../components/CommentList";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostLike from "../hooks/mutations/usePostLike";

const LpDetail = () => {
  const { lpId } = useParams();
  const { myInfo } = useOutletContext<{ myInfo: ResponseMyInfoDto["data"] }>();
  const { data, refetch, isPending, isError, error } = useGetLpDetail(
    Number(lpId),
  );
  const [openCommentList, setOpenCommentList] = useState(false);
  useEffect(() => {
    refetch();
  }, [lpId]);

  const { mutate: likeMutation } = usePostLike();
  const { mutate: dislikeMutation } = useDeleteLike();

  const handleLike = () => {
    const id = Number(lpId);
    if (
      data?.likes.some((like) => like.userId === myInfo?.id) &&
      myInfo?.id
    ) {
      dislikeMutation({ lpId: id, userId: myInfo.id });
    } else {
      likeMutation(id);
    }
  };

  if (isPending) return <div>LP 정보를 불러오는 중...</div>;
  if (isError) return <div>LP 정보를 불러오는 중 오류가 생겼습니다.</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div className="relative">
      <div className="p-4 text-black flex flex-col  gap-4 h-full items-center">
        <h4 className="text-black text-2xl font-bold">{data?.title}</h4>
        {data?.authorId === myInfo?.id ? (
          <div className="flex gap-2">
            <button>수정</button>
            <button>삭제</button>
          </div>
        ) : null}
        <div className="w-[50%] md:w-1/3 aspect-square relative border border-gray-300 rounded-lg overflow-hidden">
          <img src={data?.thumbnail} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2 max-h-20 overflow-y-auto">
            {data?.content}
          </p>
        </div>
        <div>
          <div className="flex gap-4 justify-between items-center mb-2">
            <p className="text-[0.8rem] text-black">{data?.createdAt}</p>
            <p
              className={`text-sm text-black text-right ${data?.likes.some((like) => like.userId === myInfo?.id) ? "text-blue-500 cursor-pointer" : "cursor-pointer text-gray-500"} `}
              onClick={handleLike}
            >
              {data?.likes?.length} 좋아요
            </p>
          </div>
          <div className="w-full h-fit mb-2 flex flex-wrap gap-2">
            {data?.tags?.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <button onClick={() => setOpenCommentList(!openCommentList)}>
          댓글 보기
        </button>
        {openCommentList && (
          <CommentList setOpenCommentList={setOpenCommentList} />
        )}
      </div>
    </div>
  );
};

export default LpDetail;
