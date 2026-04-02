import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <nav className="fixed z-10 w-full bg-[#121212] p-3 text-white flex items-center justify-start gap-4">
      <h1 className="font-bold text-lg">제비의 영화 정보 사이트</h1>
      <Link className={category === undefined ? "text-red-500" : ""} to="/">
        홈
      </Link>
      <Link
        className={category === "popular" ? "text-red-500" : ""}
        to="/movies/popular"
      >
        인기 영화
      </Link>
      <Link
        className={category === "upcoming" ? "text-red-500" : ""}
        to="/movies/upcoming"
      >
        개봉 예정
      </Link>
      <Link
        className={category === "top_rated" ? "text-red-500" : ""}
        to="/movies/top_rated"
      >
        평점 높은
      </Link>
      <Link
        className={category === "now_playing" ? "text-red-500" : ""}
        to="/movies/now_playing"
      >
        상영 중
      </Link>
    </nav>
  );
};

export default Navbar;
