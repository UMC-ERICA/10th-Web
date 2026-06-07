import { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MovieDetail from "../components/MovieDetail";
import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
  isHovered: boolean;
  onSelect: (movieId: number) => void;
  onHover: (movieId: number) => void;
  onLeave: () => void;
};

const MovieCard = memo(
  ({ movie, isHovered, onSelect, onHover, onLeave }: MovieCardProps) => {
    return (
      <li onClick={() => onSelect(movie.id)}>
        <div
          className="relative block overflow-hidden rounded"
          onMouseEnter={() => onHover(movie.id)}
          onMouseLeave={onLeave}
        >
          <img
            className={`w-full h-auto transition-transform duration-300 ${isHovered ? "scale-105" : ""}`}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end gap-1 overflow-y-auto bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <h2 className="font-bold">{movie.title}</h2>
            <p className="text-sm text-yellow-400">
              평점: {movie.vote_average}
            </p>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
            <p className="text-sm text-gray-300">{movie.overview}</p>
          </div>
        </div>
      </li>
    );
  },
);

const MoviesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState<number>(1);
  const [formData, setFormData] = useState({
    query: "",
    adultContent: false,
  });
  const [language, setLanguage] = useState("ko-KR");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
    },
    [],
  );

  const [fetchMovies, searchMovies, loading, error, movies] = useFetch(
    category,
    page,
    formData.query,
    formData.adultContent,
    language,
  );
  const [openMovieDetail, setOpenMovieDetail] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");

  useEffect(() => {
    if (!category) return;
    fetchMovies();
  }, [category, page, language, formData.adultContent]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
    window.scrollTo(0, 0);
  }, []);

  const handlePrevPage = useCallback(() => {
    handlePageChange(page - 1);
  }, [handlePageChange, page]);

  const handleNextPage = useCallback(() => {
    handlePageChange(page + 1);
  }, [handlePageChange, page]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      searchMovies();
    },
    [searchMovies],
  );

  const handleMovieSelect = useCallback((movieId: number) => {
    setSelectedMovieId(movieId.toString());
    setOpenMovieDetail(true);
  }, []);

  const handleMovieHover = useCallback((movieId: number) => {
    setHoveredId(movieId);
  }, []);

  const handleMovieLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <div className="pt-16 bg-[#121212] text-white w-full min-h-screen flex flex-col items-center justify-start gap-4 p-4">
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>데이터를 불러오는중 오류가 생겼습니다.</p> : ""}
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-4">
        <div>
          성인 콘텐츠{" "}
          <input
            type="checkbox"
            name="adultContent"
            checked={formData.adultContent}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          placeholder="Search..."
          name="query"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.query}
          onChange={handleChange}
        />
        <div>
          <select
            name="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          >
            <option className="text-gray-700" value="ko-KR">
              한국어
            </option>
            <option className="text-gray-700" value="en-US">
              영어
            </option>
            <option className="text-gray-700" value="ja-JP">
              일본어
            </option>
          </select>
        </div>
      </form>
      <div className="text-gray-700">
        {formData.adultContent ? "봄" : "안봄"}
        {formData.query}
      </div>
      <ul className="relative grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 p-4">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isHovered={hoveredId === movie.id}
            onSelect={handleMovieSelect}
            onHover={handleMovieHover}
            onLeave={handleMovieLeave}
          />
        ))}
      </ul>
      <div className="flex gap-4">
        <button
          className={`  ${page === 1 ? "cursor-none opacity-50 cursor-not-allowed" : " cursor-pointer"}`}
          onClick={handlePrevPage}
        >
          {"<"}
        </button>
        <span>{page}페이지</span>
        <button className="cursor-pointer" onClick={handleNextPage}>
          {">"}
        </button>
      </div>
      {openMovieDetail ? (
        <MovieDetail
          movieId={selectedMovieId}
          setOpenMovieDetail={setOpenMovieDetail}
        />
      ) : null}
    </div>
  );
};

export default MoviesPage;
