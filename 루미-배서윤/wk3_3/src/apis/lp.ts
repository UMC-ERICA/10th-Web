import axiosInstance from "./axiosInstance";

export type SortType = "asc" | "desc";

export type Lp = {
  id: number;
  title: string;
  thumbnail: string | null;
  createdAt: string;
  likes: {
    id: number;
    userId: number;
    lpId: number;
  }[];
};

export type LpListPage = {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
};

type LpListResponse = {
  data: LpListPage;
};

export const getLps = async ({
  sort,
  cursor,
  search,
}: {
  sort: SortType;
  cursor?: number | null;
  search?: string;
}) => {
  const response = await axiosInstance.get<LpListResponse>("/v1/lps", {
    params: {
      order: sort,
      cursor,
      limit: 10,
      ...(search && { search }),
    },
  });

  return response.data.data;
};

export const getLpDetail = async (lpid: string) => {
  const response = await axiosInstance.get(`/v1/lps/${lpid}`);

  return response.data.data;
};

export type CommentOrder = "asc" | "desc";

export type LpComment = {
  id: number;
  content: string;
  createdAt: string;
  author?: {
    id?: number;
    name?: string;
  };
};

export type LpCommentPage = {
  data: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
};

type LpCommentResponse = {
  data: LpCommentPage;
};

export const getLpComments = async ({
  lpId,
  order,
  cursor,
}: {
  lpId: string;
  order: CommentOrder;
  cursor?: number | null;
}) => {
  const response = await axiosInstance.get<LpCommentResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: {
        order,
        cursor,
        limit: 10,
      },
    }
  );

  return response.data.data;
};

export type CreateLpRequest = {
  title: string;
  content: string;
  tags: string[];
  image: File | null;
};

const uploadImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", image);
  const response = await axiosInstance.post("/v1/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.imageUrl;
};

export const createLp = async ({
  title,
  content,
  tags,
  image,
}: CreateLpRequest) => {
  const thumbnail = image ? await uploadImage(image) : undefined;

  const response = await axiosInstance.post("/v1/lps", {
    title,
    content,
    tags,
    thumbnail,
    published: true,
  });

  return response.data;
};

export type CreateLpCommentRequest = {
  lpId: string;
  content: string;
};

export const createLpComment = async ({
  lpId,
  content,
}: CreateLpCommentRequest) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return response.data;
};

export type UpdateLpCommentRequest = {
  lpId: string;
  commentId: number;
  content: string;
};

export const updateLpComment = async ({
  lpId,
  commentId,
  content,
}: UpdateLpCommentRequest) => {
  const response = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );

  return response.data;
};

export type DeleteLpCommentRequest = {
  lpId: string;
  commentId: number;
};

export const deleteLpComment = async ({
  lpId,
  commentId,
}: DeleteLpCommentRequest) => {
  const response = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return response.data;
};


export type UpdateLpRequest = {
  lpId: string;
  title: string;
  content: string;
  image?: File | null;
};

export const updateLp = async ({
  lpId,
  title,
  content,
  image,
}: UpdateLpRequest) => {
  const thumbnail = image ? await uploadImage(image) : undefined;

  const response = await axiosInstance.patch(`/v1/lps/${lpId}`, {
    title,
    content,
    ...(thumbnail && { thumbnail }),
  });

  return response.data;
};

export const deleteLp = async (lpId: string) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}`);

  return response.data;
};

export const likeLp = async (lpId: string) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return response.data;
};