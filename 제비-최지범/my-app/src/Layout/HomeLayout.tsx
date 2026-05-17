import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetMyInfo } from "../hooks/useGetMyInfo";
import useLogout from "../hooks/mutations/useLogout";
import useWithdrawAccount from "../hooks/mutations/useWithdrawAccount";
import ConfirmModal from "../components/ConfirmModal";

const HomeLayout = () => {
  const { accessToken } = useAuth();
  const { data: myInfo } = useGetMyInfo(!!accessToken);
  const { category } = useParams<{ category: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();
  const { mutate: withdrawMutation, isPending: isWithdrawing } =
    useWithdrawAccount();

  const handleLogout = () => {
    logoutMutation();
  };

  const handleWithdrawConfirm = () => {
    withdrawMutation(undefined, {
      onSuccess: () => {
        setWithdrawModalOpen(false);
        navigate("/login", { replace: true });
      },
    });
  };

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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
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

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "로그아웃 중…" : "로그아웃"}
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

          {accessToken && (
            <button
              type="button"
              className="text-left text-red-600 hover:underline"
              onClick={() => {
                setSidebarOpen(false);
                setWithdrawModalOpen(true);
              }}
            >
              탈퇴하기
            </button>
          )}
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

      <ConfirmModal
        open={withdrawModalOpen}
        title="회원 탈퇴"
        message="정말 탈퇴하시겠습니까? 탈퇴 시 게시글, 댓글, 좋아요 등 모든 정보가 삭제되며 복구할 수 없습니다."
        confirmLabel="예"
        cancelLabel="아니오"
        isPending={isWithdrawing}
        onConfirm={handleWithdrawConfirm}
        onCancel={() => setWithdrawModalOpen(false)}
      />
    </div>
  );
};

export default HomeLayout;
