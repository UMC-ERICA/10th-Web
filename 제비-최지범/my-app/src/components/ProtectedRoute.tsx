import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getStoredAccessToken } from "../utils/authStorage";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAuth();
  const location = useLocation();

  const isAuthed = Boolean(accessToken ?? getStoredAccessToken());

  if (!isAuthed) {
    const from = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?from=${from}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
