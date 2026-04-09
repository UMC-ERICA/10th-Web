import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("받은 데이터:", data); 
        setMovies(data.results);
      })
      .catch((err) => console.error("에러:", err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">인기 영화 목록</h1>

      {/*Grid*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">

            {/*포스터*/}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg transition duration-300 group-hover:blur-sm"
            />

            {/*Hover*/}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-2 text-center">
              <h2 className="font-bold text-sm">{movie.title}</h2>
              <p className="text-xs mt-2 line-clamp-3">
                {movie.overview}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}