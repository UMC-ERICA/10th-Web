import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식을 입력해주세요."),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: signupData.email,
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    setSignupData((prev) => ({
      ...prev,
      email: data.email,
    }));
    setStep(2);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSignupData((prev) => ({
      ...prev,
      password: value,
    }));

    if (value.length > 0 && value.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }

    if (
      signupData.confirmPassword.length > 0 &&
      value !== signupData.confirmPassword
    ) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSignupData((prev) => ({
      ...prev,
      confirmPassword: value,
    }));

    if (value.length > 0 && value !== signupData.password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSignupData((prev) => ({
      ...prev,
      nickname: value,
    }));

    if (value.trim().length === 0) {
      setNicknameError("닉네임을 입력해주세요.");
    } else if (value.trim().length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
    } else {
      setNicknameError("");
    }
  };

  const isPasswordValid =
    signupData.password.trim().length >= 6 &&
    signupData.confirmPassword.trim().length >= 6 &&
    signupData.password === signupData.confirmPassword &&
    !passwordError &&
    !confirmPasswordError;

  const isNicknameValid =
    signupData.nickname.trim().length >= 2 && !nicknameError;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => {
            if (step === 3) {
              setStep(2);
            } else if (step === 2) {
              setStep(1);
            } else {
              navigate(-1);
            }
          }}
          className="mb-8 text-2xl text-white"
        >
          &lt;
        </button>

        <h1 className="mb-10 text-center text-2xl font-extrabold">회원가입</h1>

        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                이메일
              </label>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                {...register("email")}
                className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-pink-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full rounded-md py-3 font-semibold transition ${
                isValid
                  ? "bg-pink-500 text-white hover:bg-pink-400"
                  : "cursor-not-allowed bg-gray-700 text-gray-400"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-md bg-zinc-900 px-4 py-3 text-sm text-gray-300">
              {signupData.email}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={signupData.password}
                  onChange={handlePasswordChange}
                  className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 pr-12 text-white outline-none placeholder:text-gray-400 focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-400">{passwordError}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호 재확인"
                  value={signupData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 pr-12 text-white outline-none placeholder:text-gray-400 focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="mt-2 text-sm text-red-400">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!isPasswordValid}
              onClick={() => {
                setStep(3);
              }}
              className={`w-full rounded-md py-3 font-semibold transition ${
                isPasswordValid
                  ? "bg-pink-500 text-white hover:bg-pink-400"
                  : "cursor-not-allowed bg-gray-700 text-gray-400"
              }`}
            >
              다음
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-md bg-zinc-900 px-4 py-3 text-sm text-gray-300">
              {signupData.email}
            </div>

            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-3xl text-gray-400">
                +
              </div>
              <p className="text-sm text-gray-400">프로필 이미지</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={signupData.nickname}
                onChange={handleNicknameChange}
                className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-pink-500"
              />
              {nicknameError && (
                <p className="mt-2 text-sm text-red-400">{nicknameError}</p>
              )}
            </div>

            <button
              type="button"
              disabled={!isNicknameValid}
              onClick={() => {
                alert("회원가입 완료");
                console.log(signupData);
                navigate("/");
              }}
              className={`w-full rounded-md py-3 font-semibold transition ${
                isNicknameValid
                  ? "bg-pink-500 text-white hover:bg-pink-400"
                  : "cursor-not-allowed bg-gray-700 text-gray-400"
              }`}
            >
              회원가입 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}