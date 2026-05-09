import axios from "axios";
import type { LP } from "../types/music";
import type { CursorBasedResponse, PaginationDto } from "../types/common";

export const getLps = async (
  paginationDto: PaginationDto,
): Promise<CursorBasedResponse<LP[]>> => {
  const response = await axios.get<CursorBasedResponse<LP[]>>(
    "http://localhost:8000/v1/lps",
    {
      params: paginationDto,
    },
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch lps");
  }
  return response.data;
};

export const fetchLpDetail = async (lpId: number) => {
  try {
    const response = await axios.get(`http://localhost:8000/v1/lps/${lpId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch lp detail");
    }
    return response.data.data;
  } catch (error) {
    console.error("LP 상세 정보 가져오기 실패:", error);
    throw error;
  }
};
