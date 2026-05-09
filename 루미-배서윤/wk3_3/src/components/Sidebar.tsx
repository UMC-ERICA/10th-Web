import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const moveTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside
      className={`fixed left-0 top-[73px] z-40 h-[calc(100vh-73px)] w-40 shrink-0 bg-zinc-950 px-4 py-6 transition-transform duration-300 md:static md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex flex-col gap-4 text-sm">
        <button onClick={() => moveTo("/lps")} className="text-left">
          LP 보기
        </button>

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

        <button onClick={() => moveTo("/premium")} className="text-left">
          마이페이지
        </button>
      </nav>

      <button className="absolute bottom-6 left-4 text-sm text-gray-400">
        탈퇴하기
      </button>
    </aside>
  );
}