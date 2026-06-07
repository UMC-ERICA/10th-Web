import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(139,92,246,0.25)]">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-[340px] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-base font-bold text-white">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;