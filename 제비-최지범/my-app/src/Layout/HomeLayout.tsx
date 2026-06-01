import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HomeLayout = () => {
  const { accessToken, logout } = useAuth();

  return (
    <div className="flex h-dvh min-h-0 flex-col text-sm">
      <nav className="flex min-h-10 shrink-0 flex-wrap items-center gap-3 px-3 py-2">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "font-semibold" : "")}>
          홈
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "font-semibold" : "")}
        >
          회원가입
        </NavLink>
        {accessToken ? (
          <>
            <NavLink
              to="/mypage"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              마이페이지
            </NavLink>
            <button type="button" onClick={() => void logout()}>
              로그아웃
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            로그인
          </NavLink>
        )}
      </nav>
      <main className="min-h-0 flex-1 overflow-auto px-3 py-3">
        <Outlet />
      </main>
      <footer className="shrink-0 px-3 py-2 text-xs">
        <p>UMC Study</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
