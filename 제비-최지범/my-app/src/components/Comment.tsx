import { useState } from "react";

const Comment = ({
  content,
  createdAt,
  author,
  isMyComment,
  deleteComment,
  updateComment,
  id,
}: {
  content: string;
  id: number;
  isMyComment: boolean;
  createdAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, content: string) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);
  return (
    <div className="flex flex-col gap-2 border-b border-gray-300 pb-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center  w-full justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold">{author.name}</p>
              <p className="text-xs text-gray-500">{createdAt}</p>
            </div>
          </div>
          {isMyComment && (
            <div className="flex items-center gap-2">
              <button
                className="text-sm text-blue-500"
                onClick={() => {
                  setIsEdit(true);
                  setEditContent(content);
                }}
              >
                수정
              </button>
              <button
                className="text-sm text-red-500"
                onClick={() => deleteComment(id)}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      {isEdit ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md"
          />
          <button
            className="text-sm text-blue-500"
            onClick={() => {
              updateComment(id, editContent);
              setIsEdit(false);
            }}
          >
            저장
          </button>
          <button
            className="text-sm text-red-500"
            onClick={() => setIsEdit(false)}
          >
            x
          </button>
        </div>
      ) : (
        <p className="text-sm">{content}</p>
      )}
    </div>
  );
};

export default Comment;
