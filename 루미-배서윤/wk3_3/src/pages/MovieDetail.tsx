import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useCustomFetch from "../hooks/useCustomFetch";

type Genre = {
  id: number;
  name: string;
};

type MovieDetailData = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
};

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type CreditsResponse = {
  cast: CastMember[];
};

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-zinc-900 px-10 py-8 text-center shadow-xl">
          <p className="text-gray-300">영화 ID를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (!API_KEY) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-zinc-900 px-10 py-8 text-center shadow-xl">
          <p className="text-gray-300">API 키가 설정되지 않았습니다.</p>
        </div>
      </div>
    );
  }

  const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`;

  const {
    data: movie,
    isLoading: detailLoading,
    error: detailError,
  } = useCustomFetch<MovieDetailData>(detailUrl);

  const {
    data: credits,
    isLoading: creditsLoading,
    error: creditsError,
  } = useCustomFetch<CreditsResponse>(creditsUrl);

  const isLoading = detailLoading || creditsLoading;
  const error = detailError || creditsError;
  const cast = credits?.cast?.slice(0, 12) ?? [];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-zinc-900 px-10 py-8 text-center shadow-xl">
          <h2 className="mb-3 text-3xl font-bold text-red-500">오류 발생</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-zinc-900 px-10 py-8 text-center shadow-xl">
          <p className="text-gray-300">영화 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <section className="space-y-10">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.55)), url(${backdropUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid gap-8 px-8 py-10 md:grid-cols-[300px_1fr]">
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">
              {movie.title}
            </h1>

            <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-300">
              <span>⭐ 평점 {movie.vote_average?.toFixed(1)}</span>
              <span>📅 개봉일 {movie.release_date || "정보 없음"}</span>
              <span>
                ⏱ 상영시간 {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
              </span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-gray-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="max-w-3xl leading-7 text-gray-200">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-5 text-3xl font-bold text-white">감독/출연</h2>

        {cast.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-5 pb-3">
              {cast.map((person) => {
                const profileUrl = person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : null;

                return (
                  <div
                    key={person.id}
                    className="w-28 flex-shrink-0 text-center"
                  >
                    <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border border-white/10 bg-zinc-800">
                      {profileUrl ? (
                        <img
                          src={profileUrl}
                          alt={person.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <p className="line-clamp-2 text-sm font-semibold text-white">
                      {person.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                      {person.character || "출연"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-6 py-5 text-gray-400">
            출연진 정보가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}

export default MovieDetail;