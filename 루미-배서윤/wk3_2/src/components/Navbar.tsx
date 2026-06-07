import { NavLink } from "react-router-dom";

function Navbar() {
  const menus = [
    { path: "/popular", label: "인기 영화" },
    { path: "/now-playing", label: "상영 중" },
    { path: "/upcoming", label: "개봉 예정" },
    { path: "/top-rated", label: "높은 평점" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white transition hover:text-violet-400"
        >
          LUMI MOVIE
        </NavLink>

        <nav className="flex gap-6 text-sm font-medium text-gray-300">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white"
                  : "transition hover:text-violet-400"
              }
            >
              {menu.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;