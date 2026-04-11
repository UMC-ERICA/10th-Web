import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, handleChange] = useForm({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const { email, password, passwordConfirm, name } = formData;
  const handleNext = (e) => {
    e.preventDefault();
    if (state === 0) {
      setState(1);
    } else if (state === 1) {
      setState(2);
    }
    if (state === 2) {
      console.log(formData);
      navigate("/");
    }
  };
  useEffect(() => {
    if (state === 0) {
      if (!email.includes("@")) {
        setError("이메일 형식이 올바르지 않습니다.");
        setButtonDisabled(true);
      } else if (!email.includes(".")) {
        setError("이메일 형식이 올바르지 않습니다.");
        setButtonDisabled(true);
      } else if (email.length === 0) {
        setError("이메일을 입력해주세요.");
        setButtonDisabled(true);
      } else {
        setError("");
        setButtonDisabled(false);
      }
    } else if (state === 1) {
      if (password.length === 0) {
        setError("비밀번호를 입력해주세요.");
        setButtonDisabled(true);
      } else if (password.length < 6) {
        setError("비밀번호는 6자 이상이어야 합니다.");
        setButtonDisabled(true);
      } else if (passwordConfirm.length === 0) {
        setError("비밀번호 확인을 입력해주세요.");
        setButtonDisabled(true);
      } else if (passwordConfirm !== password) {
        setError("비밀번호가 일치하지 않습니다.");
        setButtonDisabled(true);
      } else {
        setError("");
        setButtonDisabled(false);
      }
    } else if (state === 2) {
      if (name.length === 0) {
        setError("이름을 입력해주세요.");
        setButtonDisabled(true);
      } else {
        setError("");
        setButtonDisabled(false);
      }
    }
  }, [email, password, passwordConfirm, name, state]);

  return (
    <div className="bg-[#121212] flex flex-col items-center justify-center h-screen">
      <form className="w-full max-w-md border border-gray-300 rounded-lg">
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
              name="email"
              className="w-full text-white p-2 rounded-lg border border-gray-300"
              onChange={handleChange}
            ></input>
          </div>
        )}
        {state === 1 && (
          <div className="w-full">
            <div className="flex flex-row items-center justify-between">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                name="password"
                className="w-full text-white p-2 rounded-lg border border-gray-300"
                onChange={handleChange}
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
                value={passwordConfirm}
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                name="passwordConfirm"
                className="w-full text-white p-2 rounded-lg border border-gray-300"
                onChange={handleChange}
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
              value={name}
              placeholder="이름"
              name="name"
              className="w-full text-white p-2 rounded-lg border border-gray-300"
              onChange={handleChange}
            ></input>
          </div>
        )}

        <div className="text-red-500 text-sm">{error}</div>
        <button
          onClick={(e) => handleNext(e)}
          className={`mt-4 w-full p-2 rounded-lg bg-red-500 text-white ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {state < 2 ? "다음" : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
