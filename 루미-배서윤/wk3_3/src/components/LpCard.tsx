import { useNavigate } from "react-router-dom";
import type { Lp } from "../apis/lp";

type LpCardProps = {
  lp: Lp;
};

export default function LpCard({ lp }: LpCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="group relative aspect-square overflow-hidden rounded-md bg-zinc-800"
    >
      {lp.thumbnail ? (
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
          No Image
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end bg-black/70 p-3 text-left opacity-0 transition duration-300 group-hover:opacity-100">
        <p className="line-clamp-2 text-sm font-bold text-white">{lp.title}</p>
        <p className="mt-1 text-xs text-gray-300">
          {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="mt-1 text-xs text-gray-300">♥ {lp.likes ?? 0}</p>
      </div>
    </button>
  );
}