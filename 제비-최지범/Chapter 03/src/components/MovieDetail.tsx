import { useEffect, useState } from "react";
import axios from "axios";
import type {
  MovieCredit,
  MovieDetailResponse,
  Video,
  VideoResponse,
} from "../types/movie";

const rawToken = import.meta.env.VITE_TOKEN ?? "";

const MovieDetail = ({
  movieId,
  setOpenMovieDetail,
}: {
  movieId: string;
  setOpenMovieDetail: (open: boolean) => void;
}) => {
  const bearerToken = rawToken.replace(/^Bearer\s+/i, "").trim();
  const [movieDetail, setMovieDetail] = useState<MovieDetailResponse | null>(
    null,
  );
  const [movieVideos, setMovieVideos] = useState<Video[]>([]);
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
        console.log(response.data);
        setMovieDetail(response.data);
      } catch (error) {
        setError("영화 상세 정보를 불러오는 중 오류가 발생했습니다.");
        console.log("영화 상세 정보를 불러오는 중 오류가 발생했습니다.", error);
      }
    };
    const fetchCredit = async () => {
      try {
        const response = await axios.get<MovieCredit>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );

        setMovieCredit(response.data);

        const videoResponse = await axios.get<VideoResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );
        console.log(videoResponse.data);
        setMovieVideos(videoResponse.data.results);
      } catch (error) {
        setError("영화 출연진 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchMovieDetail();
    fetchCredit();
  }, []);
  return (
    <div className="fixed w-full h-full inset-0 z-10 bg-[#12121250] backdrop-blur-md bg-opacity-70 transition-opacity duration-300 h-[full] scrollbar-hide overflow-y-auto">
      <div className="bg-[#121212] text-white flex flex-col items-center justify-start gap-4  max-w-4xl mx-auto ">
        {error && <p>{error}</p>}
        <div className="flex justify-end w-full px-4 py-2">
          <button
            className="p-2 rounded-md bg-gray-700 text-white"
            onClick={() => setOpenMovieDetail(false)}
          >
            X
          </button>
        </div>

        {movieDetail ? (
          <div>
            <div className="w-full mb-4">
              {movieVideos?.length > 0 ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${movieVideos[0]?.key}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1`}
                  title={movieVideos[0]?.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <p>영상이 없습니다.</p>
              )}
            </div>
            <section className="w-full flex gap-8 p-4">
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
                <p>인기도: {movieDetail.popularity.toFixed(2)}</p>
                <p className="text-gray-300 text-sm">{movieDetail?.overview}</p>
                <a
                  href={`https://www.imdb.com/find?q=${movieDetail?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  imdb 검색하기
                </a>
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
    </div>
  );
};

export default MovieDetail;
