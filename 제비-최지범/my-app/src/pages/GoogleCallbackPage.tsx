import { useLayoutEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GOOGLE_OAUTH_SESSION_STORAGE_PREFIX } from "../constants/key";
import { useAuth } from "../hooks/useAuth";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  useLayoutEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken?.trim() || !refreshToken?.trim()) {
      navigate("/login", { replace: true, state: { oauthError: true } });
      return;
    }

    const dedupeKey = `${GOOGLE_OAUTH_SESSION_STORAGE_PREFIX}:${accessToken}:${refreshToken}`;
    if (sessionStorage.getItem(dedupeKey)) {
      navigate("/", { replace: true });
      return;
    }
    sessionStorage.setItem(dedupeKey, "1");

    setTokens(accessToken, refreshToken);
    navigate("/", { replace: true });
  }, [navigate, searchParams, setTokens]);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 text-sm text-gray-600">
      Google 로그인 처리 중…
    </div>
  );
};

export default GoogleCallbackPage;
