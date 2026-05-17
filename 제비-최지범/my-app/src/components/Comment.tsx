import type { CommentResponseDto } from "../types/common";

const Comment = ({
  content,
  createdAt,
  author,
}: {
  content: string;

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
}) => {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-300 pb-2 mb-2">
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
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default Comment;
