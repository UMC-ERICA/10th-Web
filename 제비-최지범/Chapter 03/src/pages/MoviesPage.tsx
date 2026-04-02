import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const apikey = import.meta.env.VITE_TOKEN;
const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `${apikey}`, // 본인 TMDB 토큰으로 교체
          },
        },
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-[#121212] text-white">
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
            <div className="absolute top-0 h-[100%] overflow-y-auto  inset-0 bg-[#12121250] backdrop-blur-md bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity p-4 flex flex-col justify-bottom">
              <h2 className="font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-300">{movie.overview}</p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
