import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import TopRated from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="popular" element={<Popular />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="top-rated" element={<TopRated />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;