import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState("");
  const handleLogin = (data: FormData) => {
    let message = "";
    if (!data.email.includes("@") && !data.email.includes(".")) {
      message = "이메일 형식이 올바르지 않습니다.";
    } else if (data.password.length < 6) {
      message = "비밀번호는 6자 이상이어야 합니다.";
    } else {
      message = "";
    }
    if (message.length > 0) {
      setError(message);
      return;
    }
    console.log(data);
  };

  return (
    <div className="bg-[#121212] flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md border border-gray-300 rounded-lg"
      >
        <div className="w-full max-w-md text-white p-4 rounded-lg flex flex-row items-center justify-between">
          <Link to="/">뒤로가기</Link>
          <h1 className="text-2xl font-bold">로그인</h1>
          <div className="w-10"></div>
        </div>
        <div className="bg-[#121212] text-white p-4 rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center text-2xl font-bold bg-white text-red-500 p-2 rounded-lg cursor-pointer">
            구글 로그인
          </div>
          <p className="text-sm">또는</p>
          <div className="w-full">
            <input
              {...register("email")}
              placeholder="이메일"
              className="w-full p-2 rounded-lg border border-gray-300"
            ></input>
            <input
              {...register("password")}
              placeholder="비밀번호"
              type="password"
              className="w-full p-2 rounded-lg border border-gray-300"
            ></input>
          </div>
          <div className="text-red-500 text-sm">{error}</div>
          <button
            className="mt-4 w-full p-2 rounded-lg bg-red-500 text-white"
            type="submit"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
