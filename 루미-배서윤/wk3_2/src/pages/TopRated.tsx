import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import type { Movie, MovieApiResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`
        );

        if (!response.ok) {
          throw new Error("인기 영화 데이터를 불러오지 못했습니다.");
        }

        const data: MovieApiResponse = await response.json();
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (err) {
        console.error(err);
        setError("인기 영화 데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (API_KEY) {
      fetchPopularMovies();
    } else {
      setError("API 키가 설정되지 않았습니다.");
      setIsLoading(false);
    }
  }, [page]);

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
          #4
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
          평점 높은 영화
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