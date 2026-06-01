import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";
import { useForm } from "../hooks/useForm";
import { signupFormSchema, type SignupFormValues } from "../schemas/signupSchema";

const getApiErrorMessage = (error: unknown): string | null => {
  if (!axios.isAxiosError(error)) return null;
  const data = error.response?.data as { message?: unknown } | undefined;
  return typeof data?.message === "string" ? data.message : null;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    schema: signupFormSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      bio: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await postSignup({
        name: data.name,
        email: data.email,
        password: data.password,
        ...(data.bio?.trim() ? { bio: data.bio.trim() } : {}),
      });
      navigate("/login", { replace: true, state: { signedUp: true } });
    } catch (err) {
      setError("root", {
        message: getApiErrorMessage(err) ?? "회원가입에 실패했습니다.",
      });
    }
  });

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-10">
      <h1 className="text-lg font-semibold text-gray-900">회원가입</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700" htmlFor="signup-name">
            이름
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700" htmlFor="signup-email">
            이메일
          </label>
          <input
            id="signup-email"
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
          <label className="text-sm text-gray-700" htmlFor="signup-password">
            비밀번호
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-sm text-gray-700"
            htmlFor="signup-password-confirm"
          >
            비밀번호 확인
          </label>
          <input
            id="signup-password-confirm"
            type="password"
            autoComplete="new-password"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <p className="text-sm text-red-600" role="alert">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700" htmlFor="signup-bio">
            소개 (선택)
          </label>
          <textarea
            id="signup-bio"
            rows={3}
            className="resize-y rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-red-600" role="alert">
              {errors.bio.message}
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
          disabled={isSubmitting}
          className="rounded border border-gray-400 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? "가입 중…" : "가입하기"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="font-medium text-gray-900 underline">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
