import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

const Login = () => {
  const [formData, handleChange] = useForm({ email: "", password: "" });
  const { email, password } = formData;
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };
  useEffect(() => {
    if (email && password) {
      if (!email.includes("@")) {
        setError("이메일 형식이 올바르지 않습니다.");
        setButtonDisabled(true);
      } else if (email.length === 0) {
        setError("이메일을 입력해주세요.");
        setButtonDisabled(true);
      } else if (password.length === 0) {
        setError("비밀번호를 입력해주세요.");
        setButtonDisabled(true);
      } else if (!email.includes(".")) {
        setError("이메일 형식이 올바르지 않습니다.");
        setButtonDisabled(true);
      } else if (password.length < 6) {
        setError("비밀번호는 6자 이상이어야 합니다.");
        setButtonDisabled(true);
      } else {
        setError("");
        setButtonDisabled(false);
      }
    }
  }, [email, password]);
  return (
    <div className="bg-[#121212] flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
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
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="이메일"
              className="w-full p-2 rounded-lg border border-gray-300"
            ></input>
            <input
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="비밀번호"
              type="password"
              className="w-full p-2 rounded-lg border border-gray-300"
            ></input>
          </div>
          <div className="text-red-500 text-sm">{error}</div>
          <button
            className={`mt-4 w-full p-2 rounded-lg bg-red-500 text-white ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
