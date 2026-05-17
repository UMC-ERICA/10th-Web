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
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpList from "./pages/LpList";
import LpDetail from "./pages/LpDetail";
import LpAdd from "./pages/LpAdd";

const queryClient = new QueryClient();

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
        path: "lps",
        loader: requireAuthLoader,
        element: (
          <ProtectedRoute>
            <LpList />
          </ProtectedRoute>
        ),
      },
      {
        path: "lps/:lpId",
        loader: requireAuthLoader,
        element: (
          <ProtectedRoute>
            <LpDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "lps/add",
        loader: requireAuthLoader,
        element: (
          <ProtectedRoute>
            <LpAdd />
          </ProtectedRoute>
        ),
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
          position="bottom"
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
