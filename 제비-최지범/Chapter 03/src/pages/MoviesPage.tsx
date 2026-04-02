import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const rawToken = import.meta.env.VITE_TOKEN ?? "";
const bearerToken = rawToken.replace(/^Bearer\s+/i, "").trim();

const MoviesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!category) return;

    const fetchMovies = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
      try {
        const response = await axios.get<MovieResponse>(`${url}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError("데이터를 불러오는중 오류가 생겼습니다.");
        console.log("에러내용:", error);
      }

      setLoading(false);
    };

    fetchMovies();
    return () => {
      setMovies([]);
    };
  }, [category, page]);

  useEffect(() => {
    setPage(1);
  }, [category]);
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-16 bg-[#121212] text-white w-full min-h-screen flex flex-col items-center justify-start gap-4 p-4">
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>데이터를 불러오는중 오류가 생겼습니다.</p> : ""}
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 p-4">
        {movies?.map((movie) => (
          <li
            key={movie.id}
            className="relative overflow-hidden rounded hover:overflow-visible"
          >
            <img
              className="w-full h-auto rounded  transition-all"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <Link
              to={`/movie/${movie.id}`}
              className="absolute top-0 h-[100%] overflow-y-auto  inset-0 bg-[#12121250] backdrop-blur-md bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity p-4 flex flex-col justify-bottom"
            >
              <h2 className="font-bold">{movie.title}</h2>
              <p className="text-sm text-yellow-400">
                평점: {movie.vote_average}
              </p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
              <p className="text-sm text-gray-300">{movie.overview}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <button
          className={`  ${page === 1 ? "cursor-none opacity-50 cursor-not-allowed" : " cursor-pointer"}`}
          onClick={() => handlePageChange(page - 1)}
        >
          {"<"}
        </button>
        <span>{page}페이지</span>
        <button
          className="cursor-pointer"
          onClick={() => handlePageChange(page + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
