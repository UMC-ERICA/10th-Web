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
}

interface CreditsData {
  cast: CastMember[];
  crew: CrewMember[];
}

const API_KEY = import.meta.env.VITE_API_KEY;

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
        console.log("상세 정보:", detailData);
        setMovie(detailData);

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        const creditsData = await creditsRes.json();
        console.log("credits:", creditsData);
        setCredits(creditsData);
      } catch (error) {
        console.error("상세 페이지 에러:", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return (
    <div className="p-5 text-black">
      {movie && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
          <p>개봉일: {movie.release_date}</p>
          <p>상영 시간: {movie.runtime}분</p>
          <p>평점: {movie.vote_average}</p>
          <p className="mt-4">{movie.overview}</p>
        </div>
      )}

      {credits && (
        <div>
          <h2 className="text-xl font-bold mb-3">출연진</h2>
          <ul className="mb-6">
            {credits.cast.slice(0, 5).map((person) => (
              <li key={person.id}>
                {person.name} - {person.character}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mb-3">제작진</h2>
          <ul>
            {credits.crew.slice(0, 5).map((person) => (
              <li key={person.id}>
                {person.name} - {person.job}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}