import { useOutletContext } from "react-router-dom";
import type { ResponseMyInfoDto } from "../types/auth";

const Mypage = () => {
  const { myInfo } = useOutletContext<{ myInfo: ResponseMyInfoDto["data"] }>();
  return (
    <div className="flex flex-col  ">
      <h1 className="text-2xl font-bold">마이페이지</h1>

      <div>
        <h2 className="text-xl font-bold">정보</h2>
        <img
          src={myInfo?.avatar || "https://via.placeholder.com/150"}
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        <p>이름: {myInfo?.name}</p>
        <p>이메일: {myInfo?.email}</p>
        <p>소개: {myInfo?.bio}</p>
      </div>
    </div>
  );
};

export default Mypage;
