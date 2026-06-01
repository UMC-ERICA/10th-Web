import axiosInstance from "./axiosInstance";

export type UpdateMyProfileRequest = {
  name: string;
  bio?: string;
  profileImage?: File | null;
};

export const updateMyProfile = async ({
  name,
  bio,
  profileImage,
}: UpdateMyProfileRequest) => {
  const formData = new FormData();

  formData.append("name", name);

  if (bio) {
    formData.append("bio", bio);
  }

  if (profileImage) {
    formData.append("avatar", profileImage);
  }

  const response = await axiosInstance.patch("/v1/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteMyAccount = async () => {
  const response = await axiosInstance.delete("/v1/users/me");

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/v1/auth/logout");

  return response.data;
};