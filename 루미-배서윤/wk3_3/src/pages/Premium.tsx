import { useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";

const Premium = () => {
  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get("/v1/users/me");
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
