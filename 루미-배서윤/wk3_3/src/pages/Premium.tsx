import { useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";

const Premium = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/v1/users/me"); 
        console.log("데이터:", res.data);
      } catch (err) {
        console.error("에러:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Premium Page</h1>
      <p>로그인한 사용자만 접근 가능합니다.</p>
    </div>
  );
};

export default Premium;