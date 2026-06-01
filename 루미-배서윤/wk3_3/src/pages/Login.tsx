import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";
import useForm from "../hooks/useForm";
import { setTokens } from "../router/auth";

type LoginRequest = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginRequest) => {
  const response = await axiosInstance.post("/v1/auth/signin", {
    email,
    password,
  });

  return response.data;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { values, errors, isValid, handleChange } = useForm({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const accessToken =
        data?.data?.accessToken ?? data?.accessToken;

      const refreshToken =
        data?.data?.refreshToken ?? data?.refreshToken;

      if (!accessToken || !refreshToken) {
        alert("토큰을 찾을 수 없습니다.");
        return;
      }

      setTokens(accessToken, refreshToken);

      const userId = data?.data?.id;
      const nickname = data?.data?.name;

      if (userId) localStorage.setItem("userId", String(userId));
      if (nickname) localStorage.setItem("nickname", nickname);
      localStorage.setItem("email", values.email);

      alert("로그인 성공");
      navigate(from, { replace: true });
    },
    onError: () => {
      alert("로그인 실패");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8000/v1/auth/google/login";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <h1 className="mb-10 text-center text-3xl font-extrabold">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={values.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-gray-400"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={values.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-gray-400"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || loginMutation.isPending}
            className={`w-full rounded-md py-3 font-semibold ${
              isValid
                ? "bg-pink-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full rounded-md border border-gray-600 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            구글 로그인
          </button>
        </form>
      </div>
    </div>
  );
}