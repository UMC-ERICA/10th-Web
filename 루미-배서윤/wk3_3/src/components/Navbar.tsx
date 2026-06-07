import { NavLink, useNavigate } from "react-router-dom";

type NavbarProps = {
  onOpenSidebar: () => void;
};

function Navbar({ onOpenSidebar }: NavbarProps) {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname") || "사용자";
  const isLoggedIn = Boolean(accessToken);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-6 px-4 py-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="text-white md:hidden"
            aria-label="사이드바 열기"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <NavLink
            to="/"
            className="shrink-0 text-2xl font-extrabold tracking-wide text-white transition hover:text-violet-400"
          >
            LUMI 
          </NavLink>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm">
          <span>🔍</span>

          {isLoggedIn ? (
            <>
              <span className="text-gray-200">{nickname}님 반갑습니다.</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-300 transition hover:text-white"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-gray-300 transition hover:text-white"
              >
                로그인
              </button>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="rounded-md bg-pink-500 px-3 py-2 font-semibold text-white transition hover:bg-pink-400"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;