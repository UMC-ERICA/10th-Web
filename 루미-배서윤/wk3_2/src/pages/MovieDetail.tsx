import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetailData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path?: string | null;
}

interface CreditsData {
  cast: CastMember[];
  crew: CrewMember[];
}

const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [credits, setCredits] = useState<CreditsData | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetail = async () => {
      try {
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
        );
        const detailData = await detailRes.json();
        setMovie(detailData);

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        const creditsData = await creditsRes.json();
        setCredits(creditsData);
      } catch (error) {
        console.error("상세 페이지 에러:", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const director = credits?.crew.find((person) => person.job === "Director");
  const topCast = credits?.cast.slice(0, 8) ?? [];
  const topCrew = credits?.crew.slice(0, 8) ?? [];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {movie && (
          <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 rounded-3xl shadow-lg overflow-hidden text-white">
            <div className="grid md:grid-cols-[300px_1fr] gap-8 p-8">
              
              {/* 왼쪽: 포스터 */}
              <div className="flex justify-center">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-[280px] rounded-2xl shadow-md hover:scale-105 transition"
                />
              </div>

              {/* 오른쪽: 영화 정보 */}
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap gap-3 mb-4 text-sm">
                  <span className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-medium">
                    ⭐ 평점 {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="bg-blue-300 text-blue-900 px-3 py-1 rounded-full font-medium">
                    📅 개봉일 {movie.release_date}
                  </span>
                  <span className="bg-green-300 text-green-900 px-3 py-1 rounded-full font-medium">
                    ⏱ 상영 시간 {movie.runtime}분
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-white/20 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-100 leading-relaxed mb-6">
                  {movie.overview}
                </p>

                {director && (
                  <div className="text-sm text-gray-200">
                    <span className="font-semibold">감독:</span> {director.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 출연진 */}
        {credits && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">🎭 출연진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {topCast.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl shadow p-4 text-center"
                >
                  {person.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${person.profile_path}`}
                      alt={person.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3" />
                  )}
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 제작진 */}
        {credits && (
          <div className="mt-10 mb-10">
            <h2 className="text-2xl font-bold mb-5">🎬 제작진</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {topCrew.map((person) => (
                <div
                  key={`${person.id}-${person.job}`}
                  className="bg-white rounded-2xl shadow p-4"
                >
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{person.job}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}