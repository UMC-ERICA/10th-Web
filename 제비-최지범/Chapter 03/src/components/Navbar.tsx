import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#121212] p-3 text-white flex items-center justify-start gap-4">
      <h1 className="font-bold text-lg">제비의 영화 정보 사이트</h1>
      <Link
        className="p-1 bg-[#133122]  rounded hover:bg-[#1a4f1a] transition-colorss"
        to="/"
      >
        홈 페이지로 이동
      </Link>
      <Link
        className="p-1 bg-[#133122] rounded hover:bg-[#1a4f1a] transition-colors"
        to="/movies/1"
      >
        영화 목록 페이지로 이동
      </Link>
    </nav>
  );
};

export default Navbar;
