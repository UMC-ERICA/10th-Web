import { axiosinstance } from "./axios";
import {
  type RequestSigninDto,
  type RequestSignupDto,
  type RequestUpdateMyInfoDto,
  type ResponseDeleteAccountDto,
  type ResponseMyInfoDto,
  type ResponseSigninDto,
  type ResponseSignoutDto,
  type ResponseSignupDto,
} from "../types/auth.ts";

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
  const { data } = await axiosinstance.post(`/v1/auth/signup`, body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
  const { data } = await axiosinstance.post(`/v1/auth/signin`, body);
  return data;
};

export const postSignout = async (): Promise<ResponseSignoutDto> => {
  const { data } = await axiosinstance.post(`/v1/auth/signout`);
  return data;
};

export const deleteMyAccount = async (): Promise<ResponseDeleteAccountDto> => {
  const { data } = await axiosinstance.delete(`/v1/users`);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosinstance.get(`/v1/users/me`);
  return data;
};

export const patchMyInfo = async (
  body: RequestUpdateMyInfoDto,
): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosinstance.patch(`/v1/users`, body);
  return data;
};
