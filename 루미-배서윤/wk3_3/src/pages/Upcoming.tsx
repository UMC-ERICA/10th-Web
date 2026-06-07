import { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import useCustomFetch from "../hooks/useCustomFetch";
import type { Movie, MovieApiResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Upcoming() {
  const [page, setPage] = useState<number>(1);

  if (!API_KEY) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-300">
        API 키가 설정되지 않았습니다.
      </div>
    );
  }

  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${page}`;

  const { data, isLoading, error } = useCustomFetch<MovieApiResponse>(url);

  const movies: Movie[] = data?.results ?? [];
  const totalPages = data ? Math.min(data.total_pages, 500) : 1;

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <p className="mb-3 text-sm font-medium tracking-widest text-violet-400">
          #3
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
          개봉 예정 영화
        </h1>
      </div>

      {isLoading && <Spinner />}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-300">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}
    </section>
  );
}