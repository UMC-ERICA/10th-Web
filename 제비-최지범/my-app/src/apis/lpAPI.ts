import axios from "axios";
import type { LpResponseDto } from "../types/music";
import type {
  CommonResponse,
  PaginationDto,
  CommentResponseDto,
} from "../types/common";
import { axiosinstance } from "./axios";

export const getLps = async (
  paginationDto: PaginationDto,
): Promise<CommonResponse<LpResponseDto>> => {
  const response = await axios.get<CommonResponse<LpResponseDto>>(
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

export const getComments = async (
  lpId: number,
  paginationDto: PaginationDto,
): Promise<CommonResponse<CommentResponseDto>> => {
  const response = await axiosinstance.get<CommonResponse<CommentResponseDto>>(
    `http://localhost:8000/v1/lps/${lpId}/comments`,
    {
      params: paginationDto,
    },
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch comments");
  }
  return response.data;
};

export const createComment = async (lpId: number, content: string) => {
  const response = await axiosinstance.post(
    `http://localhost:8000/v1/lps/${lpId}/comments`,
    {
      content,
    },
  );
  console.log(response.data);
  return response.data;
};
