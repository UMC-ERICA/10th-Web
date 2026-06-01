import { axiosinstance } from "./axios";
import {
  type RequestSigninDto,
  type RequestSignupDto,
  type ResponseMyInfoDto,
  type ResponseSigninDto,
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

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosinstance.get(`/v1/users/me`);
  return data;
};
