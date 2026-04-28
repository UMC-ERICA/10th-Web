import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  name: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const handleNext = (data: FormData) => {
    let message = "";
    if (state === 0) {
      if (!data.email.includes("@") && !data.email.includes(".")) {
        message = "이메일 형식이 올바르지 않습니다.";
      } else {
        message = "";
      }
      if (message.length > 0) {
        setError(message);
        return;
      }
      setState(1);
    } else if (state === 1) {
      if (data.password.length < 6) {
        message = "비밀번호는 6자 이상이어야 합니다.";
      } else if (data.password !== data.passwordConfirm) {
        message = "비밀번호가 일치하지 않습니다.";
      } else {
        message = "";
      }
      if (message.length > 0) {
        setError(message);
        return;
      }
      setState(2);
    } else if (state === 2) {
      if (data.name.length < 2) {
        message = "이름은 2자 이상이어야 합니다.";
      } else {
        message = "";
      }
      if (message.length > 0) {
        setError(message);
        return;
      }
      console.log(data);
      navigate("/");
    }
  };

  return (
    <div className="bg-[#121212] flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(handleNext)}
        className="w-full max-w-md border border-gray-300 rounded-lg"
      >
        <div className="w-full max-w-md text-white p-4 rounded-lg flex flex-row items-center justify-between">
          <Link to="/">뒤로가기</Link>
          <h1 className="text-2xl font-bold">회원가입</h1>
          <div className="w-10"></div>
        </div>
        {state === 0 ? (
          <div className="bg-[#121212] text-white p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center text-2xl font-bold bg-white text-red-500 p-2 rounded-lg cursor-pointer">
              구글 회원가입
            </div>
            <p className="text-sm">또는</p>
          </div>
        ) : (
          ""
        )}
        {state === 2 ? (
          <div className="w-full flex flex-col items-center justify-center mt-4 mb-4">
            <div className=" w-50 h-50 rounded-full bg-gray-300"></div>
          </div>
        ) : (
          ""
        )}

        {state === 0 && (
          <div className="w-full">
            <input
              placeholder="이메일"
              className="w-full text-white p-2 rounded-lg border border-gray-300"
              {...register("email")}
            ></input>
          </div>
        )}
        {state === 1 && (
          <div className="w-full">
            <div className="flex flex-row items-center justify-between">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className="w-full text-white p-2 rounded-lg border border-gray-300"
              ></input>{" "}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="text-white p-2 rounded-lg border border-gray-300"
              >
                {showPassword ? "숨기기" : "보기"}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <input
                {...register("passwordConfirm")}
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="w-full text-white p-2 rounded-lg border border-gray-300"
              ></input>
              <div
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className=" text-white p-2 rounded-lg border border-gray-300"
              >
                {showPasswordConfirm ? "숨기기" : "보기"}
              </div>
            </div>
          </div>
        )}
        {state === 2 && (
          <div className="w-full">
            <input
              {...register("name")}
              placeholder="이름"
              className="w-full text-white p-2 rounded-lg border border-gray-300"
            ></input>
          </div>
        )}
        {error.length > 0 && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button
          type="submit"
          className={`mt-4 w-full p-2 rounded-lg bg-red-500 text-white `}
        >
          {state < 2 ? "다음" : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
