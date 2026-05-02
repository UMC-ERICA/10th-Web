import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import TopRated from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./router/ProtectedRoute";
import Premium from "./pages/Premium";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="popular" element={<Popular />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="top-rated" element={<TopRated />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="movie/:id" element={<MovieDetail />} />

          {/* 보호된 라우트 */}
          <Route
            path="premium"
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 인증 관련 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;