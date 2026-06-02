import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식을 입력해주세요."),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: { email: signupData.email },
  });

  const onSubmit = (data: EmailFormValues) => {
    setSignupData((prev) => ({ ...prev, email: data.email }));
    setStep(2);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSignupData((prev) => ({ ...prev, password: value }));
    setPasswordError(value.length > 0 && value.length < 6 ? "비밀번호는 6자 이상이어야 합니다." : "");
    if (signupData.confirmPassword.length > 0 && value !== signupData.confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSignupData((prev) => ({ ...prev, confirmPassword: value }));
    setConfirmPasswordError(value.length > 0 && value !== signupData.password ? "비밀번호가 일치하지 않습니다." : "");
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSignupData((prev) => ({ ...prev, nickname: value }));
    if (value.trim().length === 0) setNicknameError("닉네임을 입력해주세요.");
    else if (value.trim().length < 2) setNicknameError("닉네임은 2자 이상이어야 합니다.");
    else setNicknameError("");
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSignup = async () => {
    if (!isNicknameValid) return;
    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:8000/v1/auth/signup", {
        email: signupData.email,
        password: signupData.password,
        name: signupData.nickname,
      });
      alert("회원가입 완료");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "회원가입 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordValid =
    signupData.password.trim().length >= 6 &&
    signupData.confirmPassword.trim().length >= 6 &&
    signupData.password === signupData.confirmPassword &&
    !passwordError &&
    !confirmPasswordError;

  const isNicknameValid = signupData.nickname.trim().length >= 2 && !nicknameError;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => {
            if (step === 3) setStep(2);
            else if (step === 2) setStep(1);
            else navigate(-1);
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
              <FormInput
                type="email"
                placeholder="이메일을 입력해주세요."
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <Button type="submit" fullWidth disabled={!isValid}>
              다음
            </Button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-md bg-zinc-900 px-4 py-3 text-sm text-gray-300">
              {signupData.email}
            </div>

            <div>
              <div className="relative">
                <FormInput
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={signupData.password}
                  onChange={handlePasswordChange}
                  className="pr-12"
                  error={passwordError}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-[14px] text-gray-400"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <FormInput
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호 재확인"
                  value={signupData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="pr-12"
                  error={confirmPasswordError}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-4 top-[14px] text-gray-400"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <Button type="button" fullWidth disabled={!isPasswordValid} onClick={() => setStep(3)}>
              다음
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-md bg-zinc-900 px-4 py-3 text-sm text-gray-300">
              {signupData.email}
            </div>

            <div className="flex flex-col items-center justify-center space-y-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-zinc-800 text-3xl text-gray-400"
              >
                {profilePreview ? (
                  <img src={profilePreview} alt="profile" className="h-full w-full object-cover" />
                ) : (
                  "+"
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
              <p className="text-sm text-gray-400">프로필 이미지</p>
            </div>

            <FormInput
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={signupData.nickname}
              onChange={handleNicknameChange}
              error={nicknameError}
            />

            <Button
              type="button"
              fullWidth
              disabled={!isNicknameValid || isSubmitting}
              onClick={handleSignup}
            >
              {isSubmitting ? "가입 중..." : "회원가입 완료"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
