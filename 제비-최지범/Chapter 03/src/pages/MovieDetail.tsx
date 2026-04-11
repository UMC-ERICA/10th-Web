import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { MovieCredit, MovieDetailResponse } from "../types/movie";

const rawToken = import.meta.env.VITE_TOKEN ?? "";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const bearerToken = rawToken.replace(/^Bearer\s+/i, "").trim();
  const [movieDetail, setMovieDetail] = useState<MovieDetailResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [movieCredit, setMovieCredit] = useState<MovieCredit | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get<MovieDetailResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );
        setMovieDetail(response.data);
      } catch (error) {
        setError("영화 상세 정보를 불러오는 중 오류가 발생했습니다.");
        console.log("영화 상세 정보를 불러오는 중 오류가 발생했습니다.", error);
      }
    };
    const fetchCredit = async () => {
      try {
        const response = await axios.get<MovieCredit>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR'`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );
        setMovieCredit(response.data);
      } catch (error) {
        setError("영화 출연진 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchMovieDetail();
    fetchCredit();
  }, []);
  return (
    <div className="pt-16 bg-[#121212] text-white w-full min-h-screen flex flex-col items-center justify-start gap-4 p-4">
      {error && <p>{error}</p>}
      {movieDetail ? (
        <div>
          <section className="w-full flex gap-8">
            {" "}
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
              alt={movieDetail?.title}
              className="w-70"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">{movieDetail?.title}</h1>
              <p className="text-gray-400 text-sm">
                개봉일: {movieDetail?.release_date}
              </p>
              <p className="text-yellow-400">
                평점: {movieDetail?.vote_average}
              </p>
              <p>런타임: {movieDetail?.runtime}분</p>
              <p>
                장르:{" "}
                {movieDetail?.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-gray-300 text-sm">{movieDetail?.overview}</p>
            </div>
          </section>
          <section className="w-full border-b border-gray-700 py-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">출연진</h2>
            <div className="flex flex-wrap gap-4">
              {movieCredit?.cast.map((member) => (
                <div
                  key={member.id}
                  className="w-40 text-center border rounded-lg p-2 bg-[#1e1e1e]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                    alt={member.name}
                    className="w-full h-auto rounded-lg"
                  />
                  <p>{member.known_for_department}</p>
                  <p className="mt-2">{member.name}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">제작진</h2>
            <div className="flex flex-wrap gap-4">
              {movieCredit?.crew.map((member) => (
                <div
                  key={member.id}
                  className="w-40 text-center border rounded-lg p-2 bg-[#1e1e1e]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                    alt={member.name}
                    className="w-full h-auto rounded-lg"
                  />
                  <p>{member.known_for_department}</p>
                  <p className="mt-2">{member.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <p>영화 상세 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default MovieDetail;
