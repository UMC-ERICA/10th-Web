import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useLogin from "../hooks/mutations/useLogin";
import { useForm } from "../hooks/useForm";
import { loginFormSchema, type LoginFormValues } from "../schemas/loginSchema";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { mutate: login, isPending } = useLogin();
  const signedUp = Boolean(
    (location.state as { signedUp?: boolean } | null)?.signedUp,
  );
  const oauthError = Boolean(
    (location.state as { oauthError?: boolean } | null)?.oauthError,
  );

  const apiBase =
    (import.meta.env.VITE_SERVER_API_URL as string | undefined)?.replace(
      /\/$/,
      "",
    ) ?? "";
  const googleLoginHref = apiBase
    ? `${apiBase}/v1/auth/google/login`
    : "";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    schema: loginFormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    login(data, {
      onSuccess: () => {
        const from = searchParams.get("from");
        const target =
          from && from.startsWith("/") && !from.startsWith("//") ? from : "/";
        navigate(target, { replace: true });
      },
      onError: () => {
        setError("root", {
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        });
      },
    });
  });

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-10">
      <h1 className="text-lg font-semibold text-gray-900">로그인</h1>
      {signedUp && (
        <p className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          회원가입이 완료되었습니다. 로그인해 주세요.
        </p>
      )}
      {oauthError && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          Google 로그인에 실패했습니다. 다시 시도해 주세요.
        </p>
      )}
      <button
        type="button"
        disabled={!googleLoginHref}
        onClick={() => {
          if (googleLoginHref) window.location.assign(googleLoginHref);
        }}
        className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Google로 계속하기
      </button>
      <p className="text-center text-xs text-gray-500">또는 이메일로</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700" htmlFor="login-email">
            이메일
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700" htmlFor="login-password">
            비밀번호
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        {errors.root && (
          <p className="text-sm text-red-600" role="alert">
            {errors.root.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="rounded border border-gray-400 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 disabled:opacity-50"
        >
          {isPending ? "로그인 중…" : "로그인"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="font-medium text-gray-900 underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
