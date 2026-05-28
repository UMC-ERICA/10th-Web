import { useNavigate } from "react-router-dom";
import type { LP } from "../types/music";

const Card = ({ id, title, thumbnail, createdAt, likes }: LP) => {
  const nav = useNavigate();

  return (
    <article
      onClick={() => nav(`/lps/${id}`)}
      className="mb-2 cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden [&:hover_.card-overlay]:opacity-100 [&:hover_img]:scale-105">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300"
        />
        <div className="card-overlay pointer-events-none absolute inset-0 z-10 flex flex-col justify-end bg-black/60 p-4 opacity-0 transition-opacity duration-300">
          <h4 className="text-xl font-bold text-white">{title}</h4>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[0.6rem] text-white">{createdAt}</p>
            <p className="text-right text-sm text-white">
              {likes?.length ?? 0} 좋아요
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
