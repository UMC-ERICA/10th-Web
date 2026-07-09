import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../apis/user";
import { removeTokens } from "../router/auth";
import DeleteAccountModal from "./DeleteAccountModal";
import { useCartStore } from "../store/useCartStore";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const cartAmount = useCartStore((state) => state.amount);

  const deleteAccountMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      removeTokens();
      localStorage.clear();
      setIsDeleteModalOpen(false);
      onClose();
      navigate("/login");
    },
    onError: () => {
      alert("탈퇴에 실패했습니다.");
    },
  });

  const moveTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-[73px] z-40 h-[calc(100vh-73px)] w-40 shrink-0 bg-zinc-950 px-4 py-6 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-4 text-sm">
          <button onClick={() => moveTo("/popular")} className="text-left">
            인기 영화
          </button>

          <button onClick={() => moveTo("/now-playing")} className="text-left">
            상영 중
          </button>

          <button onClick={() => moveTo("/upcoming")} className="text-left">
            개봉 예정
          </button>

          <button onClick={() => moveTo("/top-rated")} className="text-left">
            높은 평점
          </button>

          <button onClick={() => moveTo("/lps")} className="text-left">
            LP 보기
          </button>

          <button
            onClick={() => moveTo("/cart")}
            className="flex items-center gap-2 text-left"
          >
            <span>장바구니</span>
            {cartAmount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                {cartAmount}
              </span>
            )}
          </button>

          <button onClick={() => moveTo("/mypage")} className="text-left">
            마이페이지
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="absolute bottom-6 left-4 text-sm text-gray-400 hover:text-red-400"
        >
          탈퇴하기
        </button>
      </aside>

      {isDeleteModalOpen && (
        <DeleteAccountModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => deleteAccountMutation.mutate()}
          isPending={deleteAccountMutation.isPending}
        />
      )}
    </>
  );
}