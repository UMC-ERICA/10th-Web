import { useState } from 'react';
import MovieGrid from './MovieGrid';
import Pagination from './Pagination';
import Spinner from './Spinner';
import useCustomFetch from '../hooks/useCustomFetch';
import type { Movie, MovieApiResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_API_KEY;

type Props = {
  badge: string;
  title: string;
  endpoint: string;
};

export default function MoviePageLayout({ badge, title, endpoint }: Props) {
  const [page, setPage] = useState(1);

  const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
  const { data, isLoading, error } = useCustomFetch<MovieApiResponse>(url);

  const movies: Movie[] = data?.results ?? [];
  const totalPages = data ? Math.min(data.total_pages, 500) : 1;

  if (!API_KEY) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-300">
        API 키가 설정되지 않았습니다.
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <p className="mb-3 text-sm font-medium tracking-widest text-violet-400">
          {badge}
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
          {title}
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
            onPrev={() => setPage((p) => Math.max(p - 1, 1))}
            onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
          />
        </>
      )}
    </section>
  );
}
