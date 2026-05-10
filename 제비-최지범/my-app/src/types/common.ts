import type { LpResponseDto } from "./music";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: LpResponseDto;
};

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  lpId: number;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type CommentResponseDto = {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
};
