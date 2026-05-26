import axiosInstance from "./axiosInstance";

export const createComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return response.data;
};

export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  const response = await axiosInstance.patch(
    `/v1/comments/${commentId}`,
    {
      content,
    }
  );

  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await axiosInstance.delete(
    `/v1/comments/${commentId}`
  );

  return response.data;
};