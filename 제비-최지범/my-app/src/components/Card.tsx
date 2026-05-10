import { useNavigate } from "react-router-dom";
import type { LP } from "../types/music";

const Card = ({ id, title, thumbnail, createdAt, likes }: LP) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/lps/${id}`)}
      className="bg-gray-100  mb-2 rounded-lg shadow-md flex flex-col gap-2"
    >
      <div className="w-full aspect-square relative">
        <img src={thumbnail} className="h-full w-full object-cover" />
        <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-end backdrop-blur-md bg-black/50 bg-opacity-50">
          <h4 className="text-white text-xl font-bold">{title}</h4>{" "}
          <div className="flex justify-between items-center mb-2">
            <p className="text-[0.6rem] text-white">{createdAt}</p>
            <p className="text-sm text-white text-right">
              {likes.length} 좋아요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
