import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { requireAuthLoader } from "./loaders/requireAuthLoader";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";
import LoginPage from "./pages/LoginPage";
import Mypage from "./pages/Mypage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./Layout/HomeLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleCallbackPage />,
      },
      { path: "signup", element: <SignupPage /> },
      {
        path: "mypage",
        loader: requireAuthLoader,
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
