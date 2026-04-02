import { NavLink } from "react-router-dom";

export default function Navbar() {
  const activeStyle = {
    color: "red",
  };

  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : undefined}>
        홈
      </NavLink>

      <NavLink to="/popular" style={({ isActive }) => isActive ? activeStyle : undefined}>
        인기
      </NavLink>

      <NavLink to="/top" style={({ isActive }) => isActive ? activeStyle : undefined}>
        평점 높은
      </NavLink>

      <NavLink to="/upcoming" style={({ isActive }) => isActive ? activeStyle : undefined}>
        개봉 예정
      </NavLink>

      <NavLink to="/now" style={({ isActive }) => isActive ? activeStyle : undefined}>
        상영 중
      </NavLink>
    </nav>
  );
}