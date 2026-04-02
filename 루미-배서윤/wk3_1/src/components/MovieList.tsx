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
    <div>
      <h1>영화 목록</h1>
      <p>총 {movies.length}개</p>
    </div>
  );
}