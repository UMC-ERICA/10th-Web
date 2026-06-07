import { useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
const rawToken = import.meta.env.VITE_TOKEN ?? "";
const bearerToken = rawToken.replace(/^Bearer\s+/i, "").trim();

const useFetch = (
  category?: string,
  page?: number,
  query?: string,
  adultContent?: boolean,
  language?: string,
): [
  () => Promise<void>,
  () => Promise<void>,
  boolean,
  string | null,
  Movie[],
] => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    if (!category || !page) {
      setError("카테고리 또는 페이지가 유효하지 않습니다.");
      return;
    }
    setLoading(true);
    const url = `https://api.themoviedb.org/3/movie/${category}?include_adult=${adultContent ? "true" : "false"}&language=${language ? language : "ko-KR"}&page=${page}`;
    console.log(url);
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

  const searchMovies = async () => {
    if (!query) {
      fetchMovies();
      return;
    }
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=${adultContent ? "true" : "false"}&language=${language ? language : "ko-KR"}&page=${page}&sort_by=${category}.desc&query=${query}`;
    console.log(url);
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

  return [fetchMovies, searchMovies, loading, error, movies];
};

export default useFetch;
