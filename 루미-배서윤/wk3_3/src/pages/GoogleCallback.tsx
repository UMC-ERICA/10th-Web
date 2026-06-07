import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");

    if (userId) {
      localStorage.setItem("accessToken", "google-login");
      localStorage.setItem("userId", userId);
    }

    if (name) {
      localStorage.setItem("nickname", decodeURIComponent(name));
    }

    navigate("/", { replace: true });
  }, [navigate, searchParams]);

  return <div className="text-white">구글 로그인 처리 중...</div>;
}