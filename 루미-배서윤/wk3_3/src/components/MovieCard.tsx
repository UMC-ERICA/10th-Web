import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-[340px] w-full object-cover"
        />
        <div className="p-4">
          <h3 className="line-clamp-1 text-base font-bold text-white">
            {movie.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;