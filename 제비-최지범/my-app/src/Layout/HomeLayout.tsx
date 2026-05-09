import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const HomeLayout = () => {
  const { accessToken, logout } = useAuth();
  const [myInfo, setMyInfo] = useState<ResponseMyInfoDto["data"] | null>(null);
  const { category } = useParams<{ category: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (accessToken) {
      getMyInfo().then((res) =>
        setMyInfo(res.data as ResponseMyInfoDto["data"]),
      );
    }
  }, [accessToken]);

  return (
    <div className="flex h-dvh min-h-0 flex-col text-sm">
      <nav className="flex h-15 justify-between  items-center px-3 py-2 bg-gray-100">
        <div className="flex items-center gap-3 font-bold">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            제비의 LP사이트
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          {accessToken ? (
            <>
              <div>환영합니다 {myInfo?.name} 님</div>

              <button type="button" onClick={() => void logout()}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
              >
                회원가입
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-red-300 px-2 py-1 rounded"
                    : "bg-red-300 px-2 py-1 rounded"
                }
              >
                로그인
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <main className="min-h-0 flex-1 overflow-auto  flex flex-row gap-3 relative">
        <div
          className={`z-10 bg-gray-300 flex flex-col h-full gap-2 fixed w-[300px] left-[-100%] top-15 p-3 shadow-lg transition-all duration-300 ${!sidebarOpen ? "" : "left-[0%]"} lg:left-[0%] `}
        >
          <NavLink
            className={category === "find" ? "text-red-500" : ""}
            to="/lps"
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            찾기
          </NavLink>

          <NavLink
            to="/mypage"
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            마이페이지
          </NavLink>
        </div>
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`${sidebarOpen ? "block" : "hidden"} fixed bg-[#12121200] w-full h-full top-0 left-0 z-9 lg:hidden`}
        ></div>

        <div className="w-full  h-full transition-all duration-300 lg:pl-[300px]">
          <Outlet context={{ myInfo: myInfo }} />
          <footer className="shrink-0 px-3 py-2 text-xs">
            <p>푸터 제비의 LP사이트.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;
