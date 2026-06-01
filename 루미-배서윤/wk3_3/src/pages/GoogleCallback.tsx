import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setTokens } from "../router/auth";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    }

    if (userId) {
      localStorage.setItem("userId", userId);
    }

    if (name) {
      localStorage.setItem("nickname", decodeURIComponent(name));
    }

    if (email) {
      localStorage.setItem("email", decodeURIComponent(email));
    }

    navigate("/lps", { replace: true });
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      로그인 처리 중...
    </div>
  );
}