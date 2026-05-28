import type { CommonResponse } from "./common";

export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestSigninDto = {
  email: string;
  password: string;
};

export type AuthTokenPair = {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

export type ResponseSigninDto = CommonResponse<AuthTokenPair>;

/** 토큰 재발급 응답 (로그인과 동일 본문인 API가 많음) */
export type ResponseRefreshDto = CommonResponse<AuthTokenPair>;

export type ResponseSignoutDto = CommonResponse<null>;

export type ResponseDeleteAccountDto = CommonResponse<null>;

export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestUpdateMyInfoDto = {
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
};
