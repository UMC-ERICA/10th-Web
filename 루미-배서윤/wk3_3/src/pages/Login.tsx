import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { login } from "../router/auth";

export default function Login() {
  const navigate = useNavigate();

  const { values, errors, isValid, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    // 로그인 처리
    login();

    alert("로그인 성공");

    // React Router 방식 이동
    navigate("/premium");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <h1 className="mb-10 text-center text-3xl font-extrabold">로그인</h1>

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
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
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
              <p className="mt-2 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-md py-3 font-semibold ${
              isValid
                ? "bg-pink-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}