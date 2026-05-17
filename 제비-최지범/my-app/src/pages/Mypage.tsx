import { useOutletContext } from "react-router-dom";
import type { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";

const Mypage = () => {
  const { myInfo } = useOutletContext<{ myInfo: ResponseMyInfoDto["data"] }>();

  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const { mutate: updateMyInfo } = useUpdateMyInfo();

  useEffect(() => {
    if (isOpenSetting && myInfo) {
      setName(myInfo.name);
      setEmail(myInfo.email);
      setBio(myInfo.bio ?? "");
    }
  }, [isOpenSetting, myInfo]);

  const handleSave = () => {
    updateMyInfo({ name, email, bio: bio || "" });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg m-4">
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

      {isOpenSetting ? (
        <div className="flex flex-col gap-2 mt-2 bg-gray-100 p-4 rounded-lg m-4">
          <h1 className="text-xl font-bold">정보 수정</h1>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">이름</label>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">이메일</label>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">소개</label>
            <input
              type="text"
              placeholder="소개"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              저장
            </button>
            <button type="button" onClick={() => setIsOpenSetting(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpenSetting(!isOpenSetting)}
          className="bg-gray-500 text-white p-2 rounded-lg m-4"
        >
          설정
        </button>
      )}
    </div>
  );
};
export default Mypage;
