import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/Not-Found";
import Movies from "./pages/MoviesPage";
import RootLayout from "./layout/root-layout";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category/",
        element: <Movies />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetail />,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
